interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

interface RazorpayOrder {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
  key_id?: string;
}

interface PaymentWorkerBinding {
  createOrder(params: CreateOrderParams): Promise<RazorpayOrder>;
  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): Promise<{ verified: boolean; message: string }>;
  verifyWebhookSignature(body: string, signature: string): Promise<{ verified: boolean; message: string; payload?: unknown }>;
}

interface Env {
  PAYMENT_WORKER?: PaymentWorkerBinding;
  PAYMENT_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

type PagesContext = { request: Request; env: Env; params: { action?: string | string[] } };

const allowedOrigins = new Set([
  'https://rareminds.in',
  'https://www.rareminds.in',
  'http://localhost:5173',
  'http://localhost:8780',
  'http://localhost:8789',
]);

const corsHeaders = (request: Request) => {
  const origin = request.headers.get('Origin');
  return {
    ...(origin && allowedOrigins.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
};

const json = (request: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
});

const getAction = (action?: string | string[]) => Array.isArray(action) ? action[0] : action;
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const readBody = async (request: Request, maxLength = 16_000) => {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return null;
  const text = await request.text();
  if (!text || text.length > maxLength) return null;
  try {
    const value = JSON.parse(text) as unknown;
    return isRecord(value) ? { text, value } : null;
  } catch {
    return null;
  }
};

const supabaseRpc = async (env: Env, name: string, body: Record<string, unknown>) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('PAYMENT_STORAGE_UNAVAILABLE');
  const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error('[payments] Supabase RPC failed', name, response.status);
    throw new Error('PAYMENT_STORAGE_UNAVAILABLE');
  }
  return response.json();
};

const getWorker = (env: Env) => {
  if (!env.PAYMENT_WORKER) throw new Error('PAYMENT_WORKER_UNAVAILABLE');
  return env.PAYMENT_WORKER;
};

const errorResponse = (request: Request, error: unknown) => {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('INVALID_INPUT')) return json(request, { error: { code: 'INVALID_INPUT', message: 'Invalid payment request' } }, 400);
  if (message.includes('UNAUTHORIZED')) return json(request, { error: { code: 'UNAUTHORIZED', message: 'Payment verification failed' } }, 422);
  return json(request, { error: { code: 'PAYMENT_UNAVAILABLE', message: 'Payment service is unavailable' } }, 503);
};

const completePayment = async (env: Env, orderId: string, paymentId: string) => supabaseRpc(env, 'complete_event_payment', {
  p_order_id: orderId,
  p_payment_id: paymentId,
});

export async function onRequestOptions({ request }: PagesContext) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestPost(context: PagesContext) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');
  if (origin && !allowedOrigins.has(origin)) return json(request, { error: { code: 'FORBIDDEN', message: 'Origin not allowed' } }, 403);

  const action = getAction(context.params.action);

  if (action === 'webhook') {
    const body = await readBody(request, 128_000);
    const signature = request.headers.get('X-Razorpay-Signature') || '';
    if (!body) return json(request, { error: { code: 'INVALID_INPUT', message: 'Invalid payment webhook' } }, 400);

    try {
      const verification = await getWorker(env).verifyWebhookSignature(body.text, signature);
      if (!verification.verified || !isRecord(verification.payload)) {
        return json(request, { error: { code: 'UNAUTHORIZED', message: 'Invalid webhook signature' } }, 401);
      }

      const event = verification.payload.event;
      if (event !== 'payment.captured' && event !== 'order.paid') return json(request, { success: true, ignored: true });

      const payload = verification.payload.payload;
      const payment = isRecord(payload) && isRecord(payload.payment) ? payload.payment : null;
      const entity = payment && isRecord(payment.entity) ? payment.entity : null;
      const orderId = entity?.order_id;
      const paymentId = entity?.id;
      if (typeof orderId !== 'string' || typeof paymentId !== 'string' || !orderId || !paymentId
        || orderId.length > 100 || paymentId.length > 100) {
        return json(request, { error: { code: 'INVALID_INPUT', message: 'Invalid payment webhook' } }, 400);
      }

      const completed = await completePayment(env, orderId, paymentId);
      if (completed !== true) return json(request, { error: { code: 'PAYMENT_STATE_MISMATCH', message: 'Payment order is not associated with a pending registration' } }, 409);
      return json(request, { success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      console.error('[payments] Webhook completion failed', message || 'Unknown error');
      if (message.includes('UNAUTHORIZED')) {
        return json(request, { error: { code: 'UNAUTHORIZED', message: 'Invalid webhook signature' } }, 401);
      }
      return errorResponse(request, error);
    }
  }

  if (!env.PAYMENT_RATE_LIMITER) return json(request, { error: { code: 'UNAVAILABLE', message: 'Payment rate limiting is not configured' } }, 503);
  try {
    const result = await env.PAYMENT_RATE_LIMITER.limit({ key: `${request.headers.get('CF-Connecting-IP') || 'local'}:${action || 'unknown'}` });
    if (!result.success) return json(request, { error: { code: 'RATE_LIMITED', message: 'Too many payment requests' } }, 429);
  } catch {
    return json(request, { error: { code: 'UNAVAILABLE', message: 'Payment rate limiting is unavailable' } }, 503);
  }

  const parsedBody = await readBody(request);
  if (!parsedBody) return json(request, { error: { code: 'INVALID_INPUT', message: 'Invalid JSON body' } }, 400);
  const body = parsedBody.value;

  try {
    if (action === 'create-order') {
      const registrationId = body.registration_id;
      const paymentToken = body.payment_token;
      if (!Number.isSafeInteger(registrationId) || (registrationId as number) < 1
        || typeof paymentToken !== 'string' || !isUuid(paymentToken)) throw new Error('INVALID_INPUT');

      const reservation = await supabaseRpc(env, 'reserve_event_payment_order', {
        p_registration_id: registrationId,
        p_payment_token: paymentToken,
      }) as unknown;
      if (!isRecord(reservation) || !Number.isSafeInteger(reservation.amount) || typeof reservation.currency !== 'string'
        || typeof reservation.event_name !== 'string' || typeof reservation.disposition !== 'string') {
        throw new Error('PAYMENT_STORAGE_UNAVAILABLE');
      }

      if (reservation.disposition === 'wait') {
        return json(request, {
          error: {
            code: 'ORDER_CREATION_PENDING',
            message: 'Your payment order is still being prepared. Please retry shortly or contact support if this continues.',
          },
        }, 409);
      }

      if (reservation.disposition === 'ready') {
        if (typeof reservation.order_id !== 'string' || !reservation.order_id
          || typeof reservation.razorpay_key_id !== 'string' || !reservation.razorpay_key_id) {
          throw new Error('PAYMENT_STORAGE_UNAVAILABLE');
        }
        return json(request, {
          success: true,
          order: {
            id: reservation.order_id,
            entity: 'order',
            amount: reservation.amount,
            amount_paid: 0,
            amount_due: reservation.amount,
            currency: reservation.currency,
            receipt: '',
            status: 'created',
            attempts: 0,
            notes: { registration_id: String(registrationId) },
            created_at: 0,
            key_id: reservation.razorpay_key_id,
          },
          razorpay_key_id: reservation.razorpay_key_id,
        });
      }

      const requestId = reservation.request_id;
      if (reservation.disposition !== 'create' || typeof requestId !== 'string' || !isUuid(requestId)) {
        throw new Error('PAYMENT_STORAGE_UNAVAILABLE');
      }

      const order = await getWorker(env).createOrder({
        amount: reservation.amount as number,
        currency: reservation.currency,
        receipt: `evt_${requestId.replaceAll('-', '')}`,
        notes: {
          registration_id: String(registrationId),
          event_name: reservation.event_name,
          order_request_id: requestId,
        },
      });

      if (!order.key_id || typeof order.id !== 'string' || !order.id || order.id.length > 100
        || order.amount !== reservation.amount || order.currency !== reservation.currency) {
        throw new Error('PAYMENT_WORKER_UNAVAILABLE');
      }

      const finalized = await supabaseRpc(env, 'finalize_event_payment_order', {
        p_registration_id: registrationId,
        p_request_id: requestId,
        p_order_id: order.id,
        p_amount: order.amount,
        p_currency: order.currency,
        p_key_id: order.key_id,
      });
      if (finalized !== true) throw new Error('PAYMENT_STORAGE_UNAVAILABLE');

      return json(request, { success: true, order, razorpay_key_id: order.key_id });
    }

    if (action === 'verify-payment') {
      const orderId = body.razorpay_order_id;
      const paymentId = body.razorpay_payment_id;
      const signature = body.razorpay_signature;
      if (typeof orderId !== 'string' || typeof paymentId !== 'string' || typeof signature !== 'string'
        || !orderId || !paymentId || !signature || orderId.length > 100 || paymentId.length > 100 || signature.length > 512) {
        throw new Error('INVALID_INPUT');
      }

      const verified = await getWorker(env).verifyPaymentSignature(orderId, paymentId, signature);
      if (!verified.verified) return json(request, { success: false, ...verified }, 422);

      const completed = await completePayment(env, orderId, paymentId);
      if (completed !== true) return json(request, { error: { code: 'PAYMENT_STATE_MISMATCH', message: 'Payment order is not associated with a pending registration' } }, 409);

      return json(request, { success: true, ...verified });
    }

    return json(request, { error: { code: 'NOT_FOUND', message: 'Unsupported payment action' } }, 404);
  } catch (error) {
    console.error('[payments] Request failed', error instanceof Error ? error.message : 'Unknown error');
    return errorResponse(request, error);
  }
}

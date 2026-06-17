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

interface VerifyPaymentResult {
  verified: boolean;
  message: string;
}

interface PaymentWorkerBinding {
  createOrder(params: CreateOrderParams): Promise<RazorpayOrder>;
  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): Promise<VerifyPaymentResult>;
}

interface Env {
  PAYMENT_WORKER?: PaymentWorkerBinding;
}

type PagesContext = {
  request: Request;
  env: Env;
  params: {
    action?: string | string[];
  };
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const getAction = (action?: string | string[]) =>
  Array.isArray(action) ? action[0] : action;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const rpcErrorToStatus = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  if (message.startsWith('INVALID_INPUT:')) return 400;
  if (message.startsWith('UNAUTHORIZED:')) return 422;
  if (message.startsWith('RAZORPAY_API_ERROR:')) return 502;
  if (message.includes('PAYMENT_WORKER')) return 503;

  return 500;
};

const rpcErrorResponse = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const colonIndex = message.indexOf(':');
  const code = colonIndex > 0 ? message.slice(0, colonIndex).trim() : 'INTERNAL_ERROR';
  const detail = colonIndex > 0 ? message.slice(colonIndex + 1).trim() : message;

  return json({ error: { code, message: detail } }, rpcErrorToStatus(error));
};

const getPaymentWorker = (env: Env) => {
  if (!env.PAYMENT_WORKER) {
    throw new Error(
      'PAYMENT_WORKER binding is not configured. Use --service PAYMENT_WORKER=razorpay-api in local dev or add the service binding in wrangler.toml.'
    );
  }

  return env.PAYMENT_WORKER;
};

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context: PagesContext) {
  const action = getAction(context.params.action);

  try {
    const worker = getPaymentWorker(context.env);
    const body = await context.request.json() as Record<string, unknown>;

    if (action === 'create-order') {
      if (typeof body.amount !== 'number') {
        return json({ error: { code: 'INVALID_INPUT', message: 'amount is required and must be a number' } }, 400);
      }

      const order = await worker.createOrder({
        amount: body.amount,
        currency: typeof body.currency === 'string' ? body.currency : undefined,
        receipt: typeof body.receipt === 'string' ? body.receipt : undefined,
        notes: body.notes && typeof body.notes === 'object' && !Array.isArray(body.notes)
          ? body.notes as Record<string, string>
          : undefined,
      });

      return json({
        success: true,
        order,
        razorpay_key_id: order.key_id,
      });
    }

    if (action === 'verify-payment') {
      const orderId = body.razorpay_order_id;
      const paymentId = body.razorpay_payment_id;
      const signature = body.razorpay_signature;

      if (typeof orderId !== 'string' || typeof paymentId !== 'string' || typeof signature !== 'string') {
        return json({
          error: {
            code: 'INVALID_INPUT',
            message: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required',
          },
        }, 400);
      }

      const verifyResult = await worker.verifyPaymentSignature(orderId, paymentId, signature);
      return json({ success: true, ...verifyResult });
    }

    return json({ error: { code: 'NOT_FOUND', message: 'Unsupported payment action' } }, 404);
  } catch (error) {
    console.error('[Payments] Service binding error:', error);
    return rpcErrorResponse(error);
  }
}

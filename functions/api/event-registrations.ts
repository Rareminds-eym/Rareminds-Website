interface Env {
  EMAIL_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
  EMAIL_OTP_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

type PagesContext = { request: Request; env: Env };

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const getString = (body: Record<string, unknown>, key: string, maxLength: number) => {
  const value = body[key];
  return typeof value === 'string' && value.trim() && value.trim().length <= maxLength
    ? value.trim()
    : null;
};

const hashKey = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 32);
};

const enforceLimit = async (limiter: Env['EMAIL_RATE_LIMITER'], key: string) => {
  if (!limiter) return false;
  try {
    return (await limiter.limit({ key })).success;
  } catch {
    return false;
  }
};

const readBody = async (request: Request) => {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return null;
  const text = await request.text();
  if (!text || text.length > 32_000) return null;
  try {
    const value = JSON.parse(text) as unknown;
    return isRecord(value) ? value : null;
  } catch {
    return null;
  }
};

export async function onRequestOptions(context: PagesContext) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}

export async function onRequestPost({ request, env }: PagesContext) {
  const origin = request.headers.get('Origin');
  if (origin && !allowedOrigins.has(origin)) return json(request, { success: false, error: 'Origin not allowed' }, 403);

  const clientIp = request.headers.get('CF-Connecting-IP') || 'local';
  if (!await enforceLimit(env.EMAIL_RATE_LIMITER, `${clientIp}:event-registration`)) {
    return json(request, { success: false, error: 'Registration rate limiting is unavailable or exceeded' }, env.EMAIL_RATE_LIMITER ? 429 : 503);
  }

  const body = await readBody(request);
  if (!body) return json(request, { success: false, error: 'Invalid JSON body' }, 400);

  const eventId = getString(body, 'event_id', 36);
  const proof = getString(body, 'verification_proof', 36);
  const email = getString(body, 'email', 254)?.toLowerCase() || null;
  const name = getString(body, 'name', 100);
  const phone = getString(body, 'phone', 30);
  const organization = getString(body, 'organization', 200);
  const quantity = body.quantity;

  if (!eventId || !isUuid(eventId) || !proof || !isUuid(proof) || !email || !isEmail(email)
    || !name || !phone || !organization || !Number.isSafeInteger(quantity) || (quantity as number) < 1 || (quantity as number) > 10) {
    return json(request, { success: false, error: 'Invalid registration details' }, 400);
  }

  if (!await enforceLimit(env.EMAIL_OTP_RATE_LIMITER, `register:${await hashKey(email)}`)) {
    return json(request, { success: false, error: 'Too many registration attempts. Please try again shortly.' }, env.EMAIL_OTP_RATE_LIMITER ? 429 : 503);
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json(request, { success: false, error: 'Registration service is not configured' }, 503);
  }

  const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/register_event_with_email_verification`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_event_id: eventId,
      p_email: email,
      p_name: name,
      p_phone: phone,
      p_organization: organization,
      p_quantity: quantity,
      p_verification_proof: proof,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { message?: string };
    const message = error.message || '';
    console.error('[event-registration] Supabase RPC failed', response.status, message);
    if (message.includes('already registered')) return json(request, { success: false, error: 'You have already registered for this event.' }, 409);
    if (message.includes('verification')) return json(request, { success: false, error: 'Email verification expired. Please verify your email again.' }, 403);
    if (message.includes('Event is unavailable')) return json(request, { success: false, error: 'This event is not accepting registrations.' }, 400);
    return json(request, { success: false, error: 'Registration service is unavailable' }, 503);
  }

  const registration = await response.json();
  return json(request, { success: true, registration });
}

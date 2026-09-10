interface SendEmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
  metadata?: Record<string, unknown>;
}

interface SendEmailResponse {
  success: boolean;
  shouldRetry?: boolean;
}

interface Env {
  EMAIL_SERVICE: {
    sendEmail(request: SendEmailRequest): Promise<SendEmailResponse>;
  };
  EMAIL_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
}

type PagesContext = {
  request: Request;
  env: Env;
};

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

const json = (request: Request, body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
  });

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string));

const getString = (value: unknown, maxLength: number) =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
    ? value.trim()
    : null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const cleanSubjectValue = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

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

export async function onRequest(context: PagesContext) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');

  if (origin && !allowedOrigins.has(origin)) {
    return json(request, { error: 'Origin not allowed' }, 403);
  }

  if (request.method === 'OPTIONS') {
    return json(request, { success: true });
  }

  if (request.method !== 'POST') {
    return json(request, { error: 'Method not allowed' }, 405);
  }

  if (!env.EMAIL_RATE_LIMITER) {
    return json(request, { error: 'Email rate limiting is not configured' }, 503);
  }
  const clientIp = request.headers.get('CF-Connecting-IP') || 'local';
  try {
    const rateLimit = await env.EMAIL_RATE_LIMITER.limit({ key: `${clientIp}:send-contact-email` });
    if (!rateLimit.success) return json(request, { error: 'Too many requests. Please try again shortly.' }, 429);
  } catch {
    return json(request, { error: 'Email rate limiting is unavailable' }, 503);
  }

  if (!env.EMAIL_SERVICE) {
    return json(request, { error: 'Email service is not configured' }, 503);
  }

  const body = await readBody(request);
  if (!body) return json(request, { error: 'Invalid JSON body' }, 400);

  const name = getString(body.name, 100);
  const university = getString(body.university, 150);
  const email = getString(body.email, 254);
  const course = getString(body.course, 150);
  const message = getString(body.message, 3000);

  if (!name || !university || !email || !course || !message
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(request, { error: 'Invalid contact form submission' }, 400);
  }

  try {
    const result = await env.EMAIL_SERVICE.sendEmail({
      from: 'no-reply@rareminds.in',
      fromName: 'Rareminds',
      to: ['marketing@rareminds.in'],
      replyTo: email,
      subject: `University enquiry: ${cleanSubjectValue(course)}`,
      html: `<h2>New university enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>University:</strong> ${escapeHtml(university)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Course:</strong> ${escapeHtml(course)}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>`,
    });

    if (!result.success) {
      console.error('[send-contact-email] Email worker rejected the request');
      return json(request, { error: 'Unable to send email right now' }, result.shouldRetry ? 503 : 502);
    }

    return json(request, { success: true });
  } catch {
    console.error('[send-contact-email] Email worker request failed');
    return json(request, { error: 'Unable to send email right now' }, 502);
  }
}

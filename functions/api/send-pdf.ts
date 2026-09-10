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

const allowedLocalResources = new Set([
  '/institutions/pdfs/Course_List.pdf',
  '/institutions/pdfs/Campus Audit.pdf',
  '/institutions/pdfs/Vels.pdf',
  '/institutions/pdfs/Pes.pdf',
  '/institutions/pdfs/TVU.pdf',
  '/institutions/pdfs/FDP_Handbook.pdf',
  '/institutions/pdfs/Brochure.pdf',
]);

const allowedDriveFileIds = new Set([
  '18Q-Rd1ZTrXEjgLhW0EqTQO8K1xoC9aJ9',
  '1HZR62_uyBC4kceBO3KV2KYYOzjwM1mfk',
  '1TAhzScrKxOQ11hksIxakSkykL1-g3dc5',
  '1HhCH2W9OSzP1iBCHPc9VUqRG9PwBi9mn',
  '12cQbhz1JSF-k1-vBEa02zWILkX4ulPWx',
  '1bmJoQdaW5oC0vZcuDs-iieFgOVCudl9q',
  '1kK27P0N26CiREpZK9tRirJaJCyKv4Mh-',
  '113jMQrHdB9aTxtpFUtluf-o-go19l_QC',
  '1FexjnvsqLziLlk71F2wU4I7apQWzK5i2',
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
const hashKey = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 32);
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

const getResourceUrl = (value: string) => {
  if (value.startsWith('/')) {
    return allowedLocalResources.has(value)
      ? new URL(value, 'https://rareminds.in').href
      : null;
  }

  try {
    const url = new URL(value);
    const match = /^\/file\/d\/([A-Za-z0-9_-]+)\/view$/.exec(url.pathname);
    const isAllowedGoogleDriveFile = url.protocol === 'https:'
      && url.hostname === 'drive.google.com'
      && match
      && allowedDriveFileIds.has(match[1]);
    return isAllowedGoogleDriveFile ? url.href : null;
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
    const rateLimit = await env.EMAIL_RATE_LIMITER.limit({ key: `${clientIp}:send-pdf` });
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
  const email = getString(body.email, 254);
  const institution = getString(body.institution, 150);
  const pdfUrl = getString(body.pdfUrl, 500);
  const location = body.location == null ? '' : getString(body.location, 150);
  const university = body.university == null ? '' : getString(body.university, 150);

  if (!name || !email || !institution || !pdfUrl || location === null || university === null
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(request, { error: 'Invalid name, email, institution, or resource' }, 400);
  }

  const resourceUrl = getResourceUrl(pdfUrl);
  if (!resourceUrl) {
    return json(request, { error: 'Unsupported or missing resource' }, 400);
  }

  try {
    const recipientLimit = await env.EMAIL_RATE_LIMITER.limit({ key: `send-pdf:${await hashKey(`${email.toLowerCase()}:${resourceUrl}`)}` });
    if (!recipientLimit.success) return json(request, { error: 'Too many requests for this resource. Please try again shortly.' }, 429);
  } catch {
    return json(request, { error: 'Email rate limiting is unavailable' }, 503);
  }

  const details = [
    location ? `<p><strong>Location:</strong> ${escapeHtml(location)}</p>` : '',
    university ? `<p><strong>University:</strong> ${escapeHtml(university)}</p>` : '',
  ].join('');

  try {
    const result = await env.EMAIL_SERVICE.sendEmail({
      from: 'no-reply@rareminds.in',
      fromName: 'Rareminds',
      to: [email],
      subject: `${cleanSubjectValue(institution)}: your requested resource`,
      html: `<p>Hello ${escapeHtml(name)},</p><p>Thank you for your interest in ${escapeHtml(institution)}.</p>${details}<p><a href="${escapeHtml(resourceUrl)}">Open your requested resource</a></p><p>Regards,<br>Rareminds</p>`,
    });

    if (!result.success) {
      console.error('[send-pdf] Email worker rejected the request');
      return json(request, { error: 'Unable to send email right now' }, result.shouldRetry ? 503 : 502);
    }

    return json(request, { success: true });
  } catch {
    console.error('[send-pdf] Email worker request failed');
    return json(request, { error: 'Unable to send email right now' }, 502);
  }
}

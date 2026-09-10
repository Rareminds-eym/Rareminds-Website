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
  EMAIL_SERVICE?: {
    sendEmail(request: SendEmailRequest): Promise<SendEmailResponse>;
  };
  EMAIL_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
  EMAIL_OTP_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

type PagesContext = {
  request: Request;
  env: Env;
  params: { action?: string | string[] };
};

type NotificationType =
  | 'general-contact'
  | 'corporate-contact'
  | 'training-enquiry'
  | 'recruitment-enquiry'
  | 'event-enquiry'
  | 'teacher-service-enquiry'
  | 'academy-enquiry'
  | 'government-enquiry'
  | 'download-notification';

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

class HttpError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

const enforceRateLimit = async (limiter: Env['EMAIL_RATE_LIMITER'], key: string) => {
  if (!limiter) throw new HttpError('Email rate limiting is not configured', 503);
  try {
    const result = await limiter.limit({ key });
    if (!result.success) throw new HttpError('Too many requests. Please try again shortly.', 429);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError('Email rate limiting is unavailable', 503);
  }
};

const getAction = (action?: string | string[]) => Array.isArray(action) ? action[0] : action;
const hashRateLimitKey = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 32);
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string));

const getString = (record: Record<string, unknown>, key: string, maxLength: number, required = false) => {
  const value = record[key];
  if (value == null && !required) return '';
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    throw new HttpError(`${key} is invalid`, 400);
  }
  return value.trim();
};

const getEmail = (record: Record<string, unknown>) => {
  const email = getString(record, 'email', 254, true).toLowerCase();
  if (!isEmail(email)) throw new HttpError('email is invalid', 400);
  return email;
};

const cleanSubjectValue = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const formatSubmittedAt = (value: unknown) => {
  const date = typeof value === 'string' ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const row = (label: string, value: string, multiline = false) => value
  ? `<p><strong>${label}:</strong>${multiline ? '<br>' : ' '}${escapeHtml(value).replace(/\r?\n/g, '<br>')}</p>`
  : '';

const buildNotification = (type: NotificationType, record: Record<string, unknown>): SendEmailRequest => {
  const email = getEmail(record);
  const submittedAt = formatSubmittedAt(record.submitted_at ?? record.created_at);
  const common = {
    from: 'no-reply@rareminds.in',
    fromName: 'Rareminds',
    to: ['marketing@rareminds.in'],
    replyTo: email,
    metadata: { source: 'rareminds-website-bff', notificationType: type },
  };

  if (type === 'general-contact') {
    const name = getString(record, 'name', 100, true);
    const role = getString(record, 'role', 150);
    const phone = getString(record, 'phone', 50);
    const message = getString(record, 'message', 3000);
    return {
      ...common,
      subject: 'New Contact Form Submission',
      html: `<h3>New Contact Form Submission</h3>${row('Name', name)}${row('Email', email)}${row('Role', role || 'N/A')}${row('Phone', phone || 'N/A')}${row('Message', message || 'N/A', true)}`,
    };
  }

  if (type === 'corporate-contact') {
    const name = getString(record, 'fullName', 100, true);
    const jobTitle = getString(record, 'jobTitle', 150);
    const company = getString(record, 'company', 150);
    const phone = getString(record, 'phone', 50);
    const categories = getString(record, 'categories', 500);
    const message = getString(record, 'message', 3000);
    return {
      ...common,
      subject: 'New Contact Form Submission',
      html: `<h3>New Contact Form Submission</h3>${row('Name', name)}${row('Job Title', jobTitle)}${row('Company', company)}${row('Email', email)}${row('Phone', phone)}${row('Categories', categories)}${row('Message', message, true)}${row('Submitted at', submittedAt)}`,
    };
  }

  if (type === 'training-enquiry' || type === 'recruitment-enquiry') {
    const name = getString(record, 'name', 100, true);
    const company = getString(record, 'company', 150);
    const role = getString(record, 'role', 150);
    const message = getString(record, 'message', 3000);
    const isTraining = type === 'training-enquiry';
    return {
      ...common,
      subject: isTraining ? 'New Training Enquiry Submitted' : 'New Recruitment Enquiry Submitted',
      html: `<h3>New ${isTraining ? 'Training' : 'Recruitment'} Form Submission</h3>${row('Name', name)}${row('Email', email)}${row('Company', company)}${row('Role', role)}${row('Message', message, true)}${row('Submitted at', submittedAt)}`,
    };
  }

  if (type === 'event-enquiry') {
    const name = getString(record, 'name', 100, true);
    const eventTitle = getString(record, 'event_title', 200, true);
    const phone = getString(record, 'phone', 50);
    const organization = getString(record, 'organization', 200);
    return {
      ...common,
      subject: `New event enquiry: ${cleanSubjectValue(eventTitle)}`,
      html: `<h3>New Event Enquiry</h3>${row('Event', eventTitle)}${row('Name', name)}${row('Email', email)}${row('Phone', phone || 'N/A')}${row('Organization', organization || 'N/A')}${row('Submitted at', submittedAt)}`,
    };
  }

  if (type === 'teacher-service-enquiry') {
    const name = getString(record, 'name', 100, true);
    const schoolName = getString(record, 'schoolName', 200, true);
    const message = getString(record, 'message', 3000, true);
    return {
      ...common,
      subject: `New Teacher Development enquiry: ${cleanSubjectValue(schoolName)}`,
      html: `<h3>New Teacher Development Programme Enquiry</h3>${row('Name', name)}${row('Email', email)}${row('School', schoolName)}${row('Message', message, true)}${row('Submitted at', submittedAt)}`,
    };
  }

  if (type === 'academy-enquiry') {
    const name = getString(record, 'name', 100, true);
    const phone = getString(record, 'phone', 50, true);
    const course = getString(record, 'course_intrest', 200, true);
    const message = getString(record, 'message', 3000, true);
    return {
      ...common,
      subject: `New Academy course enquiry: ${cleanSubjectValue(course)}`,
      html: `<h3>New Academy Course Enquiry</h3>${row('Name', name)}${row('Email', email)}${row('Phone', phone)}${row('Course Interest', course)}${row('Message', message, true)}${row('Submitted at', submittedAt)}`,
    };
  }

  if (type === 'government-enquiry') {
    const name = getString(record, 'name', 100, true);
    const phone = getString(record, 'phone', 50, true);
    const address = getString(record, 'address', 500);
    const message = getString(record, 'message', 3000, true);
    return {
      ...common,
      subject: 'New Government Services Enquiry',
      html: `<h3>New Government Services Enquiry</h3>${row('Name', name)}${row('Email', email)}${row('Phone', phone)}${row('Address', address || 'N/A')}${row('Message', message, true)}${row('Submitted at', submittedAt)}`,
    };
  }

  const downloadType = getString(record, 'download_type', 150, true);
  const name = getString(record, 'name', 100, true);
  const phone = getString(record, 'phone', 50);
  const company = getString(record, 'company', 150);
  const role = getString(record, 'role', 150);
  const message = getString(record, 'message', 3000);
  return {
    ...common,
    subject: `New Download: ${cleanSubjectValue(downloadType)}`,
    html: `<h3>New PDF Download - ${escapeHtml(downloadType)}</h3>${row('Name', name)}${row('Email', email)}${row('Phone', phone)}${row('Company', company)}${row('Role', role)}${row('Message', message, true)}${row('Downloaded at', submittedAt)}`,
  };
};

const sendEmail = async (env: Env, request: SendEmailRequest) => {
  if (!env.EMAIL_SERVICE) throw new HttpError('Email service is not configured', 503);
  try {
    const result = await env.EMAIL_SERVICE.sendEmail(request);
    if (!result.success) throw new HttpError('Unable to send email right now', result.shouldRetry ? 503 : 502);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError('Unable to send email right now', 502);
  }
};

const getSupabaseConfig = (env: Env) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new HttpError('OTP service is not configured', 503);
  }
  return {
    url: env.SUPABASE_URL.replace(/\/$/, ''),
    key: env.SUPABASE_SERVICE_ROLE_KEY,
  };
};

const supabaseRequest = async (env: Env, path: string, init: RequestInit = {}) => {
  const { url, key } = getSupabaseConfig(env);
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  if (!response.ok) {
    console.error('[email-bff] Supabase request failed', response.status);
    throw new HttpError('OTP service is unavailable', 503);
  }
  return response;
};

const sendOtp = async (env: Env, email: string) => {
  const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
  const otp = (1000 + randomValue % 9000).toString();
  const expiresAt = new Date(Date.now() + 3 * 60 * 1000).toISOString();

  await sendEmail(env, {
    from: 'no-reply@rareminds.in',
    fromName: 'Rareminds',
    to: [email],
    subject: 'Your Email Verification Code',
    metadata: { source: 'rareminds-website-bff', purpose: 'email-verification' },
    html: `
        <!DOCTYPE html>
        <html><head><style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style></head><body><div class="container"><div class="header"><h1>Email Verification</h1></div><div class="content">
          <p>Hello,</p><p>You requested to verify your email address for event registration at Rareminds.</p>
          <p>Your One-Time Password (OTP) is:</p><div class="otp-box"><div class="otp-code">${otp}</div></div>
          <p><strong>This OTP will expire in 3 minutes.</strong></p><p>If you didn't request this verification, please ignore this email.</p>
          <div class="footer"><p>© ${new Date().getFullYear()} Rareminds. All rights reserved.</p></div>
        </div></div></body></html>`,
  });

  await supabaseRequest(env, 'rpc/store_email_otp', {
    method: 'POST',
    body: JSON.stringify({ p_email: email, p_otp: otp, p_expires_at: expiresAt }),
  });
};

const verifyOtp = async (env: Env, email: string, otp: string) => {
  const response = await supabaseRequest(env, 'rpc/consume_email_otp', {
    method: 'POST',
    body: JSON.stringify({ p_email: email, p_otp: otp }),
  });
  const proof = await response.json() as unknown;
  return typeof proof === 'string' && isUuid(proof) ? proof : null;
};

const readBody = async (request: Request) => {
  const text = await request.text();
  if (!text || text.length > 32_000) throw new HttpError('Invalid request body', 400);
  try {
    const body = JSON.parse(text) as unknown;
    if (!isRecord(body)) throw new Error('Not an object');
    return body;
  } catch {
    throw new HttpError('Invalid JSON body', 400);
  }
};

export async function onRequestOptions(context: PagesContext) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}

export async function onRequestPost(context: PagesContext) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');
  if (origin && !allowedOrigins.has(origin)) return json(request, { success: false, error: 'Origin not allowed' }, 403);

  try {
    const action = getAction(context.params.action);
    const clientIp = request.headers.get('CF-Connecting-IP') || 'local';
    await enforceRateLimit(env.EMAIL_RATE_LIMITER, `${clientIp}:${action || 'unknown'}`);
    const body = await readBody(request);

    if (action === 'notify') {
      const type = body.type;
      if (typeof type !== 'string' || ![
        'general-contact', 'corporate-contact', 'training-enquiry', 'recruitment-enquiry',
        'event-enquiry', 'teacher-service-enquiry', 'academy-enquiry', 'government-enquiry', 'download-notification',
      ].includes(type)) {
        throw new HttpError('Unsupported notification type', 400);
      }
      if (!isRecord(body.record)) throw new HttpError('record is required', 400);
      await sendEmail(env, buildNotification(type as NotificationType, body.record));
      return json(request, { success: true, message: 'Notification sent' });
    }

    const emailValue = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!emailValue || emailValue.length > 254 || !isEmail(emailValue)) throw new HttpError('A valid email is required', 400);

    if (action === 'send-otp' || action === 'verify-otp') {
      const recipientKey = await hashRateLimitKey(emailValue);
      await enforceRateLimit(env.EMAIL_OTP_RATE_LIMITER, `${action}:${recipientKey}`);
    }

    if (action === 'send-otp') {
      await sendOtp(env, emailValue);
      return json(request, { success: true, message: 'OTP sent successfully' });
    }

    if (action === 'verify-otp') {
      const otp = typeof body.otp === 'string' ? body.otp.trim() : '';
      if (!/^\d{4}$/.test(otp)) throw new HttpError('Please enter the 4-digit OTP', 400);
      const proof = await verifyOtp(env, emailValue, otp);
      if (!proof) return json(request, { success: false, error: 'Invalid or expired OTP' }, 400);
      return json(request, { success: true, message: 'Email verified successfully', verification_proof: proof });
    }

    return json(request, { success: false, error: 'Unsupported email action' }, 404);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof HttpError ? error.message : 'Internal server error';
    console.error('[email-bff] Request failed', status, error instanceof Error ? error.message : 'Unknown error');
    return json(request, { success: false, error: message, message }, status);
  }
}

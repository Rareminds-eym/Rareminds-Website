export type EmailNotificationType =
  | 'general-contact'
  | 'corporate-contact'
  | 'training-enquiry'
  | 'recruitment-enquiry'
  | 'event-enquiry'
  | 'teacher-service-enquiry'
  | 'academy-enquiry'
  | 'government-enquiry'
  | 'download-notification';

type EmailBffResponse = {
  success: boolean;
  message?: string;
  error?: string;
  verification_proof?: string;
};

async function postEmailAction(action: 'notify' | 'send-otp' | 'verify-otp', body: Record<string, unknown>) {
  const response = await fetch(`/api/email/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({})) as Partial<EmailBffResponse>;
  if (!response.ok || result.success !== true) {
    throw new Error(result.error || result.message || 'Email service is unavailable');
  }
  return result as EmailBffResponse;
}

export const sendEmailNotification = (type: EmailNotificationType, record: Record<string, unknown>) =>
  postEmailAction('notify', { type, record });

export const sendEmailOtp = (email: string) => postEmailAction('send-otp', { email });
export const verifyEmailOtp = async (email: string, otp: string) => {
  const result = await postEmailAction('verify-otp', { email, otp });
  if (!result.verification_proof) throw new Error('Email verification proof was not issued');
  return result.verification_proof;
};

export type EventRegistrationResult = {
  id: number;
  event_name: string;
  event_type: 'free' | 'paid';
  quantity: number;
  total_amount: number;
  payment_amount: number;
  payment_currency: string;
  payment_status: 'not_required' | 'pending';
  payment_token: string | null;
};

type RegistrationResponse = {
  success?: boolean;
  registration?: EventRegistrationResult;
  error?: string;
};

export async function createEventRegistration(input: {
  event_id: string;
  email: string;
  name: string;
  phone: string;
  organization: string;
  quantity: number;
  verification_proof: string;
}) {
  const response = await fetch('/api/event-registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const result = await response.json().catch(() => ({})) as RegistrationResponse;
  if (!response.ok || result.success !== true || !result.registration) {
    throw new Error(result.error || 'Unable to complete registration');
  }
  return result.registration;
}

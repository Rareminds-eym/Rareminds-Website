// Preserve the existing corporate WhatsApp destination; business ownership must
// be reconfirmed before release. Email matches FooterBar.tsx.
export const WHATSAPP_PHONE = '919902326951';
export const CONTACT_EMAIL = 'info@rareminds.in';
export const NAME_LIMIT = 100;
export const EMAIL_LIMIT = 254;
export interface ContactDetails { name: string; email: string }
export function validateContact(details: ContactDetails): Partial<ContactDetails> {
  const errors: Partial<ContactDetails> = {};
  if (!details.name.trim() || details.name.length > NAME_LIMIT) errors.name = 'Enter your name (up to 100 characters).';
  if (details.email.length > EMAIL_LIMIT || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errors.email = 'Enter a valid email address.';
  return errors;
}
export function whatsappUrl(details?: ContactDetails): string {
  const text = details ? `Hello, my name is ${details.name.trim()}. You can reach me at ${details.email.trim()}.` : 'Hello, I would like to discuss your corporate services.';
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
}

// ---------- EMAIL ----------
const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com",
  "yopmail.com", "trashmail.com", "sharklasers.com", "getnada.com",
  "throwawaymail.com", "temp-mail.org",
];

export const getEmailError = (input: string): string => {
  const email = input.trim().toLowerCase();
  if (!email) return "Email is required";
  if (email.length > 254) return "Email is too long";
  if (/\s/.test(email)) return "Email cannot contain spaces";

  const parts = email.split("@");
  if (parts.length !== 2) return "Enter a valid email like name@example.com";
  const [local, domain] = parts;

  if (local.length > 64) return "Email is too long before the @";
  if (!/^[a-z0-9]+(?:[._%+-][a-z0-9]+)*$/.test(local))
    return "Email contains invalid characters";
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(domain))
    return "Enter a valid email domain, e.g. gmail.com";
  if (DISPOSABLE_DOMAINS.includes(domain))
    return "Temporary email addresses are not allowed";
  return "";
};

// ---------- NAME ----------
const FAKE_NAMES = ["test", "xyz", "abc", "asdf", "qwerty", "name", "demo", "fake", "user", "admin", "na", "none"];
const NAME_MAX = 50;

export const getNameError = (input: string): string => {
  const name = input.trim().replace(/\s+/g, " ");
  const length = Array.from(name).length;
  if (length < 2) return "Enter a valid name";
  if (length > NAME_MAX) return `Name is too long (max ${NAME_MAX})`;
  if (!/^\p{L}+\.?(?:[ '’-]\p{L}+\.?)*$/u.test(name)) return "Enter a valid name";
  if ((name.match(/\p{L}/gu) ?? []).length < 2) return "Enter a valid name";
  // five or more consonants in a row ("dfyry") is keyboard mashing
  if (/[^aeiouáàâäãåéèêëíìîïóòôöõúùûü\s.'’-]{5,}/i.test(name)) return "Enter a valid name";
  if (/(\p{L})\1{2,}/iu.test(name)) return "Enter a valid name";
  if (FAKE_NAMES.includes(name.toLowerCase())) return "Enter a valid name";
  return "";
};

// ---------- PHONE (digits only, exactly 10) ----------
export const getPhoneError = (input: string): string => {
  const phone = input.trim();
  if (!/^\d{10}$/.test(phone)) return "Enter a valid mobile number";
  if (!/^[6-9]/.test(phone)) return "Enter a valid mobile number";
  if (/^(\d)\1{9}$/.test(phone)) return "Enter a valid mobile number";
  return "";
};

// ---------- MESSAGE (limit shown to the user; emoji and symbols allowed) ----------
export const MESSAGE_MAX = 1000;

export const getMessageError = (input: string): string => {
  const length = Array.from(input.trim()).length;
  if (length === 0) return "This field is required";
  if (length > MESSAGE_MAX) return `Message is too long (max ${MESSAGE_MAX})`;
  return "";
};

// ---------- ONE CALL FOR A WHOLE FORM ----------
export type FieldKey = "name" | "email" | "phone" | "role" | "message";
export type FieldErrors = Partial<Record<FieldKey, string>>;

const CHECKS: Record<FieldKey, (value: string) => string> = {
  name: getNameError,
  email: getEmailError,
  phone: getPhoneError,
  role: () => "",
  message: getMessageError,
};

export const validateFields = (
  values: Partial<Record<FieldKey, string>>,
  optional: FieldKey[] = [],
): FieldErrors => {
  const errors: FieldErrors = {};
  (Object.keys(values) as FieldKey[]).forEach((key) => {
    const value = values[key] ?? "";
    if (value.trim() === "") {
      if (!optional.includes(key)) errors[key] = "This field is required";
      return;
    }
    const message = CHECKS[key](value);
    if (message) errors[key] = message;
  });
  return errors;
};

// ---------- true/false versions (keep older code working) ----------
export const isValidEmail = (v: string) => getEmailError(v) === "";
export const isValidName = (v: string) => getNameError(v) === "";
export const isValidPhone = (v: string) => getPhoneError(v) === "";
export const isValidMessage = (v: string) => getMessageError(v) === "";
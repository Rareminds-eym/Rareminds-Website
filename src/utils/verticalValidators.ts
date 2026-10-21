// src/utils/verticalValidators.ts
// NEW file used only by the 4 vertical forms. Your existing validators.ts is NOT changed:
// it is imported here and its rules are reused, so the Contact page behaves exactly as before.
import { getEmailError, getNameError, getPhoneError, MESSAGE_MAX } from "./validators";

// ---------- EMAIL (your rules + typo hint) ----------
const TYPO_DOMAINS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com",
  "gmail.co": "gmail.com", "gmail.con": "gmail.com", "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com", "hotmial.com": "hotmail.com", "outlok.com": "outlook.com",
};

const getVerticalEmailError = (input: string): string => {
  const base = getEmailError(input);
  if (base) return base;
  const [local, domain] = input.trim().toLowerCase().split("@");
  return TYPO_DOMAINS[domain] ? `Did you mean ${local}@${TYPO_DOMAINS[domain]}?` : "";
};

// ---------- NAME (your rules, but says WHAT is wrong) ----------
const getVerticalNameError = (input: string): string => {
  if (!getNameError(input)) return "";
  const name = input.trim().replace(/\s+/g, " ");
  const length = Array.from(name).length;
  if (length < 2) return "Name must be at least 2 characters";
  if (length > 50) return "Name is too long (max 50 characters)";
  if (!/^\p{L}+\.?(?:[ '’-]\p{L}+\.?)*$/u.test(name))
    return "Name can only contain letters, spaces, and . ' -";
  if (/(\p{L})\1{2,}/iu.test(name)) return "Name has too many repeated letters";
  if (/[^aeiouáàâäãåéèêëíìîïóòôöõúùûü\s.'’-]{5,}/i.test(name))
    return "This doesn't look like a real name. Enter your full name";
  return "Enter your real name";
};

// ---------- PHONE ----------
/** Use on every keystroke: strips spaces, +91, a leading 0 and anything that isn't a digit */
export const normalizePhone = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
};

const getVerticalPhoneError = (input: string): string => {
  const phone = input.trim();
  if (getPhoneError(phone)) {
    if (!/^\d+$/.test(phone)) return "Phone number can contain digits only";
    if (phone.length < 10) return `Phone number must be 10 digits (you entered ${phone.length})`;
    if (phone.length > 10) return "Phone number must be exactly 10 digits";
    if (!/^[6-9]/.test(phone)) return "Mobile number must start with 6, 7, 8 or 9";
    return "Enter a real mobile number";
  }
  // extra checks for these forms: 9898989898 and 9876543210 are not real numbers
  if (new Set(phone).size <= 2) return "Enter a real mobile number";
  const steps = [...phone].slice(1).map((d, i) => (Number(d) - Number(phone[i]) + 10) % 10);
  if (steps.every((s) => s === 1) || steps.every((s) => s === 9)) return "Enter a real mobile number";
  return "";
};

// ---------- GENERIC TEXT FIELDS (company, university, course, job title, address) ----------
const JUNK_TEXT = [
  "test", "testing", "abc", "abcd", "xyz", "asdf", "asdfgh", "qwerty", "na", "n/a",
  "none", "null", "nil", "undefined", "demo", "fake", "sample", "random", "aaa", "123",
];
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const makeTextCheck = (label: string, min: number, max: number) => (input: string): string => {
  const value = input.trim().replace(/\s+/g, " ");
  const length = Array.from(value).length;
  if (length < min) return `${capitalize(label)} must be at least ${min} characters`;
  if (length > max) return `${capitalize(label)} is too long (max ${max} characters)`;
  if (!/\p{L}/u.test(value))
    return `${capitalize(label)} must contain letters, not only numbers or symbols`;
  if (!/^[\p{L}\p{N}][\p{L}\p{N} .,&'’()#\/-]*$/u.test(value))
    return `${capitalize(label)} contains characters that aren't allowed`;
  if (/(.)\1{3,}/u.test(value)) return `Enter a valid ${label}`;
  if (JUNK_TEXT.includes(value.toLowerCase())) return `Enter a real ${label}`;
  return "";
};

const getCompanyError = makeTextCheck("company name", 2, 100);
const getUniversityError = makeTextCheck("university name", 3, 120);
const getCourseError = makeTextCheck("course name", 2, 80);
const getJobRoleError = makeTextCheck("job title", 2, 80);
const getAddressError = makeTextCheck("address", 8, 200);

// ---------- MESSAGE (optional; if typed, it must be real) ----------
const MESSAGE_MIN = 10;
const getOptionalMessageError = (input: string): string => {
  const value = input.trim();
  const length = Array.from(value).length;
  if (length === 0) return "";
  if (length < MESSAGE_MIN) return `Message must be at least ${MESSAGE_MIN} characters, or leave it empty`;
  if (length > MESSAGE_MAX) return `Message is too long (max ${MESSAGE_MAX} characters)`;
  if (/(.)\1{9,}/u.test(value)) return "Message looks like repeated characters. Write a proper message";
  return "";
};

// ---------- ONE CALL FOR A WHOLE VERTICAL FORM ----------
export type FieldKey =
  | "name" | "email" | "phone" | "company" | "university"
  | "course" | "jobRole" | "address" | "optionalMessage";
export type FieldErrors = Partial<Record<FieldKey, string>>;

const CHECKS: Record<FieldKey, (value: string) => string> = {
  name: getVerticalNameError,
  email: getVerticalEmailError,
  phone: getVerticalPhoneError,
  company: getCompanyError,
  university: getUniversityError,
  course: getCourseError,
  jobRole: getJobRoleError,
  address: getAddressError,
  optionalMessage: getOptionalMessageError,
};

// What the person sees when a required box is left empty
const REQUIRED_MESSAGES: Record<FieldKey, string> = {
  name: "Enter your name",
  email: "Enter your email address",
  phone: "Enter your phone number",
  company: "Enter your company name",
  university: "Enter your university name",
  course: "Enter the course name",
  jobRole: "Enter the job title you want to hire for",
  address: "Enter your address",
  optionalMessage: "",
};

export const validateFields = (
  values: Partial<Record<FieldKey, string>>,
  optional: FieldKey[] = [],
): FieldErrors => {
  const errors: FieldErrors = {};
  (Object.keys(values) as FieldKey[]).forEach((key) => {
    const value = values[key] ?? "";
    if (value.trim() === "") {
      if (!optional.includes(key)) errors[key] = REQUIRED_MESSAGES[key];
      return;
    }
    const message = CHECKS[key](value);
    if (message) errors[key] = message;
  });
  return errors;
};

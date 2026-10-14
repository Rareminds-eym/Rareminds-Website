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
  // letters/numbers, with single . _ % + - between them (no leading, trailing or double symbols)
  if (!/^[a-z0-9]+(?:[._%+-][a-z0-9]+)*$/.test(local))
    return "Email contains invalid characters";
  // domain like gmail.com or mail.company.co.in
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(domain))
    return "Enter a valid email domain, e.g. gmail.com";
  if (DISPOSABLE_DOMAINS.includes(domain))
    return "Temporary email addresses are not allowed";
  return "";
};

// ---------- NAME ----------
const FAKE_NAMES = ["test", "xyz", "abc", "asdf", "qwerty", "name", "demo", "fake", "user", "admin", "na", "none"];

export const getNameError = (input: string): string => {
  const name = input.trim().replace(/\s+/g, " ");
  if (!name) return "Name is required";
  if (name.length < 2 || name.length > 50) return "Name must be 2 to 50 characters";
  // letters only; allows "R. Kumar", "Mary-Anne", "O'Neil"
  if (!/^[A-Za-z]+\.?(?:[ '-][A-Za-z]+\.?)*$/.test(name))
    return "Name can contain only letters, spaces, . ' -";
  if (name.replace(/[^A-Za-z]/g, "").length < 2) return "Enter your full name";
  if (/(.)\1{2,}/i.test(name)) return "Please enter your real name";
  if (FAKE_NAMES.includes(name.toLowerCase())) return "Please enter your real name";
  return "";
};

// ---------- PHONE (India) ----------
export const getPhoneError = (input: string): string => {
  let p = input.replace(/[\s-]/g, "");
  if (!p) return "Phone number is required";

  if (p.startsWith("+91")) p = p.slice(3);
  else if (p.length === 12 && p.startsWith("91")) p = p.slice(2);
  else if (p.length === 11 && p.startsWith("0")) p = p.slice(1);

  if (!/^\d+$/.test(p)) return "Phone number can contain only digits";
  if (p.length !== 10) return "Enter a 10-digit mobile number";
  if (!/^[6-9]/.test(p)) return "Mobile number must start with 6, 7, 8 or 9";
  if (new Set(p).size < 4) return "Enter a valid mobile number";
  if ("01234567890".includes(p.slice(0, 6)) || "09876543210".includes(p.slice(0, 6)))
    return "Enter a valid mobile number";
  return "";
};

// ---------- MESSAGE ----------
export const getMessageError = (input: string): string => {
  const msg = input.trim();
  if (!msg) return "Message is required";
  if (msg.length < 10) return "Message must be at least 10 characters";
  if (msg.length > 1000) return "Message must be under 1000 characters";
  if (/[<>]/.test(msg)) return "Message cannot contain < or >";
  if (!/[A-Za-z]{3,}/.test(msg)) return "Please write a proper message";
  if (/(.)\1{5,}/.test(msg)) return "Please write a proper message";
  return "";
};

// ---------- Simple true/false versions (keep your old code working) ----------
export const isValidEmail = (v: string) => getEmailError(v) === "";
export const isValidName = (v: string) => getNameError(v) === "";
export const isValidPhone = (v: string) => getPhoneError(v) === "";
export const isValidMessage = (v: string) => getMessageError(v) === "";
// src/utils/verticalValidators.ts
// Used by the vertical forms (corporate, training, institutions, government, academia).
// Your existing validators.ts is NOT changed: its rules are imported and reused.
import {
	getEmailError,
	getNameError,
	getPhoneError,
	MESSAGE_MAX,
} from "./validators";

// ---------- WORDS THAT ARE NEVER REAL ENTRIES ----------
const JUNK_TEXT = [
	"test",
	"testing",
	"abc",
	"abcd",
	"abcde",
	"xyz",
	"asd",
	"asdf",
	"asdfgh",
	"asdasd",
	"qwerty",
	"na",
	"n/a",
	"none",
	"null",
	"nil",
	"undefined",
	"demo",
	"fake",
	"sample",
	"random",
	"dummy",
	"aaa",
	"123",
];

// ---------- HELPERS: spotting keyboard-mashing like "asdfg" or "jwdh" ----------
const VOWEL = /[aeiouyáàâäãåéèêëíìîïóòôöõúùûü]/i; // y counts as a vowel (Lynn, Myra)
const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const splitWords = (text: string): string[] =>
	text.split(/[^\p{L}]+/u).filter(Boolean);

/** true if the word has `run` letters in a row that sit next to each other on the keyboard */
const hasKeyboardRun = (word: string, run: number): boolean => {
	const w = word.toLowerCase();
	return KEYBOARD_ROWS.some((row) => {
		const reversed = [...row].reverse().join("");
		for (let i = 0; i + run <= w.length; i++) {
			const part = w.slice(i, i + run);
			if (row.includes(part) || reversed.includes(part)) return true;
		}
		return false;
	});
};

type GibberishOptions = {
	maxConsonants: number; // this many consonants in a row = gibberish
	checkVowels?: boolean; // a word of 4+ letters with no vowel = gibberish
	allowAcronyms?: boolean; // ALL-CAPS words like HDFC or IBM are allowed
};

const isGibberishWord = (word: string, o: GibberishOptions): boolean => {
	// short words and non-English scripts (Hindi, Kannada...) are not checked
	if (word.length < 3 || !/^[a-zà-ÿ]+$/i.test(word)) return false;
	if (hasKeyboardRun(word, 4)) return true;
	if ((o.allowAcronyms ?? true) && word === word.toUpperCase()) return false;
	if ((o.checkVowels ?? true) && word.length >= 4 && !VOWEL.test(word))
		return true;
	return new RegExp(
		`[^aeiouyáàâäãåéèêëíìîïóòôöõúùûü]{${o.maxConsonants},}`,
		"i",
	).test(word);
};

const looksGibberish = (text: string, o: GibberishOptions): boolean =>
	splitWords(text).some((w) => isGibberishWord(w, o));

// ---------- EMAIL ----------
const TYPO_DOMAINS: Record<string, string> = {
	"gmial.com": "gmail.com",
	"gmai.com": "gmail.com",
	"gamil.com": "gmail.com",
	"gmail.co": "gmail.com",
	"gmail.con": "gmail.com",
	"yaho.com": "yahoo.com",
	"yahooo.com": "yahoo.com",
	"hotmial.com": "hotmail.com",
	"outlok.com": "outlook.com",
};

const DISPOSABLE_DOMAINS = [
	"mailinator.com",
	"tempmail.com",
	"temp-mail.org",
	"10minutemail.com",
	"guerrillamail.com",
	"yopmail.com",
	"trashmail.com",
	"sharklasers.com",
	"getnada.com",
	"dispostable.com",
	"maildrop.cc",
	"throwawaymail.com",
	"fakeinbox.com",
	"mintemail.com",
	"mohmal.com",
];

const getVerticalEmailError = (input: string): string => {
	const base = getEmailError(input);
	if (base) return base;
	const [local, domain] = input.trim().toLowerCase().split("@");
	if (TYPO_DOMAINS[domain])
		return `Did you mean ${local}@${TYPO_DOMAINS[domain]}?`;
	if (DISPOSABLE_DOMAINS.includes(domain))
		return "Temporary email addresses aren't accepted. Use your real email";
	const letters = local.replace(/[^a-z]/g, "");
	if (
		/(.)\1{3,}/.test(local) ||
		JUNK_TEXT.includes(letters) ||
		hasKeyboardRun(letters, 5)
	)
		return "Enter your real email address";
	return "";
};

// ---------- NAME ----------
const getVerticalNameError = (input: string): string => {
	const name = input.trim().replace(/\s+/g, " ");
	const length = Array.from(name).length;
	if (length < 2) return "Name must be at least 2 characters";
	if (length > 50) return "Name is too long (max 50 characters)";
	if (!/^\p{L}+\.?(?:[ '’-]\p{L}+\.?)*$/u.test(name))
		return "Name can only contain letters, spaces, and . ' -";
	if (/(\p{L})\1{2,}/iu.test(name)) return "Name has too many repeated letters";
	if (looksGibberish(name, { maxConsonants: 5, allowAcronyms: false }))
		return "This doesn't look like a real name. Enter your full name";
	if (getNameError(name)) return "Enter your real name"; // your original rules still apply
	return "";
};

// ---------- PHONE ----------
/** Use on every keystroke: strips spaces, +91, a leading 0 and anything that isn't a digit */
export const normalizePhone = (raw: string): string => {
	let digits = raw.replace(/\D/g, "");
	if (digits.length >= 12 && digits.startsWith("91")) digits = digits.slice(2);
	else if (digits.length === 11 && digits.startsWith("0"))
		digits = digits.slice(1);
	return digits.slice(0, 10);
};

const getVerticalPhoneError = (input: string): string => {
	const phone = input.trim();
	if (getPhoneError(phone)) {
		if (!/^\d+$/.test(phone)) return "Phone number can contain digits only";
		if (phone.length < 10)
			return `Phone number must be 10 digits (you entered ${phone.length})`;
		if (phone.length > 10) return "Phone number must be exactly 10 digits";
		if (!/^[6-9]/.test(phone))
			return "Mobile number must start with 6, 7, 8 or 9";
		return "Enter a real mobile number";
	}
	// fake patterns: 9898989898, 9876543210, 9999912345, 9876598765
	if (new Set(phone).size <= 2) return "Enter a real mobile number";
	const steps = [...phone]
		.slice(1)
		.map((d, i) => (Number(d) - Number(phone[i]) + 10) % 10);
	if (steps.every((s) => s === 1) || steps.every((s) => s === 9))
		return "Enter a real mobile number";
	const mostRepeated = Math.max(
		...[...new Set(phone)].map((d) => phone.split(d).length - 1),
	);
	if (mostRepeated >= 7) return "Enter a real mobile number";
	if (phone.slice(0, 5) === phone.slice(5)) return "Enter a real mobile number";
	return "";
};

// ---------- GENERIC TEXT FIELDS (company, university, course, job title, address) ----------
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const makeTextCheck =
	(label: string, min: number, max: number, checkVowels = true) =>
	(input: string): string => {
		const value = input.trim().replace(/\s+/g, " ");
		const length = Array.from(value).length;
		if (length < min)
			return `${capitalize(label)} must be at least ${min} characters`;
		if (length > max)
			return `${capitalize(label)} is too long (max ${max} characters)`;
		if (!/\p{L}/u.test(value))
			return `${capitalize(label)} must contain letters, not only numbers or symbols`;
		if (!/^[\p{L}\p{N}][\p{L}\p{N} .,&'’()#/-]*$/u.test(value))
			return `${capitalize(label)} contains characters that aren't allowed`;
		if (/(.)\1{3,}/u.test(value) || /(\p{L})\1{2,}/iu.test(value))
			return `Enter a valid ${label}`;
		const words = value
			.toLowerCase()
			.split(/[^a-z0-9/]+/)
			.filter(Boolean);
		if (words.length > 0 && words.every((w) => JUNK_TEXT.includes(w)))
			return `Enter a real ${label}`;
		if (looksGibberish(value, { maxConsonants: 6, checkVowels }))
			return `This doesn't look like a real ${label}. Use capital letters for abbreviations like HDFC`;
		return "";
	};

const getCompanyError = makeTextCheck("company name", 2, 100);
const getUniversityError = makeTextCheck("university name", 3, 120);
const getCourseError = makeTextCheck("course name", 2, 80);
const getJobRoleError = makeTextCheck("job title", 2, 80);

const checkAddressText = makeTextCheck("address", 8, 200, false); // "Bldg", "Apt" are fine
const getAddressError = (input: string): string => {
	const base = checkAddressText(input);
	if (base) return base;
	if (input.trim().split(/\s+/).length < 2)
		return "Enter your full address (house number, street, city)";
	return "";
};

// ---------- MESSAGE (optional; if typed, it must be real) ----------
const MESSAGE_MIN = 10;
const getOptionalMessageError = (input: string): string => {
	const value = input.trim();
	const length = Array.from(value).length;
	if (length === 0) return "";
	if (length < MESSAGE_MIN)
		return `Message must be at least ${MESSAGE_MIN} characters, or leave it empty`;
	if (length > MESSAGE_MAX)
		return `Message is too long (max ${MESSAGE_MAX} characters)`;
	if (!/\p{L}/u.test(value))
		return "Message must contain words, not only numbers or symbols";
	if (/(.)\1{9,}/u.test(value))
		return "Message looks like repeated characters. Write a proper message";
	const words = splitWords(value);
	const bad = words.filter((w) =>
		isGibberishWord(w, { maxConsonants: 6 }),
	).length;
	if (bad > 0 && bad * 2 >= words.length)
		return "This message doesn't look real. Write a proper message";
	return "";
};

// ---------- ONE CALL FOR A WHOLE VERTICAL FORM ----------
export type FieldKey =
	| "name"
	| "email"
	| "phone"
	| "company"
	| "university"
	| "course"
	| "jobRole"
	| "address"
	| "optionalMessage";
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
	jobRole: "Enter the job title",
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

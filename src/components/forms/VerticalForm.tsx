// src/components/forms/VerticalForm.tsx
// One component for Corporate, Institutions, Government and Academia.
// Styling uses plain Tailwind-style classes: swap the class strings (or pass `className`)
// so it matches each page's existing look.
import { checkDuplicate, duplicateFieldErrors } from "@/utils/duplicateCheck";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { sendEmailNotification, type EmailNotificationType } from "@/services/emailBff";
import { supabase } from "@/lib/supabaseClient";
import { MESSAGE_MAX } from "@/utils/validators";
import { normalizePhone, validateFields, type FieldErrors, type FieldKey } from "@/utils/verticalValidators";
import { useEmailOtp } from "@/hooks/useEmailOtp";
import { usePhoneOtp } from "@/hooks/usePhoneOtp";
import type { FieldConfig, VerticalFormConfig } from "./verticalForms.config";

export type SubmitPayload = {
  vertical: string;
  table: string;
  notificationType: EmailNotificationType;
  values: Record<string, string>;
  otpProof: string;
  elapsedMs: number;
};
export type SubmitResult = { fieldErrors?: FieldErrors } | void;

   const buildRow = (table: string, v: Record<string, string>, message: string) => {
     switch (table) {
       case "recruitment_forms":
       case "training_forms":
         return { table, data: { name: v.name, company: v.company, email: v.email, role: v.jobRole, message } };
       case "demo_requests":
         return { table, data: { name: v.name, university: v.university, email: v.email, course: v.course, message } };
       case "government_form":
         return { table, data: { name: v.name, email: v.email, phone: v.phone, address: v.address, message } };
       default:
         return { table: "acdemia_form", data: { name: v.name, email: v.email, phone: v.phone, course_intrest: v.course, message } };
     }
   };

   /** Was this email/phone already submitted in this form's table? */
      async function alreadySubmitted(table: string, column: "email" | "phone", value: string) {
     const result = await checkDuplicate(table, column === "email" ? { email: value } : { phone: value });
     return column === "email" ? result.email : result.phone;
   }

/** Default submit: saves the enquiry, then sends the notification email */
   export async function submitViaEmailService(payload: SubmitPayload): Promise<SubmitResult> {
     const { optionalMessage, ...rest } = payload.values;
     const message = optionalMessage ?? "";

     const row = buildRow(payload.table, rest, message);
     const { error } = await supabase.from(row.table).insert([row.data]);
     if (error) {
       const dup = duplicateFieldErrors(error);
       if (dup) return { fieldErrors: dup };
       console.error("Insert failed:", error);
       throw new Error("We couldn't save your request");
     }

     // saved already, so an email problem must not show the person an error
     try {
       await sendEmailNotification(payload.notificationType, {
         ...rest,
         message,
         vertical: payload.vertical,
         verification_proof: payload.otpProof,
       });
     } catch (emailError) {
       console.error("Email notification failed:", emailError);
     }
   }

const inputBase =
  "w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 disabled:opacity-60";

type Props = {
  config: VerticalFormConfig;
  onSubmit?: (payload: SubmitPayload) => Promise<SubmitResult>;
  className?: string;
  /** false when the page already shows its own heading above the form */
  showTitle?: boolean;
  /** optional style overrides so the form matches each page */
  inputClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  /** extra buttons or links shown next to the submit button */
  actions?: ReactNode;
  actionsClassName?: string;
};

export default function VerticalForm({
  config,
  onSubmit = submitViaEmailService,
  className = "",
  showTitle = true,
  inputClassName,
  labelClassName = "mb-1 block font-medium",
  buttonClassName = "mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-60",
  actions,
  actionsClassName = "",
}: Props) {
  const keys = config.fields.map((f) => f.key);
  const optional = useMemo(
    () => config.fields.filter((f) => f.required === false).map((f) => f.key),
    [config],
  );

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(keys.map((k) => [k, ""])),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [code, setCode] = useState("");

  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const otp = useEmailOtp();
  const phoneOtp = usePhoneOtp();
  const [phoneCode, setPhoneCode] = useState("");
  const [checking, setChecking] = useState(false);
  const base = inputClassName ?? inputBase;

  const errors = useMemo(
    () => validateFields(values as Partial<Record<FieldKey, string>>, optional),
    [values, optional],
  );
  const verified = otp.isVerifiedFor(values.email ?? "");
  const needsPhone = !!config.verifyPhone && keys.includes("phone");
  const phoneVerified = !needsPhone || phoneOtp.isVerifiedFor(values.phone ?? "");
  const busy = status === "submitting";

  const focusField = (key: string) =>
    formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();

  // The message shown directly under a box (empty string = no error)
  const errorFor = (key: FieldKey): string => {
    if (!touched[key] && !submitted) return "";
    if (key === "email") {
      return (
        serverErrors.email ||
        errors.email ||
        (submitted && !verified ? "Verify your email with the code we send you" : "")
      );
    }
    if (key === "phone" && needsPhone) {
      return (
        serverErrors.phone ||
        errors.phone ||
        (submitted && !phoneVerified ? "Verify your phone number with the code we send you" : "")
      );
    }
    return serverErrors[key] || errors[key] || "";
  };

  const handleChange = (key: FieldKey, raw: string) => {
    const next = key === "phone" ? normalizePhone(raw) : raw;
    setValues((v) => ({ ...v, [key]: next }));
    if (serverErrors[key]) setServerErrors(({ [key]: _removed, ...rest }) => rest);
    // changing the email after a code was sent/verified starts verification again
    if (key === "email" && otp.status !== "idle" && next.trim().toLowerCase() !== otp.email) {
      otp.reset();
      setCode("");
    }
    // changing the phone number after a code was sent/verified starts verification again
    if (key === "phone" && phoneOtp.status !== "idle" && next !== phoneOtp.phone) {
      phoneOtp.reset();
      setPhoneCode("");
    }
  };

  const handleBlur = (key: FieldKey) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setValues((v) => ({ ...v, [key]: (v[key] ?? "").trim().replace(/[ \t]+/g, " ") }));
  };

   const handleSendCode = async () => {
    setTouched((t) => ({ ...t, email: true }));
    if (errors.email) {
      focusField("email");
      return;
    }
    setServerErrors(({ email: _e, ...rest }) => rest);
    setChecking(true);
    try {
      // 1) Check FIRST: has this email already submitted?
         if (await alreadySubmitted(config.table, "email", values.email)) {
        setServerErrors((s) => ({
          ...s,
          email: "You have already submitted your details with this email.",
        }));
        return; // stop here, no code is sent
      }
      // 2) Only if it is new, send the code
      otp.sendCode(values.email);
    } catch (err) {
      console.error("Email duplicate check failed:", err);
      setServerErrors((s) => ({ ...s, email: "We couldn't check your email. Please try again." }));
    } finally {
      setChecking(false);
    }
  };

  const handleSendPhoneCode = async () => {
    setTouched((t) => ({ ...t, phone: true }));
    if (errors.phone) {
      focusField("phone");
      return;
    }
    setServerErrors(({ phone: _p, ...rest }) => rest);
    setChecking(true);
    try {
         if (await alreadySubmitted(config.table, "phone", values.phone)) {
        setServerErrors((s) => ({
          ...s,
          phone: "You have already submitted your details with this phone number.",
        }));
        return;
      }
      phoneOtp.sendCode(values.phone);
    } catch (err) {
      console.error("Phone duplicate check failed:", err);
      setServerErrors((s) => ({ ...s, phone: "We couldn't check your phone number. Please try again." }));
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (otp.status === "verifying" || phoneOtp.status === "verifying") {
      setFormError("Verification in progress. Please wait.");
      return;
    }
    setSubmitted(true);
    setFormError("");

    const firstBad =
      keys.find((k) => errors[k]) ??
      (!verified ? "email" : !phoneVerified ? "phone" : undefined);
    if (firstBad) {
      focusField(firstBad);
      return;
    }
    if (honeypot) {
      setStatus("done"); // bots get a fake success and nothing is sent
      return;
    }

    setStatus("submitting");
    try {
      const cleaned: Record<string, string> = Object.fromEntries(
        keys.map((k) => [k, (values[k] ?? "").trim().replace(/[ \t]+/g, " ")]),
      );
      cleaned.email = cleaned.email.toLowerCase();
      const result = await onSubmit({
        vertical: config.vertical,
        table: config.table,
        notificationType: config.notificationType,
        values: cleaned,
        otpProof: otp.proof ?? "",
        elapsedMs: Date.now() - startedAt.current,
      });
      if (result?.fieldErrors && Object.keys(result.fieldErrors).length) {
        setServerErrors(result.fieldErrors);
        setStatus("idle");
        const first = keys.find((k) => result.fieldErrors?.[k]);
        if (first) focusField(first);
        return;
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      if (err instanceof Error && /verif|proof|otp/i.test(err.message)) {
        // proof expired or rejected by the server: ask for the code again
        otp.reset();
        setCode("");
        setServerErrors({ email: "Email verification expired. Verify your email again." });
        focusField("email");
        return;
      }
      setFormError("We couldn't submit your request. Check your connection and try again.");
    }
  };

  if (status === "done") {
    return (
      <div className={className} role="status">
        {showTitle && <h2 className="text-2xl font-bold">{config.title}</h2>}
        <p className="mt-4 text-lg">{config.successMessage}</p>
      </div>
    );
  }

  const renderControl = (f: FieldConfig, id: string, error: string) => {
    const shared = {
      id,
      name: f.key,
      value: values[f.key] ?? "",
      placeholder: f.placeholder,
      autoComplete: f.autoComplete,
      disabled: busy,
      "aria-invalid": !!error,
      "aria-describedby": error ? `${id}-error` : undefined,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(f.key, e.target.value),
      onBlur: () => handleBlur(f.key),
      className: `${base} ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`,
    };
    if (f.type === "textarea") return <textarea rows={4} {...shared} />;
    if (f.key === "phone") {
      return (
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-600">
            +91
          </span>
          <input type="tel" inputMode="numeric" {...shared} className={`${shared.className} rounded-l-none`} />
        </div>
      );
    }
    return <input type={f.type ?? "text"} {...shared} />;
  };

  const renderOtp = () => {
    if (verified) return <p className="mt-2 text-sm text-green-700">✓ Email verified</p>;
    const codeId = `${config.vertical}-otp`;
    const waitingForCode = otp.status === "sent" || otp.status === "verifying";
    return (
      <div className="mt-2">
        {!waitingForCode ? (
          <button
            type="button"
            onClick={handleSendCode}
            disabled={otp.status === "sending" || busy || checking}
            className="rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {checking ? "Checking…" : otp.status === "sending" ? "Sending code…" : "Send verification code"}
          </button>
        ) : (
          <div>
            <label htmlFor={codeId} className="mb-1 block text-sm">
              Enter the {otp.codeLength}-digit code sent to {otp.email}
            </label>
            <div className="flex gap-2">
              <input
                id={codeId}
                name="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, otp.codeLength))}
                aria-invalid={!!otp.error}
                aria-describedby={otp.error ? `${codeId}-error` : undefined}
                className={`${base} max-w-[12rem] tracking-widest ${otp.error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}
              />
              <button
                type="button"
                onClick={() => otp.verifyCode(code)}
                disabled={code.length !== otp.codeLength || otp.status === "verifying"}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {otp.status === "verifying" ? "Verifying…" : "Verify"}
              </button>
            </div>
          </div>
        )}
        {otp.error && (
          <p id={`${codeId}-error`} role="alert" className="mt-1 text-sm text-red-600">
            {otp.error}
          </p>
        )}
        {waitingForCode && (
          <button
            type="button"
            onClick={() => otp.sendCode(values.email)}
            disabled={otp.cooldown > 0}
            className="mt-1 text-sm underline disabled:no-underline disabled:opacity-60"
          >
            {otp.cooldown > 0 ? `Resend code in ${otp.cooldown}s` : "Resend code"}
          </button>
        )}
      </div>
    );
  };

  const renderPhoneOtp = () => {
    if (phoneVerified) return <p className="mt-2 text-sm text-green-700">✓ Phone verified</p>;
    const codeId = `${config.vertical}-phone-otp`;
    const waitingForCode = phoneOtp.status === "sent" || phoneOtp.status === "verifying";
    return (
      <div className="mt-2">
        {!waitingForCode ? (
          <button
            type="button"
            onClick={handleSendPhoneCode}
            disabled={phoneOtp.status === "sending" || busy || checking}
            className="rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {checking ? "Checking…" : phoneOtp.status === "sending" ? "Sending code…" : "Send code by SMS"}
          </button>
        ) : (
          <div>
            <label htmlFor={codeId} className="mb-1 block text-sm">
              Enter the code sent to +91 {phoneOtp.phone}
            </label>
            <div className="flex gap-2">
              <input
                id={codeId}
                name="phoneOtp"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={phoneCode}
                onChange={(e) =>
                  setPhoneCode(e.target.value.replace(/\D/g, "").slice(0, phoneOtp.maxCodeLength))
                }
                aria-invalid={!!phoneOtp.error}
                aria-describedby={phoneOtp.error ? `${codeId}-error` : undefined}
                className={`${base} max-w-[12rem] tracking-widest ${phoneOtp.error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}
              />
              <button
                type="button"
                onClick={() => phoneOtp.verifyCode(phoneCode)}
                disabled={phoneCode.length < phoneOtp.minCodeLength || phoneOtp.status === "verifying"}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {phoneOtp.status === "verifying" ? "Verifying…" : "Verify"}
              </button>
            </div>
          </div>
        )}
        {phoneOtp.error && (
          <p id={`${codeId}-error`} role="alert" className="mt-1 text-sm text-red-600">
            {phoneOtp.error}
          </p>
        )}
        {waitingForCode && (
          <button
            type="button"
            onClick={() => phoneOtp.sendCode(values.phone)}
            disabled={phoneOtp.cooldown > 0}
            className="mt-1 text-sm underline disabled:no-underline disabled:opacity-60"
          >
            {phoneOtp.cooldown > 0 ? `Resend code in ${phoneOtp.cooldown}s` : "Resend code"}
          </button>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={className}>
      {showTitle && <h2 className="mb-6 text-2xl font-bold">{config.title}</h2>}

      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((f) => {
          const id = `${config.vertical}-${f.key}`;
          const error = errorFor(f.key);
          const isMessage = f.type === "textarea";
          return (
            <div key={f.key} className={isMessage ? "md:col-span-2" : ""}>
              <label htmlFor={id} className={labelClassName}>
                {f.label}
                {f.required !== false && <span aria-hidden="true"> *</span>}
              </label>
              {renderControl(f, id, error)}
              {/* error sits directly under the box that caused it */}
              <div className="mt-1 flex justify-between gap-4">
                <p id={`${id}-error`} role="alert" className="min-h-[1.25rem] text-sm text-red-600">
                  {error}
                </p>
                {isMessage && (
                  <span className="text-xs text-gray-500">
                    {Array.from(values[f.key] ?? "").length}/{MESSAGE_MAX}
                  </span>
                )}
              </div>
              {f.key === "email" && renderOtp()}
              {f.key === "phone" && needsPhone && renderPhoneOtp()}
            </div>
          );
        })}
      </div>

      {/* honeypot: invisible to people, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {formError && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {formError}
        </p>
      )}

      <div className={actionsClassName}>
        <button
          type="submit"
          disabled={busy}
          className={buttonClassName}
        >
          {busy ? "Submitting…" : config.submitLabel}
        </button>
        {actions}
      </div>
    </form>
  );
}
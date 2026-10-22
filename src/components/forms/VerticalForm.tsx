// src/components/forms/VerticalForm.tsx
// One component for Corporate, Institutions, Government and Academia.
// Styling uses plain Tailwind-style classes: swap the class strings (or pass `className`)
// so it matches each page's existing look.
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { sendEmailNotification, type EmailNotificationType } from "@/services/emailBff";
import { MESSAGE_MAX } from "@/utils/validators";
import { normalizePhone, validateFields, type FieldErrors, type FieldKey } from "@/utils/verticalValidators";
import { useEmailOtp } from "@/hooks/useEmailOtp";
import type { FieldConfig, VerticalFormConfig } from "./verticalForms.config";

export type SubmitPayload = {
  vertical: string;
  notificationType: EmailNotificationType;
  values: Record<string, string>;
  otpProof: string;
  elapsedMs: number;
};
export type SubmitResult = { fieldErrors?: FieldErrors } | void;

/** Default submit: sends the enquiry through your existing email service */
export async function submitViaEmailService(payload: SubmitPayload): Promise<SubmitResult> {
  const { optionalMessage, ...rest } = payload.values;
  await sendEmailNotification(payload.notificationType, {
    ...rest,
    message: optionalMessage ?? "",
    vertical: payload.vertical,
    verification_proof: payload.otpProof,
  });
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
  const base = inputClassName ?? inputBase;

  const errors = useMemo(
    () => validateFields(values as Partial<Record<FieldKey, string>>, optional),
    [values, optional],
  );
  const verified = otp.isVerifiedFor(values.email ?? "");
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
  };

  const handleBlur = (key: FieldKey) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setValues((v) => ({ ...v, [key]: (v[key] ?? "").trim().replace(/[ \t]+/g, " ") }));
  };

  const handleSendCode = () => {
    setTouched((t) => ({ ...t, email: true }));
    if (errors.email) {
      focusField("email");
      return;
    }
    otp.sendCode(values.email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (otp.status === "verifying") {
      setFormError("Email verification in progress. Please wait.");
      return;
    }
    setSubmitted(true);
    setFormError("");

    const firstBad = keys.find((k) => errors[k]) ?? (!verified ? "email" : undefined);
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
            disabled={otp.status === "sending" || busy}
            className="rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {otp.status === "sending" ? "Sending code…" : "Send verification code"}
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
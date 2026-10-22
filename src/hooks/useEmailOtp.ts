// src/hooks/useEmailOtp.ts
import { useEffect, useState } from "react";
import { sendEmailOtp, verifyEmailOtp } from "@/services/emailBff";

// The hook only talks to this interface; the provider below wraps your existing email service.
export interface OtpProvider {
  send(email: string): Promise<void>;
  /** `proof` is sent with the form so the server can confirm the email was really verified */
  verify(email: string, code: string): Promise<{ proof: string }>;
}

export const emailServiceOtpProvider: OtpProvider = {
  async send(email) {
    await sendEmailOtp(email);
  },
  async verify(email, code) {
    return { proof: await verifyEmailOtp(email, code) };
  },
};

export type OtpStatus = "idle" | "sending" | "sent" | "verifying" | "verified";

const friendlyError = (e: unknown, step: "send" | "verify"): string => {
  const msg = (e instanceof Error ? e.message : "").toLowerCase();
  if (msg.includes("rate") || msg.includes("too many") || msg.includes("seconds"))
    return "Too many requests. Wait a minute, then try again.";
  if (step === "verify")
    return "That code is incorrect or has expired. Check the code or request a new one.";
  if (msg.includes("invalid") && msg.includes("email"))
    return "This email address can't receive codes. Check it and try again.";
  return "We couldn't send the code. Check your connection and try again.";
};

export function useEmailOtp(
  provider: OtpProvider = emailServiceOtpProvider,
  { codeLength = 4, cooldownSeconds = 30, maxAttempts = 5 } = {},
) {
  const [status, setStatus] = useState<OtpStatus>("idle");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [email, setEmail] = useState(""); // the address the code was sent to
  const [proof, setProof] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const reset = () => {
    setStatus("idle");
    setError("");
    setAttempts(0);
    setEmail("");
    setProof(null);
  };

  const sendCode = async (rawEmail: string) => {
    if (cooldown > 0 || status === "sending" || status === "verifying") return;
    const clean = rawEmail.trim().toLowerCase();
    setStatus("sending");
    setError("");
    try {
      await provider.send(clean);
      setEmail(clean);
      setAttempts(0);
      setCooldown(cooldownSeconds);
      setStatus("sent");
    } catch (e) {
      setStatus("idle");
      setError(friendlyError(e, "send"));
    }
  };

  const verifyCode = async (code: string) => {
    if (status === "verifying") return;
    if (!new RegExp(`^\\d{${codeLength}}$`).test(code)) {
      setError(`Enter the ${codeLength}-digit code from your email`);
      return;
    }
    if (attempts >= maxAttempts) {
      setError("Too many wrong attempts. Request a new code.");
      return;
    }
    setStatus("verifying");
    setError("");
    try {
      const result = await provider.verify(email, code);
      setProof(result.proof);
      setStatus("verified");
    } catch (e) {
      setAttempts((a) => a + 1);
      setStatus("sent");
      setError(friendlyError(e, "verify"));
    }
  };

  /** true only if this exact address was verified (changing the email un-verifies it) */
  const isVerifiedFor = (value: string) =>
    status === "verified" && email === value.trim().toLowerCase();

  return { status, error, cooldown, email, proof, codeLength, sendCode, verifyCode, reset, isVerifiedFor };
}

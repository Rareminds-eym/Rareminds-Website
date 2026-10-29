// src/hooks/usePhoneOtp.ts
import { useEffect, useState } from "react";
import { sendPhoneOtp, verifyPhoneOtp } from "@/services/emailBff";

export type PhoneOtpStatus =
	| "idle"
	| "sending"
	| "sent"
	| "verifying"
	| "verified";

const friendlyError = (e: unknown, step: "send" | "verify"): string => {
	const msg = (e instanceof Error ? e.message : "").toLowerCase();
	if (
		msg.includes("rate") ||
		msg.includes("too many") ||
		msg.includes("seconds")
	)
		return "Too many requests. Wait a minute, then try again.";
	if (step === "verify")
		return "That code is incorrect or has expired. Check the code or request a new one.";
	return "We couldn't send the code. Check the number and your connection, then try again.";
};

export function usePhoneOtp({
	minCodeLength = 4,
	maxCodeLength = 6,
	cooldownSeconds = 30,
	maxAttempts = 5,
} = {}) {
	const [status, setStatus] = useState<PhoneOtpStatus>("idle");
	const [error, setError] = useState("");
	const [cooldown, setCooldown] = useState(0);
	const [attempts, setAttempts] = useState(0);
	const [phone, setPhone] = useState(""); // the number the code was sent to
	const [verificationId, setVerificationId] = useState("");
	const [proof, setProof] = useState(""); // single-use proof issued on success

	useEffect(() => {
		if (cooldown <= 0) return;
		const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
		return () => clearTimeout(t);
	}, [cooldown]);

	const reset = () => {
		setStatus("idle");
		setError("");
		setAttempts(0);
		setPhone("");
		setVerificationId("");
		setProof("");
	};

	const sendCode = async (rawPhone: string) => {
		if (cooldown > 0 || status === "sending" || status === "verifying") return;
		const previous = status;
		const clean = rawPhone.replace(/\D/g, "");
		setStatus("sending");
		setError("");
		try {
			const id = await sendPhoneOtp(clean);
			setPhone(clean);
			setVerificationId(id);
			setAttempts(0);
			setCooldown(cooldownSeconds);
			setStatus("sent");
		} catch (e) {
			setStatus(previous === "sent" ? "sent" : "idle");
			setError(friendlyError(e, "send"));
		}
	};

	const verifyCode = async (code: string) => {
		if (status === "verifying") return;
		if (
			!/^\d+$/.test(code) ||
			code.length < minCodeLength ||
			code.length > maxCodeLength
		) {
			setError("Enter the code from your SMS");
			return;
		}
		if (attempts >= maxAttempts) {
			setError("Too many wrong attempts. Request a new code.");
			return;
		}
		setStatus("verifying");
		setError("");
		try {
			const result = await verifyPhoneOtp(phone, verificationId, code);
			setProof(
				typeof result.verification_proof === "string"
					? result.verification_proof
					: "",
			);
			setStatus("verified");
		} catch (e) {
			setAttempts((a) => a + 1);
			setStatus("sent");
			setError(friendlyError(e, "verify"));
		}
	};

	/** true only if this exact number was verified (changing the number un-verifies it) */
	const isVerifiedFor = (value: string) =>
		status === "verified" && phone === value.replace(/\D/g, "");

	return {
		status,
		error,
		cooldown,
		phone,
		proof,
		minCodeLength,
		maxCodeLength,
		sendCode,
		verifyCode,
		reset,
		isVerifiedFor,
	};
}

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { checkDuplicate, duplicateFieldErrors } from "@/utils/duplicateCheck";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALREADY = "You have already subscribed with this email.";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "checking") return;

    const value = email.trim().toLowerCase();
    if (!value) return setError("Email is required.");
    if (!EMAIL_RE.test(value)) return setError("Enter a valid email address.");

    setError("");
    setStatus("checking");
    try {
      const dup = await checkDuplicate("footer_email", { email: value });
      if (dup.email) {
        setError(ALREADY);
        setStatus("idle");
        return;
      }
      const { error: dbError } = await supabase
        .from("footer_email")
        .insert([{ email: value, submitted_at: new Date().toISOString() }]);
      if (dbError) {
        if (duplicateFieldErrors(dbError)) setError(ALREADY);
        else {
          console.error("Newsletter insert failed:", dbError);
          setError("Something went wrong. Please try again.");
        }
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch (err) {
      console.error("Newsletter error:", err);
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "done") {
    return <p className="text-lg font-semibold text-white" role="status">Thanks for subscribing!</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(""); }}
        placeholder="Email address"
        autoComplete="email"
        aria-invalid={!!error}
        className={`w-full rounded-md bg-white px-4 py-4 text-gray-800 outline-none focus:ring-2 ${error ? "ring-2 ring-red-500" : "focus:ring-red-400"}`}
      />
      {error && <p role="alert" className="mt-2 text-sm font-medium text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "checking"}
        className="mt-4 w-full rounded-md bg-red-600 py-4 font-bold uppercase text-white hover:bg-red-700 disabled:opacity-60"
      >
        {status === "checking" ? "Checking…" : "Subscribe"}
      </button>
    </form>
  );
}
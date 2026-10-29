import { supabase } from "@/lib/supabaseClient";

export const DUPLICATE_EMAIL_MSG =
	"You have already submitted your details with this email.";
export const DUPLICATE_PHONE_MSG =
	"You have already submitted your details with this phone number.";

export async function checkDuplicate(
	table: string,
	{ email, phone }: { email?: string; phone?: string },
) {
	const { data, error } = await supabase.rpc("contact_exists", {
		p_table: table,
		p_email: email?.trim().toLowerCase() || null,
		p_phone: phone ? phone.replace(/\D/g, "").slice(-10) : null,
	});
	if (error) throw error;
	return data as { email: boolean; phone: boolean };
}

/** Turns a Postgres "unique violation" into field errors (null if it is another error) */
export function duplicateFieldErrors(
	error: { code?: string; message?: string; details?: string } | null,
) {
	if (error?.code !== "23505") return null;
	const text = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
	if (text.includes("pkey")) return null;
	return text.includes("phone")
		? { phone: DUPLICATE_PHONE_MSG }
		: { email: DUPLICATE_EMAIL_MSG };
}

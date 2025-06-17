// deno-lint-ignore-file
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
      },
    });
  }

  const { record } = await req.json();

  const resendApiKey = Deno.env.get("RM_Emails");
  if (!resendApiKey) {
    return new Response("Resend API key not set", { status: 500, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    }});
  }

  const submittedAt = record?.submitted_at
    ? new Date(record.submitted_at).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      })
    : "N/A";

  const html = `
    <h3>New Training Form Submission</h3>
    ${record?.name ? `<p><strong>Name:</strong> ${record.name}</p>` : ''}
    ${record?.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ''}
    ${record?.company ? `<p><strong>Company:</strong> ${record.company}</p>` : ''}
    ${record?.role ? `<p><strong>Role:</strong> ${record.role}</p>` : ''}
    ${record?.message ? `<p><strong>Message:</strong> ${record.message}</p>` : ''}
    ${submittedAt !== 'N/A' ? `<p><strong>Submitted at:</strong> ${submittedAt}</p>` : ''}
  `;

  const payload = {
    from: "Rareminds <no-reply@rareminds.in>",
    to: ["marketing@rareminds.in"],
    subject: "New Training Enquiry Submitted",
    html,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Resend error:", error);
    return new Response("Failed to send email", { status: 500, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    }});
  }

  return new Response("Email sent successfully", { status: 200, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
  }});
});

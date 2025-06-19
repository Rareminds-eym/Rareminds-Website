// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

console.log("Hello from Functions!")

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

  let record;
  try {
    const body = await req.json();
    record = body.record || body;
  } catch (e) {
    return new Response("Invalid JSON", { status: 400, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    }});
  }

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
    <h3>New Contact Form Submission</h3>
    ${record?.fullName ? `<p><strong>Name:</strong> ${record.fullName}</p>` : ''}
    ${record?.jobTitle ? `<p><strong>Job Title:</strong> ${record.jobTitle}</p>` : ''}
    ${record?.company ? `<p><strong>Company:</strong> ${record.company}</p>` : ''}
    ${record?.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ''}
    ${record?.phone ? `<p><strong>Phone:</strong> ${record.phone}</p>` : ''}
    ${record?.categories ? `<p><strong>Categories:</strong> ${record.categories}</p>` : ''}
    ${record?.message ? `<p><strong>Message:</strong><br/>${record.message.replace(/\n/g, '<br/>')}</p>` : ''}
    ${submittedAt !== 'N/A' ? `<p><strong>Submitted at:</strong> ${submittedAt}</p>` : ''}
  `;

  const payload = {
    from: "Rareminds <no-reply@rareminds.in>",
    to: ["marketing@rareminds.in"],
    subject: "New Contact Form Submission",
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
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

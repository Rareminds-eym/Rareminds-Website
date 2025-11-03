// // supabase/functions/contact-form-email/index.ts
// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// serve(async (req) => {
//   try {
//     const payload = await req.json();
//     console.log("Received payload:", payload);

//     // Handle both webhook and trigger formats
//     const newContact = payload.record || payload;
//     const { name, email, role, phone, message } = newContact;

//     if (!email || !name) {
//       throw new Error("Missing required fields");
//     }

//     const apiKey = Deno.env.get("RESEND_API_KEY");
//     if (!apiKey) {
//       throw new Error("RESEND_API_KEY not configured");
//     }

//     const response = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: "Rareminds Contact Form <no-reply@rareminds.in>",
//         to: ["nandyala@rareminds.in"],
//         replyTo: payload.email,
//         subject: "New Contact Form Submission",
//         html: `
//           <h3>New Contact Form Submission</h3>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Role:</strong> ${role || 'N/A'}</p>
//           <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
//           <p><strong>Message:</strong><br>${message}</p>
//         `,
//       }),
//     });

//     const result = await response.json();
    
//     if (!response.ok) {
//       console.error("Resend error:", result);
//       throw new Error(`Email failed: ${JSON.stringify(result)}`);
//     }

//     return new Response(
//       JSON.stringify({ success: true, data: result }), 
//       { headers: { "Content-Type": "application/json" }, status: 200 }
//     );

//   } catch (error) {
//     console.error("Function error:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }), 
//       { headers: { "Content-Type": "application/json" }, status: 500 }
//     );
//   }
// });

// supabase/functions/contact-form-email/index.ts


// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// serve(async (req) => {
//   // ✅ Handle CORS preflight (browser sends OPTIONS before POST)
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
//       },
//     });
//   }

//   try {
//     const payload = await req.json();
//     console.log("Received payload:", payload);

//     const newContact = payload.record || payload;
//     const { name, email, role, phone, message } = newContact;

//     if (!email || !name) {
//       throw new Error("Missing required fields");
//     }

//     const apiKey = Deno.env.get("RM_Emails");
//     if (!apiKey) {
//       throw new Error("RM_Emails not configured");
//     }

//     const response = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: "Rareminds <no-reply@rareminds.in>",
//         to: ["marketing@rareminds.in"],
//         replyTo: email,
//         subject: "New Contact Form Submission",
//         html: `
//           <h3>New Contact Form Submission</h3>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Role:</strong> ${role || "N/A"}</p>
//           <p><strong>Phone:</strong> ${phone || "N/A"}</p>
//           <p><strong>Message:</strong><br>${message}</p>
//         `,
//       }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       console.error("Resend error:", result);
//       throw new Error(`Email failed: ${JSON.stringify(result)}`);
//     }

//     return new Response(JSON.stringify({ success: true, data: result }), {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*", // ✅ Allow frontend to receive response
//       },
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Function error:", error);
//     return new Response(JSON.stringify({ success: false, error: error.message }), {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*", // ✅ Important here too
//       },
//       status: 500,
//     });
//   }
// });

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ✅ Handle CORS preflight (browser sends OPTIONS before POST)
  if (req.method === "OPTIONS") {
    console.log("🟡 CORS preflight request received");
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    console.log("📩 Incoming contact form request...");

    const payload = await req.json();
    console.log("🧾 Full payload received:", payload);

    const newContact = payload.record || payload;
    const { name, email, role, phone, message } = newContact;

    if (!email || !name) {
      console.error("❌ Validation error: Missing required fields");
      throw new Error("Missing required fields");
    }

    const apiKey = Deno.env.get("RM_Emails");
    if (!apiKey) {
      console.error("❌ Missing environment variable: RM_Emails");
      throw new Error("RM_Emails not configured");
    }

    console.log("✅ Environment key found. Preparing email...");

    const emailBody = {
      from: "Rareminds <no-reply@rareminds.in>",
      to: ["marketing@rareminds.in"],
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    console.log("📦 Sending email with body:", emailBody);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Resend API error:", result);
      throw new Error(`Email failed: ${JSON.stringify(result)}`);
    }

    console.log("✅ Email sent successfully via Resend!");
    console.log("📨 Resend response:", result);

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // ✅ Allow frontend to receive response
      },
      status: 200,
    });
  } catch (error) {
    console.error("🚨 Function error:", error.message);
    console.error("🧩 Full error details:", error);

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
    });
  }
});


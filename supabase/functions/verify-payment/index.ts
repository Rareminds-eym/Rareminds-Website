// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Verify Payment Function Started!")

// Function to verify Razorpay signature
function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const crypto = globalThis.crypto;
  const encoder = new TextEncoder();
  
  const data = `${orderId}|${paymentId}`;
  const key = encoder.encode(secret);
  const message = encoder.encode(data);
  
  return crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  ).then(cryptoKey => 
    crypto.subtle.sign('HMAC', cryptoKey, message)
  ).then(signature_buffer => {
    const signature_array = new Uint8Array(signature_buffer);
    const signature_hex = Array.from(signature_array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return signature_hex === signature;
  }).catch(() => false);
}

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

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
      }
    });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      registrationId 
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId" 
        }), 
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    // Get Razorpay secret from environment
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeySecret) {
      console.error("Razorpay secret not found in environment");
      return new Response(
        JSON.stringify({ error: "Payment service configuration error" }), 
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the signature
    const isValidSignature = await verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      razorpayKeySecret
    );

    if (!isValidSignature) {
      console.error("Invalid Razorpay signature");
      
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          razorpay_payment_id: razorpay_payment_id,
          failure_reason: 'Invalid signature'
        })
        .eq('razorpay_order_id', razorpay_order_id);

      return new Response(
        JSON.stringify({ error: "Payment verification failed" }), 
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    // Update payment status to completed
    const { error: paymentUpdateError } = await supabase
      .from('payments')
      .update({ 
        status: 'completed',
        razorpay_payment_id: razorpay_payment_id,
        verified_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (paymentUpdateError) {
      console.error("Failed to update payment status:", paymentUpdateError);
      return new Response(
        JSON.stringify({ error: "Failed to update payment status" }), 
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    // Update registration payment status
    const { error: registrationUpdateError } = await supabase
      .from('event_registrations')
      .update({ payment_status: 'completed' })
      .eq('id', registrationId);

    if (registrationUpdateError) {
      console.error("Failed to update registration payment status:", registrationUpdateError);
      return new Response(
        JSON.stringify({ error: "Failed to update registration status" }), 
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      }), 
      { 
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
        }
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
        }
      }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/verify-payment' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"razorpay_order_id": "order_xxx", "razorpay_payment_id": "pay_xxx", "razorpay_signature": "signature_xxx", "registrationId": 123}'

*/
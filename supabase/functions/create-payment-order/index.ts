// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Create Payment Order Function Started!")

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
    const { registrationId, amount, currency = "INR", quantity = 1 } = await req.json();

    if (!registrationId || typeof amount !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing required fields: registrationId, amount" }), 
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

    const normalizedAmount = Math.max(0, Math.round(amount));
    const effectiveQuantity = Math.max(1, Math.round(quantity));
    const totalAmount = normalizedAmount * effectiveQuantity;
    
    // Ensure minimum amount is 1 rupee (100 paise) as required by Razorpay
    const minimumAmount = 1; // ₹1
    const finalAmount = Math.max(minimumAmount, totalAmount);

    // Get Razorpay credentials from environment
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Razorpay credentials not found in environment");
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

    // Get registration details
    const { data: registration, error: regError } = await supabase
      .from('event_registrations')
      .select('id, event_id, event_name, name, email, payment_amount, payment_currency')
      .eq('id', registrationId)
      .single();

    if (regError || !registration) {
      console.error("Registration not found:", regError?.message || regError);
      return new Response(
        JSON.stringify({ error: "Registration not found" }), 
        { 
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
          }
        }
      );
    }

    // Create Razorpay order
    const orderData = {
      amount: Math.round(finalAmount * 100), // Convert total (rupees) to paise, ensuring minimum amount
      currency,
      receipt: `reg_${registrationId}_${Date.now()}`,
      notes: {
        registration_id: registrationId.toString(),
        participant_name: registration.name ?? registration.email ?? 'Unknown',
        event_id: registration.event_id ? registration.event_id.toString() : undefined,
        event_name: registration.event_name ?? '',
        quantity: effectiveQuantity.toString(),
        unit_amount_rupees: normalizedAmount.toString(),
        total_amount_rupees: finalAmount.toString()
      }
    } as const;

    const authHeader = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay API error:", errorText);
      console.error("Razorpay request data:", JSON.stringify(orderData, null, 2));
      console.error("Razorpay response status:", razorpayResponse.status);
      return new Response(
        JSON.stringify({ 
          error: "Failed to create payment order",
          details: errorText,
          status: razorpayResponse.status
        }), 
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

    const razorpayOrder = await razorpayResponse.json();

    // Update registration with order details (only fields that exist)
    const updateData: any = {
      payment_status: 'pending',
      order_id: razorpayOrder.id,
      payment_id: razorpayOrder.id
    };

    // Only add fields if they exist in the database
    if (typeof totalAmount === 'number') {
      updateData.payment_amount = Math.round(totalAmount * 100); // store in paise
    }
    
    // Update registration with order details
    const { error: registrationUpdateError } = await supabase
      .from('event_registrations')
      .update(updateData)
      .eq('id', registrationId);

    if (registrationUpdateError) {
      console.error("Failed to update registration with order details:", registrationUpdateError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to update registration",
          details: registrationUpdateError.message
        }), 
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

    // Return order details for frontend
    return new Response(
      JSON.stringify({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: razorpayKeyId
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

  } catch (error: any) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message
      }), 
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-payment-order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"registrationId": 123, "amount": 500}'

*/
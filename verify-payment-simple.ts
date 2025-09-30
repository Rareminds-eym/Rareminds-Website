import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return new Response(
        JSON.stringify({ error: "Missing required payment verification data" }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) {
      return new Response(
        JSON.stringify({ error: "Razorpay secret not configured" }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify signature
    const crypto = globalThis.crypto;
    const encoder = new TextEncoder();
    const data = `${razorpay_order_id}|${razorpay_payment_id}`;
    const key = encoder.encode(razorpayKeySecret);
    const message = encoder.encode(data);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    
    const signature_buffer = await crypto.subtle.sign('HMAC', cryptoKey, message);
    const signature_array = new Uint8Array(signature_buffer);
    const signature_hex = Array.from(signature_array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const isValidSignature = signature_hex === razorpay_signature;

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ error: "Invalid payment signature" }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update payment status
    await supabase.from('payments').update({ 
      status: 'completed',
      razorpay_payment_id: razorpay_payment_id,
      verified_at: new Date().toISOString()
    }).eq('razorpay_order_id', razorpay_order_id);

    // Update registration payment status
    await supabase.from('event_registrations').update({ 
      payment_status: 'completed' 
    }).eq('id', registrationId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      }), 
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
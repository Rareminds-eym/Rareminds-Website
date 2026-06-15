/**
 * Cloudflare Pages Function: POST /api/register
 * Handles event registrations with Zoho Flow integration
 * 
 * SCALABILITY & MULTI-TEMPLATE SUPPORT:
 * This endpoint is designed to handle ANY form template without code changes.
 * 
 * How it works:
 * 1. Accepts dynamic "answers" object with any form fields
 * 2. Extracts standard fields (name, email, phone) with flexible field name matching
 * 3. Sends ALL form fields to Zoho Flow in Title Case format
 * 
 * Adding new form templates:
 * - Just create new forms in the dashboard with any field names
 * - Function automatically sends all fields to Zoho
 * - Configure Zoho Flow to map the fields you need
 */

interface Env {
  ZOHO_FLOW_WEBHOOK_URL: string;
}

interface RegisterRequest {
  answers: Record<string, any>;
  event_id: string;
  form_id: string;
  event_type: 'free' | 'paid';
  event_name: string;
  payment_id: string | null;
  total_amount: number | null;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const body: RegisterRequest = await request.json();
    const { answers, event_id, form_id, event_type, event_name, payment_id, total_amount } = body;

    // Validate required fields
    if (!answers || typeof answers !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid answers field' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!event_id || !form_id || !event_type || !event_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate event_type
    if (!['free', 'paid'].includes(event_type)) {
      return new Response(JSON.stringify({ error: 'event_type must be "free" or "paid"' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate payment_id for paid events
    if (event_type === 'paid' && !payment_id) {
      return new Response(JSON.stringify({ error: 'payment_id required for paid events' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('[Register] Processing registration:', {
      event_id,
      form_id,
      event_type,
      has_payment: !!payment_id
    });

    // Extract standard fields using flexible field name matching
    const extractField = (answers: Record<string, any>, possibleKeys: string[]): string => {
      for (const key of possibleKeys) {
        if (answers[key] && answers[key] !== '') {
          return String(answers[key]);
        }
      }
      return '';
    };

    const first_name = extractField(answers, [
      'first_name', 'firstName', 'First Name', 'fname', 'given_name'
    ]);
    
    const last_name = extractField(answers, [
      'last_name', 'lastName', 'Last Name', 'lname', 'surname', 'family_name'
    ]);
    
    const full_name = extractField(answers, [
      'name', 'full_name', 'fullName', 'Full Name', 'attendee_name'
    ]) || (first_name + (last_name ? ' ' + last_name : ''));
    
    const email = extractField(answers, [
      'email', 'Email', 'email_address', 'emailAddress', 'mail'
    ]);
    
    const phone = extractField(answers, [
      'phone', 'Phone', 'phone_number', 'phoneNumber', 'mobile', 'Mobile', 'contact', 'whatsapp'
    ]);

    // Build Zoho payload with standard fields
    const registrationTimestamp = new Date().toISOString();
    
    const zohoPayload: Record<string, any> = {
      // Core contact fields
      "Name": full_name,
      "First Name": first_name || '',
      "Last Name": last_name || full_name,
      "Email": email,
      "Phone": phone,
      "Mobile Number": phone,
      "Email Address": email,
      
      // Event metadata
      "Event ID": event_id,
      "Event Name": event_name,
      "Event Type": event_type,
      "Webinar Name": event_name,
      
      // Form metadata
      "Form ID": form_id,
      
      // Registration tracking
      "Registration Timestamp": registrationTimestamp,
      "Registration Date": registrationTimestamp.split('T')[0],
      
      // Lead source
      "Lead Source": event_type === 'paid' ? 'Paid Event' : 'Free Event',
    };

    // Add ALL form fields dynamically (converted to Title Case)
    for (const [key, value] of Object.entries(answers)) {
      if (value === null || value === '' || value === undefined) continue;
      
      // Convert snake_case to Title Case with spaces
      let displayName = key;
      if (key.includes('_')) {
        displayName = key
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else {
        displayName = key.charAt(0).toUpperCase() + key.slice(1);
      }
      
      zohoPayload[displayName] = value;
    }

    // Add payment fields
    if (event_type === 'paid' && payment_id) {
      zohoPayload["Payment ID"] = payment_id;
      zohoPayload["Razorpay Payment ID"] = payment_id;
      zohoPayload["Payment Status"] = 'completed';
      
      if (total_amount !== null && total_amount !== undefined) {
        zohoPayload["Total Amount"] = total_amount;
        zohoPayload["Amount"] = total_amount;
      }
    } else {
      zohoPayload["Payment Status"] = 'not_required';
      zohoPayload["Total Amount"] = 0;
      zohoPayload["Amount"] = 0;
    }

    console.log('[Register] Zoho payload prepared:', {
      total_fields: Object.keys(zohoPayload).length
    });

    // Send to Zoho Flow webhook
    if (!env.ZOHO_FLOW_WEBHOOK_URL) {
      console.warn('[Register] ZOHO_FLOW_WEBHOOK_URL not configured');
      return new Response(JSON.stringify({
        success: true,
        message: 'Registration processed (Zoho webhook not configured)'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const webhookUrl = env.ZOHO_FLOW_WEBHOOK_URL;
      
      console.log('[Register] Sending to Zoho Flow:', {
        url: webhookUrl,
        total_fields: Object.keys(zohoPayload).length,
        payload_preview: {
          name: zohoPayload["Name"],
          email: zohoPayload["Email"],
          event: zohoPayload["Event Name"]
        }
      });

      // Send POST request with JSON body
      const zohoResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zohoPayload)
      });

      const responseText = await zohoResponse.text();
      
      console.log('[Register] Zoho Flow response:', {
        status: zohoResponse.status,
        statusText: zohoResponse.statusText,
        body: responseText
      });

      if (!zohoResponse.ok) {
        console.warn('[Register] Zoho webhook failed (non-critical):', {
          status: zohoResponse.status,
          response: responseText
        });
      } else {
        console.log('[Register] ✅ Zoho webhook sent successfully');
      }

    } catch (error) {
      console.error('[Register] Zoho webhook error (non-critical):', error);
      // Don't fail the request - Zoho errors are non-critical
    }

    // Return success
    return new Response(JSON.stringify({
      success: true,
      message: 'Registration processed and sent to Zoho CRM'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[Register] Unhandled error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

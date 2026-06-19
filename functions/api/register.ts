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

    // Enhanced field extraction with fuzzy matching for common variations and typos
    const extractFieldFuzzy = (answers: Record<string, any>, possibleKeys: string[]): string => {
      // Direct match first
      for (const key of possibleKeys) {
        if (answers[key] && answers[key] !== '') {
          return String(answers[key]);
        }
      }
      
      // Fuzzy match - check all form keys against possible variations
      for (const [formKey, value] of Object.entries(answers)) {
        if (!value || value === '') continue;
        
        const normalizedFormKey = formKey.toLowerCase().replace(/[^a-z]/g, '');
        
        for (const possibleKey of possibleKeys) {
          const normalizedPossibleKey = possibleKey.toLowerCase().replace(/[^a-z]/g, '');
          
          // Exact match after normalization
          if (normalizedFormKey === normalizedPossibleKey) {
            return String(value);
          }
          
          // Partial match for common patterns
          if (normalizedFormKey.includes(normalizedPossibleKey) || 
              normalizedPossibleKey.includes(normalizedFormKey)) {
            return String(value);
          }
        }
      }
      
      return '';
    };

    const first_name = extractFieldFuzzy(answers, [
      'first_name', 'firstName', 'First Name', 'First_Name', 'FIRST_NAME',
      'fname', 'given_name', 'givenName', 'Given Name',
      'firstname', 'firstnm', 'first', 'name1', 'fName', 'f_name',
      'your_first_name', 'attendee_first_name', 'participant_first_name'
    ]);
    
    const last_name = extractFieldFuzzy(answers, [
      'last_name', 'lastName', 'Last Name', 'Last_Name', 'LAST_NAME',
      'lname', 'surname', 'family_name', 'familyName', 'Family Name',
      'lastname', 'lastnm', 'last', 'name2', 'lName', 'l_name',
      'sur_name', 'your_last_name', 'attendee_last_name', 'participant_last_name'
    ]);
    
    const full_name = extractFieldFuzzy(answers, [
      'name', 'full_name', 'fullName', 'Full Name', 'Full_Name', 'FULL_NAME',
      'attendee_name', 'participant_name', 'your_name', 'your_full_name',
      'fullname', 'completename', 'complete_name', 'wholename', 'whole_name',
      'person_name', 'contact_name', 'user_name', 'participant', 'attendee'
    ]);
    
    const email = extractFieldFuzzy(answers, [
      'email', 'Email', 'EMAIL', 'email_address', 'emailAddress', 'Email Address',
      'mail', 'Mail', 'e_mail', 'eMail', 'e-mail',
      'your_email', 'contact_email', 'work_email', 'personal_email',
      'email_id', 'emailid', 'mail_id', 'mailid', 'participant_email'
    ]);
    
    const phone = extractFieldFuzzy(answers, [
      'phone', 'Phone', 'PHONE', 'phone_number', 'phoneNumber', 'Phone Number',
      'mobile', 'Mobile', 'MOBILE', 'mobile_number', 'mobileNumber', 'Mobile Number',
      'contact', 'contact_number', 'contactNumber', 'Contact Number',
      'whatsapp', 'whatsapp_number', 'whatsappNumber', 'WhatsApp Number',
      'your_phone', 'your_mobile', 'cell', 'cell_number', 'telephone', 'tel'
    ]);

    // Smart name processing for Zoho CRM requirements
    let finalFirstName = '';
    let finalLastName = '';

    if (first_name && last_name) {
      finalFirstName = first_name;
      finalLastName = last_name;
    } else if (first_name && !last_name) {
      finalFirstName = first_name;
      finalLastName = first_name; // Use first name as last name fallback
    } else if (full_name && !first_name && !last_name) {
      const nameParts = full_name.trim().split(' ');
      finalFirstName = nameParts[0];
      finalLastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0];
    } else {
      // If no name data at all, return validation error instead of fake names
      return new Response(JSON.stringify({ 
        error: 'Name is required for registration',
        message: 'Please provide at least a full name or first name'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Format phone number for WhatsApp with validation
    const formatPhoneForWhatsApp = (phoneNumber: string): string => {
      if (!phoneNumber) return '';
      
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      
      // Validate minimum length for any phone number
      if (digitsOnly.length < 10) return phoneNumber; // Return as-is if too short
      
      // Handle various international formats
      if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
        return '+' + digitsOnly; // Already has country code
      }
      
      if (digitsOnly.length === 10) {
        // Assume Indian number if no country code and exactly 10 digits
        return '+91' + digitsOnly;
      }
      
      if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
        // Remove leading 0 and add Indian country code
        return '+91' + digitsOnly.substring(1);
      }
      
      if (digitsOnly.length > 12) {
        // Likely already has country code, just add + if missing
        return phoneNumber.startsWith('+') ? phoneNumber : '+' + digitsOnly;
      }
      
      // For other cases, return with + prefix if not already present
      return phoneNumber.startsWith('+') ? phoneNumber : '+' + digitsOnly;
    };

    // Extract WhatsApp opt-in consent from form
    const whatsappOptIn = extractFieldFuzzy(answers, [
      'whatsapp_opt_in', 'whatsappOptIn', 'WhatsApp Opt-In', 'whatsapp_optin',
      'opt_in', 'optin', 'consent', 'whatsapp_consent', 'marketing_consent',
      'communication_consent', 'sms_opt_in', 'phone_opt_in'
    ]);

    // Convert various opt-in formats to standardized boolean value for Zoho CRM
    const getOptInValue = (value: string): boolean => {
      if (!value) return false; // GDPR compliant - no consent means no consent
      
      const normalizedValue = String(value).toLowerCase().trim();
      
      // Handle various true/consent values - explicit consent only
      if (['yes', 'true', '1', 'on', 'checked', 'agree', 'accept', 'consent'].includes(normalizedValue)) {
        return true;
      }
      
      // All other cases including unclear values should be false for GDPR compliance
      return false;
    };

    const whatsappOptInStatus = getOptInValue(whatsappOptIn);
    const whatsappFormattedNumber = formatPhoneForWhatsApp(phone);

    // Build Zoho payload with standard fields
    const registrationTimestamp = new Date().toISOString();
    
    // Create Zoho payload with proper CRM field mapping (using SPACES not underscores)
    const zohoPayload: Record<string, any> = {
      // REQUIRED Core contact fields - Using SPACES as Zoho Flow expects
      "First Name": finalFirstName,
      "Last Name": finalLastName,
      "Full Name": full_name || `${finalFirstName} ${finalLastName}`,
      "Email": email,
      "Phone": phone,
      "Mobile": phone,
      
      // Event metadata - Using SPACES  
      "Event Id": event_id,
      "Event Name": event_name,
      "Event Type": event_type,
      "Webinar Name": event_name,
      "Form Id": form_id,
      
      // Registration tracking
      "Registration Date": registrationTimestamp.split('T')[0],
      
      // Lead source and classification
      "Lead Source": event_type === 'paid' ? 'Paid Event' : 'Free Event',
      "Lead Status": "New Lead",
      "Lead Type": "Individual",
      "Client Category": "Prospect",
      "Database Name": "RareMinds Website",
      "Campaign Name": event_name
    };

    // Add WhatsApp fields with proper data types for Zoho CRM
    const addWhatsAppFields = () => {
      zohoPayload["WhatsApp Opt-In"] = whatsappOptInStatus; // Boolean: true/false
      zohoPayload["WhatsApp_Opt_In"] = whatsappOptInStatus; // Alternative field name
      zohoPayload["Whatsapp No"] = whatsappFormattedNumber; // Formatted phone number
      zohoPayload["Whatsapp_No"] = whatsappFormattedNumber; // Alternative field name
      zohoPayload["Whatsapp Number"] = whatsappFormattedNumber; // Another common field name
      zohoPayload["Mobile Number"] = whatsappFormattedNumber; // Backup phone field
    };

    addWhatsAppFields();

    // Comprehensive field mapping - Maps ANY dashboard form field to correct Zoho CRM field
    const fieldMapping: Record<string, string> = {
      // CORE CONTACT FIELDS (Always required)
      'name': 'Name', 'fullname': 'Name', 'full_name': 'Name', 'attendee_name': 'Name',
      'firstname': 'First Name', 'first_name': 'First Name', 'fname': 'First Name',
      'lastname': 'Last Name', 'last_name': 'Last Name', 'lname': 'Last Name', 'surname': 'Last Name',
      'email': 'Email', 'emailaddress': 'Email', 'email_address': 'Email', 'mail': 'Email',
      'phone': 'Phone', 'phonenumber': 'Phone', 'phone_number': 'Phone Number',
      'mobile': 'Mobile Number', 'mobilenumber': 'Mobile Number', 'mobile_number': 'Mobile Number',
      
      // WHATSAPP FIELDS (Critical mapping)
      'whatsapp': 'Whatsapp Number', 'whatsappnumber': 'Whatsapp Number', 'whatsapp_number': 'Whatsapp Number',
      'whatsappno': 'Whatsapp Number', 'whatsapp_no': 'Whatsapp Number',
      
      // WHATSAPP OPT-IN (All possible variations) - Maps to boolean fields
      'whatsappoptin': 'WhatsApp_Opt_In', 'whatsapp_opt_in': 'WhatsApp_Opt_In', 'whatsapp_optin': 'WhatsApp_Opt_In',
      'optin': 'WhatsApp_Opt_In', 'opt_in': 'WhatsApp_Opt_In', 'marketing_opt_in': 'WhatsApp_Opt_In',
      'consent': 'WhatsApp_Opt_In', 'whatsapp_consent': 'WhatsApp_Opt_In', 'marketing_consent': 'WhatsApp_Opt_In',
      'communication_consent': 'WhatsApp_Opt_In', 'sms_opt_in': 'WhatsApp_Opt_In',
      
      // EDUCATIONAL FIELDS
      'institution': 'School / College / University Name', 'school': 'School / College / University Name',
      'college': 'School / College / University Name', 'university': 'School / College / University Name',
      'institutionname': 'School / College / University Name', 'institution_name': 'School / College / University Name',
      'company': 'Company Name', 'organization': 'Company Name', 'employer': 'Company Name',
      
      'department': 'Department Stream', 'dept': 'Department Stream', 'stream': 'Department Stream',
      'branch': 'Students Branch/department', 'course': 'Department Stream',
      
      'subject': 'Subject You Teach', 'subjecttaught': 'Subject You Teach', 'subject_taught': 'Subject You Teach',
      'teachingsubject': 'Subject You Teach', 'teaching_subject': 'Subject You Teach',
      
      'teachinglevel': 'Teaching Level', 'teaching_level': 'Teaching Level', 'level': 'Teaching Level',
      'grade': 'Teaching Level', 'class': 'Teaching Level',
      
      'experience': 'Years Of Experience', 'yearsofexperience': 'Years Of Experience',
      'years_of_experience': 'Years Of Experience', 'work_experience': 'Years Of Experience',
      
      // LOCATION FIELDS
      'state': 'State', 'statename': 'State', 'region': 'State',
      'district': 'District', 'districtname': 'District', 'area': 'District',
      'city': 'City', 'cityname': 'City', 'town': 'City',
      'address': 'Current Address', 'currentaddress': 'Current Address',
      
      // EVENT FIELDS  
      'howdidyouhear': 'How Did You Hear About Us', 'heard_from': 'How Did You Hear About Us',
      'heardfrom': 'How Did You Hear About Us', 'source': 'How Did You Hear About Us',
      
      'preferreddate': 'Preferred Date', 'preferred_date': 'Preferred Date',
      'preferredtime': 'Preferred Time', 'preferred_time': 'Preferred Time',
      'timeslot': 'Preferred Time', 'webinar_time_slot': 'Preferred Time',
      
      'preferredlanguage': 'Preferred Language', 'preferred_language': 'Preferred Language',
      'language': 'Preferred Language',
      
      // PROFESSIONAL FIELDS
      'designation': 'Job Title', 'jobtitle': 'Job Title', 'job_title': 'Job Title',
      'position': 'Job Title', 'role': 'Job Title', 'title': 'Job Title',
      
      // ADDITIONAL FIELDS
      'linkedin': 'Linkedin Profile', 'linkedinprofile': 'Linkedin Profile', 'linkedin_profile': 'Linkedin Profile',
      'website': 'Website', 'referralcode': 'Referral Code', 'referral_code': 'Referral Code'
    };

    // Intelligent field processing with robust mapping and typo tolerance
    for (const [key, value] of Object.entries(answers)) {
      if (value === null || value === '' || value === undefined) continue;
      
      // Normalize the form field name for better matching
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Try direct mapping first (exact match)
      let zohoFieldName = fieldMapping[key.toLowerCase()] || fieldMapping[normalizedKey];
      
      // If no direct match, try fuzzy matching for typos and variations
      if (!zohoFieldName) {
        for (const [mappingKey, mappingValue] of Object.entries(fieldMapping)) {
          const normalizedMappingKey = mappingKey.replace(/[^a-z0-9]/g, '');
          
          // Exact match after normalization
          if (normalizedKey === normalizedMappingKey) {
            zohoFieldName = mappingValue;
            break;
          }
          
          // Partial match for common patterns - more restrictive to avoid false positives
          if (normalizedKey.length > 4 && normalizedMappingKey.length > 4) {
            // Only match if one is a clear subset of the other with significant overlap
            const minLength = Math.min(normalizedKey.length, normalizedMappingKey.length);
            const maxLength = Math.max(normalizedKey.length, normalizedMappingKey.length);
            
            // Require at least 70% overlap and minimum 5 characters to avoid false matches
            if (minLength >= 5 && (minLength / maxLength) >= 0.7) {
              if (normalizedKey.includes(normalizedMappingKey) || normalizedMappingKey.includes(normalizedKey)) {
                zohoFieldName = mappingValue;
                break;
              }
            }
          }
        }
      }
      
      // If still no match, convert to proper Zoho format as fallback (using spaces)
      if (!zohoFieldName) {
        zohoFieldName = key
          .replace(/([a-z])([A-Z])/g, '$1 $2')  // camelCase to spaces
          .replace(/[_-]+/g, ' ')               // underscores/dashes to spaces
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }
      
      // CRITICAL: Never override required fields that are already set
      const requiredFields = ['First Name', 'Last Name', 'Email', 'Phone', 'Mobile', 'Full Name'];
      const whatsappFields = ['WhatsApp Opt-In', 'WhatsApp_Opt_In', 'Whatsapp No', 'Whatsapp_No'];
      const isRequiredField = requiredFields.includes(zohoFieldName);
      const isWhatsAppField = whatsappFields.includes(zohoFieldName);
      
      if (isWhatsAppField) {
        // NEVER allow WhatsApp fields to be overridden by form data
        continue; // Skip this field, continue processing remaining fields
      } else if (!isRequiredField) {
        zohoPayload[zohoFieldName] = String(value);
      } else {
        // For required fields, only update if current value is empty/null and new value is not empty
        if ((!zohoPayload[zohoFieldName] || zohoPayload[zohoFieldName] === '' || zohoPayload[zohoFieldName] === 'null') && 
            value && value !== '' && value !== null) {
          zohoPayload[zohoFieldName] = String(value);
        }
      }
    }

    // FINAL VALIDATION AND RE-ADD: Ensure required fields are never null/empty
    if (!zohoPayload["First Name"] || zohoPayload["First Name"] === 'null' || zohoPayload["First Name"] === '') {
      zohoPayload["First Name"] = finalFirstName;
    }
    if (!zohoPayload["Last Name"] || zohoPayload["Last Name"] === 'null' || zohoPayload["Last Name"] === '') {
      zohoPayload["Last Name"] = finalLastName;
    }
    if (!zohoPayload["Full Name"] || zohoPayload["Full Name"] === 'null' || zohoPayload["Full Name"] === '') {
      zohoPayload["Full Name"] = `${finalFirstName} ${finalLastName}`;
    }
    
    // Add payment fields with proper Zoho field names (using spaces)
    if (event_type === 'paid' && payment_id) {
      zohoPayload["Payment Id"] = payment_id;
      zohoPayload["Razorpay Payment Id"] = payment_id;
      zohoPayload["Payment Status"] = 'completed';
      zohoPayload["Mode of Payment"] = 'Online';
      
      if (total_amount !== null && total_amount !== undefined) {
        zohoPayload["Amount"] = String(total_amount);
        zohoPayload["Total Amount"] = String(total_amount);
      }
    } else {
      zohoPayload["Payment Status"] = 'not_required';
      zohoPayload["Amount"] = "0";
      zohoPayload["Total Amount"] = "0";
    }

    // Send to Zoho Flow webhook
    if (!env.ZOHO_FLOW_WEBHOOK_URL) {
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

      // Send POST request with JSON body
      const zohoResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zohoPayload)
      });

      const responseText = await zohoResponse.text();
      
      if (!zohoResponse.ok) {
        // Zoho webhook failed (non-critical)
      }

    } catch (error) {
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
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
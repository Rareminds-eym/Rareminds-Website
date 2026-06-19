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

// Utility functions for efficient field matching and processing
class FieldMatcher {
  private normalizedCache = new Map<string, string>();
  private matchCache = new Map<string, boolean>();
  
  // Normalize field names with caching to avoid repeated operations
  private normalize(fieldName: string): string {
    if (this.normalizedCache.has(fieldName)) {
      return this.normalizedCache.get(fieldName)!;
    }
    
    const normalized = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '');
    this.normalizedCache.set(fieldName, normalized);
    return normalized;
  }
  
  // Check if two field names match with similarity threshold
  private isPartialMatch(key1: string, key2: string): boolean {
    const cacheKey = `${key1}|${key2}`;
    if (this.matchCache.has(cacheKey)) {
      return this.matchCache.get(cacheKey)!;
    }
    
    const norm1 = this.normalize(key1);
    const norm2 = this.normalize(key2);
    
    let isMatch = false;
    
    // Exact match after normalization
    if (norm1 === norm2) {
      isMatch = true;
    } else if (norm1.length > 4 && norm2.length > 4) {
      // Partial match with strict requirements to avoid false positives
      const minLength = Math.min(norm1.length, norm2.length);
      const maxLength = Math.max(norm1.length, norm2.length);
      
      // Require at least 70% overlap and minimum 5 characters
      if (minLength >= 5 && (minLength / maxLength) >= 0.7) {
        isMatch = norm1.includes(norm2) || norm2.includes(norm1);
      }
    }
    
    this.matchCache.set(cacheKey, isMatch);
    return isMatch;
  }
  
  // Extract field value with fuzzy matching
  extractField(answers: Record<string, any>, possibleKeys: string[]): string {
    // Direct match first (most efficient)
    for (const key of possibleKeys) {
      const value = answers[key];
      if (value && value !== '') {
        return String(value);
      }
    }
    
    // Fuzzy match only if direct match fails
    const answersEntries = Object.entries(answers);
    for (const [formKey, value] of answersEntries) {
      if (!value || value === '') continue;
      
      for (const possibleKey of possibleKeys) {
        if (this.isPartialMatch(formKey, possibleKey)) {
          return String(value);
        }
      }
    }
    
    return '';
  }
  
  // Find matching field name from mapping with fuzzy logic
  findMappedField(fieldName: string, fieldMapping: Record<string, string>): string | null {
    // Try direct mapping first (case insensitive)
    const lowerFieldName = fieldName.toLowerCase();
    const normalizedKey = this.normalize(fieldName);
    
    const directMatch = fieldMapping[lowerFieldName] || fieldMapping[normalizedKey];
    if (directMatch) return directMatch;
    
    // Fuzzy matching fallback - only if direct match fails
    const mappingEntries = Object.entries(fieldMapping);
    for (const [mappingKey, mappingValue] of mappingEntries) {
      if (this.isPartialMatch(fieldName, mappingKey)) {
        return mappingValue;
      }
    }
    
    return null;
  }
  
  // Clear caches to prevent memory leaks in long-running processes
  clearCache(): void {
    this.normalizedCache.clear();
    this.matchCache.clear();
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  
  // Create fresh field matcher instance per request to avoid global state and memory leaks
  const fieldMatcher = new FieldMatcher();

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight - no field matching needed
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

    // Enhanced field extraction using optimized utility
    const extractFieldFuzzy = (answers: Record<string, any>, possibleKeys: string[]): string => {
      return fieldMatcher.extractField(answers, possibleKeys);
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

    // Extract country information to determine appropriate phone formatting
    const country = extractFieldFuzzy(answers, [
      'country', 'Country', 'COUNTRY', 'country_code', 'countryCode',
      'nationality', 'Nationality', 'nation', 'location_country'
    ]);

    // Smart name processing for Zoho CRM requirements
    let finalFirstName = '';
    let finalLastName = '';

    if (first_name && last_name) {
      finalFirstName = first_name;
      finalLastName = last_name;
    } else if (first_name && !last_name) {
      // If only first name provided, check if it's actually a full name
      const nameParts = first_name.trim().split(' ');
      if (nameParts.length > 1) {
        // Multiple words in "first name" field - treat as full name
        finalFirstName = nameParts[0];
        finalLastName = nameParts.slice(1).join(' ');
      } else {
        // Single word - use as first name only, leave last name empty for CRM
        finalFirstName = first_name;
        finalLastName = ''; // Empty rather than duplicate
      }
    } else if (full_name && !first_name && !last_name) {
      const nameParts = full_name.trim().split(' ');
      finalFirstName = nameParts[0];
      finalLastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
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

    // Format phone number for WhatsApp - country-agnostic approach
    const formatPhoneForWhatsApp = (phoneNumber: string, userCountry?: string): string => {
      if (!phoneNumber) return '';
      
      // Extract digits only
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      
      // Basic validation - minimum length for any valid phone number globally
      if (digitsOnly.length < 7) {
        console.warn(`Phone number too short to be valid: ${phoneNumber}`);
        return '';
      }
      
      // Maximum reasonable length (E.164 format allows up to 15 digits)
      if (digitsOnly.length > 15) {
        console.warn(`Phone number too long (max 15 digits): ${phoneNumber}`);
        return phoneNumber; // Return as-is, let downstream handle
      }
      
      // If already in international format, preserve it
      if (phoneNumber.startsWith('+')) {
        // Validate that what follows + is all digits (after cleaning)
        const cleanInternational = phoneNumber.substring(1).replace(/\D/g, '');
        if (cleanInternational.length >= 7 && cleanInternational.length <= 15) {
          return '+' + cleanInternational;
        }
      }
      
      // For numbers without + prefix:
      // - Don't assume any country codes
      // - Don't make geographic assumptions
      // - Let downstream systems (Zoho CRM, WhatsApp API) handle country-specific validation
      
      // Simply add + prefix if the number looks reasonable
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        const formatted = '+' + digitsOnly;
        
        // Log for monitoring - helps identify common patterns without hardcoding assumptions
        if (userCountry) {
          console.info(`Phone formatted without country assumption: ${phoneNumber} -> ${formatted} (user country: ${userCountry})`);
        } else {
          console.info(`Phone formatted without country info: ${phoneNumber} -> ${formatted}`);
        }
        
        return formatted;
      }
      
      // For edge cases, return original and let downstream handle
      console.warn(`Phone number format uncertain, returning as-is: ${phoneNumber}`);
      return phoneNumber;
    };

    // Extract WhatsApp opt-in consent from form
    const whatsappOptIn = extractFieldFuzzy(answers, [
      'whatsapp_opt_in', 'whatsappOptIn', 'WhatsApp Opt In', 'whatsapp_optin',
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
    const whatsappFormattedNumber = formatPhoneForWhatsApp(phone, country);

    // Build Zoho payload with standard fields
    const registrationTimestamp = new Date().toISOString();
    
    // Create Zoho payload with proper CRM field mapping (using SPACES not underscores)
    const zohoPayload: Record<string, any> = {
      // REQUIRED Core contact fields - Using SPACES as Zoho Flow expects
      "First Name": finalFirstName,
      "Last Name": finalLastName,
      "Full Name": full_name || (finalLastName ? `${finalFirstName} ${finalLastName}` : finalFirstName),
      "Email": email,
      "Phone": phone,
      "Mobile": phone,
      "Country": country || '', // User's country for proper phone formatting
      
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
      zohoPayload["WhatsApp Opt In"] = whatsappOptInStatus; // Boolean: true/false - standardized without hyphen
      zohoPayload["WhatsApp Number"] = whatsappFormattedNumber; // Primary WhatsApp field
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
      'whatsapp': 'WhatsApp Number', 'whatsappnumber': 'WhatsApp Number', 'whatsapp_number': 'WhatsApp Number',
      'whatsappno': 'WhatsApp Number', 'whatsapp_no': 'WhatsApp Number',
      
      // WHATSAPP OPT-IN (All possible variations) - Maps to boolean fields
      'whatsappoptin': 'WhatsApp Opt In', 'whatsapp_opt_in': 'WhatsApp Opt In', 'whatsapp_optin': 'WhatsApp Opt In',
      'optin': 'WhatsApp Opt In', 'opt_in': 'WhatsApp Opt In', 'marketing_opt_in': 'WhatsApp Opt In',
      'consent': 'WhatsApp Opt In', 'whatsapp_consent': 'WhatsApp Opt In', 'marketing_consent': 'WhatsApp Opt In',
      'communication_consent': 'WhatsApp Opt In', 'sms_opt_in': 'WhatsApp Opt In',
      
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
      'country': 'Country', 'nationality': 'Country', 'nation': 'Country', 'location_country': 'Country',
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
      
      // Use optimized field matcher utility
      let zohoFieldName = fieldMatcher.findMappedField(key, fieldMapping);
      
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
      const whatsappFields = ['WhatsApp Opt In', 'WhatsApp Number', 'Mobile Number'];
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
      // If Zoho CRM absolutely requires a last name, use a standard placeholder
      // Otherwise, empty last name is semantically correct for single names
      zohoPayload["Last Name"] = finalLastName || '.'; // Minimal placeholder if required by CRM
    }
    if (!zohoPayload["Full Name"] || zohoPayload["Full Name"] === 'null' || zohoPayload["Full Name"] === '') {
      zohoPayload["Full Name"] = finalLastName ? `${finalFirstName} ${finalLastName}` : finalFirstName;
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
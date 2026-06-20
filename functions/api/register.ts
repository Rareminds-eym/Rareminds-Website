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

import { FIELD_MAPPING, PROTECTED_REQUIRED_FIELDS, PROTECTED_WHATSAPP_FIELDS, convertToZohoFieldName } from '../constants/fieldMappings';

interface Env {
  ZOHO_FLOW_WEBHOOK_URL: string;
}

interface RegisterRequest {
  answers: Record<string, unknown>;
  event_id: string;
  form_id: string;
  event_type: 'free' | 'paid';
  event_name: string;
  payment_id: string | null;
  total_amount: number | null;
}

interface ZohoPayload {
  'First Name': string;
  'Last Name': string;
  'Full Name': string;
  'Email': string;
  'Phone': string;
  'Mobile': string;
  'Country': string;
  'Event Id': string;
  'Event Name': string;
  'Event Type': string;
  'Webinar Name': string;
  'Form Id': string;
  'Registration Date': string;
  'Lead Source': string;
  'Lead Status': string;
  'Lead Type': string;
  'Client Category': string;
  'Database Name': string;
  'Campaign Name': string;
  'WhatsApp Opt In': boolean;
  'WhatsApp Opt-In': boolean; // Alternative with hyphen (as shown in Zoho response)
  'Whatsapp No': string; // Exact field name as shown in Zoho CRM
  'WhatsApp No': string; // Capital case variation
  'WhatsApp Number': string; // Alternative field name (backup)
  'Whatsapp Number': string; // Another variation
  'whatsapp_no': string; // Snake case
  'whatsapp_number': string; // Snake case
  'Payment Id': string;
  'Razorpay Payment Id': string;
  'Payment Status': string;
  'Mode of Payment': string;
  'Amount': string;
  'Total Amount': string;
  // Allow additional dynamic fields - all values must be defined (string or boolean)
  [key: string]: string | boolean;
}

// Regex constants for validation and formatting
const REGEX_NON_ALPHANUMERIC = /[^a-z0-9]/g;
const REGEX_NON_DIGIT = /\D/g;
const REGEX_WHITESPACE = /\s+/;
const REGEX_ALPHA_CHARS = /[a-zA-Z]/;
const REGEX_DIGITS_ONLY = /^\d+$/;

// Utility functions for efficient field matching and processing
class FieldMatcher {
  // Configuration constants for field matching behavior
  private static readonly MIN_FIELD_LENGTH_FOR_FUZZY_MATCH = 4;
  private static readonly SIMILARITY_THRESHOLD = 0.7; // 70% overlap required
  private static readonly MAX_CACHE_SIZE = 100; // Prevent unbounded cache growth
  
  private normalizedCache = new Map<string, string>();
  private matchCache = new Map<string, boolean>();
  
  // Normalize field names with caching to avoid repeated operations
  private normalize(fieldName: string): string {
    const cached = this.normalizedCache.get(fieldName);
    if (cached !== undefined) {
      return cached;
    }
    
    const normalized = fieldName.toLowerCase().replace(REGEX_NON_ALPHANUMERIC, '');
    
    // Prevent unbounded cache growth in edge cases
    if (this.normalizedCache.size < FieldMatcher.MAX_CACHE_SIZE) {
      this.normalizedCache.set(fieldName, normalized);
    }
    
    return normalized;
  }
  
  // Check if two field names match with similarity threshold
  private isPartialMatch(key1: string, key2: string): boolean {
    const cacheKey = `${key1}|${key2}`;
    const cached = this.matchCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    
    const norm1 = this.normalize(key1);
    const norm2 = this.normalize(key2);
    
    // Exact match after normalization
    if (norm1 === norm2) {
      this.setCacheIfSpace(cacheKey, true);
      return true;
    } else if (norm1.length > FieldMatcher.MIN_FIELD_LENGTH_FOR_FUZZY_MATCH && 
               norm2.length > FieldMatcher.MIN_FIELD_LENGTH_FOR_FUZZY_MATCH) {
      // Partial match with strict requirements to avoid false positives
      const minLength = Math.min(norm1.length, norm2.length);
      const maxLength = Math.max(norm1.length, norm2.length);
      
      // Require similarity threshold overlap to prevent unrelated matches
      if ((minLength / maxLength) >= FieldMatcher.SIMILARITY_THRESHOLD) {
        const isMatch = norm1.includes(norm2) || norm2.includes(norm1);
        this.setCacheIfSpace(cacheKey, isMatch);
        return isMatch;
      }
    }
    
    this.setCacheIfSpace(cacheKey, false);
    return false;
  }
  
  // Helper to set cache only if under size limit
  private setCacheIfSpace(key: string, value: boolean): void {
    if (this.matchCache.size < FieldMatcher.MAX_CACHE_SIZE) {
      this.matchCache.set(key, value);
    }
  }
  
  // Extract field value with fuzzy matching
  extractField(answers: Record<string, unknown>, possibleKeys: string[]): string {
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
  
  // Create fresh field matcher instance per request
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

  // Declare body outside try block for error logging
  let body: RegisterRequest | null = null;

  try {
    // Parse request body
    body = await request.json();
    
    if (!body) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
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
    const extractFieldFuzzy = (answers: Record<string, unknown>, possibleKeys: string[]): string => {
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
      'your_phone', 'your_mobile', 'cell', 'cell_number', 'telephone', 'tel'
    ]);
    
    // Extract WhatsApp number separately (if form has dedicated WhatsApp field)
    const whatsappNumber = extractFieldFuzzy(answers, [
      'whatsapp', 'whatsapp_number', 'whatsappNumber', 'WhatsApp Number',
      'whatsapp_no', 'whatsappNo', 'WhatsApp No', 'Whatsapp No'
    ]);

    // Extract country information to determine appropriate phone formatting
    const country = extractFieldFuzzy(answers, [
      'country', 'Country', 'COUNTRY', 'country_code', 'countryCode',
      'nationality', 'Nationality', 'nation', 'location_country'
    ]);

    // Smart name processing for Zoho CRM requirements
    // Helper to split a name string into [first, last] parts
    const splitName = (name: string): [string, string] => {
      const parts = name.trim().split(REGEX_WHITESPACE);
      return [parts[0], parts.length > 1 ? parts.slice(1).join(' ') : ''];
    };

    let finalFirstName = '';
    let finalLastName = '';

    if (first_name && last_name) {
      finalFirstName = first_name;
      finalLastName = last_name;
    } else if (first_name) {
      // first_name may contain a full name — split if multi-word
      [finalFirstName, finalLastName] = splitName(first_name);
    } else if (full_name) {
      [finalFirstName, finalLastName] = splitName(full_name);
    } else {
      // No name data at all — reject the registration
      return new Response(JSON.stringify({ 
        error: 'Name is required for registration',
        message: 'Please provide at least a full name or first name'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Format phone number for international use with intelligent country code detection
    // Returns formatted number with proper country code prefix
    const formatPhoneWithCountryCode = (phoneNumber: string, countryName: string): string => {
      if (!phoneNumber) return '';
      
      // Extract digits only
      const digitsOnly = phoneNumber.replace(REGEX_NON_DIGIT, '');
      
      // Basic validation - minimum length for any valid phone number globally
      if (digitsOnly.length < 7) {
        return '';
      }
      
      // Maximum reasonable length (E.164 format allows up to 15 digits)
      if (digitsOnly.length > 15) {
        return '';
      }
      
      // If already in international format with +, validate and return
      if (phoneNumber.startsWith('+')) {
        const afterPlus = phoneNumber.substring(1);
        const hasInvalidChars = REGEX_ALPHA_CHARS.test(afterPlus);
        
        if (hasInvalidChars) {
          return ''; // Reject numbers with letters after +
        }
        
        const cleanInternational = afterPlus.replace(REGEX_NON_DIGIT, '');
        const hasValidLength = cleanInternational.length >= 7 && cleanInternational.length <= 15;
        const isAllDigits = REGEX_DIGITS_ONLY.test(cleanInternational);
        
        if (hasValidLength && isAllDigits) {
          return '+' + cleanInternational;
        }
        return '';
      }
      
      // Detect country code based on country name or number pattern
      const normalizedCountry = countryName.toLowerCase().trim();
      
      // Country code mapping - extensible without hardcoding
      const countryCodeMap: Record<string, string> = {
        'india': '91',
        'indian': '91',
        'in': '91',
        'bharat': '91',
        'united states': '1',
        'usa': '1',
        'us': '1',
        'america': '1',
        'canada': '1',
        'united kingdom': '44',
        'uk': '44',
        'britain': '44',
        'england': '44',
        'australia': '61',
        'germany': '49',
        'france': '33',
        'italy': '39',
        'spain': '34',
        'china': '86',
        'japan': '81',
        'south korea': '82',
        'singapore': '65',
        'malaysia': '60',
        'thailand': '66',
        'indonesia': '62',
        'philippines': '63',
        'vietnam': '84',
        'bangladesh': '880',
        'pakistan': '92',
        'sri lanka': '94',
        'nepal': '977',
        'uae': '971',
        'dubai': '971',
        'saudi arabia': '966',
        'south africa': '27'
      };
      
      // Try to detect country code from number prefix if country not provided
      let detectedCode = '';
      
      if (normalizedCountry && countryCodeMap[normalizedCountry]) {
        detectedCode = countryCodeMap[normalizedCountry];
      } else if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
        // Indian number with code already (91 + 10 digits)
        return '+' + digitsOnly;
      } else if (digitsOnly.startsWith('1') && digitsOnly.length === 11) {
        // US/Canada number with code already (1 + 10 digits)
        return '+' + digitsOnly;
      } else if (digitsOnly.startsWith('44') && digitsOnly.length === 12) {
        // UK number with code already
        return '+' + digitsOnly;
      } else if (digitsOnly.startsWith('0')) {
        // Number starts with 0 (common in India, UK, etc.) - likely needs country code
        // Try to infer from length
        const withoutLeadingZero = digitsOnly.substring(1);
        if (withoutLeadingZero.length === 10) {
          // Most likely Indian mobile (10 digits after removing leading 0)
          detectedCode = '91';
        } else if (withoutLeadingZero.length === 9) {
          // Could be other countries
          detectedCode = ''; // Can't reliably detect
        }
      }
      
      // Format the number
      if (detectedCode) {
        // Remove leading zero if present before adding country code
        const numberWithoutLeadingZero = digitsOnly.startsWith('0') ? digitsOnly.substring(1) : digitsOnly;
        return '+' + detectedCode + numberWithoutLeadingZero;
      }
      
      // Fallback: if number looks reasonable, add + prefix
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        return '+' + digitsOnly;
      }
      
      return '';
    };

    // Extract WhatsApp opt-in consent from form
    const whatsappOptIn = extractFieldFuzzy(answers, [
      'whatsapp_opt_in', 'whatsappOptIn', 'WhatsApp Opt In', 'whatsapp_optin',
      'opt_in', 'optin', 'consent', 'whatsapp_consent', 'marketing_consent',
      'communication_consent', 'sms_opt_in', 'phone_opt_in'
    ]);

    // Convert various opt-in formats to standardized boolean value for Zoho CRM
    const getOptInValue = (value: string): boolean => {
      if (!value) return true; // Default to true if no explicit opt-in field provided
      
      const normalizedValue = value.toLowerCase().trim();
      
      // Handle explicit opt-out values
      if (['no', 'false', '0', 'off', 'unchecked', 'decline', 'reject', 'deny'].includes(normalizedValue)) {
        return false;
      }
      
      // All other cases default to true (opt-in by default)
      return true;
    };

    const whatsappOptInStatus = getOptInValue(whatsappOptIn);
    
    // Determine WhatsApp number: use dedicated WhatsApp field if provided, otherwise use phone/mobile
    const whatsappSourceNumber = whatsappNumber || phone;
    const formattedWhatsApp = formatPhoneWithCountryCode(whatsappSourceNumber, country);
    const formattedPhone = formatPhoneWithCountryCode(phone, country);

    // Build Zoho payload with standard fields
    const registrationTimestamp = new Date().toISOString();
    
    // Create Zoho payload with proper CRM field mapping (using SPACES not underscores)
    const zohoPayload: ZohoPayload = {
      // REQUIRED Core contact fields - Using SPACES as Zoho Flow expects
      "First Name": finalFirstName,
      "Last Name": finalLastName,
      "Full Name": full_name || (finalLastName ? `${finalFirstName} ${finalLastName}` : finalFirstName),
      "Email": email,
      "Phone": formattedPhone || phone, // Use formatted if available, fallback to raw
      "Mobile": formattedPhone || phone, // Use formatted if available, fallback to raw
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
      "Campaign Name": event_name,
      
      // WhatsApp fields - initialized with proper values - sending all possible variations
      "WhatsApp Opt In": whatsappOptInStatus,
      "WhatsApp Opt-In": whatsappOptInStatus, // Alternative with hyphen
      "Whatsapp No": formattedWhatsApp || whatsappSourceNumber || phone || '', // Primary Zoho CRM field
      "WhatsApp No": formattedWhatsApp || whatsappSourceNumber || phone || '', // Capital case variation
      "WhatsApp Number": formattedWhatsApp || whatsappSourceNumber || phone || '', // Alternative field name
      "Whatsapp Number": formattedWhatsApp || whatsappSourceNumber || phone || '', // Another variation
      "whatsapp_no": formattedWhatsApp || whatsappSourceNumber || phone || '', // Snake case variation
      "whatsapp_number": formattedWhatsApp || whatsappSourceNumber || phone || '', // Snake case variation
      
      // Payment fields - will be updated conditionally below
      "Payment Id": '',
      "Razorpay Payment Id": '',
      "Payment Status": event_type === 'paid' ? 'completed' : 'not_required',
      "Mode of Payment": '',
      "Amount": "0",
      "Total Amount": "0"
    };

    // Intelligent field processing with robust mapping and typo tolerance
    for (const [key, value] of Object.entries(answers)) {
      if (value === null || value === '' || value === undefined) continue;
      
      // Use optimized field matcher utility with extracted mapping configuration
      let zohoFieldName = fieldMatcher.findMappedField(key, FIELD_MAPPING);
      
      // If still no match, convert to proper Zoho format as fallback (using spaces)
      if (!zohoFieldName) {
        zohoFieldName = convertToZohoFieldName(key);
      }
      
      // CRITICAL: Never override required fields that are already set
      const isRequiredField = PROTECTED_REQUIRED_FIELDS.includes(zohoFieldName);
      const isWhatsAppField = PROTECTED_WHATSAPP_FIELDS.includes(zohoFieldName);
      
      if (isWhatsAppField) {
        continue; // Never override WhatsApp fields
      } else if (isRequiredField) {
        // For required fields, only update if current value is truly empty
        const currentValue = zohoPayload[zohoFieldName as keyof ZohoPayload];
        const isEmptyValue = !currentValue || 
          (typeof currentValue === 'string' && currentValue.trim() === '') ||
          currentValue === undefined;
          
        if (isEmptyValue) {
          // Type-safe assignment using index signature (validated by PROTECTED_REQUIRED_FIELDS check)
          zohoPayload[zohoFieldName] = String(value).trim();
        }
        // Skip override of required field - already set
      } else {
        // Type-safe assignment with proper type preservation
        // For boolean fields, preserve type; for others, convert to string
        if (typeof value === 'boolean') {
          zohoPayload[zohoFieldName] = value;
        } else {
          zohoPayload[zohoFieldName] = String(value);
        }
      }
    }

    // Note: First Name is already protected via PROTECTED_REQUIRED_FIELDS in the field processing loop above
    
    // Update payment fields with proper Zoho field names (using spaces)
    if (event_type === 'paid' && payment_id) {
      zohoPayload["Payment Id"] = payment_id;
      zohoPayload["Razorpay Payment Id"] = payment_id;
      zohoPayload["Payment Status"] = 'completed';
      zohoPayload["Mode of Payment"] = 'Online';
      
      if (total_amount !== null && total_amount !== undefined) {
        zohoPayload["Amount"] = String(total_amount);
        zohoPayload["Total Amount"] = String(total_amount);
      }
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
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zohoPayload)
      });

      // Read response body to prevent unhandled promises
      const responseText = await response.text();

      if (!response.ok) {
        // Log webhook failures for monitoring (non-blocking)
        console.warn(`Zoho webhook failed: ${response.status} ${response.statusText}`, {
          event_id,
          status: response.status,
          response: responseText.substring(0, 200) // Truncate for security
        });
      }

    } catch (error) {
      // Log webhook errors for monitoring (non-blocking)
      console.error('Zoho webhook request failed:', {
        event_id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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
    // Log internal server errors for monitoring
    console.error('Registration request failed:', {
      event_id: body?.event_id || 'unknown',
      event_name: body?.event_name || 'unknown',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } finally {
    // Explicit cleanup: Clear caches to ensure deterministic memory release
    // While GC will eventually clean up, explicit cleanup is better for serverless environments
    fieldMatcher.clearCache();
  }
}
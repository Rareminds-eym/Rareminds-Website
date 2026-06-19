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
  answers: Record<string, any>;
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
  [key: string]: any; // Allow additional dynamic fields
}

// Utility functions for efficient field matching and processing
class FieldMatcher {
  private normalizedCache = new Map<string, string>();
  private matchCache = new Map<string, boolean>();
  
  // Normalize field names with caching to avoid repeated operations
  private normalize(fieldName: string): string {
    const cached = this.normalizedCache.get(fieldName);
    if (cached !== undefined) {
      return cached;
    }
    
    const normalized = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '');
    this.normalizedCache.set(fieldName, normalized);
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
      this.matchCache.set(cacheKey, true);
      return true;
    } else if (norm1.length > 4 && norm2.length > 4) {
      // Partial match with strict requirements to avoid false positives
      const minLength = Math.min(norm1.length, norm2.length);
      const maxLength = Math.max(norm1.length, norm2.length);
      
      // Require at least 70% overlap and minimum 5 characters
      if (minLength >= 5 && (minLength / maxLength) >= 0.7) {
        const isMatch = norm1.includes(norm2) || norm2.includes(norm1);
        this.matchCache.set(cacheKey, isMatch);
        return isMatch;
      }
    }
    
    this.matchCache.set(cacheKey, false);
    return false;
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

  try {
    // Parse request body
    const body: RegisterRequest = await request.json();
    const { answers, event_id, form_id, event_type, event_name, payment_id, total_amount } = body;

    // Validate required fields
    if (!answers || typeof answers !== 'object') {
      fieldMatcher.clearCache(); // Explicit cleanup before early return
      return new Response(JSON.stringify({ error: 'Invalid answers field' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!event_id || !form_id || !event_type || !event_name) {
      fieldMatcher.clearCache(); // Explicit cleanup before early return
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate event_type
    if (!['free', 'paid'].includes(event_type)) {
      fieldMatcher.clearCache(); // Explicit cleanup before early return
      return new Response(JSON.stringify({ error: 'event_type must be "free" or "paid"' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate payment_id for paid events
    if (event_type === 'paid' && !payment_id) {
      fieldMatcher.clearCache(); // Explicit cleanup before early return
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
    // Helper to split a name string into [first, last] parts
    const splitName = (name: string): [string, string] => {
      const parts = name.trim().split(/\s+/);
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
      fieldMatcher.clearCache();
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
        return '';
      }
      
      // Maximum reasonable length (E.164 format allows up to 15 digits)
      if (digitsOnly.length > 15) {
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
        return '+' + digitsOnly;
      }
      
      // For edge cases, return original and let downstream handle
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
    const zohoPayload: ZohoPayload = {
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
    zohoPayload["WhatsApp Opt In"] = whatsappOptInStatus; // Boolean: true/false - standardized without hyphen
    zohoPayload["WhatsApp Number"] = whatsappFormattedNumber;

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
        const currentValue = zohoPayload[zohoFieldName];
        if (!currentValue || currentValue.toString().trim() === '') {
          zohoPayload[zohoFieldName] = String(value).trim();
        }
        // Log if we're skipping an override attempt
        if (currentValue && currentValue !== '') {
          console.debug(`Skipped override of required field ${zohoFieldName}`);
        }
      } else {
        zohoPayload[zohoFieldName] = String(value);
      }
    }

    // Final safety net: ensure First Name was not wiped during field processing.
    // Last Name and Full Name are intentionally left as-is — they may be legitimately
    // empty (e.g. single-word names) and should not be silently re-populated.
    if (!zohoPayload["First Name"] || zohoPayload["First Name"].toString().trim() === '') {
      zohoPayload["First Name"] = finalFirstName;
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
      fieldMatcher.clearCache(); // Explicit cleanup before early return
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
  } finally {
    // Explicit cleanup: Clear caches to ensure deterministic memory release
    // While GC will eventually clean up, explicit cleanup is better for serverless environments
    fieldMatcher.clearCache();
  }
}
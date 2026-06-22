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

import { FIELD_MAPPING, PROTECTED_REQUIRED_FIELDS, convertToZohoFieldName, ZOHO_PAYLOAD_KEYS, ZohoPayloadKey } from '../constants/fieldMappings';

interface Env {
  ZOHO_FLOW_WEBHOOK_URL: string;
}

interface RegisterRequest {
  /** 
   * Form field answers from the event registration form.
   * Expected value types: string | boolean | number | null
   * - String values are most common (text inputs, select fields)
   * - Boolean values for checkboxes/opt-ins
   * - Number values for numeric inputs
   * - Null for optional empty fields
   */
  answers: Record<string, string | boolean | number | null>;
  event_id: string;
  form_id?: string;
  event_type: 'free' | 'paid';
  event_name: string;
  payment_id: string | null;
  total_amount: number | null;
}

interface ZohoPayload {
  // Exact Zoho CRM webhook fields (no duplicates)
  'Amount': string;
  'Comments': string;
  'Company Name': string;
  'Date Of Birth': string;
  'Department Stream': string;
  'District': string;
  'Email': string;
  'Email Address': string;
  'Event Id': string;
  'Event Name': string;
  'Event Type': string;
  'First Name': string;
  'Form Id': string;
  'How Did You Hear About Us': string;
  'Institution University Name': string;
  'Job Title': string;
  'Last Name': string;
  'Lead Source': string;
  'Linkedin Profile': string;
  'Mobile Number': string;
  'Name': string;
  'Opt In Source': string;
  'Opt In Time': string;
  'Payment Id': string;
  'Payment Status': string;
  'Phone': string;
  'Preferred Date': string;
  'Preferred Language': string;
  'Preferred Time': string;
  'Razorpay Payment Id': string;
  'Referral Code': string;
  'Registration Date': string;
  'Registration Timestamp': string;
  'School College Institution Name': string;
  'State': string;
  'Subject You Teach': string;
  'Teaching Level': string;
  'Total Amount': string;
  'Webinar Name': string;
  'Whatsapp Number': string;
  'WhatsApp Opt-In': boolean | null;  // Note: Zoho uses hyphen, not space
  'Years Of Experience': string;
}

// Type guard to validate Zoho field names before assignment
function isZohoPayloadKey(key: string): key is ZohoPayloadKey {
  return ZOHO_PAYLOAD_KEYS.includes(key as ZohoPayloadKey);
}

// Type-safe helper to assign validated fields to Zoho payload
// Only call this AFTER validating with isZohoPayloadKey()
// Uses explicit switch-case for compile-time type safety without type assertions
function assignToZohoPayload(
  payload: ZohoPayload,
  key: ZohoPayloadKey,
  value: string | boolean | null
): void {
  // Runtime type validation
  if (key === 'WhatsApp Opt-In') {
    if (typeof value === 'boolean' || value === null) {
      payload['WhatsApp Opt-In'] = value;
    } else {
      logWarningOnce(
        `type-mismatch-whatsapp-optin`,
        `Type mismatch for WhatsApp Opt-In: expected boolean or null, got ${typeof value}`
      );
    }
    return;
  }
  
  // All other fields must be strings
  if (typeof value !== 'string') {
    logWarningOnce(
      `type-mismatch-${key}`,
      `Type mismatch for field "${key}": expected string, got ${typeof value}. Value will be ignored.`
    );
    return;
  }
  
  // Explicit assignment for each field ensures type safety without assertions
  // TypeScript verifies each assignment matches the interface definition
  switch (key) {
    case 'Amount': payload['Amount'] = value; break;
    case 'Comments': payload['Comments'] = value; break;
    case 'Company Name': payload['Company Name'] = value; break;
    case 'Date Of Birth': payload['Date Of Birth'] = value; break;
    case 'Department Stream': payload['Department Stream'] = value; break;
    case 'District': payload['District'] = value; break;
    case 'Email': payload['Email'] = value; break;
    case 'Email Address': payload['Email Address'] = value; break;
    case 'Event Id': payload['Event Id'] = value; break;
    case 'Event Name': payload['Event Name'] = value; break;
    case 'Event Type': payload['Event Type'] = value; break;
    case 'First Name': payload['First Name'] = value; break;
    case 'Form Id': payload['Form Id'] = value; break;
    case 'How Did You Hear About Us': payload['How Did You Hear About Us'] = value; break;
    case 'Institution University Name': payload['Institution University Name'] = value; break;
    case 'Job Title': payload['Job Title'] = value; break;
    case 'Last Name': payload['Last Name'] = value; break;
    case 'Lead Source': payload['Lead Source'] = value; break;
    case 'Linkedin Profile': payload['Linkedin Profile'] = value; break;
    case 'Mobile Number': payload['Mobile Number'] = value; break;
    case 'Name': payload['Name'] = value; break;
    case 'Opt In Source': payload['Opt In Source'] = value; break;
    case 'Opt In Time': payload['Opt In Time'] = value; break;
    case 'Payment Id': payload['Payment Id'] = value; break;
    case 'Payment Status': payload['Payment Status'] = value; break;
    case 'Phone': payload['Phone'] = value; break;
    case 'Preferred Date': payload['Preferred Date'] = value; break;
    case 'Preferred Language': payload['Preferred Language'] = value; break;
    case 'Preferred Time': payload['Preferred Time'] = value; break;
    case 'Razorpay Payment Id': payload['Razorpay Payment Id'] = value; break;
    case 'Referral Code': payload['Referral Code'] = value; break;
    case 'Registration Date': payload['Registration Date'] = value; break;
    case 'Registration Timestamp': payload['Registration Timestamp'] = value; break;
    case 'School College Institution Name': payload['School College Institution Name'] = value; break;
    case 'State': payload['State'] = value; break;
    case 'Subject You Teach': payload['Subject You Teach'] = value; break;
    case 'Teaching Level': payload['Teaching Level'] = value; break;
    case 'Total Amount': payload['Total Amount'] = value; break;
    case 'Webinar Name': payload['Webinar Name'] = value; break;
    case 'Whatsapp Number': payload['Whatsapp Number'] = value; break;
    case 'Years Of Experience': payload['Years Of Experience'] = value; break;
    // 'WhatsApp Opt-In' already handled above
  }
}

// Regex constants for validation and formatting
const REGEX_NON_ALPHANUMERIC = /[^a-z0-9]/g;
const REGEX_NON_DIGIT = /\D/g;
const REGEX_WHITESPACE = /\s+/;

// Comprehensive country code mapping with ISO codes
const countryCodeMap: Record<string, { code: string; iso: string; lengths: number[] }> = {
  'india': { code: '91', iso: 'IN', lengths: [10] },
  'indian': { code: '91', iso: 'IN', lengths: [10] },
  'in': { code: '91', iso: 'IN', lengths: [10] },
  'bharat': { code: '91', iso: 'IN', lengths: [10] },
  
  'pakistan': { code: '92', iso: 'PK', lengths: [10] },
  'pk': { code: '92', iso: 'PK', lengths: [10] },
  
  'bangladesh': { code: '880', iso: 'BD', lengths: [10] },
  'bd': { code: '880', iso: 'BD', lengths: [10] },
  
  'sri lanka': { code: '94', iso: 'LK', lengths: [9] },
  'lk': { code: '94', iso: 'LK', lengths: [9] },
  
  'nepal': { code: '977', iso: 'NP', lengths: [10] },
  'np': { code: '977', iso: 'NP', lengths: [10] },
  
  'united states': { code: '1', iso: 'US', lengths: [10] },
  'usa': { code: '1', iso: 'US', lengths: [10] },
  'us': { code: '1', iso: 'US', lengths: [10] },
  'america': { code: '1', iso: 'US', lengths: [10] },
  
  'canada': { code: '1', iso: 'CA', lengths: [10] },
  'ca': { code: '1', iso: 'CA', lengths: [10] },
  
  'united kingdom': { code: '44', iso: 'GB', lengths: [10] },
  'uk': { code: '44', iso: 'GB', lengths: [10] },
  'britain': { code: '44', iso: 'GB', lengths: [10] },
  'england': { code: '44', iso: 'GB', lengths: [10] },
  'gb': { code: '44', iso: 'GB', lengths: [10] },
  
  'australia': { code: '61', iso: 'AU', lengths: [9] },
  'au': { code: '61', iso: 'AU', lengths: [9] },
  
  'china': { code: '86', iso: 'CN', lengths: [11, 12] },
  'cn': { code: '86', iso: 'CN', lengths: [11, 12] },
  
  'japan': { code: '81', iso: 'JP', lengths: [10] },
  'jp': { code: '81', iso: 'JP', lengths: [10] },
  
  'germany': { code: '49', iso: 'DE', lengths: [10, 11] },
  'de': { code: '49', iso: 'DE', lengths: [10, 11] },
  
  'france': { code: '33', iso: 'FR', lengths: [9] },
  'fr': { code: '33', iso: 'FR', lengths: [9] },
  
  'italy': { code: '39', iso: 'IT', lengths: [9, 10] },
  'it': { code: '39', iso: 'IT', lengths: [9, 10] },
  
  'spain': { code: '34', iso: 'ES', lengths: [9] },
  'es': { code: '34', iso: 'ES', lengths: [9] },
  
  'brazil': { code: '55', iso: 'BR', lengths: [10, 11] },
  'br': { code: '55', iso: 'BR', lengths: [10, 11] },
  
  'mexico': { code: '52', iso: 'MX', lengths: [10] },
  'mx': { code: '52', iso: 'MX', lengths: [10] },
  
  'uae': { code: '971', iso: 'AE', lengths: [9] },
  'dubai': { code: '971', iso: 'AE', lengths: [9] },
  'ae': { code: '971', iso: 'AE', lengths: [9] },
  
  'saudi arabia': { code: '966', iso: 'SA', lengths: [9] },
  'sa': { code: '966', iso: 'SA', lengths: [9] },
  
  'south africa': { code: '27', iso: 'ZA', lengths: [9] },
  'za': { code: '27', iso: 'ZA', lengths: [9] },
  
  'nigeria': { code: '234', iso: 'NG', lengths: [10] },
  'ng': { code: '234', iso: 'NG', lengths: [10] },
  
  'indonesia': { code: '62', iso: 'ID', lengths: [9, 10, 11] },
  'id': { code: '62', iso: 'ID', lengths: [9, 10, 11] },
  
  'philippines': { code: '63', iso: 'PH', lengths: [10] },
  'ph': { code: '63', iso: 'PH', lengths: [10] },
  
  'singapore': { code: '65', iso: 'SG', lengths: [8] },
  'sg': { code: '65', iso: 'SG', lengths: [8] },
  
  'malaysia': { code: '60', iso: 'MY', lengths: [9, 10] },
  'my': { code: '60', iso: 'MY', lengths: [9, 10] }
};

// Warning deduplication cache to prevent log spam
// Stores unique warning keys with timestamps for rate limiting
const warningCache = new Map<string, number>();
const MAX_CACHE_SIZE = 100;
const WARNING_COOLDOWN_MS = 60000; // 1 minute cooldown per unique warning

// Helper to log warnings with rate limiting
function logWarningOnce(key: string, message: string): void {
  const now = Date.now();
  const lastWarned = warningCache.get(key);
  
  if (!lastWarned || (now - lastWarned) > WARNING_COOLDOWN_MS) {
    console.warn(message);
    warningCache.set(key, now);
    
    // Eviction strategy: remove stale entries first, then oldest 20% if still over limit
    // This preserves recent rate-limiting state and prevents log spam spikes
    if (warningCache.size > MAX_CACHE_SIZE) {
      const staleThreshold = now - WARNING_COOLDOWN_MS * 2;
      const entriesToDelete = Array.from(warningCache.entries())
        .filter(([_, timestamp]) => timestamp < staleThreshold)
        .map(([cacheKey]) => cacheKey);
      
      entriesToDelete.forEach(cacheKey => warningCache.delete(cacheKey));
      
      // If still over limit after removing stale entries, remove oldest 20% by insertion order
      if (warningCache.size > MAX_CACHE_SIZE) {
        const keysToDelete = Array.from(warningCache.keys())
          .slice(0, Math.ceil(MAX_CACHE_SIZE * 0.2));
        keysToDelete.forEach(cacheKey => warningCache.delete(cacheKey));
      }
    }
  }
}

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
    
    // Smart cache eviction: remove oldest 20% of entries instead of clearing everything
    // This preserves 80% of cached computations and avoids performance cliff
    if (this.normalizedCache.size >= FieldMatcher.MAX_CACHE_SIZE) {
      const keysToDelete = Array.from(this.normalizedCache.keys()).slice(0, Math.ceil(FieldMatcher.MAX_CACHE_SIZE * 0.2));
      keysToDelete.forEach(key => this.normalizedCache.delete(key));
    }
    this.normalizedCache.set(fieldName, normalized);
    
    return normalized;
  }
  
  // Space-optimized Levenshtein distance (O(min(n,m)) space instead of O(n*m))
  private levenshtein(a: string, b: string): number {
    // Ensure 'b' is the shorter string so rows are minimal size
    if (a.length < b.length) {
      [a, b] = [b, a];
    }
    
    const bLen = b.length;
    let prev = new Array<number>(bLen + 1);
    let curr = new Array<number>(bLen + 1);
    
    // Initialize first row
    for (let i = 0; i <= bLen; i++) {
      prev[i] = i;
    }
    
    for (let j = 1; j <= a.length; j++) {
      curr[0] = j;
      for (let i = 1; i <= bLen; i++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          curr[i] = prev[i - 1];
        } else {
          curr[i] = Math.min(
            prev[i - 1] + 1, // substitution
            prev[i] + 1,     // insertion
            curr[i - 1] + 1  // deletion
          );
        }
      }
      // Swap rows — no allocation or copying needed
      [prev, curr] = [curr, prev];
    }
    
    return prev[bLen];
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
    }
    
    // Levenshtein distance-based fuzzy matching
    if (norm1.length > FieldMatcher.MIN_FIELD_LENGTH_FOR_FUZZY_MATCH && 
        norm2.length > FieldMatcher.MIN_FIELD_LENGTH_FOR_FUZZY_MATCH) {
      const maxLength = Math.max(norm1.length, norm2.length);
      const distance = this.levenshtein(norm1, norm2);
      const similarity = 1 - (distance / maxLength);
      
      // Only consider fields a match if similarity >= 0.7
      const isMatch = similarity >= FieldMatcher.SIMILARITY_THRESHOLD;
      this.setCacheIfSpace(cacheKey, isMatch);
      return isMatch;
    }
    
    this.setCacheIfSpace(cacheKey, false);
    return false;
  }
  
  // Helper to set cache with active size enforcement
  private setCacheIfSpace(key: string, value: boolean): void {
    // Smart cache eviction: remove oldest 20% of entries instead of clearing everything
    // This preserves expensive Levenshtein distance computations
    if (this.matchCache.size >= FieldMatcher.MAX_CACHE_SIZE) {
      const keysToDelete = Array.from(this.matchCache.keys()).slice(0, Math.ceil(FieldMatcher.MAX_CACHE_SIZE * 0.2));
      keysToDelete.forEach(cacheKey => this.matchCache.delete(cacheKey));
    }
    this.matchCache.set(key, value);
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
    const normalizedKey = this.normalize(fieldName);
    
    // Try direct mapping first (on normalized key)
    const directMatch = fieldMapping[normalizedKey];
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
  let body: RegisterRequest | undefined;

  try {
    // Parse request body
    body = await request.json();
    
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      console.warn('[Register] Invalid request body');
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const { answers, event_id, form_id, event_type, event_name, payment_id, total_amount } = body;

    console.log('[Register] Incoming request:', JSON.stringify({
      event_id, form_id: form_id || '(not set)', event_type, event_name,
      answerCount: answers ? Object.keys(answers).length : 0,
      answerKeys: answers ? Object.keys(answers) : [],
      hasPaymentId: !!payment_id, total_amount
    }));

    // Validate required fields
    if (!answers || typeof answers !== 'object') {
      console.warn('[Register] Invalid answers field');
      return new Response(JSON.stringify({ error: 'Invalid answers field' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!event_id || !event_type || !event_name) {
      console.warn('[Register] Missing required fields:', { event_id, event_type, event_name });
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate event_type
    if (!['free', 'paid'].includes(event_type)) {
      console.warn('[Register] Invalid event_type:', event_type);
      return new Response(JSON.stringify({ error: 'event_type must be "free" or "paid"' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate payment_id for paid events
    if (event_type === 'paid' && !payment_id) {
      console.warn('[Register] Paid event missing payment_id');
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
    ]) || 'India'; // Default to India if no country specified

    console.log('[Register] Extracted fields:', JSON.stringify({
      first_name, last_name, full_name, email, phone, whatsappNumber, country
    }));

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

    // Validate email format
    if (!email || email.trim() === '') {
      return new Response(JSON.stringify({ 
        error: 'Email is required for registration',
        message: 'Please provide a valid email address'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Basic email validation (RFC 5322 simplified) - require at least 2 characters in TLD
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate phone number exists
    if (!phone || phone.trim() === '') {
      return new Response(JSON.stringify({ 
        error: 'Phone number is required for registration',
        message: 'Please provide a valid phone number'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const formatPhoneWithCountryCode = (phoneNumber: string, countryName: string): string => {
      if (!phoneNumber) return '';
      
      const cleanNumber = phoneNumber.trim();
      const digitsOnly = cleanNumber.replace(REGEX_NON_DIGIT, '');
      
      if (digitsOnly.length < 7) {
        logWarningOnce(`phone-short-${digitsOnly.length}`, `Phone number too short: ${digitsOnly.length} digits`);
        return '';
      }
      
      if (digitsOnly.length > 15) {
        logWarningOnce(`phone-long-${digitsOnly.length}`, `Phone number too long: ${digitsOnly.length} digits`);
        return '';
      }
      
      if (cleanNumber.startsWith('+')) {
        const internationalDigits = cleanNumber.substring(1).replace(REGEX_NON_DIGIT, '');
        if (internationalDigits.length >= 7 && internationalDigits.length <= 15) {
          return '+' + internationalDigits;
        }
        return '';
      }
      
      const normalized = countryName.toLowerCase().trim();
      const countryInfo = countryCodeMap[normalized];
      
      if (countryInfo) {
        let nationalNumber = digitsOnly;
        
        if (nationalNumber.startsWith('0')) {
          nationalNumber = nationalNumber.substring(1);
        }
        
        if (nationalNumber.startsWith(countryInfo.code)) {
          return '+' + nationalNumber;
        }
        
        const isValidLength = countryInfo.lengths.includes(nationalNumber.length);
        if (isValidLength) {
          return '+' + countryInfo.code + nationalNumber;
        }
        
        logWarningOnce(
          `phone-length-${countryInfo.iso}`,
          `Invalid phone length for ${countryInfo.iso}: expected ${countryInfo.lengths.join(' or ')}, got ${nationalNumber.length}`
        );
      } else if (countryName) {
        logWarningOnce(
          `unknown-country-${normalized}`,
          `Unknown country: "${countryName}". Add to countryCodeMap or ensure country field uses standard names (e.g., "India", "United States").`
        );
      }
      
      return '+' + digitsOnly;
    };

    // Determine WhatsApp number: use dedicated WhatsApp field if provided, otherwise use phone/mobile
    const whatsappSourceNumber = whatsappNumber || phone;
    const formattedWhatsApp = formatPhoneWithCountryCode(whatsappSourceNumber, country);
    const formattedPhone = formatPhoneWithCountryCode(phone, country);

    // Build Zoho payload with exact webhook field mapping
    const registrationTimestamp = new Date().toISOString();
    const registrationDate = registrationTimestamp.split('T')[0];
    
    // Determine best phone number for each field with clear fallback and validation
    let phoneValue = formattedPhone;
    if (!phoneValue && phone) {
      // Only use raw phone if it contains at least 7 digits (minimum valid phone length)
      const digitsOnly = phone.replace(REGEX_NON_DIGIT, '');
      if (digitsOnly.length >= 7) {
        // Use rate-limited warning to avoid log spam in high-volume scenarios
        logWarningOnce(
          `phone-format-fallback-${event_id}`,
          `[Event ${event_id}] Phone formatting failed - using raw value. ` +
          `Original: "${phone}", Country: "${country || 'not provided'}". ` +
          `Add 'country' field to form for accurate international formatting.`
        );
        phoneValue = phone;
      } else {
        // Phone has too few digits, skip it entirely
        phoneValue = '';
      }
    }
    
    let whatsappValue = formattedWhatsApp;
    if (!whatsappValue && whatsappSourceNumber) {
      // Only use raw WhatsApp number if it contains at least 7 digits
      const digitsOnly = whatsappSourceNumber.replace(REGEX_NON_DIGIT, '');
      if (digitsOnly.length >= 7) {
        if (whatsappSourceNumber !== phone) {
          // Rate-limited warning for WhatsApp-specific formatting failures
          logWarningOnce(
            `whatsapp-format-fallback-${event_id}`,
            `[Event ${event_id}] WhatsApp formatting failed - using raw value. ` +
            `Original: "${whatsappSourceNumber}", Country: "${country || 'not provided'}". ` +
            `Add 'country' field to form for accurate international formatting.`
          );
        }
        whatsappValue = whatsappSourceNumber;
      } else {
        // Fallback to phone value if WhatsApp number is invalid
        whatsappValue = phoneValue;
      }
    }
    
    // Create Zoho payload matching exact webhook fields (no duplicates)
    const zohoPayload: ZohoPayload = {
      // Core contact fields
      "Name": full_name || (finalLastName ? `${finalFirstName} ${finalLastName}` : finalFirstName),
      "First Name": finalFirstName,
      "Last Name": finalLastName,
      "Email": email,
      "Email Address": email,
      "Phone": phoneValue,
      "Mobile Number": phoneValue,
      
      // WhatsApp fields (will be populated from form data via field mapping)
      "WhatsApp Opt-In": null, // Default to null - unknown consent (distinct from false which is explicit opt-out)
      "Whatsapp Number": whatsappValue,
      "Opt In Source": '',
      "Opt In Time": '',
      
      // Event metadata
      "Event Id": event_id,
      "Event Name": event_name,
      "Event Type": event_type,
      "Webinar Name": event_name,
      "Form Id": form_id ?? '',
      
      // Registration tracking
      "Registration Date": registrationDate,
      "Registration Timestamp": registrationTimestamp,
      
      // Lead source
      "Lead Source": event_type === 'paid' ? 'Paid Event' : 'Free Event',
      
      // Payment fields (will be updated conditionally below)
      "Payment Id": '',
      "Razorpay Payment Id": '',
      "Payment Status": event_type === 'paid' ? 'completed' : 'not_required',
      "Amount": '0',
      "Total Amount": '0',
      
      // Optional fields (will be populated from form data)
      "Company Name": '',
      "Job Title": '',
      "Department Stream": '',
      "Subject You Teach": '',
      "Teaching Level": '',
      "Years Of Experience": '',
      "School College Institution Name": '',
      "Institution University Name": '',
      "State": '',
      "District": '',
      "How Did You Hear About Us": '',
      "Preferred Date": '',
      "Preferred Time": '',
      "Preferred Language": '',
      "Linkedin Profile": '',
      "Referral Code": '',
      "Date Of Birth": '',
      "Comments": ''
    };

    // Intelligent field processing with robust mapping and typo tolerance
    // Collect skipped fields to reduce log spam
    const skippedFields: string[] = [];
    
    // Helper to convert opt-in values to tri-state: true (explicit yes), false (explicit no), null (unanswered/absent)
    const convertToOptInState = (value: unknown): boolean | null => {
      // null or undefined = field absent/unanswered
      if (value === null || value === undefined) return null;
      
      // Boolean values pass through
      if (typeof value === 'boolean') return value;
      
      // Empty string = unanswered
      if (value === '') return null;
      
      const normalizedValue = String(value).toLowerCase().trim();
      
      // Empty after normalization = unanswered
      if (normalizedValue === '') return null;
      
      // Handle explicit opt-in values (yes)
      if (['yes', 'true', '1', 'on', 'checked', 'accept', 'agree', 'consent'].includes(normalizedValue)) {
        return true;
      }
      
      // Handle explicit opt-out values (no/decline)
      if (['no', 'false', '0', 'off', 'unchecked', 'decline', 'reject', 'deny'].includes(normalizedValue)) {
        return false;
      }
      
      // Unknown/ambiguous values default to null (unknown consent)
      return null;
    };
    
    for (const [key, value] of Object.entries(answers)) {
      if (value === null || value === '' || value === undefined) continue;
      
      // Use optimized field matcher utility with extracted mapping configuration
      let zohoFieldName = fieldMatcher.findMappedField(key, FIELD_MAPPING);
      
      // If still no match, convert to proper Zoho format as fallback (using spaces)
      if (!zohoFieldName) {
        zohoFieldName = convertToZohoFieldName(key);
      }
      
      // Validate that the mapped field name is a valid Zoho payload key
      if (!isZohoPayloadKey(zohoFieldName)) {
        skippedFields.push(`${key} -> ${zohoFieldName}`);
        continue;
      }
      
      // Special handling for WhatsApp Opt In - convert to tri-state and set opt-in metadata
      if (zohoFieldName === 'WhatsApp Opt-In') {
        const optInValue = convertToOptInState(value);
        zohoPayload["WhatsApp Opt-In"] = optInValue;
        
        // Set opt-in metadata only if explicit consent given (true)
        if (optInValue === true) {
          zohoPayload["Opt In Source"] = 'Website Form';
          zohoPayload["Opt In Time"] = registrationTimestamp;
        }
        // Note: optInValue can be true (explicit yes), false (explicit no), or null (unknown)
        // Do not collapse null into false - they have distinct meanings
        continue;
      }
      
      // CRITICAL: Never override required fields that are already set
      const isRequiredField = PROTECTED_REQUIRED_FIELDS.includes(zohoFieldName);
      const isWhatsAppNumberField = zohoFieldName === 'Whatsapp Number';
      
      if (isWhatsAppNumberField) {
        continue; // Never override WhatsApp Number - already formatted
      } else if (isRequiredField) {
        // For required fields, only update if current value is truly empty
        const currentValue = zohoPayload[zohoFieldName];
        const isEmptyValue = !currentValue || 
          (typeof currentValue === 'string' && currentValue.trim() === '') ||
          currentValue === undefined;
          
        if (isEmptyValue) {
          // Type-safe assignment using helper - zohoFieldName validated by isZohoPayloadKey
          const assignValue = typeof value === 'boolean' ? value : String(value).trim();
          assignToZohoPayload(zohoPayload, zohoFieldName, assignValue);
        }
        // Skip override of required field - already set
      } else {
        // Type-safe assignment using helper - zohoFieldName validated by isZohoPayloadKey
        const assignValue = typeof value === 'boolean' ? value : String(value);
        assignToZohoPayload(zohoPayload, zohoFieldName, assignValue);
      }
    }
    
    // Log skipped fields with truncation to first 10 fields
    if (skippedFields.length > 0) {
      const displayFields = skippedFields.slice(0, 10);
      const remainingCount = skippedFields.length - 10;
      const fieldsList = remainingCount > 0 
        ? `${displayFields.join(', ')}, ...and ${remainingCount} more`
        : displayFields.join(', ');
      
      console.warn(
        `Skipped ${skippedFields.length} invalid Zoho field(s) for event ${event_id}: ${fieldsList}`
      );
    }
    
    // COMPLIANCE WORKAROUND - Temporary fallback with enforced removal date
    // CONTEXT: Legacy forms without explicit WhatsApp Opt-In checkbox
    // ASSUMPTION: WhatsApp number provision implies consent (may violate GDPR/data protection laws)
    // RISK: Implicit consent assumption does not meet compliance standards
    // TRACKING: Create issue at your issue tracker before deploying
    // REMOVAL: This workaround expires 2026-07-01 and will throw runtime error
    const WORKAROUND_REMOVAL_DATE = new Date('2026-07-01');
    
    if (Date.now() > WORKAROUND_REMOVAL_DATE.getTime()) {
      throw new Error(
        'COMPLIANCE VIOLATION: Implicit consent workaround expired. ' +
        'All forms must include explicit WhatsApp Opt-In field. ' +
        'Remove this workaround code and verify all active forms send opt-in values.'
      );
    }
    
    if (zohoPayload["WhatsApp Opt-In"] === null) {
      const hasWhatsAppNumber = zohoPayload["Whatsapp Number"] && zohoPayload["Whatsapp Number"].trim() !== '';
      const hasEmail = zohoPayload["Email"] && zohoPayload["Email"].trim() !== '';
      const hasName = zohoPayload["First Name"] && zohoPayload["First Name"].trim() !== '';
      
      // Only apply workaround if user provided WhatsApp number (implicit consent indicator)
      // This should be removed once all forms properly send explicit opt-in values
      if (hasWhatsAppNumber && hasEmail && hasName) {
        zohoPayload["WhatsApp Opt-In"] = true;
        zohoPayload["Opt In Source"] = 'Website Form (Legacy Implicit)';
        zohoPayload["Opt In Time"] = registrationTimestamp;
        
        // Log implicit consent usage for compliance audit trail
        console.warn(
          `COMPLIANCE: Implicit WhatsApp consent applied for event ${event_id}. ` +
          `Form ${form_id || 'unknown'} lacks explicit opt-in field. Update form before ${WORKAROUND_REMOVAL_DATE.toISOString().split('T')[0]}.`
        );
      }
    }

    // Note: First Name is already protected via PROTECTED_REQUIRED_FIELDS in the field processing loop above
    
    // Update payment fields with proper Zoho field names
    if (event_type === 'paid' && payment_id) {
      zohoPayload["Payment Id"] = payment_id;
      zohoPayload["Razorpay Payment Id"] = payment_id;
      zohoPayload["Payment Status"] = 'completed';
      
      if (total_amount !== null && total_amount !== undefined) {
        zohoPayload["Amount"] = String(total_amount);
        zohoPayload["Total Amount"] = String(total_amount);
      }
    }

    // Send to Zoho Flow webhook
    if (!env.ZOHO_FLOW_WEBHOOK_URL) {
      console.log('[Register] ZOHO_FLOW_WEBHOOK_URL not configured, skipping Zoho submission');
      return new Response(JSON.stringify({
        success: true,
        message: 'Registration processed (Zoho webhook not configured)'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('[Register] Sending to Zoho Flow webhook:', JSON.stringify({
      event_id,
      name: zohoPayload["First Name"],
      email: zohoPayload["Email"],
      phone: zohoPayload["Phone"],
      payloadKeyCount: Object.keys(zohoPayload).filter(k => zohoPayload[k as keyof ZohoPayload]).length,
    }));

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
        console.warn(`[Register] Zoho webhook failed: ${response.status} ${response.statusText}`, {
          event_id,
          status: response.status,
          response: responseText.substring(0, 200)
        });
      } else {
        console.log('[Register] Zoho webhook success:', responseText.substring(0, 200));
      }

    } catch (error) {
      // Log webhook errors for monitoring (non-blocking)
      console.error('[Register] Zoho webhook request failed:', {
        event_id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Return success
    console.log('[Register] Registration complete:', { event_id, email });
    return new Response(JSON.stringify({
      success: true,
      message: 'Registration processed and sent to Zoho CRM'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[Register] Internal error:', {
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
  }
  // Note: fieldMatcher is request-scoped and will be garbage collected automatically
  // No explicit cleanup needed
}
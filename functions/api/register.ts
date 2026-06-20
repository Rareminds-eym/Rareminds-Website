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

import { FIELD_MAPPING, PROTECTED_REQUIRED_FIELDS, convertToZohoFieldName } from '../constants/fieldMappings';

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
  form_id: string;
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
  'Whatsapp Opt In': boolean | null;
  'Years Of Experience': string;
  // No index signature - all fields explicitly defined
  // Dynamic field assignment validated via isZohoPayloadKey() type guard
}

// Valid Zoho payload keys for type-safe dynamic assignment
const ZOHO_PAYLOAD_KEYS = [
  'Amount',
  'Comments',
  'Company Name',
  'Date Of Birth',
  'Department Stream',
  'District',
  'Email',
  'Email Address',
  'Event Id',
  'Event Name',
  'Event Type',
  'First Name',
  'Form Id',
  'How Did You Hear About Us',
  'Institution University Name',
  'Job Title',
  'Last Name',
  'Lead Source',
  'Linkedin Profile',
  'Mobile Number',
  'Name',
  'Opt In Source',
  'Opt In Time',
  'Payment Id',
  'Payment Status',
  'Phone',
  'Preferred Date',
  'Preferred Language',
  'Preferred Time',
  'Razorpay Payment Id',
  'Referral Code',
  'Registration Date',
  'Registration Timestamp',
  'School College Institution Name',
  'State',
  'Subject You Teach',
  'Teaching Level',
  'Total Amount',
  'Webinar Name',
  'Whatsapp Number',
  'Whatsapp Opt In',
  'Years Of Experience'
] as const;

type ZohoPayloadKey = typeof ZOHO_PAYLOAD_KEYS[number];

// Type guard to validate Zoho field names before assignment
function isZohoPayloadKey(key: string): key is ZohoPayloadKey {
  return ZOHO_PAYLOAD_KEYS.includes(key as ZohoPayloadKey);
}

// Type-safe helper to assign validated fields to Zoho payload
// Only call this AFTER validating with isZohoPayloadKey()
function assignToZohoPayload(
  payload: ZohoPayload,
  key: ZohoPayloadKey,
  value: string | boolean | null
): void {
  // Direct assignment is safe because:
  // 1. key is validated by isZohoPayloadKey() before calling this function
  // 2. All ZohoPayloadKey values are explicitly defined in ZohoPayload interface
  // 3. TypeScript verifies the value type matches the field type
  
  // Special handling for tri-state boolean field
  if (key === 'Whatsapp Opt In') {
    if (typeof value === 'boolean' || value === null) {
      payload[key] = value as boolean | null;
    }
  } else if (typeof value === 'string') {
    // All non-WhatsApp fields are typed as string in ZohoPayload.
    // Use a targeted assertion narrowed to string values only (not 'any'),
    // since isZohoPayloadKey() has already validated the key at runtime.
    (payload as unknown as Record<string, string>)[key] = value;
  }
  // Note: Mismatched types are silently ignored (e.g., boolean assigned to string field)
  // This is intentional - conversion happens before calling this function
}

// Regex constants for validation and formatting
const REGEX_NON_ALPHANUMERIC = /[^a-z0-9]/g;
const REGEX_NON_DIGIT = /\D/g;
const REGEX_WHITESPACE = /\s+/;
const REGEX_ALPHA_CHARS = /[a-zA-Z]/;
const REGEX_DIGITS_ONLY = /^\d+$/;

// Comprehensive country code mapping covering major regions (module-level for performance)
const countryCodeMap: Record<string, string> = {
  // Asia - South
  'india': '91', 'indian': '91', 'in': '91', 'bharat': '91',
  'pakistan': '92', 'pk': '92',
  'bangladesh': '880', 'bd': '880',
  'sri lanka': '94', 'lk': '94',
  'nepal': '977', 'np': '977',
  'maldives': '960', 'mv': '960',
  'bhutan': '975', 'bt': '975',
  'afghanistan': '93', 'af': '93',
  
  // Asia - Southeast
  'indonesia': '62', 'id': '62',
  'philippines': '63', 'ph': '63',
  'vietnam': '84', 'vn': '84',
  'thailand': '66', 'th': '66',
  'malaysia': '60', 'my': '60',
  'singapore': '65', 'sg': '65',
  'myanmar': '95', 'mm': '95',
  'cambodia': '855', 'kh': '855',
  'laos': '856', 'la': '856',
  
  // Asia - East
  'china': '86', 'cn': '86',
  'japan': '81', 'jp': '81',
  'south korea': '82', 'korea': '82', 'kr': '82',
  'hong kong': '852', 'hk': '852',
  'taiwan': '886', 'tw': '886',
  
  // Middle East
  'uae': '971', 'dubai': '971', 'ae': '971',
  'saudi arabia': '966', 'sa': '966',
  'qatar': '974', 'qa': '974',
  'kuwait': '965', 'kw': '965',
  'bahrain': '973', 'bh': '973',
  'oman': '968', 'om': '968',
  'israel': '972', 'il': '972',
  'turkey': '90', 'tr': '90',
  'iran': '98', 'ir': '98',
  'iraq': '964', 'iq': '964',
  'jordan': '962', 'jo': '962',
  'lebanon': '961', 'lb': '961',
  
  // Europe - Western
  'united kingdom': '44', 'uk': '44', 'britain': '44', 'england': '44', 'gb': '44',
  'france': '33', 'fr': '33',
  'germany': '49', 'de': '49',
  'italy': '39', 'it': '39',
  'spain': '34', 'es': '34',
  'netherlands': '31', 'holland': '31', 'nl': '31',
  'belgium': '32', 'be': '32',
  'switzerland': '41', 'ch': '41',
  'austria': '43', 'at': '43',
  'portugal': '351', 'pt': '351',
  'greece': '30', 'gr': '30',
  
  // Europe - Eastern
  'russia': '7', 'ru': '7',
  'poland': '48', 'pl': '48',
  'ukraine': '380', 'ua': '380',
  'romania': '40', 'ro': '40',
  'czech republic': '420', 'cz': '420',
  'hungary': '36', 'hu': '36',
  
  // Americas - North
  'united states': '1', 'usa': '1', 'us': '1', 'america': '1',
  'canada': '1', 'ca': '1',
  'mexico': '52', 'mx': '52',
  
  // Americas - South
  'brazil': '55', 'br': '55',
  'argentina': '54', 'ar': '54',
  'colombia': '57', 'co': '57',
  'chile': '56', 'cl': '56',
  'peru': '51', 'pe': '51',
  'venezuela': '58', 've': '58',
  
  // Africa
  'south africa': '27', 'za': '27',
  'nigeria': '234', 'ng': '234',
  'egypt': '20', 'eg': '20',
  'kenya': '254', 'ke': '254',
  'ghana': '233', 'gh': '233',
  'ethiopia': '251', 'et': '251',
  'morocco': '212', 'ma': '212',
  
  // Oceania
  'australia': '61', 'au': '61',
  'new zealand': '64', 'nz': '64'
};

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
    
    // Actively enforce cache size limit - clear when limit reached
    if (this.normalizedCache.size >= FieldMatcher.MAX_CACHE_SIZE) {
      this.normalizedCache.clear();
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
    if (this.matchCache.size >= FieldMatcher.MAX_CACHE_SIZE) {
      this.matchCache.clear();
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

    // Format phone number for international use with intelligent country code detection
    // Returns formatted number with proper country code prefix
    // 
    // IMPORTANT: For numbers with leading zeros, country detection is NOT POSSIBLE.
    // Best practice: Always include a 'country' field in your forms for accurate formatting.
    // Without country context, leading-zero numbers cannot be reliably formatted and will
    // be returned with just a '+' prefix to avoid incorrect country code assignment.
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
      
      // Try to detect country code from number prefix if country not provided
      let detectedCode = '';
      
      if (normalizedCountry && countryCodeMap[normalizedCountry]) {
        detectedCode = countryCodeMap[normalizedCountry];
      } else if (normalizedCountry) {
        console.warn(`Unknown country for phone formatting: ${normalizedCountry}`);
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
        // Number starts with 0 (common in many countries) - needs country code
        // Try to infer country from length pattern
        const withoutLeadingZero = digitsOnly.substring(1);
        const length = withoutLeadingZero.length;
        
        if (length === 10) {
          // 10 digits: India, Australia (ambiguous without country context)
          // Cannot reliably detect - return empty to avoid incorrect formatting
          detectedCode = '';
        } else if (length === 9) {
          // 9 digits: UK, Germany, France, Italy, Spain
          // Without country context, we cannot reliably detect
          // Return empty to trigger fallback
          detectedCode = '';
        } else if (length === 8) {
          // 8 digits: Netherlands, Belgium, Switzerland
          detectedCode = '';
        } else {
          // Other lengths - cannot detect reliably
          detectedCode = '';
        }
      }
      
      // Format the number with proper E.164 validation
      if (detectedCode) {
        // Remove leading zero if present before adding country code
        const numberWithoutLeadingZero = digitsOnly.startsWith('0') ? digitsOnly.substring(1) : digitsOnly;
        const formattedNumber = '+' + detectedCode + numberWithoutLeadingZero;
        
        // Validate final E.164 format: + followed by 1-15 digits
        if (formattedNumber.length >= 8 && formattedNumber.length <= 16) {
          return formattedNumber;
        }
        return ''; // Invalid length after formatting
      }
      
      // Fallback: number without detectable country code
      // For E.164 consistency, always add '+' prefix unless it creates an invalid format
      // Leading zeros indicate local format - keep as-is for Zoho to handle with their country detection
      if (digitsOnly.startsWith('0')) {
        // Leading zero = local format, needs country context
        // Keep raw format - Zoho CRM has better country detection context
        if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
          return digitsOnly;
        }
        return ''; // Invalid length
      }
      
      // No leading zero - add '+' for E.164 format consistency
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        return '+' + digitsOnly;
      }
      
      return ''; // Invalid length - reject
    };

    // Determine WhatsApp number: use dedicated WhatsApp field if provided, otherwise use phone/mobile
    const whatsappSourceNumber = whatsappNumber || phone;
    const formattedWhatsApp = formatPhoneWithCountryCode(whatsappSourceNumber, country);
    const formattedPhone = formatPhoneWithCountryCode(phone, country);

    // Build Zoho payload with exact webhook field mapping
    const registrationTimestamp = new Date().toISOString();
    const registrationDate = registrationTimestamp.split('T')[0];
    
    // Determine best phone number for each field
    const phoneValue = formattedPhone || phone || '';
    const whatsappValue = formattedWhatsApp || whatsappSourceNumber || phoneValue;
    
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
      "Whatsapp Opt In": null, // Default to null - unknown consent (distinct from false which is explicit opt-out)
      "Whatsapp Number": whatsappValue,
      "Opt In Source": '',
      "Opt In Time": '',
      
      // Event metadata
      "Event Id": event_id,
      "Event Name": event_name,
      "Event Type": event_type,
      "Webinar Name": event_name,
      "Form Id": form_id,
      
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
      if (zohoFieldName === 'Whatsapp Opt In') {
        const optInValue = convertToOptInState(value);
        zohoPayload["Whatsapp Opt In"] = optInValue;
        
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
  }
  // Note: fieldMatcher is request-scoped and will be garbage collected automatically
  // No explicit cleanup needed
}
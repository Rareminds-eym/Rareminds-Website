/**
 * Field Mappings Configuration
 * 
 * Maps form field names to standardized Zoho CRM field names.
 * This centralized configuration improves maintainability and testability.
 * 
 * Usage:
 * - Add new field mappings without touching the main registration logic
 * - All mappings use proper Title Case with spaces (as expected by Zoho)
 * - Keys should be lowercase for consistent matching
 */

// Valid Zoho payload keys - SINGLE SOURCE OF TRUTH
export const ZOHO_PAYLOAD_KEYS = [
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

export type ZohoPayloadKey = typeof ZOHO_PAYLOAD_KEYS[number];

/**
 * Converts a field name to proper Zoho CRM format (Title Case with spaces)
 * 
 * This is a FALLBACK function for unmapped fields. It attempts to format
 * field names consistently but may not match known Zoho fields exactly.
 * 
 * For known fields, always use FIELD_MAPPING which maps to validated
 * Zoho field names in ZOHO_PAYLOAD_KEYS.
 * 
 * @param fieldName - The field name to convert
 * @returns Title Case formatted string with spaces
 * @example
 *   convertToZohoFieldName('user_email') => 'User Email'
 *   convertToZohoFieldName('phoneNumber') => 'Phone Number'
 */
export const convertToZohoFieldName = (fieldName: string): string => {
  if (!fieldName || fieldName.trim() === '') {
    return '';
  }

  return fieldName
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // camelCase to spaces
    .replace(/[_-]+/g, ' ')               // underscores/dashes to spaces
    .split(' ')
    .filter(word => word.length > 0)       // Remove empty segments
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Type-safe field mapping - all values MUST be valid ZohoPayloadKey
export const FIELD_MAPPING: Record<string, ZohoPayloadKey> = {
  // CORE CONTACT FIELDS
  'name': 'Name',
  'fullname': 'Name',
  'attendeename': 'Name',
  'firstname': 'First Name',
  'fname': 'First Name',
  'lastname': 'Last Name',
  'lname': 'Last Name',
  'surname': 'Last Name',
  
  // EMAIL FIELDS
  'email': 'Email',
  'emailaddress': 'Email Address',
  'mail': 'Email',
  
  // PHONE FIELDS
  'phone': 'Phone',
  'phonenumber': 'Phone',
  'mobile': 'Mobile Number',
  'mobilenumber': 'Mobile Number',
  
  // WHATSAPP FIELDS
  'whatsapp': 'Whatsapp Number',
  'whatsappnumber': 'Whatsapp Number',
  'whatsappno': 'Whatsapp Number',
  
  // WHATSAPP OPT-IN
  'whatsappoptin': 'Whatsapp Opt In',
  
  // INSTITUTION FIELDS
  'school': 'School College Institution Name',
  'college': 'School College Institution Name',
  'schoolname': 'School College Institution Name',
  'collegename': 'School College Institution Name',
  
  'institution': 'Institution University Name',
  'university': 'Institution University Name',
  'institutionname': 'Institution University Name',
  'universityname': 'Institution University Name',
  
  // COMPANY
  'company': 'Company Name',
  'organization': 'Company Name',
  'employer': 'Company Name',
  'companyname': 'Company Name',
  
  // EDUCATIONAL FIELDS
  'department': 'Department Stream',
  'dept': 'Department Stream',
  'stream': 'Department Stream',
  'branch': 'Department Stream',
  'course': 'Department Stream',
  'departmentstream': 'Department Stream',
  
  'subject': 'Subject You Teach',
  'subjecttaught': 'Subject You Teach',
  'teachingsubject': 'Subject You Teach',
  
  'teachinglevel': 'Teaching Level',
  'level': 'Teaching Level',
  'grade': 'Teaching Level',
  'class': 'Teaching Level',
  
  'experience': 'Years Of Experience',
  'yearsofexperience': 'Years Of Experience',
  'workexperience': 'Years Of Experience',
  'yearsexperience': 'Years Of Experience',
  
  // LOCATION FIELDS
  'state': 'State',
  'statename': 'State',
  'region': 'State',
  
  // DISTRICT FIELDS
  'district': 'District',
  'districtname': 'District',
  'area': 'District',
  
  // PERSONAL FIELDS
  'dob': 'Date Of Birth',
  'dateofbirth': 'Date Of Birth',
  'birthdate': 'Date Of Birth',
  'birthday': 'Date Of Birth',
  
  // COMMENTS/MESSAGE
  'comments': 'Comments',
  'comment': 'Comments',
  'message': 'Comments',
  'notes': 'Comments',
  'note': 'Comments',
  'remarks': 'Comments',
  
  // EVENT FIELDS
  'howdidyouhear': 'How Did You Hear About Us',
  'heardfrom': 'How Did You Hear About Us',
  'source': 'How Did You Hear About Us',
  'heardaboutus': 'How Did You Hear About Us',
  
  'preferreddate': 'Preferred Date',
  'date': 'Preferred Date',
  
  'preferredtime': 'Preferred Time',
  'timeslot': 'Preferred Time',
  'webinartimeslot': 'Preferred Time',
  'time': 'Preferred Time',
  
  'preferredlanguage': 'Preferred Language',
  'language': 'Preferred Language',
  
  // PROFESSIONAL FIELDS
  'designation': 'Job Title',
  'jobtitle': 'Job Title',
  'position': 'Job Title',
  'role': 'Job Title',
  'title': 'Job Title',
  
  // SOCIAL/ADDITIONAL
  'linkedin': 'Linkedin Profile',
  'linkedinprofile': 'Linkedin Profile',
  'linkedinurl': 'Linkedin Profile',
  
  'referralcode': 'Referral Code',
  'referral': 'Referral Code',
  'promocode': 'Referral Code'
};

/**
 * Required fields that should never be overridden by form data
 * after being processed by the main extraction logic
 */
export const PROTECTED_REQUIRED_FIELDS: ZohoPayloadKey[] = [
  'First Name',
  'Last Name', 
  'Email',
  'Email Address',
  'Phone',
  'Mobile Number',
  'Name'
];
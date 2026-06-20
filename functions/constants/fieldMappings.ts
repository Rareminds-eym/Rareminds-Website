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

export const FIELD_MAPPING: Record<string, string> = {
  // CORE CONTACT FIELDS
  'name': 'Name',
  'fullname': 'Name',
  'full_name': 'Name',
  'attendee_name': 'Name',
  'firstname': 'First Name',
  'first_name': 'First Name',
  'fname': 'First Name',
  'lastname': 'Last Name',
  'last_name': 'Last Name',
  'lname': 'Last Name',
  'surname': 'Last Name',
  
  // EMAIL FIELDS
  'email': 'Email',
  'emailaddress': 'Email Address',
  'email_address': 'Email Address',
  'mail': 'Email',
  
  // PHONE FIELDS
  'phone': 'Phone',
  'phonenumber': 'Phone',
  'phone_number': 'Phone',
  'mobile': 'Mobile Number',
  'mobilenumber': 'Mobile Number',
  'mobile_number': 'Mobile Number',
  
  // WHATSAPP FIELDS
  'whatsapp': 'Whatsapp Number',
  'whatsappnumber': 'Whatsapp Number',
  'whatsapp_number': 'Whatsapp Number',
  'whatsappno': 'Whatsapp Number',
  'whatsapp_no': 'Whatsapp Number',
  
  // WHATSAPP OPT-IN
  'whatsappoptin': 'Whatsapp Opt In',
  'whatsapp_opt_in': 'Whatsapp Opt In',
  'whatsapp_optin': 'Whatsapp Opt In',
  
  // INSTITUTION FIELDS
  'school': 'School College Institution Name',
  'college': 'School College Institution Name',
  'schoolname': 'School College Institution Name',
  'school_name': 'School College Institution Name',
  'collegename': 'School College Institution Name',
  'college_name': 'School College Institution Name',
  
  'institution': 'Institution University Name',
  'university': 'Institution University Name',
  'institutionname': 'Institution University Name',
  'institution_name': 'Institution University Name',
  'universityname': 'Institution University Name',
  'university_name': 'Institution University Name',
  
  // COMPANY
  'company': 'Company Name',
  'organization': 'Company Name',
  'employer': 'Company Name',
  'company_name': 'Company Name',
  'companyname': 'Company Name',
  
  // EDUCATIONAL FIELDS
  'department': 'Department Stream',
  'dept': 'Department Stream',
  'stream': 'Department Stream',
  'branch': 'Department Stream',
  'course': 'Department Stream',
  'departmentstream': 'Department Stream',
  'department_stream': 'Department Stream',
  
  'subject': 'Subject You Teach',
  'subjecttaught': 'Subject You Teach',
  'subject_taught': 'Subject You Teach',
  'teachingsubject': 'Subject You Teach',
  'teaching_subject': 'Subject You Teach',
  
  'teachinglevel': 'Teaching Level',
  'teaching_level': 'Teaching Level',
  'level': 'Teaching Level',
  'grade': 'Teaching Level',
  'class': 'Teaching Level',
  
  'experience': 'Years Of Experience',
  'yearsofexperience': 'Years Of Experience',
  'years_of_experience': 'Years Of Experience',
  'work_experience': 'Years Of Experience',
  'yearsexperience': 'Years Of Experience',
  
  // LOCATION FIELDS
  'state': 'State',
  'statename': 'State',
  'region': 'State',
  
  'district': 'District',
  'districtname': 'District',
  'area': 'District',
  
  // PERSONAL FIELDS
  'dob': 'Date Of Birth',
  'dateofbirth': 'Date Of Birth',
  'date_of_birth': 'Date Of Birth',
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
  'heard_from': 'How Did You Hear About Us',
  'heardfrom': 'How Did You Hear About Us',
  'source': 'How Did You Hear About Us',
  'heardaboutus': 'How Did You Hear About Us',
  
  'preferreddate': 'Preferred Date',
  'preferred_date': 'Preferred Date',
  'date': 'Preferred Date',
  
  'preferredtime': 'Preferred Time',
  'preferred_time': 'Preferred Time',
  'timeslot': 'Preferred Time',
  'time_slot': 'Preferred Time',
  'webinar_time_slot': 'Preferred Time',
  'time': 'Preferred Time',
  
  'preferredlanguage': 'Preferred Language',
  'preferred_language': 'Preferred Language',
  'language': 'Preferred Language',
  
  // PROFESSIONAL FIELDS
  'designation': 'Job Title',
  'jobtitle': 'Job Title',
  'job_title': 'Job Title',
  'position': 'Job Title',
  'role': 'Job Title',
  'title': 'Job Title',
  
  // SOCIAL/ADDITIONAL
  'linkedin': 'Linkedin Profile',
  'linkedinprofile': 'Linkedin Profile',
  'linkedin_profile': 'Linkedin Profile',
  'linkedinurl': 'Linkedin Profile',
  'linkedin_url': 'Linkedin Profile',
  
  'referralcode': 'Referral Code',
  'referral_code': 'Referral Code',
  'referral': 'Referral Code',
  'promocode': 'Referral Code',
  'promo_code': 'Referral Code'
};

/**
 * Required fields that should never be overridden by form data
 * after being processed by the main extraction logic
 */
export const PROTECTED_REQUIRED_FIELDS = [
  'First Name',
  'Last Name', 
  'Email',
  'Email Address',
  'Phone',
  'Mobile Number',
  'Name'
];

/**
 * WhatsApp fields that should never be overridden by raw form data
 * to maintain proper formatting and validation
 */
export const PROTECTED_WHATSAPP_FIELDS = [
  'Whatsapp Number' // Only protect the number field, opt-in is mapped from form
];
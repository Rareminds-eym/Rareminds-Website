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
  // CORE CONTACT FIELDS (Always required)
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
  'email': 'Email',
  'emailaddress': 'Email',
  'email_address': 'Email',
  'mail': 'Email',
  'phone': 'Phone',
  'phonenumber': 'Phone',
  'phone_number': 'Phone',
  'mobile': 'Mobile',
  'mobilenumber': 'Mobile',
  'mobile_number': 'Mobile',
  
  // WHATSAPP FIELDS (Critical mapping) - Use exact Zoho CRM field name
  'whatsapp': 'Whatsapp No',
  'whatsappnumber': 'Whatsapp No',
  'whatsapp_number': 'Whatsapp No',
  'whatsappno': 'Whatsapp No',
  'whatsapp_no': 'Whatsapp No',
  
  // WHATSAPP OPT-IN (All possible variations) - Maps to boolean fields
  'whatsappoptin': 'WhatsApp Opt In',
  'whatsapp_opt_in': 'WhatsApp Opt In',
  'whatsapp_optin': 'WhatsApp Opt In',
  'optin': 'WhatsApp Opt In',
  'opt_in': 'WhatsApp Opt In',
  'marketing_opt_in': 'WhatsApp Opt In',
  'consent': 'WhatsApp Opt In',
  'whatsapp_consent': 'WhatsApp Opt In',
  'marketing_consent': 'WhatsApp Opt In',
  'communication_consent': 'WhatsApp Opt In',
  'sms_opt_in': 'WhatsApp Opt In',
  
  // EDUCATIONAL FIELDS
  'institution': 'School / College / University Name',
  'school': 'School / College / University Name',
  'college': 'School / College / University Name',
  'university': 'School / College / University Name',
  'institutionname': 'School / College / University Name',
  'institution_name': 'School / College / University Name',
  'company': 'Company Name',
  'organization': 'Company Name',
  'employer': 'Company Name',
  
  'department': 'Department Stream',
  'dept': 'Department Stream',
  'stream': 'Department Stream',
  'branch': 'Students Branch/department',
  'course': 'Department Stream',
  
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
  
  // LOCATION FIELDS
  'country': 'Country',
  'nationality': 'Country',
  'nation': 'Country',
  'location_country': 'Country',
  'state': 'State',
  'statename': 'State',
  'region': 'State',
  'district': 'District',
  'districtname': 'District',
  'area': 'District',
  'city': 'City',
  'cityname': 'City',
  'town': 'City',
  'address': 'Current Address',
  'currentaddress': 'Current Address',
  
  // EVENT FIELDS  
  'howdidyouhear': 'How Did You Hear About Us',
  'heard_from': 'How Did You Hear About Us',
  'heardfrom': 'How Did You Hear About Us',
  'source': 'How Did You Hear About Us',
  
  'preferreddate': 'Preferred Date',
  'preferred_date': 'Preferred Date',
  'preferredtime': 'Preferred Time',
  'preferred_time': 'Preferred Time',
  'timeslot': 'Preferred Time',
  'webinar_time_slot': 'Preferred Time',
  
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
  
  // ADDITIONAL FIELDS
  'linkedin': 'LinkedIn Profile',
  'linkedinprofile': 'LinkedIn Profile',
  'linkedin_profile': 'LinkedIn Profile',
  'website': 'Website',
  'referralcode': 'Referral Code',
  'referral_code': 'Referral Code'
};

/**
 * Required fields that should never be overridden by form data
 * after being processed by the main extraction logic
 */
export const PROTECTED_REQUIRED_FIELDS = [
  'First Name',
  'Last Name', 
  'Email',
  'Phone',
  'Mobile',
  'Full Name'
];

/**
 * WhatsApp fields that should never be overridden by raw form data
 * to maintain proper formatting and validation
 */
export const PROTECTED_WHATSAPP_FIELDS = [
  'WhatsApp Opt In',
  'WhatsApp Opt-In',
  'Whatsapp No',
  'WhatsApp No',
  'WhatsApp Number',
  'Whatsapp Number',
  'whatsapp_no',
  'whatsapp_number',
  'Mobile'
];
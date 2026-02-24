// Enrollment and form submission services
import { supabase } from '@/lib/supabaseClient';

export interface BlueprintRequest {
  name: string;
  phone: string;
  email: string;
  location: string;
  university: string;
}

export interface CourseListRequest {
  name: string;
  email: string;
}

export interface InstitutionalEnquiry {
  fullName: string;
  collegeName: string;
  course: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
}

// Send PDF via email
const sendPdfEmail = async (
  name: string,
  email: string,
  pdfUrl: string,
  institution: string,
  location?: string,
  university?: string
) => {
  const response = await fetch('https://rareminds.in/api/send-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      location,
      university,
      pdfUrl,
      institution
    }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email');
  }
  return data;
};

// Submit blueprint request
export const submitBlueprintRequest = async (data: BlueprintRequest) => {
  // Store in Supabase
  const { error: supabaseError } = await supabase
    .from('blueprint_requests')
    .insert([data]);
  
  if (supabaseError) throw supabaseError;

  // Send email with PDF
  await sendPdfEmail(
    data.name,
    data.email,
    '/institutions/pdfs/Blueprint.pdf',
    data.university,
    data.location,
    data.university
  );
};

// Submit course list request
export const submitCourseListRequest = async (data: CourseListRequest) => {
  // Store in Supabase
  const { error: supabaseError } = await supabase
    .from('course_list_requests')
    .insert([data]);
  
  if (supabaseError) throw supabaseError;

  // Send email with Course List PDF
  await sendPdfEmail(
    data.name,
    data.email,
    '/institutions/pdfs/Course_List.pdf',
    'Course List Download'
  );
};

// Submit institutional enquiry
export const submitInstitutionalEnquiry = async (data: InstitutionalEnquiry) => {
  const { error } = await supabase
    .from('institutional_enquiries')
    .insert([data]);
  
  if (error) throw error;
  
  return { success: true };
};

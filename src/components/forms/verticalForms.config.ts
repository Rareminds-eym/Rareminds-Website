// src/components/forms/verticalForms.config.ts
import type { FieldKey } from "@/utils/verticalValidators";
import type { EmailNotificationType } from "@/services/emailBff";

export type FieldConfig = {
  key: FieldKey;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
  /** defaults to true; only the message is optional */
  required?: boolean;
};

export type VerticalFormConfig = {
  vertical: "corporate" | "trainer" | "institutions" | "government" | "academia";
  table: "recruitment_forms" | "training_forms" | "demo_requests" | "government_form" | "acdemia_form";
  notificationType: EmailNotificationType;
  title: string;
  submitLabel: string;
  successMessage: string;
  /** require an SMS code for the phone box (only works on forms that have a phone field) */
  verifyPhone?: boolean;
  fields: FieldConfig[];
};

const name: FieldConfig = { key: "name", label: "Your Name", placeholder: "Full Name", autoComplete: "name" };
const email = (placeholder: string): FieldConfig => ({
  key: "email", label: "Email Address", placeholder, type: "email", autoComplete: "email",
});
const phone: FieldConfig = {
  key: "phone", label: "Phone", placeholder: "10-digit mobile number", type: "tel", autoComplete: "tel-national",
};
const message = (placeholder: string): FieldConfig => ({
  key: "optionalMessage", label: "Message (optional)", placeholder, type: "textarea", required: false,
});

// /corporate/recruitment
export const corporateForm: VerticalFormConfig = {
  vertical: "corporate",
  table: "recruitment_forms",
  notificationType: "recruitment-enquiry",
  title: "Request Talent Now",
  submitLabel: "Request Talent",
  successMessage: "Thanks! Our recruitment team will contact you shortly.",
  fields: [
    name,
    { key: "company", label: "Company", placeholder: "Company Name", autoComplete: "organization" },
    email("name@company.com"),
    { key: "jobRole", label: "Role to Hire", placeholder: "Job Title/Position" },
    message("Tell us about your hiring needs or challenges"),
  ],
};

// /corporate/training
export const corporateTrainingForm: VerticalFormConfig = {
  vertical: "trainer",
  table: "training_forms",
  notificationType: "training-enquiry",
  title: "Request Training Now",
  submitLabel: "Request Training",
  successMessage: "Thanks! Our training team will contact you shortly.",
  fields: [
    name,
    { key: "company", label: "Company", placeholder: "Company Name", autoComplete: "organization" },
    email("name@company.com"),
    { key: "jobRole", label: "Role to Train", placeholder: "Job Title/Position" },
    message("Tell us about your training needs or challenges"),
  ],
};

// /universities
export const institutionsForm: VerticalFormConfig = {
  vertical: "institutions",
  table: "demo_requests",
  notificationType: "institution-enquiry",
  title: "Book A Free University Demo Now.",
  submitLabel: "Submit Request",
  successMessage: "Thanks! We'll get in touch to schedule your demo.",
  fields: [
    { ...name, label: "Name" },
    { key: "university", label: "University Name", placeholder: "University Name", autoComplete: "organization" },
    email("name@university.com"),
    { key: "course", label: "Course Applied for", placeholder: "Course Name" },
    message("Tell us about your university or course requirements"),
  ],
};

// /government
export const governmentForm: VerticalFormConfig = {
  vertical: "government",
  table: "government_form",
  notificationType: "government-enquiry",
  title: "Contact Us",
  submitLabel: "Submit",
  successMessage: "Thanks! We've received your request and will reply soon.",
  verifyPhone: true,
  fields: [
    { ...name, label: "Full Name", placeholder: "John Doe" },
    { ...email("john.doe@example.com"), label: "Email Address" },
    { ...phone, label: "Phone Number" },
    { key: "address", label: "Address", placeholder: "House no., street, city", autoComplete: "street-address" },
    message("Please tell us how we can help you…"),
  ],
};

// /school/teacher
export const academiaForm: VerticalFormConfig = {
  vertical: "academia",
  table: "acdemia_form",
  notificationType: "teacher-service-enquiry",
  title: "Request Course Information",
  submitLabel: "Get Course Info",
  successMessage: "Thanks! We'll send you the course details shortly.",
  verifyPhone: true,
  fields: [
    { ...name, placeholder: "Full Name" },
    phone,
    email("name@example.com"),
    { key: "course", label: "Course Interest", placeholder: "Which course are you interested in?" },
    message("Tell us about your learning goals or any questions you have"),
  ],
};

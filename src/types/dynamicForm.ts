// Dynamic form types matching the Supabase schema

export type FieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox';

export interface FormField {
  id: string;
  form_id: string;
  field_name: string;
  field_label: string;
  field_type: FieldType;
  is_required: boolean;
  options: string[] | null;
  sort_order: number;
}

export interface Form {
  id: string;
  created_by: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormWithFields extends Form {
  fields: FormField[];
}

// Registration submission types
export interface EventRegistrationData {
  event_id: string;
  form_id: string | null;
  user_id?: string | null;
  responses: Record<string, any>; // field_name -> value mapping
  created_at?: string;
}

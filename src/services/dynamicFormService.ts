import { createClient } from '@supabase/supabase-js';
import type { FormWithFields, EventRegistrationData } from '../types/dynamicForm';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch a form with its fields by ID
 */
export async function getFormById(formId: string): Promise<FormWithFields | null> {
  try {
    // Fetch form
    const { data: formData, error: formError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .eq('is_active', true)
      .single();

    if (formError || !formData) {
      console.error('Error fetching form:', formError);
      return null;
    }

    // Fetch form fields
    const { data: fieldsData, error: fieldsError } = await supabase
      .from('form_fields')
      .select('*')
      .eq('form_id', formId)
      .order('sort_order', { ascending: true });

    if (fieldsError) {
      console.error('Error fetching form fields:', fieldsError);
      return null;
    }

    return {
      ...formData,
      fields: fieldsData || []
    } as FormWithFields;
  } catch (error) {
    console.error('Exception in getFormById:', error);
    return null;
  }
}

/**
 * Submit event registration with form responses
 * TODO: Create event_registrations table in Supabase with schema:
 * {
 *   id: uuid primary key,
 *   event_id: uuid references events(id),
 *   form_id: uuid references forms(id) nullable,
 *   user_id: uuid references auth.users(id) nullable,
 *   responses: jsonb (field_name -> value mapping),
 *   created_at: timestamptz
 * }
 */
export async function submitRegistration(
  eventId: string,
  formId: string | null,
  responses: Record<string, any>
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const registrationData: EventRegistrationData = {
      event_id: eventId,
      form_id: formId,
      user_id: user?.id || null,
      responses,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('event_registrations')
      .insert(registrationData)
      .select()
      .single();

    if (error) {
      console.error('Error submitting registration:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in submitRegistration:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

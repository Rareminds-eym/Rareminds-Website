import { createClient } from '@supabase/supabase-js';
import type { FormWithFields } from '../types/dynamicForm';

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

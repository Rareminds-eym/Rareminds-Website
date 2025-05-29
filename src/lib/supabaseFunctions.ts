import { supabase } from '@/lib/supabaseClient';

export async function fetchRecruitmentServices() {
  const { data, error } = await supabase
    .from('recruitment_services')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

import { supabase } from '../lib/supabase';

export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connectivity
    console.log('📡 Testing basic connectivity...');
    const { data, error } = await supabase
      .from('events')
      .select('count', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }
    
    console.log('✅ Supabase connection test passed');
    console.log('📊 Events count:', data);
    
    return {
      success: true,
      count: data?.length || 0
    };
    
  } catch (err) {
    console.error('❌ Connection test error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      details: err
    };
  }
};

// Function to test environment variables
export const testEnvironmentVariables = () => {
  console.log('🔍 Testing environment variables...');
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables');
    return false;
  }
  
  // Basic URL validation
  try {
    new URL(supabaseUrl);
    console.log('✅ Supabase URL format is valid');
  } catch {
    console.error('❌ Invalid Supabase URL format');
    return false;
  }
  
  return true;
};
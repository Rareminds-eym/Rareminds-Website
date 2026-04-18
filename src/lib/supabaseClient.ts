
/// <reference types="vite/client" />
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import { safeGetItem, safeSetItem, safeRemoveItem } from './localStorage';
 
// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
 
// Safe storage for browser environments.
// Falls back to undefined (Supabase uses in-memory) in non-browser environments.
const safeStorage: SupportedStorage | undefined =
  typeof window !== 'undefined'
    ? {
        getItem: (key) => safeGetItem(key),
        setItem: (key, value) => safeSetItem(key, value),
        removeItem: (key) => safeRemoveItem(key),
      }
    : undefined;
 
// Wrapping validation and client creation in a function ensures throws happen
// inside a callable context, allowing React error boundaries to catch
// misconfiguration errors instead of causing a blank white screen.
function createSupabaseClient() {
  // Fail fast if env vars are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase env vars. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
    );
  }
 
  // Guard against malformed URL
  if (!supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://')) {
 
throw new Error(`VITE_SUPABASE_URL looks malformed: "${supabaseUrl}"`);
            
  }
 
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: safeStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}
 
// Create and export Supabase client
export const supabase = createSupabaseClient();

/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { safeGetItem, safeSetItem, safeRemoveItem } from './localStorage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.');
}

export const isSupabaseConfigured = true;
// Custom storage that handles localStorage errors gracefully
const safeStorage = {
  getItem: (key: string) => {
    return safeGetItem(key);
  },
  setItem: (key: string, value: string) => {
    safeSetItem(key, value);
  },
  removeItem: (key: string) => {
    safeRemoveItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: safeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});


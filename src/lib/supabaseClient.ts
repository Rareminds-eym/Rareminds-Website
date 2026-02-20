/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { safeGetItem, safeSetItem, safeRemoveItem } from './localStorage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc2OTIwMCwiZXhwIjoxOTU3MzQ1MjAwfQ.placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase configuration missing - using placeholder values. Some features may not work.');
}

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
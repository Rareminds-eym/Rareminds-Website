/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'
import { safeGetItem, safeSetItem, safeRemoveItem } from './localStorage'

// ✅ Use ONLY env (no fallback)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Optional but better than console.warn
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing')
}

const safeStorage = {
  getItem: (key: string) => safeGetItem(key),
  setItem: (key: string, value: string) => safeSetItem(key, value),
  removeItem: (key: string) => safeRemoveItem(key),
}

// ✅ Create client with auth config
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: safeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
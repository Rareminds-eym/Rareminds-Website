/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_RAZORPAY_KEY_ID: string
  // Add other VITE_ prefixed env variables here as needed
  //save
} 

interface ImportMeta {
  readonly env: ImportMetaEnv
}
-- Create contact table for storing form submissions
CREATE TABLE IF NOT EXISTS public.contact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert for everyone (public access)
CREATE POLICY "Allow public insert on contact" 
ON public.contact 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated read on contact" 
ON public.contact 
FOR SELECT 
TO authenticated
USING (true);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact(created_at DESC);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS idx_contact_email ON public.contact(email);

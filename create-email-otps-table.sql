-- Create table for storing email OTPs
CREATE TABLE IF NOT EXISTS public.email_otps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS email_otps_email_idx ON public.email_otps(email);
CREATE INDEX IF NOT EXISTS email_otps_expires_at_idx ON public.email_otps(expires_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (allow authenticated users to read/write their own OTPs)
DROP POLICY IF EXISTS "Users can manage their own OTPs" ON public.email_otps;
CREATE POLICY "Users can manage their own OTPs" ON public.email_otps
    FOR ALL USING (true);

-- Auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_email_otps_updated_at ON public.email_otps;
CREATE TRIGGER update_email_otps_updated_at
    BEFORE UPDATE ON public.email_otps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create email_otps table for storing OTP verification codes
CREATE TABLE IF NOT EXISTS email_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  otp TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_otps_email ON email_otps(email);
CREATE INDEX IF NOT EXISTS idx_email_otps_created_at ON email_otps(created_at);

-- Enable Row Level Security
ALTER TABLE email_otps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for sending OTP)
CREATE POLICY "Allow insert for all users" ON email_otps
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow select for verification
CREATE POLICY "Allow select for all users" ON email_otps
  FOR SELECT
  USING (true);

-- Create policy to allow update for verification
CREATE POLICY "Allow update for all users" ON email_otps
  FOR UPDATE
  USING (true);

-- Create function to clean up expired OTPs (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM email_otps
  WHERE expires_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

-- Comment on table
COMMENT ON TABLE email_otps IS 'Stores OTP codes for email verification during event registration';
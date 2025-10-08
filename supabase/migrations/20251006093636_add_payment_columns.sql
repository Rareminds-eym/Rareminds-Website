-- Add payment-related columns to event_registrations table
ALTER TABLE event_registrations 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'not_required',
ADD COLUMN IF NOT EXISTS payment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS order_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payment_currency VARCHAR(3) DEFAULT 'INR',
ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMP WITH TIME ZONE;

-- Add comment to explain payment_status values
COMMENT ON COLUMN event_registrations.payment_status IS 'Values: not_required, pending, completed, failed';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_event_registrations_payment_status 
ON event_registrations(payment_status);
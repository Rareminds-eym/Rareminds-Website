-- Migration: Add registration_status column to events table
-- This script adds a registration_status column to support the new Registration Closed feature

-- Add the registration_status column with default value 'open'
ALTER TABLE events 
ADD COLUMN registration_status VARCHAR(50) DEFAULT 'open' CHECK (registration_status IN ('open', 'closed', 'waitlist'));

-- Add a comment to document the column
COMMENT ON COLUMN events.registration_status IS 'Registration status: open, closed, or waitlist';

-- Optional: Update existing events to have proper registration_status based on current conditions
-- This is a good practice to ensure data consistency
UPDATE events 
SET registration_status = 
  CASE 
    WHEN status = 'cancelled' THEN 'closed'
    WHEN registration_deadline IS NOT NULL AND registration_deadline < NOW() THEN 'closed'
    ELSE 'open'
  END;

-- Optional: Add an index for better query performance if you'll be filtering by registration_status frequently
CREATE INDEX idx_events_registration_status ON events(registration_status);

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  column_default, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'events' AND column_name = 'registration_status';
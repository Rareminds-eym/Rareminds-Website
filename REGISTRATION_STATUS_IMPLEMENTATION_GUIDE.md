# Registration Status Feature - Implementation Guide

## Current Status ✅

I have successfully updated your codebase to handle the missing `registration_status` database column. Here's what was done:

### Changes Made:

1. **Removed `registration_status` from database queries temporarily**:
   - Updated `useOptimizedEvents.ts` to remove `registration_status` from the SELECT query
   - Updated `useEvent.ts` to remove `registration_status` from the SELECT query
   
2. **Component logic remains intact**:
   - `EventDetail.tsx` and `EventCard.tsx` still contain the registration status logic
   - The logic gracefully handles the case where `registration_status` is undefined
   - Components fall back to checking `event.status` and `registration_deadline`

3. **Created database migration script**:
   - `migration_add_registration_status.sql` contains the SQL to add the missing column

## Next Steps 🚀

### Step 1: Run the Database Migration

Execute the SQL script I created to add the `registration_status` column:

```bash
# Connect to your database and run:
psql -d your_database_name -f migration_add_registration_status.sql
```

**Or manually run these SQL commands in your database:**

```sql
-- Add the registration_status column with default value 'open'
ALTER TABLE events 
ADD COLUMN registration_status VARCHAR(50) DEFAULT 'open' CHECK (registration_status IN ('open', 'closed', 'waitlist'));

-- Add a comment to document the column
COMMENT ON COLUMN events.registration_status IS 'Registration status: open, closed, or waitlist';

-- Update existing events to have proper registration_status based on current conditions
UPDATE events 
SET registration_status = 
  CASE 
    WHEN status = 'cancelled' THEN 'closed'
    WHEN registration_deadline IS NOT NULL AND registration_deadline < NOW() THEN 'closed'
    ELSE 'open'
  END;

-- Add an index for better query performance
CREATE INDEX idx_events_registration_status ON events(registration_status);
```

### Step 2: Re-add registration_status to Queries

After running the migration, add `registration_status` back to the database queries:

**In `src/hooks/Events/useOptimizedEvents.ts`** (line ~60):
```typescript
.select(`
  id,
  title,
  event_date,
  event_time,
  location,
  status,
  category,
  price,
  registration_status,  // Add this line back
  registration_deadline,
  featured_image,
  slug,
  organizer_name,
  capacity
`)
```

**In `src/hooks/Events/useEvent.ts`** (line ~53):
```typescript
price,
registration_deadline,
registration_status,  // Add this line back
status,
```

### Step 3: Test the Feature

1. **Start your development server**: `npm run dev`
2. **Check that events load properly** - no more database errors
3. **Test the registration button logic**:
   - Events with `registration_status: 'closed'` should show "Registration Closed"
   - Events with `registration_status: 'full'` should show "Registration Full" 
   - Events with `registration_status: 'open'` should show "Register Now"
   - Events past their `registration_deadline` should show "Registration Closed"
   - Cancelled/completed events should show appropriate messages

## Feature Functionality ⚡

The registration status feature now supports:

- **Explicit registration control**: Set `registration_status` to 'open', 'closed', or 'waitlist'
- **Automatic deadline checking**: Events automatically close when `registration_deadline` passes
- **Event status integration**: Cancelled/completed events automatically show as closed
- **Flexible button text**: Different messages for different closure reasons
- **Consistent UI**: Same logic applied to both EventCard and EventDetail components

## Database Column Details 📊

- **Column**: `registration_status`
- **Type**: `VARCHAR(50)`
- **Default**: `'open'`
- **Allowed values**: `'open'`, `'closed'`, `'waitlist'`
- **Optional**: Yes (existing code handles undefined values)

## Cleanup 🧹

After completing the above steps, you can delete these files:
- `migration_add_registration_status.sql`
- `REGISTRATION_STATUS_IMPLEMENTATION_GUIDE.md`

The feature should work perfectly after these steps are completed!
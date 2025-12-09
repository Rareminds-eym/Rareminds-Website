# PDF Download Email Notification Setup

## Overview
This setup sends email notifications to `marketing@rareminds.in` whenever someone downloads a PDF (Resume Checklist, Habit Card, or Daily Learning).

## What Was Created

### 1. Database Table: `pdf_downloads`
- Stores download information with fields: name, email, company, role, message, download_type
- Located in: `supabase/migrations/20251209153931_create_pdf_downloads_table.sql`

### 2. Edge Function: `send-download-notification`
- Sends email notifications via Resend API
- Located in: `supabase/functions/send-download-notification/index.ts`

### 3. Updated Components
- `HeroSection.tsx` - Resume Checklist download
- `problemSection.tsx` - Habit Card download
- `CTASection.tsx` - Daily Learning download

## Deployment Steps

### Step 1: Run Database Migration
```bash
# Push the migration to Supabase
npx supabase db push
```

Or manually run the SQL in Supabase Dashboard:
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents from `supabase/migrations/20251209153931_create_pdf_downloads_table.sql`
3. Execute the SQL

### Step 2: Deploy Edge Function
```bash
# Deploy the new edge function
npx supabase functions deploy send-download-notification
```

### Step 3: Verify Setup
1. Test a download on your site
2. Check if email arrives at marketing@rareminds.in
3. Verify data in `pdf_downloads` table

## Email Format
Each download triggers an email with:
- **Subject**: "New Download: [PDF Type]"
- **Content**: Name, Email, Company, Role, Message, Download timestamp
- **From**: no-reply@rareminds.in
- **To**: marketing@rareminds.in

## Download Types
- "Resume Checklist" - From hero banner Download button
- "Habit Card" - From "See How It Works" section
- "Daily Learning" - From CTA section (replaced Join Waitlist)

## Troubleshooting

### No emails received?
1. Check Supabase Functions logs: Dashboard → Edge Functions → send-download-notification → Logs
2. Verify RM_Emails environment variable is set in Supabase
3. Check if trigger is active: Dashboard → Database → Triggers

### Database errors?
1. Verify table exists: Dashboard → Database → Tables → pdf_downloads
2. Check RLS policies are enabled
3. Ensure trigger function exists

## Environment Variables Required
- `RM_Emails` - Resend API key (already configured)
- `SUPABASE_URL` - Your Supabase project URL (in vault)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (in vault)

## Notes
- The old `training_forms` table is still used for other forms
- PDF downloads now use the dedicated `pdf_downloads` table
- Email notifications are sent automatically via database trigger

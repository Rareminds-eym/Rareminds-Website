-- Seed the single RareMinds company_settings row (office address and logo).
-- public.company_settings is created by
-- supabase/migrations/20261009160000_create_company_settings.sql, which
-- always runs before any seed. This script runs after the numbered data
-- seeds (by "./seed/*.sql" filename ordering in supabase/config.toml,
-- since "z_" sorts after "5_"), the same way the z_repair_*.sql files
-- run after their source seed has already loaded.
--
-- Address: the exact RareMinds office address from
-- Rareminds_SkillPassport_PRD_Physical_Address_Update_v1.0
--   #143, 10th Cross Road, Binnamangala, Stage 1, Indiranagar,
--   Bengaluru, Karnataka - 560038
-- split into the table's columns:
--   office_address = #143, 10th Cross Road, Binnamangala, Stage 1, Indiranagar
--   city           = Bengaluru
--   state          = Karnataka
--   pincode        = 560038
--
-- Logo: the RareMinds company logo already uploaded to the production
-- R2 bucket "rareminds-media" under company-settings/ and served from
-- https://media.rareminds.in. The file is not uploaded again here.
--
-- The table allows only one row (unique index on ((true))). The INSERT
-- is guarded by WHERE NOT EXISTS, so it only ever inserts when the table
-- is empty and becomes a safe no-op if a row already exists (for example
-- one saved from the Dashboard) -- existing settings are never
-- overwritten. No other table or row is read, updated or deleted --
-- safe to run on every reset.

BEGIN;

DO $seed_company_settings$
BEGIN

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'company_settings') THEN
    INSERT INTO public.company_settings (office_address, city, state, pincode, logo_url)
    SELECT
      '#143, 10th Cross Road, Binnamangala, Stage 1, Indiranagar',
      'Bengaluru',
      'Karnataka',
      '560038',
      'https://media.rareminds.in/company-settings/1791829164649-RareMinds-ISO-Logo.webp'
    WHERE NOT EXISTS (SELECT 1 FROM public.company_settings);
  END IF;

END;
$seed_company_settings$;

COMMIT;

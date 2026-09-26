-- Repair mojibake (CP437 misencoding) in public.recruitment_services.
-- The insert in 5_competition_results_storage.sql contains corrupted
-- character sequences from a bad encoding round-trip. This repair
-- script runs after that seed file (by "./seed/*.sql" filename
-- ordering in supabase/config.toml, and "z_" sorts after "5_"), the
-- same way z_seed_course_default_image.sql repairs course thumbnails
-- after the course seed data has already loaded.
--
--   ΓÇÖ -> '   (right single quote / apostrophe)
--   ΓÇô -> –   (en dash)
--   ΓÇö -> —   (em dash)
--   ΓÇ£ -> "   (left double quote)
--   ΓÇ¥ -> "   (right double quote)
--   ΓÇæ -> -   (non-breaking hyphen, e.g. "End-to-end", "C-suite")
--   ┬░  -> °   (degree symbol, e.g. "360° evaluations")
--
-- Affected plain-text columns: title_desc, title_cta, title_img_alt,
-- heading_1, heading_2, heading_2_desc, heading_3, heading_3_desc,
-- heading_4, heading_4_desc, cta, heading_5, heading_5_desc,
-- meta_title, meta_desc.
--
-- Affected jsonb columns: heading_1_desc, heading_2_list,
-- heading_3_list, heading_4_list -- cast to text, cleaned, cast back.
-- Curly quotes become JSON-escaped \" here (not a raw "), since a raw
-- double quote inside a JSON string value would break the JSON syntax
-- itself; the plain-text columns above use a raw " because they are
-- not JSON-encoded.
--
-- title and link are unaffected and are left untouched.
--
-- Each UPDATE is guarded by a WHERE ... LIKE check, so only rows still
-- containing the corruption are touched -- safe to run on every reset,
-- and a no-op once the seed data upstream is ever cleaned directly.
-- Wrapped in one DO block so a failure in any single statement rolls
-- back the whole repair instead of leaving some columns fixed and
-- others still corrupted.

BEGIN;

DO $repair_recruitment_services_mojibake$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'recruitment_services'
  ) THEN

    -- Plain text columns
    UPDATE public.recruitment_services
    SET title_desc = replace(replace(replace(replace(replace(replace(replace(
      title_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE title_desc LIKE '%ΓÇ%' OR title_desc LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET title_cta = replace(replace(replace(replace(replace(replace(replace(
      title_cta,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE title_cta LIKE '%ΓÇ%' OR title_cta LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET title_img_alt = replace(replace(replace(replace(replace(replace(replace(
      title_img_alt,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE title_img_alt LIKE '%ΓÇ%' OR title_img_alt LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_1 = replace(replace(replace(replace(replace(replace(replace(
      heading_1,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_1 LIKE '%ΓÇ%' OR heading_1 LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_2 = replace(replace(replace(replace(replace(replace(replace(
      heading_2,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_2 LIKE '%ΓÇ%' OR heading_2 LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_2_desc = replace(replace(replace(replace(replace(replace(replace(
      heading_2_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_2_desc LIKE '%ΓÇ%' OR heading_2_desc LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_3 = replace(replace(replace(replace(replace(replace(replace(
      heading_3,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_3 LIKE '%ΓÇ%' OR heading_3 LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_3_desc = replace(replace(replace(replace(replace(replace(replace(
      heading_3_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_3_desc LIKE '%ΓÇ%' OR heading_3_desc LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_4 = replace(replace(replace(replace(replace(replace(replace(
      heading_4,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_4 LIKE '%ΓÇ%' OR heading_4 LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_4_desc = replace(replace(replace(replace(replace(replace(replace(
      heading_4_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_4_desc LIKE '%ΓÇ%' OR heading_4_desc LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET cta = replace(replace(replace(replace(replace(replace(replace(
      cta,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE cta LIKE '%ΓÇ%' OR cta LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_5 = replace(replace(replace(replace(replace(replace(replace(
      heading_5,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_5 LIKE '%ΓÇ%' OR heading_5 LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_5_desc = replace(replace(replace(replace(replace(replace(replace(
      heading_5_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE heading_5_desc LIKE '%ΓÇ%' OR heading_5_desc LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET meta_title = replace(replace(replace(replace(replace(replace(replace(
      meta_title,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE meta_title LIKE '%ΓÇ%' OR meta_title LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET meta_desc = replace(replace(replace(replace(replace(replace(replace(
      meta_desc,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '"'),
      'ΓÇ¥', '"'),
      'ΓÇæ', '-'),
      '┬░', '°')
    WHERE meta_desc LIKE '%ΓÇ%' OR meta_desc LIKE '%┬░%';

    -- jsonb columns: cast to text, clean, cast back
    UPDATE public.recruitment_services
    SET heading_1_desc = (replace(replace(replace(replace(replace(replace(replace(
      heading_1_desc::text,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '\"'),
      'ΓÇ¥', '\"'),
      'ΓÇæ', '-'),
      '┬░', '°'))::jsonb
    WHERE heading_1_desc::text LIKE '%ΓÇ%' OR heading_1_desc::text LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_2_list = (replace(replace(replace(replace(replace(replace(replace(
      heading_2_list::text,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '\"'),
      'ΓÇ¥', '\"'),
      'ΓÇæ', '-'),
      '┬░', '°'))::jsonb
    WHERE heading_2_list::text LIKE '%ΓÇ%' OR heading_2_list::text LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_3_list = (replace(replace(replace(replace(replace(replace(replace(
      heading_3_list::text,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '\"'),
      'ΓÇ¥', '\"'),
      'ΓÇæ', '-'),
      '┬░', '°'))::jsonb
    WHERE heading_3_list::text LIKE '%ΓÇ%' OR heading_3_list::text LIKE '%┬░%';

    UPDATE public.recruitment_services
    SET heading_4_list = (replace(replace(replace(replace(replace(replace(replace(
      heading_4_list::text,
      'ΓÇÖ', ''''),
      'ΓÇô', '–'),
      'ΓÇö', '—'),
      'ΓÇ£', '\"'),
      'ΓÇ¥', '\"'),
      'ΓÇæ', '-'),
      '┬░', '°'))::jsonb
    WHERE heading_4_list::text LIKE '%ΓÇ%' OR heading_4_list::text LIKE '%┬░%';

  END IF;
END;
$repair_recruitment_services_mojibake$;

COMMIT;

-- Migration: Fix mojibake (corrupted encoding) in courses and Success Stories text
-- Description:
--   The courses table (title, subtitle, description, overview) and the
--   Success Stories program_sections table (title, content) contain text
--   that was corrupted by a double UTF-8/CP437 encoding mismatch during an
--   earlier data import. Bullets, dashes, apostrophes, and checkmarks were
--   turned into garbled sequences such as "Finance ΓÇó Core Professional".
--   This migration replaces the corrupted sequences with the correct
--   characters. It only touches rows that still contain the corrupted
--   sequences, so it is safe to run repeatedly and safe to run against a
--   database where the text has already been corrected.
-- Date: 2026-09-18

-- ========================================
-- Corrupted sequence -> intended character
-- ========================================
--   ├âΓÇö -> — (em dash)      [compound corruption, must run before ΓÇö]
--   ├éΓÇô -> – (en dash)      [compound corruption, must run before ΓÇô]
--   ├éΓÇö -> — (em dash)      [compound corruption, must run before ΓÇö]
--   ├ù   -> × (multiplication sign)
--   ΓÇó  -> • (bullet)
--   ΓÇÖ  -> ’ (right single quotation mark / apostrophe)
--   ΓÇô  -> – (en dash)
--   ΓÇö  -> — (em dash)
--   Γ£ô  -> ✓ (checkmark)
--
-- Compound sequences are replaced first: they contain the simple sequences
-- as substrings (e.g. "├éΓÇö" contains "ΓÇö"), so replacing the simple
-- sequence first would leave an orphaned "├é" prefix behind.

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'courses'
  ) then

    update public.courses
    set
      title = replace(replace(replace(replace(replace(replace(replace(
        title,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇô', '–'),
        'ΓÇö', '—')
    where title like '%ΓÇ%' or title like '%├%';

    update public.courses
    set
      subtitle = replace(replace(replace(replace(replace(replace(replace(
        subtitle,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇô', '–'),
        'ΓÇö', '—')
    where subtitle like '%ΓÇ%' or subtitle like '%├%';

    update public.courses
    set
      description = replace(replace(replace(replace(replace(replace(replace(
        description,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇô', '–'),
        'ΓÇö', '—')
    where description like '%ΓÇ%' or description like '%├%';

    update public.courses
    set
      overview = replace(replace(replace(replace(replace(replace(replace(
        overview,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇô', '–'),
        'ΓÇö', '—')
    where overview like '%ΓÇ%' or overview like '%├%';

  end if;
end $$;

-- ========================================
-- Success Stories (program_sections): title (text) and content (jsonb)
-- ========================================
-- program_sections.content is jsonb, so the corrupted sequences are fixed by
-- casting to text, replacing, and casting back to jsonb. This only rewrites
-- values, not structure, and the WHERE clause skips rows that are already
-- clean, so this is safe to re-run.

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'program_sections'
  ) then

    update public.program_sections
    set
      title = replace(replace(replace(replace(replace(replace(replace(replace(
        title,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇÖ', '’'),
        'ΓÇô', '–'),
        'ΓÇö', '—')
    where title like '%ΓÇ%' or title like '%├%';

    update public.program_sections
    set
      content = (replace(replace(replace(replace(replace(replace(replace(replace(replace(
        content::text,
        '├âΓÇö', '—'),
        '├éΓÇô', '–'),
        '├éΓÇö', '—'),
        '├ù', '×'),
        'ΓÇó', '•'),
        'ΓÇÖ', '’'),
        'ΓÇô', '–'),
        'ΓÇö', '—'),
        'Γ£ô', '✓'))::jsonb
    where content::text like '%ΓÇ%' or content::text like '%├%' or content::text like '%Γ£%';

  end if;
end $$;

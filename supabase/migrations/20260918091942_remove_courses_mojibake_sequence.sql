-- Migration: Remove corrupted mojibake sequences (courses + Success Stories)
-- Description:
--   public.courses.subtitle contains a corrupted encoding sequence "ΓÇó"
--   (mojibake introduced by an earlier data import) in 300 rows, e.g.
--   "Finance ΓÇó Core Professional ΓÇó L1".
--
--   public.program_sections.title and .content (Success Stories) contain
--   related corrupted sequences from the same import: "ΓÇô", "ΓÇö",
--   "ΓÇÖ", and "Γ£ô".
--
--   This migration removes the corrupted sequences themselves from the
--   affected rows without substituting any other character in their
--   place. The remaining text and its existing spacing/punctuation are
--   left exactly as stored; only the corrupted sequences are deleted.
--   content is jsonb, so it is cast to text, cleaned, and cast back;
--   this rewrites values only and does not change the JSON structure.
--   Only rows currently containing a corrupted sequence are touched, so
--   this is safe to run repeatedly and safe to run against a database
--   where the text has already been corrected or cleaned some other way.
-- Date: 2026-09-18

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'courses'
  ) then

    update public.courses
    set subtitle = replace(subtitle, 'ΓÇó', '')
    where subtitle like '%ΓÇó%';

  end if;
end $$;

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'program_sections'
  ) then

    update public.program_sections
    set title = replace(replace(replace(replace(
      title,
      'Γ£ô', ''),
      'ΓÇÖ', ''),
      'ΓÇô', ''),
      'ΓÇö', '')
    where title like '%ΓÇ%' or title like '%Γ£%';

    update public.program_sections
    set content = (replace(replace(replace(replace(
      content::text,
      'Γ£ô', ''),
      'ΓÇÖ', ''),
      'ΓÇô', ''),
      'ΓÇö', ''))::jsonb
    where content::text like '%ΓÇ%' or content::text like '%Γ£%';

  end if;
end $$;

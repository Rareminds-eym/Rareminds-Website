-- =====================================================
-- Seed: gallery demo data matching the gallery.pdf design
-- =====================================================
-- 12 media items ("Media title 01" … "Media title 12": 8 photos + 4
-- videos), each linked into ALL SIX sectors through gallery_item_sectors
-- so every sector page shows the same "12 items" as the design.
-- Topics cycle through each sector's chips so the chips actually filter.
--
-- Run order (alphabetical, handled automatically by supabase db reset):
--   1. 20261023055025_create_gallery_items.sql  (schema + RLS)
--   2. seed/seed_gallery_section.sql            (the 6 sectors)
--   3. seed/z_gallery_items_seed.sql            (this file)
--
-- !!! IMPORTANT !!!
-- Media URLs use the placeholder https://cdn.rareminds.in/gallery/...
-- Replace them with the real CDN paths in production. Until then the
-- frontend resolves these placeholder paths to the local design assets
-- in public/gallery, so the pages look exactly like the design deck.
--
-- Publishing state baked in:
--   status = 'published', published_at = now(),
--   central + sector clearance = 'approved', show_in_central_gallery = true.
--
-- The seed is idempotent: re-running updates the demo rows.
-- Runs as the postgres role (supabase db reset / SQL editor).
-- =====================================================

-- ========================================
-- PART 0: remove stale placeholder rows from earlier seed layouts
--        (beats only demo content — never real production media)
-- ========================================

delete from public.gallery_items
where title not like 'Media title%'
  and (image_url like 'https://cdn.rareminds.in/gallery/%'
       or video_url like 'https://cdn.rareminds.in/gallery/%');

-- ========================================
-- PART 1: upsert the 12 demo items
-- ========================================

insert into public.gallery_items
    (media_type, title, caption, alt_text, image_url, video_url, thumbnail_url,
     video_provider, subtitles_url, duration_seconds,
     status, show_in_central_gallery, central_clearance_status, published_at,
     event_name, event_date, event_year,
     program, institution_type, organization_name, location)
select 'photo', v.title, v.caption, v.alt_text, v.image_url,
       null, null, null, null, null,
       'published', v.show_in_central, 'approved', now(),
       v.title, v.event_date, v.event_year,
       v.organization_name, v.institution_type, v.organization_name, v.location
from (values
    -- media-01 «PROMPT.»
    ('Media title 01', 'Studio portrait from the campus program photoshoot.',
     'PROMPT. studio portrait from the campus program photoshoot',
     'https://cdn.rareminds.in/gallery/photos/media-01.jpg',
     true,
     DATE '2025-03-12', 2025, 'Acharya', 'College', 'Karnataka'),
    -- media-02 «JUST DO IT»
    ('Media title 02', 'Editorial spread from the student showcase shoot.',
     'JUST DO IT editorial spread from the student showcase shoot',
     'https://cdn.rareminds.in/gallery/photos/media-02.jpg',
     true,
     DATE '2024-06-21', 2024, 'Global International School', 'School', 'Karnataka'),
    -- media-04 foggy path
    ('Media title 04', 'Morning walk in the fog, government outreach program.',
     'foggy morning path during a government outreach program',
     'https://cdn.rareminds.in/gallery/photos/media-04.jpg',
     true,
     DATE '2019-11-02', 2019, 'Tripura', 'Government Body', 'Tripura'),
    -- media-05 «NY» cap still-life
    ('Media title 05', 'Merch still-life photographed for the program launch.',
     'NY cap and gear still-life photographed for the program launch',
     'https://cdn.rareminds.in/gallery/photos/media-05.jpg',
     true,
     DATE '2023-08-18', 2023, 'Naan Mudhalvan 2023 Upskilling Program (Powered by Rareminds)', 'Organization', 'Pan India'),
    -- media-07 skyscraper
    ('Media title 07', 'Looking up between the towers on the industry visit.',
     'looking up between skyscraper towers on an industry visit',
     'https://cdn.rareminds.in/gallery/photos/media-07.jpg',
     true,
     DATE '2023-02-09', 2023, 'Visvesvaraya Technological University', 'University', 'Karnataka'),
    -- media-11 three-portrait triptych
    ('Media title 11', 'Triptych portraits from the showcase collateral shoot.',
     'triptych portraits from the showcase collateral shoot',
     'https://cdn.rareminds.in/gallery/photos/media-11.jpg',
     false,
     DATE '2024-10-27', 2024, 'KSDC', 'School', 'Karnataka'),
    -- media-08 / media-10 mirror the same assets, exactly like the deck
    ('Media title 08', 'Editorial spread from the student showcase shoot.',
     'JUST DO IT editorial spread from the student showcase shoot',
     'https://cdn.rareminds.in/gallery/photos/media-08.jpg',
     true,
     DATE '2019-06-14', 2019, 'TNSDC ITI (Spoken English)', 'Government Body', 'Tripura'),
    ('Media title 10', 'Merch still-life photographed for the program launch.',
     'NY cap and gear still-life photographed for the program launch',
     'https://cdn.rareminds.in/gallery/photos/media-10.jpg',
     false,
     DATE '2025-01-30', 2025, 'Naan Mudhalvan 4th sem 2025 Upskilling Program (Powered by Rareminds)', 'Organization', 'Karnataka')
) as v(title, caption, alt_text, image_url, show_in_central,
       event_date, event_year, organization_name, institution_type, location)
on conflict (image_url) do update set
  title               = excluded.title,
  caption             = excluded.caption,
  alt_text            = excluded.alt_text,
  status              = 'published',
  show_in_central_gallery = excluded.show_in_central_gallery,
  central_clearance_status = 'approved',
  event_year          = excluded.event_year,
  organization_name   = excluded.organization_name,
  institution_type    = excluded.institution_type,
  location            = excluded.location;

insert into public.gallery_items
    (media_type, title, caption, alt_text,
     video_url, thumbnail_url, video_provider, subtitles_url, duration_seconds,
     status, show_in_central_gallery, central_clearance_status, published_at,
     event_name, event_date, event_year,
     program, institution_type, organization_name, location)
select 'video', v.title, v.caption, null,
       v.video_url, v.thumbnail_url, v.video_provider, null,
       v.duration_seconds,
       'published', true, 'approved', now(),
       v.title, v.event_date, v.event_year,
       v.organization_name, v.institution_type, v.organization_name, v.location
from (values
    -- media-03 (video) skyscraper clip
    ('Media title 03', 'Upward tilt clip between the office towers.',
     'https://cdn.rareminds.in/gallery/videos/media-03.mp4',
     'https://cdn.rareminds.in/gallery/videos/media-03.jpg',
     'hosted', 135, DATE '2023-02-09', 2023,
     'Visvesvaraya Technological University', 'University', 'Karnataka'),
    -- media-06 (video) triptych clip
    ('Media title 06', 'Triptych motion piece from the showcase reel.',
     'https://cdn.rareminds.in/gallery/videos/media-06.mp4',
     'https://cdn.rareminds.in/gallery/videos/media-06.jpg',
     'hosted', 155, DATE '2024-03-14', 2024,
     'VELS', 'University', 'Tamil Nadu'),
    -- media-09 (video) fog walk clip
    ('Media title 09', 'Fog-path walk recorded during the outreach camp.',
     'https://cdn.rareminds.in/gallery/videos/media-09.mp4',
     'https://cdn.rareminds.in/gallery/videos/media-09.jpg',
     'hosted', 110, DATE '2019-11-02', 2019,
     'PES', 'College', 'Pan India'),
    -- media-12 (video) cap still-life clip
    ('Media title 12', 'Slow push-in on the merch still-life setup.',
     'https://cdn.rareminds.in/gallery/videos/media-12.mp4',
     'https://cdn.rareminds.in/gallery/videos/media-12.jpg',
     'hosted', 128, DATE '2023-08-18', 2023,
     'AICTE', 'College', 'Pan India')
) as v(title, caption, video_url, thumbnail_url, video_provider, duration_seconds,
       event_date, event_year, organization_name, institution_type, location)
on conflict (video_url) do update set
  title               = excluded.title,
  caption             = excluded.caption,
  thumbnail_url       = excluded.thumbnail_url,
  status              = 'published',
  show_in_central_gallery = true,
  central_clearance_status = 'approved',
  duration_seconds    = excluded.duration_seconds,
  event_year          = excluded.event_year,
  organization_name   = excluded.organization_name,
  institution_type    = excluded.institution_type,
  location            = excluded.location;

-- ========================================
-- PART 2: link every item into every sector
--        (topics cycle through the sector chips)
-- ========================================

insert into public.gallery_item_sectors
    (item_id, sector_id, topics, sort_order, is_featured, clearance_status, assigned_at)
select gi.id, s.id,
       case
         when s.topic_options is null or array_length(s.topic_options, 1) is null then '{}'::text[]
         else array[s.topic_options[1 + (row_number() over () - 1) % array_length(s.topic_options, 1)]]
       end,
       (row_number() over () - 1) % 12,
       false,
       'approved', now()
from public.gallery_sectors s
join public.gallery_items gi on true
where s.is_active
on conflict (item_id, sector_id) do nothing;

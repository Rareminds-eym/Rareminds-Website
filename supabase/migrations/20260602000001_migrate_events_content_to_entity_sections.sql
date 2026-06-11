-- =====================================================
-- Migration: events content → entity_sections + section_contents
-- File:      20260602000001_migrate_events_content_to_entity_sections.sql
-- =====================================================
-- Column → section_key mapping:
--   events.description      → about      (content_type: text)
--   events.key_highlights   → highlights  (content_type: list)
--   events.agenda           → agenda      (content_type: text)
--   events.events_gallery   → gallery     (content_type: gallery)
--   events.speakers_details → speakers    (content_type: cards)
--   events.faq              → faq         (content_type: faq)
--
-- Database objects fixed before column drop:
--   ensure_event_slug()         removed meta_description fallback (referenced description)
--   idx_events_text_search      dropped — GIN expression references description
--   events_summary              dropped and recreated without excerpt column
--   search_events()             description + agenda removed from signature and body
--   get_events_with_user_info() description + agenda removed from signature and body
-- =====================================================

BEGIN;

-- =====================================================
-- PHASE 1: entity_sections
-- =====================================================

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'about'::public.entity_section_key_enum,
    'text',
    1,
    true
FROM public.events
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'highlights'::public.entity_section_key_enum,
    'list',
    2,
    true
FROM public.events
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;

-- agenda: only create a section row when the value is non-null and non-empty
INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'agenda'::public.entity_section_key_enum,
    'text',
    3,
    true
FROM public.events
WHERE agenda IS NOT NULL AND agenda <> ''
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'gallery'::public.entity_section_key_enum,
    'gallery',
    4,
    true
FROM public.events
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'speakers'::public.entity_section_key_enum,
    'cards',
    5,
    true
FROM public.events
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    id,
    'faq'::public.entity_section_key_enum,
    'faq',
    6,
    true
FROM public.events
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;


-- =====================================================
-- PHASE 2: section_contents
-- =====================================================
-- auto_assign_section_content_item_ids is disabled for the bulk insert.
-- The trigger's jsonb || merge operator errors when applied to plain
-- string scalars (highlights / list items). It is re-enabled immediately
-- after. A targeted UPDATE then fires UUID assignment on the three
-- object-array sections (gallery, speakers, faq) only.

ALTER TABLE public.section_contents
    DISABLE TRIGGER auto_assign_section_content_item_ids;

-- about → {"text": "<description>"}
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object('text', e.description)
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'about'
ON CONFLICT (entity_section_id) DO NOTHING;

-- highlights → {"items": ["item1", "item2", ...]}
-- to_jsonb on TEXT[] produces a native JSONB string array
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object(
        'items',
        to_jsonb(COALESCE(e.key_highlights, '{}'::text[]))
    )
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'highlights'
ON CONFLICT (entity_section_id) DO NOTHING;

-- agenda → {"text": "<agenda>"}
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object('text', e.agenda)
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'agenda'
ON CONFLICT (entity_section_id) DO NOTHING;

-- gallery → {"items": [...events_gallery...]}
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object('items', COALESCE(e.events_gallery, '[]'::jsonb))
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'gallery'
ON CONFLICT (entity_section_id) DO NOTHING;

-- speakers → {"items": [...speakers_details...]}
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object('items', COALESCE(e.speakers_details, '[]'::jsonb))
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'speakers'
ON CONFLICT (entity_section_id) DO NOTHING;

-- faq → {"items": [...faq...]}
INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    jsonb_build_object('items', COALESCE(e.faq, '[]'::jsonb))
FROM public.events e
JOIN public.entity_sections es
    ON  es.entity_type = 'event'
    AND es.entity_id   = e.id
    AND es.section_key = 'faq'
ON CONFLICT (entity_section_id) DO NOTHING;

ALTER TABLE public.section_contents
    ENABLE TRIGGER auto_assign_section_content_item_ids;

-- Fire UUID assignment for object-array sections only.
-- highlights (plain string items) is intentionally excluded.
UPDATE public.section_contents sc
SET    updated_at = NOW()
WHERE  entity_section_id IN (
    SELECT id
    FROM   public.entity_sections
    WHERE  entity_type  = 'event'
    AND    section_key IN ('gallery', 'speakers', 'faq')
);


-- =====================================================
-- PHASE 3: FIX DEPENDENT DATABASE OBJECTS
-- =====================================================
-- All dependents are resolved here so that Phase 5 column drops
-- require no CASCADE.

-- 3a. ensure_event_slug()
--     Remove the block that assigned left(NEW.description, 160) to
--     meta_description. The trigger fires for both events and events_draft;
--     events_draft keeps its own description column and is unaffected.
CREATE OR REPLACE FUNCTION public.ensure_event_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := public.generate_event_slug(NEW.title);
    END IF;

    IF NEW.meta_title IS NULL OR NEW.meta_title = '' THEN
        NEW.meta_title := NEW.title;
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION public.ensure_event_slug() OWNER TO postgres;

-- 3b. idx_events_text_search
--     Expression: to_tsvector('english', title || ' ' || description || ' ' || location)
--     Must be removed before description is dropped.
DROP INDEX IF EXISTS public.idx_events_text_search;

-- 3c. events_summary view
--     Excerpt column: left(e.description, 200) || '...'
--     Dropped here; recreated without excerpt in Phase 6.
DROP VIEW IF EXISTS public.events_summary;

-- 3d. search_events()
--     description removed from: RETURNS TABLE, SELECT list, ILIKE predicate.
--     agenda    removed from: RETURNS TABLE, SELECT list.
--     CREATE OR REPLACE cannot change a return type — drop first.
DROP FUNCTION IF EXISTS public.search_events(
    text, text, text, date, date, integer, integer, uuid, integer, integer
);

CREATE FUNCTION public.search_events(
    search_query          text    DEFAULT ''::text,
    event_category        text    DEFAULT ''::text,
    event_status          text    DEFAULT ''::text,
    start_date            date    DEFAULT NULL::date,
    end_date              date    DEFAULT NULL::date,
    min_capacity          integer DEFAULT 0,
    max_capacity          integer DEFAULT NULL::integer,
    user_uuid             uuid    DEFAULT NULL::uuid,
    limit_count           integer DEFAULT 50,
    offset_count          integer DEFAULT 0
)
RETURNS TABLE (
    id                      uuid,
    user_id                 uuid,
    title                   text,
    event_date              date,
    event_time              time without time zone,
    duration                text,
    location                text,
    organizer_name          text,
    organizer_email         text,
    organizer_phone         text,
    capacity                integer,
    category                text,
    price                   text,
    registration_deadline   date,
    requirements            text,
    speakers                text[],
    sponsors                text[],
    additional_contact_info text,
    status                  text,
    event_banner            text,
    featured_image          text,
    event_tags              text[],
    meta_title              text,
    meta_description        text,
    slug                    text,
    created_at              timestamp with time zone,
    updated_at              timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        e.user_id,
        e.title,
        e.event_date,
        e.event_time,
        e.duration,
        e.location,
        e.organizer_name,
        e.organizer_email,
        e.organizer_phone,
        e.capacity,
        e.category,
        e.price,
        e.registration_deadline,
        e.requirements,
        e.speakers,
        e.sponsors,
        e.additional_contact_info,
        e.status,
        e.event_banner,
        e.featured_image,
        e.event_tags,
        e.meta_title,
        e.meta_description,
        e.slug,
        e.created_at,
        e.updated_at
    FROM public.events e
    WHERE
        (search_query = '' OR (
            e.title          ILIKE '%' || search_query || '%' OR
            e.location       ILIKE '%' || search_query || '%' OR
            e.organizer_name ILIKE '%' || search_query || '%' OR
            EXISTS (
                SELECT 1
                FROM   unnest(e.event_tags) AS tag
                WHERE  tag ILIKE '%' || search_query || '%'
            )
        ))
        AND (event_category = '' OR e.category = event_category)
        AND (event_status   = '' OR e.status   = event_status)
        AND (start_date IS NULL OR e.event_date >= start_date)
        AND (end_date   IS NULL OR e.event_date <= end_date)
        AND  e.capacity >= min_capacity
        AND (max_capacity IS NULL OR e.capacity <= max_capacity)
        AND (user_uuid    IS NULL OR e.user_id  =  user_uuid)
    ORDER BY
        CASE
            WHEN e.status = 'upcoming'  THEN 1
            WHEN e.status = 'ongoing'   THEN 2
            WHEN e.status = 'completed' THEN 3
            ELSE 4
        END,
        e.event_date ASC,
        e.created_at DESC
    LIMIT  limit_count
    OFFSET offset_count;
END;
$$;

ALTER FUNCTION public.search_events(
    text, text, text, date, date, integer, integer, uuid, integer, integer
) OWNER TO postgres;

-- 3e. get_events_with_user_info()
--     description and agenda removed from RETURNS TABLE and SELECT list.
--     CREATE OR REPLACE cannot change a return type — drop first.
DROP FUNCTION IF EXISTS public.get_events_with_user_info();

CREATE FUNCTION public.get_events_with_user_info()
RETURNS TABLE (
    id                      uuid,
    user_id                 uuid,
    title                   text,
    event_date              date,
    event_time              time without time zone,
    duration                text,
    location                text,
    organizer_name          text,
    organizer_email         text,
    organizer_phone         text,
    capacity                integer,
    category                text,
    price                   text,
    registration_deadline   date,
    requirements            text,
    speakers                text[],
    sponsors                text[],
    additional_contact_info text,
    status                  text,
    event_banner            text,
    featured_image          text,
    event_tags              text[],
    meta_title              text,
    meta_description        text,
    slug                    text,
    created_at              timestamp with time zone,
    updated_at              timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        e.user_id,
        e.title,
        e.event_date,
        e.event_time,
        e.duration,
        e.location,
        e.organizer_name,
        e.organizer_email,
        e.organizer_phone,
        e.capacity,
        e.category,
        e.price,
        e.registration_deadline,
        e.requirements,
        e.speakers,
        e.sponsors,
        e.additional_contact_info,
        e.status,
        e.event_banner,
        e.featured_image,
        e.event_tags,
        e.meta_title,
        e.meta_description,
        e.slug,
        e.created_at,
        e.updated_at
    FROM public.events e
    ORDER BY e.created_at DESC;
END;
$$;

ALTER FUNCTION public.get_events_with_user_info() OWNER TO postgres;


-- =====================================================
-- PHASE 4: VERIFY MIGRATION
-- =====================================================
-- Runs after all dependent objects are fixed and before column drops.
-- The entire transaction rolls back on any assertion failure.

DO $$
DECLARE
    v_events  integer;
    v_about   integer;
    v_content integer;
BEGIN
    SELECT COUNT(*) INTO v_events FROM public.events;

    SELECT COUNT(DISTINCT es.entity_id) INTO v_about
    FROM   public.entity_sections es
    WHERE  es.entity_type = 'event'
    AND    es.section_key = 'about';

    IF v_about <> v_events THEN
        RAISE EXCEPTION
            'Verification failed: % events exist but only % have an about section.',
            v_events, v_about;
    END IF;

    SELECT COUNT(*) INTO v_content
    FROM   public.entity_sections  es
    JOIN   public.section_contents sc ON sc.entity_section_id = es.id
    WHERE  es.entity_type = 'event'
    AND    es.section_key = 'about';

    IF v_content <> v_events THEN
        RAISE EXCEPTION
            'Verification failed: % events exist but only % about content rows found.',
            v_events, v_content;
    END IF;

    RAISE NOTICE 'Migration verified: % events fully migrated.', v_events;
END;
$$;


-- =====================================================
-- PHASE 5: DROP SOURCE COLUMNS
-- =====================================================
-- The GIN index and events_summary view were dropped in Phase 3.
-- All functions were updated in Phase 3. No CASCADE required.

ALTER TABLE public.events DROP COLUMN IF EXISTS description;
ALTER TABLE public.events DROP COLUMN IF EXISTS key_highlights;
ALTER TABLE public.events DROP COLUMN IF EXISTS agenda;
ALTER TABLE public.events DROP COLUMN IF EXISTS events_gallery;
ALTER TABLE public.events DROP COLUMN IF EXISTS speakers_details;
ALTER TABLE public.events DROP COLUMN IF EXISTS faq;


-- =====================================================
-- PHASE 6: RECREATE events_summary (without excerpt)
-- =====================================================

CREATE VIEW public.events_summary AS
SELECT
    e.id,
    e.title,
    e.event_date,
    e.event_time,
    e.location,
    e.category,
    e.status,
    e.capacity,
    e.featured_image,
    e.slug,
    e.meta_title,
    e.meta_description,
    array_length(e.event_tags, 1) AS tag_count,
    e.created_at
FROM public.events e
ORDER BY e.created_at DESC;

ALTER VIEW public.events_summary OWNER TO postgres;

COMMIT;

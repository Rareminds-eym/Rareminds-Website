-- =====================================================
-- Migration: events table schema optimization
-- File:      20260603000001_optimize_events_schema.sql
-- =====================================================
-- Changes:
--   1.  CREATE event_category_enum, event_status_enum
--   2.  ADD four dedicated JSONB columns:
--         content_metadata, media_metadata,
--         organizer_metadata, location_metadata
--   3.  Backfill each JSONB column from flat columns
--   4.  duration  TEXT   → INTEGER (total minutes)
--   5.  price     TEXT   → NUMERIC(10,2)
--   6.  category  TEXT   → event_category_enum
--   7.  status    TEXT + CHECK → event_status_enum
--   8.  DROP columns removed entirely:
--         event_link, speakers, enquiry_pdf, enquiry_pdf_path,
--         meta_title, meta_description
--   9.  DROP flat columns now in JSONB columns
--  10.  RENAME user_id → created_by
--  11.  Update RLS policies (user_id → created_by)
--  12.  Update ensure_event_slug() trigger
--  13.  Fix all dependent views and functions
-- =====================================================
--
-- Final events table (flat columns only):
--   id, created_by, title, event_date, event_time,
--   duration (integer), category (enum),
--   price (numeric), registration_deadline, status (enum),
--   is_physical, slug,
--   content_metadata, media_metadata,
--   organizer_metadata, location_metadata,
--   created_at, updated_at
--
-- JSONB column contents:
--   content_metadata:   event_link, zoho_form_url,
--                       requirements, sponsors,
--                       additional_contact_info,
--                       languages, event_tags, capacity
--   media_metadata:     featured_image, event_banner,
--                       mobile_featured_image, teaser_video
--   organizer_metadata: name, email, phone
--   location_metadata:  address, lat, lng
--
-- Removed entirely (no migration to JSONB):
--   meta_title, meta_description,
--   event_link, speakers, enquiry_pdf, enquiry_pdf_path
-- =====================================================

BEGIN;

-- =====================================================
-- STEP 1: Create enum types
-- =====================================================

CREATE TYPE public.event_category_enum AS ENUM (
    'Workshop',
    'Webinar',
    'Seminar',
    'Conference',
    'Training',
    'Bootcamp',
    'Hackathon',
    'Other'
);

CREATE TYPE public.event_status_enum AS ENUM (
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
);

-- =====================================================
-- STEP 2: Add four dedicated JSONB columns
-- =====================================================

ALTER TABLE public.events
    ADD COLUMN content_metadata   JSONB NOT NULL DEFAULT '{"event_link":"","zoho_form_url":"","sponsors":[],"requirements":"","additional_contact_info":"","languages":[],"event_tags":[],"capacity":0}'::jsonb,
    ADD COLUMN media_metadata     JSONB NOT NULL DEFAULT '{"featured_image":"","mobile_featured_image":"","event_banner":"","teaser_video":"","enquiry_pdf":""}'::jsonb,
    ADD COLUMN organizer_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN location_metadata  JSONB NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================
-- STEP 3: Backfill JSONB columns from flat columns
-- =====================================================

UPDATE public.events
SET content_metadata = jsonb_strip_nulls(jsonb_build_object(
    'event_link',              COALESCE(event_link, ''),
    'zoho_form_url',           '',
    'requirements',            requirements,
    'sponsors',                to_jsonb(COALESCE(sponsors,   '{}'::text[])),
    'additional_contact_info', additional_contact_info,
    'languages',               to_jsonb(COALESCE(languages,  '{}'::text[])),
    'event_tags',              to_jsonb(COALESCE(event_tags, '{}'::text[])),
    'capacity',                capacity
));

UPDATE public.events
SET media_metadata = jsonb_strip_nulls(jsonb_build_object(
    'featured_image',        featured_image,
    'event_banner',          event_banner,
    'mobile_featured_image', mobile_featured_image,
    'teaser_video',          teaser_video,
    'enquiry_pdf',           COALESCE(enquiry_pdf, '')
));

UPDATE public.events
SET organizer_metadata = jsonb_strip_nulls(jsonb_build_object(
    'name',  organizer_name,
    'email', organizer_email,
    'phone', organizer_phone
));

UPDATE public.events
SET location_metadata = jsonb_strip_nulls(jsonb_build_object(
    'address', location,
    'lat',     location_latitude,
    'lng',     location_longitude
));

-- =====================================================
-- STEP 4: duration TEXT → INTEGER (total minutes)
-- =====================================================

ALTER TABLE public.events ADD COLUMN duration_new INTEGER;

UPDATE public.events
SET duration_new = CASE
    WHEN duration ILIKE '%day%' THEN
        COALESCE(
            NULLIF(REGEXP_REPLACE(duration, '[^0-9]', '', 'g'), '')::integer, 1
        ) * 1440
    WHEN duration ILIKE '%hour%' OR duration ILIKE '%hr%' THEN
        COALESCE(
            NULLIF(REGEXP_REPLACE(duration, '[^0-9]', '', 'g'), '')::integer, 1
        ) * 60
    WHEN duration ILIKE '%min%' THEN
        COALESCE(
            NULLIF(REGEXP_REPLACE(duration, '[^0-9]', '', 'g'), '')::integer, 60
        )
    ELSE 60
END;

ALTER TABLE public.events DROP COLUMN duration;
ALTER TABLE public.events RENAME COLUMN duration_new TO duration;
ALTER TABLE public.events ALTER COLUMN duration SET NOT NULL;
ALTER TABLE public.events ALTER COLUMN duration SET DEFAULT 60;

-- =====================================================
-- STEP 5: price TEXT → NUMERIC(10,2)
-- =====================================================

ALTER TABLE public.events ADD COLUMN price_new NUMERIC(10,2);

UPDATE public.events
SET price_new = CASE
    WHEN price IS NULL THEN NULL
    WHEN UPPER(TRIM(price)) IN ('FREE', 'FREE EVENT', '0', '') THEN 0.00
    ELSE NULLIF(REGEXP_REPLACE(price, '[^0-9.]', '', 'g'), '')::numeric(10,2)
END;

ALTER TABLE public.events DROP COLUMN price;
ALTER TABLE public.events RENAME COLUMN price_new TO price;

-- =====================================================
-- STEP 5b: Drop views that depend on category / status
-- PostgreSQL blocks ALTER COLUMN TYPE while a view
-- references the column. Drop them here; they are
-- fully recreated in Step 13.
-- =====================================================

DROP VIEW IF EXISTS public.events_calendar;
DROP VIEW IF EXISTS public.events_summary;

-- =====================================================
-- STEP 6: category TEXT → event_category_enum
-- =====================================================

UPDATE public.events
SET category = 'Other'
WHERE category NOT IN (
    'Workshop', 'Webinar', 'Seminar', 'Conference',
    'Training', 'Bootcamp', 'Hackathon'
);

ALTER TABLE public.events
    ALTER COLUMN category TYPE public.event_category_enum
    USING category::public.event_category_enum;

-- =====================================================
-- STEP 7: status TEXT + CHECK → event_status_enum
-- =====================================================

ALTER TABLE public.events
    DROP CONSTRAINT IF EXISTS events_status_check;

ALTER TABLE public.events
    ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.events
    ALTER COLUMN status TYPE public.event_status_enum
    USING status::public.event_status_enum;

ALTER TABLE public.events
    ALTER COLUMN status SET DEFAULT 'upcoming'::public.event_status_enum;

-- =====================================================
-- STEP 8: Drop columns removed entirely
-- meta_title and meta_description are dropped outright —
-- not moved to any JSONB column.
-- =====================================================

ALTER TABLE public.events DROP COLUMN IF EXISTS event_link;
ALTER TABLE public.events DROP COLUMN IF EXISTS speakers;
ALTER TABLE public.events DROP COLUMN IF EXISTS enquiry_pdf;
ALTER TABLE public.events DROP COLUMN IF EXISTS enquiry_pdf_path;
ALTER TABLE public.events DROP COLUMN IF EXISTS meta_title;
ALTER TABLE public.events DROP COLUMN IF EXISTS meta_description;

-- =====================================================
-- STEP 9: Drop flat columns now in JSONB columns
-- =====================================================

-- → content_metadata
ALTER TABLE public.events DROP COLUMN IF EXISTS requirements;
ALTER TABLE public.events DROP COLUMN IF EXISTS sponsors;
ALTER TABLE public.events DROP COLUMN IF EXISTS additional_contact_info;
ALTER TABLE public.events DROP COLUMN IF EXISTS languages;
ALTER TABLE public.events DROP COLUMN IF EXISTS event_tags;
ALTER TABLE public.events DROP COLUMN IF EXISTS capacity;

-- → media_metadata
ALTER TABLE public.events DROP COLUMN IF EXISTS featured_image;
ALTER TABLE public.events DROP COLUMN IF EXISTS event_banner;
ALTER TABLE public.events DROP COLUMN IF EXISTS mobile_featured_image;
ALTER TABLE public.events DROP COLUMN IF EXISTS teaser_video;

-- → organizer_metadata
ALTER TABLE public.events DROP COLUMN IF EXISTS organizer_name;
ALTER TABLE public.events DROP COLUMN IF EXISTS organizer_email;
ALTER TABLE public.events DROP COLUMN IF EXISTS organizer_phone;

-- → location_metadata
ALTER TABLE public.events DROP COLUMN IF EXISTS location;
ALTER TABLE public.events DROP COLUMN IF EXISTS location_latitude;
ALTER TABLE public.events DROP COLUMN IF EXISTS location_longitude;

-- =====================================================
-- STEP 10: Rename user_id → created_by
-- Wrapped in DO blocks so re-runs are safe if a prior
-- partial attempt already committed any of these.
-- =====================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name   = 'events'
          AND column_name  = 'user_id'
    ) THEN
        ALTER TABLE public.events RENAME COLUMN user_id TO created_by;
    END IF;
END $$;

ALTER INDEX IF EXISTS public.idx_events_user_id
    RENAME TO idx_events_created_by;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema    = 'public'
          AND table_name      = 'events'
          AND constraint_name = 'events_user_id_fkey'
    ) THEN
        ALTER TABLE public.events
            RENAME CONSTRAINT events_user_id_fkey TO events_created_by_fkey;
    END IF;
END $$;

-- =====================================================
-- STEP 11: Update RLS policies
-- =====================================================

DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
DROP POLICY IF EXISTS "Users can insert their own events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;

CREATE POLICY "Users can delete their own events" ON public.events
    FOR DELETE USING (
        auth.uid() = created_by
        OR EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
              AND user_roles.role::text = ANY (ARRAY['admin'::text, 'owner'::text])
        )
    );

CREATE POLICY "Users can insert their own events" ON public.events
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" ON public.events
    FOR UPDATE USING (
        auth.uid() = created_by
        OR EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
              AND user_roles.role::text = ANY (ARRAY['admin'::text, 'owner'::text])
        )
    );

-- =====================================================
-- STEP 12: Update ensure_event_slug() trigger
-- meta_title is gone from events — trigger no longer
-- sets it for that table. events_draft still has
-- meta_title as a flat column so TG_TABLE_NAME guard
-- keeps draft behaviour intact.
-- =====================================================

CREATE OR REPLACE FUNCTION public.ensure_event_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := public.generate_event_slug(NEW.title);
    END IF;

    IF TG_TABLE_NAME = 'events_draft' THEN
        IF NEW.meta_title IS NULL OR NEW.meta_title = '' THEN
            NEW.meta_title := NEW.title;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION public.ensure_event_slug() OWNER TO postgres;

-- =====================================================
-- STEP 13: Fix all dependent database objects
-- =====================================================

-- -------------------------------------------------------
-- 13a. events_calendar view
-- -------------------------------------------------------
DROP VIEW IF EXISTS public.events_calendar;

CREATE VIEW public.events_calendar AS
SELECT
    e.event_date,
    e.event_time,
    e.title,
    e.category::text,
    e.location_metadata->>'address'                                    AS location,
    e.status::text,
    e.slug,
    e.media_metadata->>'featured_image'                                AS featured_image,
    EXTRACT(dow   FROM e.event_date)                                   AS day_of_week,
    EXTRACT(week  FROM e.event_date)                                   AS week_number,
    EXTRACT(month FROM e.event_date)                                   AS month_number
FROM public.events e
WHERE e.status IN (
    'upcoming'::public.event_status_enum,
    'ongoing'::public.event_status_enum
)
ORDER BY e.event_date, e.event_time;

ALTER VIEW public.events_calendar OWNER TO postgres;

-- -------------------------------------------------------
-- 13b. events_summary view
-- -------------------------------------------------------
DROP VIEW IF EXISTS public.events_summary;

CREATE VIEW public.events_summary AS
SELECT
    e.id,
    e.title,
    e.event_date,
    e.event_time,
    e.location_metadata->>'address'                                     AS location,
    e.category::text,
    e.status::text,
    e.media_metadata->>'featured_image'                                 AS featured_image,
    e.slug,
    jsonb_array_length(
        COALESCE(e.content_metadata->'event_tags', '[]'::jsonb)
    )                                                                   AS tag_count,
    e.created_at
FROM public.events e
ORDER BY e.created_at DESC;

ALTER VIEW public.events_summary OWNER TO postgres;

-- -------------------------------------------------------
-- 13c. search_events()
--      Removed from RETURNS TABLE: meta_title, meta_description
--      Renamed in RETURNS TABLE: user_id → created_by
--      DROP required because return type changed.
-- -------------------------------------------------------
DROP FUNCTION IF EXISTS public.search_events(
    text, text, text, date, date, integer, integer, uuid, integer, integer
);

CREATE FUNCTION public.search_events(
    search_query   text    DEFAULT ''::text,
    event_category text    DEFAULT ''::text,
    event_status   text    DEFAULT ''::text,
    start_date     date    DEFAULT NULL::date,
    end_date       date    DEFAULT NULL::date,
    min_capacity   integer DEFAULT 0,
    max_capacity   integer DEFAULT NULL::integer,
    user_uuid      uuid    DEFAULT NULL::uuid,
    limit_count    integer DEFAULT 50,
    offset_count   integer DEFAULT 0
)
RETURNS TABLE (
    id                      uuid,
    created_by              uuid,
    title                   text,
    event_date              date,
    event_time              time without time zone,
    duration                integer,
    location                text,
    category                text,
    price                   numeric,
    registration_deadline   date,
    content_metadata        jsonb,
    media_metadata          jsonb,
    organizer_metadata      jsonb,
    location_metadata       jsonb,
    status                  text,
    featured_image          text,
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
        e.created_by,
        e.title,
        e.event_date,
        e.event_time,
        e.duration,
        e.location_metadata->>'address',
        e.category::text,
        e.price,
        e.registration_deadline,
        e.content_metadata,
        e.media_metadata,
        e.organizer_metadata,
        e.location_metadata,
        e.status::text,
        e.media_metadata->>'featured_image',
        e.slug,
        e.created_at,
        e.updated_at
    FROM public.events e
    WHERE
        (search_query = '' OR (
            e.title                              ILIKE '%' || search_query || '%' OR
            e.location_metadata->>'address'      ILIKE '%' || search_query || '%' OR
            e.organizer_metadata->>'name'        ILIKE '%' || search_query || '%' OR
            EXISTS (
                SELECT 1
                FROM   jsonb_array_elements_text(
                           COALESCE(e.content_metadata->'event_tags', '[]'::jsonb)
                       ) AS tag
                WHERE  tag ILIKE '%' || search_query || '%'
            )
        ))
        AND (event_category = '' OR e.category::text = event_category)
        AND (event_status   = '' OR e.status::text   = event_status)
        AND (start_date IS NULL OR e.event_date >= start_date)
        AND (end_date   IS NULL OR e.event_date <= end_date)
        AND  COALESCE((e.content_metadata->>'capacity')::integer, 0) >= min_capacity
        AND (max_capacity IS NULL OR
             COALESCE((e.content_metadata->>'capacity')::integer, 0) <= max_capacity)
        AND (user_uuid IS NULL OR e.created_by = user_uuid)
    ORDER BY
        CASE e.status
            WHEN 'upcoming'  THEN 1
            WHEN 'ongoing'   THEN 2
            WHEN 'completed' THEN 3
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

-- -------------------------------------------------------
-- 13d. get_events_with_user_info()
--      Same changes as search_events.
--      DROP required because return type changed.
-- -------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_events_with_user_info();

CREATE FUNCTION public.get_events_with_user_info()
RETURNS TABLE (
    id                      uuid,
    created_by              uuid,
    title                   text,
    event_date              date,
    event_time              time without time zone,
    duration                integer,
    location                text,
    category                text,
    price                   numeric,
    registration_deadline   date,
    content_metadata        jsonb,
    media_metadata          jsonb,
    organizer_metadata      jsonb,
    location_metadata       jsonb,
    status                  text,
    featured_image          text,
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
        e.created_by,
        e.title,
        e.event_date,
        e.event_time,
        e.duration,
        e.location_metadata->>'address',
        e.category::text,
        e.price,
        e.registration_deadline,
        e.content_metadata,
        e.media_metadata,
        e.organizer_metadata,
        e.location_metadata,
        e.status::text,
        e.media_metadata->>'featured_image',
        e.slug,
        e.created_at,
        e.updated_at
    FROM public.events e
    ORDER BY e.created_at DESC;
END;
$$;

ALTER FUNCTION public.get_events_with_user_info() OWNER TO postgres;

-- -------------------------------------------------------
-- 13e. get_events_by_status()
--      DROP required because return type changed.
-- -------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_events_by_status(text, uuid, integer, integer);

CREATE FUNCTION public.get_events_by_status(
    event_status  text,
    user_uuid     uuid    DEFAULT NULL::uuid,
    limit_count   integer DEFAULT 20,
    offset_count  integer DEFAULT 0
)
RETURNS TABLE (
    id             uuid,
    title          text,
    event_date     date,
    event_time     time without time zone,
    location       text,
    category       text,
    status         text,
    featured_image text,
    slug           text,
    created_at     timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        e.title,
        e.event_date,
        e.event_time,
        e.location_metadata->>'address',
        e.category::text,
        e.status::text,
        e.media_metadata->>'featured_image',
        e.slug,
        e.created_at
    FROM public.events e
    WHERE
        e.status::text = event_status
        AND (user_uuid IS NULL OR e.created_by = user_uuid)
    ORDER BY
        CASE
            WHEN event_status = 'upcoming' THEN e.event_date::text
            ELSE e.created_at::text
        END DESC
    LIMIT  limit_count
    OFFSET offset_count;
END;
$$;

ALTER FUNCTION public.get_events_by_status(text, uuid, integer, integer) OWNER TO postgres;

-- -------------------------------------------------------
-- 13f. get_popular_event_categories()
--      Return type unchanged; CREATE OR REPLACE sufficient.
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_popular_event_categories(
    user_uuid   uuid    DEFAULT NULL::uuid,
    limit_count integer DEFAULT 10
)
RETURNS TABLE (
    category       text,
    event_count    bigint,
    total_capacity bigint,
    avg_capacity   numeric,
    upcoming_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.category::text,
        COUNT(*) AS event_count,
        COALESCE(SUM((e.content_metadata->>'capacity')::integer), 0) AS total_capacity,
        ROUND(AVG((e.content_metadata->>'capacity')::integer), 2)    AS avg_capacity,
        COUNT(*) FILTER (WHERE e.status = 'upcoming')                AS upcoming_count
    FROM public.events e
    WHERE (user_uuid IS NULL OR e.created_by = user_uuid)
    GROUP BY e.category
    ORDER BY event_count DESC, total_capacity DESC
    LIMIT limit_count;
END;
$$;

ALTER FUNCTION public.get_popular_event_categories(uuid, integer) OWNER TO postgres;

-- -------------------------------------------------------
-- 13g. get_event_analytics()
--      Return type unchanged; CREATE OR REPLACE sufficient.
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_event_analytics(
    user_uuid uuid DEFAULT NULL::uuid
)
RETURNS TABLE (
    total_events          bigint,
    upcoming_events       bigint,
    ongoing_events        bigint,
    completed_events      bigint,
    cancelled_events      bigint,
    total_capacity        bigint,
    events_this_month     bigint,
    events_this_week      bigint,
    most_popular_category text,
    average_capacity      numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH event_stats AS (
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE e.status = 'upcoming')  AS upcoming,
            COUNT(*) FILTER (WHERE e.status = 'ongoing')   AS ongoing,
            COUNT(*) FILTER (WHERE e.status = 'completed') AS completed,
            COUNT(*) FILTER (WHERE e.status = 'cancelled') AS cancelled,
            COALESCE(SUM((e.content_metadata->>'capacity')::integer), 0) AS total_cap,
            COUNT(*) FILTER (
                WHERE DATE_TRUNC('month', e.created_at) = DATE_TRUNC('month', CURRENT_DATE)
            ) AS month_count,
            COUNT(*) FILTER (
                WHERE e.created_at >= CURRENT_DATE - INTERVAL '7 days'
            ) AS week_count,
            AVG((e.content_metadata->>'capacity')::integer) AS avg_cap
        FROM public.events e
        WHERE (user_uuid IS NULL OR e.created_by = user_uuid)
    ),
    popular_category AS (
        SELECT e.category::text
        FROM public.events e
        WHERE (user_uuid IS NULL OR e.created_by = user_uuid)
        GROUP BY e.category
        ORDER BY COUNT(*) DESC
        LIMIT 1
    )
    SELECT
        es.total,
        es.upcoming,
        es.ongoing,
        es.completed,
        es.cancelled,
        es.total_cap,
        es.month_count,
        es.week_count,
        COALESCE(pc.category, 'N/A'),
        ROUND(es.avg_cap, 2)
    FROM event_stats es
    CROSS JOIN popular_category pc;
END;
$$;

ALTER FUNCTION public.get_event_analytics(uuid) OWNER TO postgres;

-- -------------------------------------------------------
-- 13h. get_events_by_date_range()
--      Return type unchanged; CREATE OR REPLACE sufficient.
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_events_by_date_range(
    start_date date,
    end_date   date,
    user_uuid  uuid DEFAULT NULL::uuid
)
RETURNS TABLE (
    event_date  date,
    event_count bigint,
    events      jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.event_date,
        COUNT(*) AS event_count,
        jsonb_agg(
            jsonb_build_object(
                'id',             e.id,
                'title',          e.title,
                'event_time',     e.event_time,
                'location',       e.location_metadata->>'address',
                'category',       e.category::text,
                'status',         e.status::text,
                'capacity',       (e.content_metadata->>'capacity')::integer,
                'featured_image', e.media_metadata->>'featured_image',
                'slug',           e.slug
            ) ORDER BY e.event_time
        ) AS events
    FROM public.events e
    WHERE
        e.event_date >= start_date
        AND e.event_date <= end_date
        AND (user_uuid IS NULL OR e.created_by = user_uuid)
    GROUP BY e.event_date
    ORDER BY e.event_date;
END;
$$;

ALTER FUNCTION public.get_events_by_date_range(date, date, uuid) OWNER TO postgres;

COMMIT;

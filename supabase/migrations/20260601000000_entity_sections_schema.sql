-- =====================================================
-- ENTITY SECTIONS MODULE SCHEMA
-- =====================================================
-- Purpose: Centralized dynamic section management for
--          Events (Phase 1) and future entities like Programs.
-- PRD Reference: Centralized Dynamic Section Management System
-- Author: Backend Team
-- Date: 2026-06-01
--
-- Tables:   entity_sections, section_contents
-- Reuses:   update_updated_at_column() from programme_schema.sql (confirmed in remote schema)
-- Creates:  assign_section_content_item_ids() — self-contained, no external function dependencies
-- Creates:  entity_type_enum, entity_section_key_enum — ENUM types for strict validation
-- Untouched: events, programs, program_sections
-- =====================================================


-- =====================================================
-- ENUM TYPES
-- =====================================================
-- Distinct names avoid conflicts with section_key_type and
-- content_type ENUMs already defined in programme_schema.sql.

CREATE TYPE public.entity_type_enum AS ENUM (
    'event',     -- Phase 1 — active now
    'program'    -- Phase 2 — future migration
);

CREATE TYPE public.entity_section_key_enum AS ENUM (
    'hero',          -- Main banner: title, description, date, platform
    'about',         -- About The Event text (maps from events.description)
    'highlights',    -- Bullet point list (maps from events.key_highlights)
    'agenda',        -- Event agenda text (maps from events.agenda)
    'gallery',       -- Event image gallery (maps from events.events_gallery)
    'speakers',      -- Speaker/trainer profiles (maps from events.speakers_details)
    'stats',         -- Stat cards: 150K+ teachers, 22+ states etc
    'features',      -- Feature cards: what attendees will learn
    'testimonials',  -- Testimonial/review cards from attendees
    'faq',           -- FAQ accordion (maps from events.faq)
    'cta'            -- Bottom call-to-action with button text
);


-- =====================================================
-- ENTITY SECTIONS TABLE
-- =====================================================

CREATE TABLE public.entity_sections (

    id              UUID                            PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 'event' (Phase 1) | 'program' (Phase 2)
    entity_type     public.entity_type_enum         NOT NULL,

    -- No FK — polymorphic: points to events.id or programs.id per entity_type
    entity_id       UUID                            NOT NULL,

    section_key     public.entity_section_key_enum  NOT NULL,

    content_type    TEXT        NOT NULL DEFAULT 'text'
                    CHECK (content_type IN (
                        'text',    -- {"text": "..."}
                        'list',    -- {"items": ["...", "..."]}
                        'stats',   -- {"items": [{"value": "150K+", "label": "..."}]}
                        'cards',   -- {"items": [{"title": "...", "description": "..."}]}
                        'gallery', -- {"items": [{"url": "...", "caption": "..."}]}
                        'faq'      -- {"items": [{"question": "...", "answer": "..."}]}
                    )),

    display_order   INTEGER     NOT NULL DEFAULT 0,
    is_active       BOOLEAN     NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_entity_section
        UNIQUE (entity_type, entity_id, section_key)
);

ALTER TABLE public.entity_sections OWNER TO postgres;

COMMENT ON TABLE public.entity_sections
    IS 'Maps dynamic sections to entities (events, programs). One row per section per entity.';

COMMENT ON COLUMN public.entity_sections.entity_type
    IS 'ENUM entity_type_enum: event (Phase 1) | program (Phase 2 future migration).';

COMMENT ON COLUMN public.entity_sections.entity_id
    IS 'UUID of the event or program. No FK — polymorphic. App must ensure validity.';

COMMENT ON COLUMN public.entity_sections.section_key
    IS 'ENUM entity_section_key_enum: hero | about | highlights | agenda | gallery | speakers | stats | features | testimonials | faq | cta';

COMMENT ON COLUMN public.entity_sections.content_type
    IS 'Frontend render type: text | list | stats | cards | gallery | faq';

COMMENT ON COLUMN public.entity_sections.display_order
    IS 'Page order. Lower number appears first. 0-based.';

COMMENT ON COLUMN public.entity_sections.is_active
    IS 'true = visible to visitors. false = hidden without deletion.';


-- =====================================================
-- SECTION CONTENTS TABLE
-- =====================================================
-- JSONB content shapes by content_type:
--   text    → { "text": "..." }
--   list    → { "items": ["...", "..."] }
--   stats   → { "items": [{ "value": "150K+", "label": "..." }] }
--   cards   → { "items": [{ "title": "...", "description": "...", "icon": "..." }] }
--   gallery → { "items": [{ "url": "...", "caption": "..." }] }
--   faq     → { "items": [{ "question": "...", "answer": "..." }] }

CREATE TABLE public.section_contents (

    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

    -- FK to entity_sections. CASCADE ensures content deleted with section.
    entity_section_id   UUID        NOT NULL
                        REFERENCES public.entity_sections(id)
                        ON DELETE CASCADE,

    title               TEXT,
    preamble            TEXT,

    -- Must always be a JSON object. Shape determined by content_type in entity_sections.
    content             JSONB       NOT NULL DEFAULT '{}'
                        CHECK (jsonb_typeof(content) = 'object'),

    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Enforces the 1:1 relationship defined in the PRD (one section → one content row).
    CONSTRAINT unique_section_content
        UNIQUE (entity_section_id)
);

ALTER TABLE public.section_contents OWNER TO postgres;

COMMENT ON TABLE public.section_contents
    IS 'Stores actual JSONB content for each entity section. Shape is determined by content_type in entity_sections.';

COMMENT ON COLUMN public.section_contents.entity_section_id
    IS 'FK to entity_sections.id. UNIQUE enforces 1:1 per PRD §5.1. Cascade delete removes content when section is removed.';

COMMENT ON COLUMN public.section_contents.title
    IS 'Optional section heading displayed above the content.';

COMMENT ON COLUMN public.section_contents.preamble
    IS 'Optional intro line shown between title and main content.';

COMMENT ON COLUMN public.section_contents.content
    IS 'JSONB payload. Always a JSON object. Shape: text={text}, list/stats/cards/gallery/faq={items:[]}';


-- =====================================================
-- TRIGGER FUNCTION
-- =====================================================
-- Cannot reuse auto_assign_jsonb_ids() — it reads NEW.content_type
-- which does not exist on section_contents. This function checks
-- content.items directly, covering all array-based content types.
--
-- assign_item_ids() is intentionally inlined here rather than called
-- as an external function. assign_item_ids() lives in programme_schema.sql
-- which is not present on the remote database, so any call to it would
-- succeed at migration time (PL/pgSQL uses late binding) but fail at
-- runtime on the first INSERT or UPDATE with items-based content.

CREATE OR REPLACE FUNCTION assign_section_content_item_ids()
RETURNS TRIGGER AS $$
BEGIN
    -- Assign UUID to each item in content.items that lacks one.
    IF NEW.content ? 'items'
        AND jsonb_typeof(NEW.content -> 'items') = 'array'
    THEN
        NEW.content := jsonb_set(
            NEW.content,
            '{items}',
            (
                SELECT COALESCE(
                    jsonb_agg(
                        CASE
                            WHEN item->>'id' IS NULL
                            THEN item || jsonb_build_object('id', gen_random_uuid())
                            ELSE item
                        END
                    ),
                    '[]'::JSONB
                )
                FROM jsonb_array_elements(NEW.content -> 'items') AS item
            )
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =====================================================
-- TRIGGERS
-- =====================================================
-- update_updated_at_column() reused from programme_schema.sql.

CREATE TRIGGER update_entity_sections_updated_at
    BEFORE UPDATE ON public.entity_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_contents_updated_at
    BEFORE UPDATE ON public.section_contents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-assigns UUIDs to content.items on INSERT or UPDATE.
CREATE TRIGGER auto_assign_section_content_item_ids
    BEFORE INSERT OR UPDATE ON public.section_contents
    FOR EACH ROW
    EXECUTE FUNCTION assign_section_content_item_ids();


-- =====================================================
-- INDEXES
-- =====================================================
-- idx_entity_sections_entity omitted — idx_entity_sections_display
-- covers (entity_type, entity_id) queries as a leading prefix.

-- Primary load index: all sections for an entity ordered for rendering.
CREATE INDEX idx_entity_sections_display
    ON public.entity_sections(entity_type, entity_id, display_order);

-- Partial index for the common case: active sections only.
CREATE INDEX idx_entity_sections_active
    ON public.entity_sections(entity_type, entity_id)
    WHERE is_active = true;

-- idx_section_contents_entity_section_id omitted — the UNIQUE constraint on
-- entity_section_id creates an implicit B-tree index that covers FK lookups.

-- GIN index for querying inside JSONB content.
CREATE INDEX idx_section_contents_gin
    ON public.section_contents USING GIN (content);


-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Anon key gets zero rows without explicit SELECT policies.

ALTER TABLE public.entity_sections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_contents ENABLE ROW LEVEL SECURITY;

-- Public read: active sections only.
CREATE POLICY "Public read access to entity sections"
    ON public.entity_sections
    FOR SELECT
    USING (is_active = true);

-- Public read: content visible only when parent section is active.
CREATE POLICY "Public read access to section contents"
    ON public.section_contents
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1
            FROM public.entity_sections es
            WHERE es.id = entity_section_id
              AND es.is_active = true
        )
    );

CREATE POLICY "Authenticated users can insert entity sections"
    ON public.entity_sections
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update entity sections"
    ON public.entity_sections
    FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can delete entity sections"
    ON public.entity_sections
    FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert section contents"
    ON public.section_contents
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update section contents"
    ON public.section_contents
    FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can delete section contents"
    ON public.section_contents
    FOR DELETE
    TO authenticated
    USING (true);

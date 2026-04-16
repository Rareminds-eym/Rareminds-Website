-- =====================================================
-- PROGRAMS MODULE SCHEMA
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- required for gen_random_uuid() on older PG versions

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE section_key_type AS ENUM (
    'introduction',
    'about',
    'modules',
    'approaches',
    'impact',
    'strategic_alignment',
    'conclusion',
    'header',
    'course_enrollment',
    'program_delivery',
     'intervention',
     'video'
);

CREATE TYPE content_type AS ENUM (
    'text',
    'cards',
    'stats',
    'courses'
);

-- =====================================================
-- PROGRAMS TABLE
-- =====================================================

CREATE TABLE programs (
    id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    title             TEXT        NOT NULL,
    slug              TEXT        UNIQUE NOT NULL,
    program_type      TEXT        NOT NULL,
    location          TEXT        NOT NULL,
    date              DATE        NOT NULL,
    status            TEXT        NOT NULL CHECK (status IN ('Active', 'Completed', 'In Progress')),
    image_url         TEXT        NOT NULL,
    banner_url        TEXT        NOT NULL,
    short_description TEXT        NOT NULL,
    display_order     INTEGER     DEFAULT 0,
    is_active         BOOLEAN     DEFAULT true,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_program_type CHECK (program_type IN ('College','University','Organization','Naan Mudhalvan','Government Body','School'))
);


-- =====================================================
-- PROGRAM SECTIONS TABLE
-- =====================================================

CREATE TABLE program_sections (
    id            UUID             PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id    UUID             NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    section_key   section_key_type NOT NULL,
    content_type  content_type     NOT NULL DEFAULT 'text',
    title         TEXT,
    preamble      TEXT,
    content       JSONB            NOT NULL DEFAULT '{}',
    display_order INTEGER          DEFAULT 0,
    created_at    TIMESTAMPTZ      DEFAULT NOW(),
    updated_at    TIMESTAMPTZ      DEFAULT NOW(),

    CONSTRAINT unique_program_section UNIQUE(program_id, section_key)
);

-- =====================================================
-- CHECK CONSTRAINTS
-- =====================================================

ALTER TABLE program_sections
    ADD CONSTRAINT check_text_shape
    CHECK (
        content_type <> 'text'
        OR (content ? 'text' AND jsonb_typeof(content->'text') = 'string')
    );

ALTER TABLE program_sections
    ADD CONSTRAINT check_cards_stats_shape
    CHECK (
        content_type NOT IN ('cards', 'stats')
        OR (content ? 'items' AND jsonb_typeof(content->'items') = 'array')
    );

ALTER TABLE program_sections
    ADD CONSTRAINT check_courses_shape
    CHECK (
        content_type <> 'courses'
        OR (content ? 'courses' AND jsonb_typeof(content->'courses') = 'array')
    );

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Assigns gen_random_uuid() to each item in a flat JSONB array
-- Skips items that already have an id (safe for updates)
CREATE OR REPLACE FUNCTION assign_item_ids(items JSONB)
RETURNS JSONB AS $$
DECLARE
    item   JSONB;
    result JSONB := '[]'::JSONB;
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(items)
    LOOP
        IF item->>'id' IS NULL THEN
            item := item || jsonb_build_object('id', gen_random_uuid());
        END IF;
        result := result || jsonb_build_array(item);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Assigns gen_random_uuid() to each course and their nested universities
-- Skips items that already have an id (safe for updates)
CREATE OR REPLACE FUNCTION assign_course_ids(courses JSONB)
RETURNS JSONB AS $$
DECLARE
    course JSONB;
    result JSONB := '[]'::JSONB;
BEGIN
    FOR course IN SELECT * FROM jsonb_array_elements(courses)
    LOOP
        IF course->>'id' IS NULL THEN
            course := course || jsonb_build_object('id', gen_random_uuid());
        END IF;

        IF course->'universities' IS NOT NULL THEN
            course := course || jsonb_build_object(
                'universities', assign_item_ids(course->'universities')
            );
        END IF;

        result := result || jsonb_build_array(course);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger function: auto-assigns UUIDs to JSONB items before INSERT or UPDATE
-- Handles cards, stats (flat items array) and courses (nested universities)
CREATE OR REPLACE FUNCTION auto_assign_jsonb_ids()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.content_type IN ('cards', 'stats') THEN
        IF NEW.content ? 'items' THEN
            NEW.content := jsonb_set(
                NEW.content,
                '{items}',
                assign_item_ids(NEW.content->'items')
            );
        END IF;

    ELSIF NEW.content_type = 'courses' THEN
        IF NEW.content ? 'courses' THEN
            NEW.content := jsonb_set(
                NEW.content,
                '{courses}',
                assign_course_ids(NEW.content->'courses')
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_program_sections_updated_at
    BEFORE UPDATE ON program_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Fires before every INSERT and UPDATE on program_sections
-- Injects UUIDs into JSONB items automatically
CREATE TRIGGER auto_assign_section_item_ids
    BEFORE INSERT OR UPDATE ON program_sections
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_jsonb_ids();

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_program_sections_program_id
    ON program_sections(program_id);

CREATE INDEX idx_program_sections_display
    ON program_sections(program_id, display_order);

-- GIN index enables fast querying inside JSONB content
CREATE INDEX idx_program_sections_content_gin
    ON program_sections USING GIN (content);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE programs
    IS 'Stores program metadata and basic information';

COMMENT ON TABLE program_sections
    IS 'Stores section-wise content for each program. JSONB shape is determined by content_type';

COMMENT ON COLUMN program_sections.content_type
    IS 'text = plain paragraph | cards = card list | stats = impact cards with icon | courses = enrollment breakdown';

COMMENT ON COLUMN program_sections.preamble
    IS 'Optional intro line displayed above a list section';

COMMENT ON COLUMN program_sections.content
    IS 'JSONB payload. Shape validated by check constraints. Item UUIDs auto-assigned by trigger on insert';



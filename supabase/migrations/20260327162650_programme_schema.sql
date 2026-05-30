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
    banner_url        TEXT,
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
        OR (
            content ? 'text' 
            AND jsonb_typeof(content->'text') = 'string'
            AND (NOT content ? 'images' OR jsonb_typeof(content->'images') = 'array')
            AND (NOT content ? 'image' OR jsonb_typeof(content->'image') = 'object')
        )
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
-- Optimized using jsonb_agg for single-pass processing
CREATE OR REPLACE FUNCTION assign_item_ids(items JSONB)
RETURNS JSONB AS $$
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
    FROM jsonb_array_elements(items) AS item;
$$ LANGUAGE sql IMMUTABLE;

-- Assigns gen_random_uuid() to each course and their nested universities
-- Skips items that already have an id (safe for updates)
-- Optimized using jsonb_agg for single-pass processing
CREATE OR REPLACE FUNCTION assign_course_ids(courses JSONB)
RETURNS JSONB AS $$
    SELECT COALESCE(
        jsonb_agg(
            CASE 
                WHEN course->>'id' IS NULL 
                THEN (course || jsonb_build_object('id', gen_random_uuid())) ||
                     CASE 
                         WHEN course->'universities' IS NOT NULL 
                         THEN jsonb_build_object('universities', assign_item_ids(course->'universities'))
                         ELSE '{}'::JSONB
                     END
                ELSE course ||
                     CASE 
                         WHEN course->'universities' IS NOT NULL 
                         THEN jsonb_build_object('universities', assign_item_ids(course->'universities'))
                         ELSE '{}'::JSONB
                     END
            END
        ),
        '[]'::JSONB
    )
    FROM jsonb_array_elements(courses) AS course;
$$ LANGUAGE sql IMMUTABLE;

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
    
    ELSIF NEW.content_type = 'text' THEN
        -- Handle images array (for introduction sections with multiple images)
        IF NEW.content ? 'images' THEN
            NEW.content := jsonb_set(
                NEW.content,
                '{images}',
                assign_item_ids(NEW.content->'images')
            );
        END IF;
        
        -- Handle single image object (for conclusion sections with one image)
        IF NEW.content ? 'image' THEN
            IF (NEW.content->'image')->>'id' IS NULL THEN
                NEW.content := jsonb_set(
                    NEW.content,
                    '{image}',
                    (NEW.content->'image') || jsonb_build_object('id', gen_random_uuid())
                );
            END IF;
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

-- Index on is_active for efficient filtering of active programs
CREATE INDEX idx_programs_is_active
    ON programs(is_active);

-- Partial index for common query pattern: slug lookup on active programs
CREATE INDEX idx_programs_slug_active
    ON programs(slug) WHERE is_active = true;

-- Composite partial index for RLS policy performance on program_sections
-- Optimizes: EXISTS (SELECT 1 FROM programs WHERE id = X AND is_active = true)
CREATE INDEX idx_programs_id_active
    ON programs(id) WHERE is_active = true;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on both tables
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_sections ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active programs
CREATE POLICY "Public read access to active programs"
    ON programs
    FOR SELECT
    USING (is_active = true);

-- Policy: Allow public read access to sections of active programs
CREATE POLICY "Public read access to program sections"
    ON program_sections
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM programs
            WHERE programs.id = program_sections.program_id
            AND programs.is_active = true
        )
    );

-- Note: INSERT, UPDATE, DELETE operations require authentication
-- Add authenticated user policies here when admin panel is implemented

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



-- =====================================================
-- RPC FUNCTIONS
-- =====================================================

-- Function to get distinct filter options efficiently on database side
-- Replaces client-side deduplication of 1000 rows
CREATE OR REPLACE FUNCTION get_program_filter_options()
RETURNS TABLE (
  categories text[],
  names text[],
  years text[],
  locations text[]
) 
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- Get distinct categories (program types)
    ARRAY(
      SELECT DISTINCT program_type 
      FROM programs 
      WHERE is_active = true AND program_type IS NOT NULL
      ORDER BY program_type
    ) AS categories,
    
    -- Get distinct program names (titles)
    ARRAY(
      SELECT DISTINCT title 
      FROM programs 
      WHERE is_active = true AND title IS NOT NULL
      ORDER BY title
    ) AS names,
    
    -- Get distinct years from dates (sorted numerically, then cast to text)
    ARRAY(
      SELECT EXTRACT(YEAR FROM date)::int::text 
      FROM programs 
      WHERE is_active = true AND date IS NOT NULL
      GROUP BY EXTRACT(YEAR FROM date)::int
      ORDER BY EXTRACT(YEAR FROM date)::int DESC
    ) AS years,
    
    -- Get distinct locations
    ARRAY(
      SELECT DISTINCT location 
      FROM programs 
      WHERE is_active = true AND location IS NOT NULL
      ORDER BY location
    ) AS locations;
END;
$$;

COMMENT ON FUNCTION get_program_filter_options()
  IS 'Returns distinct filter values for programs (categories, names, years, locations) efficiently on database side';
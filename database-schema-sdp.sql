-- =====================================================
-- SDP (Skill Development Program) Database Schema
-- Supabase PostgreSQL - COURSES + CATEGORY TABLE
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =====================================================
-- ENUM TYPES
-- =====================================================

-- Institution type
CREATE TYPE institution_grade_type AS ENUM ('school', 'college', 'both');

-- Delivery mode
CREATE TYPE course_mode_type AS ENUM ('Online', 'Offline', 'Hybrid');

-- Difficulty level
CREATE TYPE course_level_type AS ENUM ('Beginner', 'Intermediate', 'Advanced');


-- =====================================================
-- CATEGORY TABLE
-- =====================================================

CREATE TABLE course_categories (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,

    description TEXT,

    icon VARCHAR(100),
    color_gradient VARCHAR(100),

    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =====================================================
-- COURSES TABLE
-- =====================================================

CREATE TABLE courses (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Basic Information
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    subtitle VARCHAR(255),
    course_code VARCHAR(50) UNIQUE,

    -- Classification
    category_id UUID NOT NULL REFERENCES course_categories(id) ON DELETE RESTRICT,
    institution_type institution_grade_type NOT NULL DEFAULT 'both',

    -- Content
    description TEXT,
    overview TEXT,

    -- Metadata
    duration_hours INTEGER,
    mode course_mode_type,
    level course_level_type,
    focus VARCHAR(255),

    -- Media
    image_url TEXT,
    banner_url TEXT,
    icon VARCHAR(100),
    color_gradient VARCHAR(100),

    -- Pricing
    price DECIMAL(10, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',

    -- Structured Content
    benefits JSONB DEFAULT '[]'::jsonb,
    what_you_learn JSONB DEFAULT '[]'::jsonb,
    who_should_take JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    curriculum JSONB DEFAULT '[]'::jsonb,
    instructors JSONB DEFAULT '[]'::jsonb,

    -- Additional
    brochure_url TEXT,

    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,

    -- Status & Display
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_courses_category_id ON courses(category_id);
CREATE INDEX idx_courses_institution_type ON courses(institution_type);
CREATE INDEX idx_courses_course_code ON courses(course_code);
CREATE INDEX idx_courses_active ON courses(is_active, display_order);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_mode ON courses(mode);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_featured ON courses(is_featured, is_active);

-- Full-text search
CREATE INDEX idx_courses_search 
ON courses USING gin(
    to_tsvector('english', title || ' ' || COALESCE(description, ''))
);

-- JSONB indexes
CREATE INDEX idx_courses_benefits ON courses USING GIN (benefits);
CREATE INDEX idx_courses_curriculum ON courses USING GIN (curriculum);


-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active courses"
ON courses FOR SELECT
USING (is_active = true);


-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE course_categories IS 'Stores course categories such as Engineering, BSc, Management';

COMMENT ON TABLE courses IS 'Stores individual courses';

COMMENT ON COLUMN courses.category_id IS 'Foreign key to course_categories table';
COMMENT ON COLUMN courses.course_code IS 'Unique course identifier';
COMMENT ON COLUMN courses.institution_type IS 'Target institution type';
COMMENT ON COLUMN courses.curriculum IS 'JSON array of modules';
COMMENT ON COLUMN courses.instructors IS 'JSON array of instructor details';
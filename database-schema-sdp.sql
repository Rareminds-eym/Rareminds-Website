-- =====================================================
-- SDP (Skill Development Program) Database Schema
-- Supabase PostgreSQL - SINGLE TABLE DESIGN
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUM TYPES
-- =====================================================

-- Institution grade types (school/college)
CREATE TYPE institution_grade_type AS ENUM ('school', 'college', 'both');

-- Course category (service or individual course)
CREATE TYPE course_category_type AS ENUM ('service', 'course');

-- Course delivery mode
CREATE TYPE course_mode_type AS ENUM ('Online', 'Offline', 'Hybrid');

-- Course difficulty level
CREATE TYPE course_level_type AS ENUM ('Beginner', 'Intermediate', 'Advanced');



CREATE TABLE courses (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Basic Information
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    subtitle VARCHAR(255),
    course_code VARCHAR(50),
    
    -- Classification
    institution_type institution_grade_type NOT NULL DEFAULT 'both',
    category course_category_type NOT NULL,
    service_type VARCHAR(100),
    course_category VARCHAR(100),
    parent_service_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    
    -- Content
    description TEXT,
    overview TEXT,
    
    -- Metadata
    duration VARCHAR(50),
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
    
    -- Structured Content (JSONB for flexibility)
    benefits JSONB DEFAULT '[]'::jsonb,
    what_you_learn JSONB DEFAULT '[]'::jsonb,
    who_should_take JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    curriculum JSONB DEFAULT '[]'::jsonb,
    instructors JSONB DEFAULT '[]'::jsonb,
    
    -- Additional fields
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

CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_institution_type ON courses(institution_type);
CREATE INDEX idx_courses_service_type ON courses(service_type);
CREATE INDEX idx_courses_course_category ON courses(course_category);
CREATE INDEX idx_courses_course_code ON courses(course_code);
CREATE INDEX idx_courses_parent_service ON courses(parent_service_id);
CREATE INDEX idx_courses_active ON courses(is_active, display_order);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_mode ON courses(mode);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_featured ON courses(is_featured, is_active);

-- Full-text search index
CREATE INDEX idx_courses_search ON courses USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- JSONB indexes for querying nested data
CREATE INDEX idx_courses_benefits ON courses USING GIN (benefits);
CREATE INDEX idx_courses_curriculum ON courses USING GIN (curriculum);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA - SERVICE CATEGORIES
-- =====================================================

INSERT INTO courses (
    title,
    slug, 
    subtitle,
    category, 
    institution_type,
    service_type,
    description,
    overview,
    duration,
    mode,
    focus,
    image_url,
    color_gradient,
    benefits,
    is_active,
    display_order
) VALUES
(
    'Arts & Science',
    'arts-science',
    'Holistic Development',
    'service',
    'both',
    'arts-science',
    'Comprehensive programs for arts and science students',
    'Specialized training programs designed for Arts and Science students to enhance their academic knowledge with practical skills. Covers communication, research methodology, digital tools, and career readiness to bridge the gap between theoretical learning and industry requirements.',
    'Flexible',
    'Hybrid',
    'Academic excellence with practical skills',
    '/institutions/images/services/1.png',
    'from-blue-600 to-purple-600',
    '["Research methodology training", "Communication skills development", "Digital literacy programs", "Career guidance and counseling", "Industry exposure"]'::jsonb,
    true,
    1
),
(
    'Engineering',
    'engineering',
    'Technical Excellence',
    'service',
    'both',
    'engineering',
    'Industry-aligned technical courses and certifications',
    'Comprehensive skill development programs for engineering students covering cutting-edge technologies, industry certifications, and hands-on training. Includes courses in manufacturing, healthcare technology, data analytics, digital marketing, and more – all designed to make students industry-ready.',
    'Semester-based',
    'Hybrid',
    'Technical skills and certifications',
    '/institutions/images/services/2.png',
    'from-purple-600 to-pink-600',
    '["Industry-aligned curriculum", "Hands-on projects", "Professional certifications", "Internship opportunities", "Placement assistance"]'::jsonb,
    true,
    2
),
(
    'Management / Business',
    'management-business',
    'Leadership & Strategy',
    'service',
    'both',
    'management-business',
    'Business acumen and leadership development programs',
    'Tailored programs for management and business students focusing on leadership, strategic thinking, entrepreneurship, and business analytics. Combines theoretical knowledge with practical case studies, industry projects, and mentorship from business leaders.',
    'Modular',
    'Hybrid',
    'Business leadership and strategy',
    '/institutions/images/services/3.png',
    'from-indigo-600 to-blue-600',
    '["Leadership development", "Business analytics training", "Entrepreneurship guidance", "Case study methodology", "Industry networking"]'::jsonb,
    true,
    3
),
(
    'Corporate / Faculty Training',
    'corporate-faculty-training',
    'Professional Development',
    'service',
    'both',
    'corporate-faculty-training',
    'Advanced training for educators and corporate professionals',
    'Specialized Faculty Development Programs (FDP) and corporate training modules designed to enhance teaching methodologies, integrate NEP guidelines, and develop industry-relevant skills. Includes ICT integration, digital pedagogy, mentorship training, and curriculum design workshops.',
    '1-2 Weeks',
    'Intensive',
    'Educator and professional excellence',
    '/institutions/images/services/4.png',
    'from-green-600 to-teal-600',
    '["NEP 2020 implementation", "Modern teaching methods", "Technology integration", "Research guidance", "Professional certification"]'::jsonb,
    true,
    4
),
(
    'BSc Level',
    'bsc-level',
    'Academic Excellence',
    'service',
    'both',
    'bsc-level',
    'Specialized programs for BSc students across disciplines',
    'Academic programs designed for BSc students covering laboratory techniques, data analysis, food safety, quality assurance, and industry-specific certifications. Designed to enhance employability and prepare students for specialized roles in their respective fields.',
    'Flexible',
    'Hybrid',
    'Applied science and academic skills',
    '/institutions/images/services/1.png',
    'from-orange-600 to-red-600',
    '["Laboratory skill training", "Industry certifications", "Quality assurance training", "Food safety programs", "Academic excellence"]'::jsonb,
    true,
    5
),
(
    'Skill-Based',
    'skill-based',
    'Practical Training',
    'service',
    'both',
    'skill-based',
    'Hands-on skill development programs for all students',
    'Practical skill-based training programs focusing on industry-ready competencies, vocational skills, and hands-on experience. Covers technical skills, soft skills, and professional development across various domains.',
    'Flexible',
    'Hybrid',
    'Practical skills and vocational training',
    '/institutions/images/services/5.png',
    'from-teal-600 to-cyan-600',
    '["Industry-ready skills", "Vocational training", "Hands-on experience", "Professional certifications", "Career advancement"]'::jsonb,
    true,
    6
);

-- =====================================================
-- VIEWS (Optional - for easier querying)
-- =====================================================

-- View: Active services only
CREATE VIEW active_services AS
SELECT * FROM courses
WHERE category = 'service' AND is_active = true
ORDER BY display_order;

-- View: Active courses with parent service info
CREATE VIEW active_courses_with_service AS
SELECT 
    c.*,
    s.title as service_title,
    s.slug as service_slug_name
FROM courses c
LEFT JOIN courses s ON c.parent_service_id = s.id
WHERE c.category = 'course' AND c.is_active = true
ORDER BY c.display_order;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on table
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Public read access for active courses
CREATE POLICY "Allow public read access to active courses"
ON courses FOR SELECT
USING (is_active = true);

-- =====================================================
-- COMMENTS (Documentation)
-- =====================================================

COMMENT ON TABLE courses IS 'Single table storing both service categories and individual courses';
COMMENT ON COLUMN courses.title IS 'Course/service title';
COMMENT ON COLUMN courses.course_code IS 'Unique course identifier code';
COMMENT ON COLUMN courses.institution_type IS 'Institution type filter (school/college/both)';
COMMENT ON COLUMN courses.category IS 'Distinguishes between service (program) and course (individual course)';
COMMENT ON COLUMN courses.parent_service_id IS 'References parent service if this is a course';
COMMENT ON COLUMN courses.service_type IS 'Identifies which program/service this belongs to (e.g., engineering, arts-science)';
COMMENT ON COLUMN courses.course_category IS 'Meaningful category like Manufacturing, Healthcare, Technology, etc.';
COMMENT ON COLUMN courses.image_url IS 'Main image URL';
COMMENT ON COLUMN courses.benefits IS 'JSONB array of benefit strings';
COMMENT ON COLUMN courses.what_you_learn IS 'JSONB array of learning outcome strings';
COMMENT ON COLUMN courses.who_should_take IS 'JSONB array of target audience strings';
COMMENT ON COLUMN courses.outcomes IS 'JSONB array of career outcome strings';
COMMENT ON COLUMN courses.curriculum IS 'JSONB array of module objects with id, title, duration, topics';
COMMENT ON COLUMN courses.instructors IS 'JSONB array of instructor objects with id, name, title, photo, bio';

-- =====================================================
-- PROGRAMS SEED DATA
-- =====================================================
-- Schema source: 20260327162650_programme_schema.sql
--
-- KEY SCHEMA CONSTRAINTS:
-- program_sections.content       → JSONB, shape validated by content_type
-- program_sections.content_type  → enum: 'text' | 'cards' | 'stats' | 'courses'
-- program_sections.section_key   → enum: 'introduction' | 'about' | 'modules' |
--                                        'approaches' | 'impact' | 'strategic_alignment' |
--                                        'conclusion' | 'header' | 'course_enrollment' |
--                                        'program_delivery' | 'intervention' | 'video'
--
-- content JSONB shapes (enforced by CHECK constraints):
--   text    → { "text": "..." }
--   cards   → { "items": [ { "title": "...", "description": "..." }, ... ] }
--   stats   → { "items": [ { "value": "...", "label": "..." }, ... ] }
--   courses → { "courses": [ { "title": "...", "universities": [ ... ] }, ... ] }
--
-- DECISIONS:
--   'video'            → Inserted as separate section with display_order before conclusion
--   'program_delivery' → NOT inserted; content merged into 'about' (Tripura)
--   'intervention'     → NOT inserted; content merged into 'about' (Global International School)
--
-- FIXES APPLIED (patch seed v4):
--   [1] naan-mudhalvan-6th-sem-2025 → 2 missing impact bullets added:
--         "Implementation across major universities"
--         "Positive institutional feedback"
--   [2] naan-mudhalvan-4th-sem-2025 → impact replaced:
--         OLD: aggregate "16,448 students" + generic labels
--         NEW: course-wise breakdown (2,755 / 5,219 / 991 / 7,483)
--   [3] naan-mudhalvan-2025 → impact title changed from
--         "Key Outcomes & Impact" → "Objectives" (matching source doc)
--         + all 5 objective bullets now match source doc exactly
--   [4] tnsdc-iti-spoken-english → conclusion text updated:
--         Added rote learning paragraph after CEFR paragraph
--   [5] tnsdc-schools → impact updated:
--         Added 3 missing bullets: hands-on activities, food safety, FSSAI registration
--         strategic_alignment updated: Added "Fully integrated program delivery" card
--   [6] tripura → introduction text updated:
--         Added "targeted approach" sentence
--         Added "Dr. Subhashini personally conducted" sentence
--   [7] dsatm → impact updated:
--         Added 5th bullet: "Programs led by industry experts ensured real-world context and engagement"
--
-- SYNTAX FIXES (patch seed v4 — apostrophe & missing-quote repairs):
--   [A] naan-mudhalvan-2023 impact bullet #2:
--         Rareminds' → Rareminds''  (bare apostrophe broke SQL string)
--   [B] naan-mudhalvan-2023 impact JSON closing:
--         Added missing closing quote ']}'  → ]}',
--   [C] tnsdc-iti-spoken-english impact bullet #5:
--         Rareminds' → Rareminds''  (bare apostrophe broke SQL string)
--   [D] global-international-school introduction:
--         today's → today''s  (bare apostrophe broke SQL string)
--         Also fixed unclosed JSON brace — added missing closing " before }'
--
-- IMAGE ADDITIONS (patch seed v5):
--   Introduction images (NON-Naan Mudhalvan only, 3 images each):
--     acharya        → already present (skipped)
--     pes            → already present (skipped)
--     vels           → ADDED
--     dsatm          → ADDED
--     bldea          → ADDED
--     tripura        → ADDED
--     tnsdc-iti      → ADDED
--     tnsdc-schools  → ADDED
--     global-intl    → ADDED
--   Conclusion images (ALL programs, 1 image each):
--     acharya, pes, vels, dsatm, bldea, tripura,
--     tnsdc-iti, tnsdc-schools, global-intl,
--     naan-mudhalvan-2024, naan-mudhalvan-2023,
--     naan-mudhalvan-4th-sem-2025, naan-mudhalvan-6th-sem-2025,
--     naan-mudhalvan-2025 → ALL ADDED
--
-- SAFETY GUARD:
--   This seed file uses ON CONFLICT DO UPDATE which will overwrite existing data.
--   Only run this on development/local databases, never on production.
-- =====================================================

-- Environment safety check - abort if running on production database
-- Uses multiple checks to ensure we're in a local development environment
DO $$
DECLARE
  is_local_supabase BOOLEAN;
  db_host TEXT;
BEGIN
  -- Check 1: Supabase local development has a specific internal schema
  SELECT EXISTS (
    SELECT 1 FROM pg_namespace WHERE nspname = 'supabase_functions'
  ) INTO is_local_supabase;
  
  -- Check 2: Get the database host (local Supabase uses 127.0.0.1 or localhost)
  SELECT inet_server_addr()::text INTO db_host;
  
  -- Allow only if:
  -- 1. Database name is explicitly a dev database, OR
  -- 2. Running on localhost/127.0.0.1 AND has supabase_functions schema (local Supabase)
  IF NOT (
    current_database() IN ('rareminds_dev', 'rareminds_local')
    OR (db_host IN ('127.0.0.1', '::1') AND is_local_supabase)
  ) THEN
    RAISE EXCEPTION 'SAFETY: This seed file should only run on local development. Database: %, Host: %', 
      current_database(), COALESCE(db_host, 'unknown');
  END IF;
END $$;

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

BEGIN;

-- =====================================================
-- PROGRAMS
-- =====================================================

INSERT INTO programs (
    id, title, slug, program_type, location, date,
    status, image_url, banner_url, short_description, display_order, is_active
) VALUES
(uuid_generate_v5(uuid_ns_dns(), 'rareminds-acharya'), 'Acharya', 'acharya', 'College', 'Karnataka', '2023-05-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds trained 700+ MBA, MCA, and Physiotherapy students in communication and placement skills, boosting interview confidence and job readiness.',
 1, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-pes'), 'PES', 'pes', 'University', 'Karnataka', '2023-07-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'The Rareminds Bootcamp at PES Engineering College, Mandya delivered a 45-hour hands-on web development program, transforming students into confident, industry-ready developers.',
 2, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-vels'), 'VELS', 'vels', 'University', 'Tamil Nadu', '2024-03-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds delivered project-based training at VELS University, bridging classroom learning with real-world skills for first-year students.',
 3, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-visvesvaraya-technological-university'), 'Visvesvaraya Technological University', 'visvesvaraya-technological-university',
 'University', 'Karnataka', '2025-01-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partners with Visvesvaraya Technological University to deliver industry-relevant training programs that enhance technical skills and improve student employability across Karnataka.',
 4, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-dsatm'), 'DSATM', 'dsatm', 'College', 'Karnataka', '2019-10-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with DSATM to deliver career-focused training that equipped students with technical and soft skills for professional success.',
 5, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-bldea'), 'BLDEA', 'bldea', 'Organization', 'Karnataka', '2023-11-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds conducted a 3-day intensive program for 200+ BLDEA teachers, delivering hands-on, NEP-aligned training to strengthen pedagogy, mindset, and classroom effectiveness.',
 6, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-naan-mudhalvan-2024'), 'Naan Mudhalvan 2024 Upskilling Program (Powered by Rareminds)',
 'naan-mudhalvan-2024', 'Naan Mudhalvan', 'Tamil Nadu', '2024-07-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC under Naan Mudhalvan to deliver project-based training in emerging technologies for Arts and Science students.',
 7, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-naan-mudhalvan-2023'), 'Naan Mudhalvan 2023 Upskilling Program (Powered by Rareminds)',
 'naan-mudhalvan-2023', 'Naan Mudhalvan', 'Tamil Nadu', '2023-01-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC under Naan Mudhalvan to deliver project-based training in emerging technologies for Arts and Science students.',
 8, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-naan-mudhalvan-4th-sem-2025'), 'Naan Mudhalvan 4th sem 2025 Upskilling Program (Powered by Rareminds)',
 'naan-mudhalvan-4th-sem-2025', 'Naan Mudhalvan', 'Tamil Nadu', '2025-01-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC under Naan Mudhalvan to deliver project-based training in emerging technologies for Arts and Science students.',
 9, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-naan-mudhalvan-6th-sem-2025'), 'Naan Mudhalvan 6th sem 2025 Upskilling Program (Powered by Rareminds)',
 'naan-mudhalvan-6th-sem-2025', 'Naan Mudhalvan', 'Tamil Nadu', '2025-01-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC under Naan Mudhalvan to deliver project-based training in emerging technologies for Arts and Science students.',
 10, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-naan-mudhalvan-2025'), 'Naan Mudhalvan 2025 Upskilling Program (Powered by Rareminds)',
 'naan-mudhalvan-2025', 'Naan Mudhalvan', 'Tamil Nadu', '2025-07-01', 'Active',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC under Naan Mudhalvan to deliver project-based training in emerging technologies for Arts and Science students.',
 11, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-tripura'), 'Tripura', 'tripura', 'Government Body', 'Tripura', '2024-01-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds trained 200 overseas candidates via a CEO-led intensive, boosting interview confidence and global readiness in line with Tripura Skill Development Mission.',
 12, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-tnsdc-iti-spoken-english'), 'TNSDC ITI (Spoken English)', 'tnsdc-iti-spoken-english',
 'Government Body', 'Tamil Nadu', '2024-02-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with TNSDC to train government hostel students in English, communication, and confidence.',
 13, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-tnsdc-schools'), 'TNSDC Schools', 'tnsdc-schools',
 'Government Body', 'Tamil Nadu', '2024-04-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds delivered a 7-day training across 121 schools, empowering 1,974 students with employability skills.',
 14, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-aicte'), 'AICTE', 'aicte', 'Government Body', 'Pan India', '2025-01-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds partnered with All India Council for Technical Education to deliver industry-focused, experiential programs that build job-ready skills and confidence.',
 15, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-ksdc'), 'KSDC', 'ksdc', 'Government Body', 'Karnataka', '2025-01-01', 'In Progress',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds collaborates with Karnataka Skill Development Corporation to deliver comprehensive skill development programs that enhance employability and bridge the skill gap in Karnataka.',
 16, true),

(uuid_generate_v5(uuid_ns_dns(), 'rareminds-global-international-school'), 'Global International School', 'global-international-school',
 'School', 'Karnataka', '2023-11-01', 'Completed',
 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
 'Rareminds bridged gaps in traditional teacher training by delivering hands-on, NEP-aligned programs that equipped educators with practical skills, modern tools, and learner-centric strategies.',
 17, true)

ON CONFLICT (slug) DO UPDATE SET
    title             = EXCLUDED.title,
    program_type      = EXCLUDED.program_type,
    location          = EXCLUDED.location,
    date              = EXCLUDED.date,
    status            = EXCLUDED.status,
    image_url         = EXCLUDED.image_url,
    banner_url        = EXCLUDED.banner_url,
    short_description = EXCLUDED.short_description,
    display_order     = EXCLUDED.display_order,
    is_active         = EXCLUDED.is_active,
    updated_at        = NOW();

-- =====================================================
-- VALIDATE ALL 17 SLUGS EXIST
-- =====================================================

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'acharya') THEN
        RAISE EXCEPTION 'Program with slug acharya not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'pes') THEN
        RAISE EXCEPTION 'Program with slug pes not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'vels') THEN
        RAISE EXCEPTION 'Program with slug vels not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'visvesvaraya-technological-university') THEN
        RAISE EXCEPTION 'Program with slug visvesvaraya-technological-university not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'dsatm') THEN
        RAISE EXCEPTION 'Program with slug dsatm not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'bldea') THEN
        RAISE EXCEPTION 'Program with slug bldea not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'naan-mudhalvan-2024') THEN
        RAISE EXCEPTION 'Program with slug naan-mudhalvan-2024 not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'naan-mudhalvan-2023') THEN
        RAISE EXCEPTION 'Program with slug naan-mudhalvan-2023 not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'naan-mudhalvan-4th-sem-2025') THEN
        RAISE EXCEPTION 'Program with slug naan-mudhalvan-4th-sem-2025 not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'naan-mudhalvan-6th-sem-2025') THEN
        RAISE EXCEPTION 'Program with slug naan-mudhalvan-6th-sem-2025 not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'naan-mudhalvan-2025') THEN
        RAISE EXCEPTION 'Program with slug naan-mudhalvan-2025 not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'tripura') THEN
        RAISE EXCEPTION 'Program with slug tripura not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'tnsdc-iti-spoken-english') THEN
        RAISE EXCEPTION 'Program with slug tnsdc-iti-spoken-english not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'tnsdc-schools') THEN
        RAISE EXCEPTION 'Program with slug tnsdc-schools not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'aicte') THEN
        RAISE EXCEPTION 'Program with slug aicte not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'ksdc') THEN
        RAISE EXCEPTION 'Program with slug ksdc not found'; END IF;
    IF NOT EXISTS (SELECT 1 FROM programs WHERE slug = 'global-international-school') THEN
        RAISE EXCEPTION 'Program with slug global-international-school not found'; END IF;
END $$;

-- =====================================================
-- PROGRAM SECTIONS — ACHARYA
-- =====================================================
-- introduction: images already present (unchanged)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('header', 'text', 'From Campus Conversations to Corporate Confidence', NULL,
     '{"text": "Great careers begin with clear communication. At Acharya Institute, Bangalore, the gap between technical skills and professional readiness was evident among students preparing for the job market. Recognizing this, Rareminds was brought in to bridge the communication gap and empower students with the skills they need to thrive in the real world."}',
     1),
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "In May 2022–2023, Rareminds conducted a high-impact 5-day Business Communication course for over 700 students across the Physiotherapy, MBA, and MCA departments. The sessions were tailored to enhance industry-specific communication, presentation skills, and professional behavior. This was followed by pre-placement readiness training for 120 MBA and 233 MCA students in 2024, building confidence right before they stepped into the hiring ecosystem.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     2),
    ('modules', 'cards', 'Modules Covered', NULL,
     '{"items": [
         {"title": "Industry-Oriented Communication", "description": "Industry-Oriented Communication Frameworks"},
         {"title": "Business Writing",                "description": "Email and Business Writing Best Practices"},
         {"title": "Presentation & Interview Skills", "description": "Presentation and Interview Skills"},
         {"title": "Group Discussions",               "description": "Group Discussions and Personal Branding"},
         {"title": "Corporate Etiquette",             "description": "Corporate Etiquette and Workplace Readiness"}
     ]}',
     3),
    ('approaches', 'cards', 'Multiple Approaches', NULL,
     '{"items": [
         {"title": "Mock Interviews",  "description": "Interactive Simulations & Mock Interviews"},
         {"title": "Feedback Loops",   "description": "Real-time Feedback Loops"},
         {"title": "Resume Labs",      "description": "Resume Labs and Elevator Pitch Practice"},
         {"title": "Peer Critique",    "description": "Peer Critique Sessions"}
     ]}',
     4),
    ('impact', 'stats', 'Outcomes and Impact', NULL,
     '{"items": [
         {"value": "85%", "label": "Students reported increased clarity and confidence in job interviews"},
         {"value": "↑",   "label": "Campus recruiters highlighted better articulation and professionalism"},
         {"value": "✓",   "label": "MBA & MCA placement coordinators reported smoother pre-placement processes"}
     ]}',
     5),
    ('strategic_alignment', 'cards', 'Strategic Alignment with Acharya''s Vision', NULL,
     '{"items": [
         {"title": "Industry Readiness",     "description": "Enhancing Industry Readiness Among Graduates"},
         {"title": "Core Career Skill",      "description": "Elevating Communication as a Core Career Skill"},
         {"title": "Classroom to Corporate", "description": "Enabling Seamless Transition from Classroom to Corporate"},
         {"title": "Placement Outcomes",     "description": "Strengthening Placement Outcomes through Holistic Training"}
     ]}',
     6),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     7),
    ('conclusion', 'text', 'Crafting Communicators, Not Just Candidates', NULL,
     '{"text": "At Acharya Institute, Rareminds went beyond basic communication training. We helped students shape their voice, articulate their value, and enter the professional world with poise and purpose. The impact was clear: sharper skills, stronger confidence, and a generation ready to make their mark.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     8)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'acharya')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — PES
-- =====================================================
-- introduction: images already present (unchanged)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "The Rareminds Bootcamp at PES Engineering College, Mandya, contributed to transform aspiring engineers into confident, industry-ready developers. Through an intensive, 45-hour Web Development Bootcamp, we bridged the classroom-to-career gap with a hands-on, real-world coding experience that left students skilled, motivated, and ready for the digital future.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "Web Development Bootcamp", "description": "From July 24th to 29th, 2023, Rareminds delivered a comprehensive Web Development Bootcamp focused on Full Stack skills. The program immersed students in practical learning, from HTML, CSS, and JavaScript to React, backend integration, APIs, and deployment techniques."},
         {"title": "Hands-On Learning", "description": "Designed around active problem-solving, teamwork, and real-time feedback, this initiative gave students the tools to think like developers and build like professionals."}
     ]}',
     2),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "100+", "label": "Students trained through immersive bootcamp sessions combining technical depth and collaborative learning."},
         {"value": "70%",  "label": "Built fully functional web applications from scratch"},
         {"value": "90%",  "label": "Actively participated in hands-on coding and real-time problem-solving"},
         {"value": "100%", "label": "Expressed confidence in building, securing, and deploying full-stack web applications"},
         {"value": "85%",  "label": "Reported improved critical thinking and collaboration skills"},
         {"value": "92%",  "label": "Showed growth in communication and teamwork via pair programming"},
         {"value": "88%",  "label": "Can now clearly articulate technical ideas for interviews and presentations"}
     ]}',
     3),
    ('strategic_alignment', 'cards', 'Strategic Alignment with PES College Goals', NULL,
     '{"items": [
         {"title": "Skill-Based Learning",  "description": "Skill-Based, Industry-Ready Learning"},
         {"title": "NAAC / NIRF",           "description": "NAAC and NIRF Enhancement through Outcome-Focused Programs"},
         {"title": "Innovation Culture",    "description": "Innovation and Startup Culture among Students"},
         {"title": "Placement Readiness",   "description": "Improved Placement Readiness with Practical Tech Exposure"},
         {"title": "NEP 2020 Alignment",    "description": "NEP 2020 Alignment through experiential, future-focused education"}
     ]}',
     4),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     5),
    ('conclusion', 'text', 'Turning Coders into Creators', NULL,
     '{"text": "At PES Engineering College, Rareminds didn''t just teach programming — we built a culture of innovation, confidence, and readiness. By empowering students to develop real solutions, communicate effectively, and collaborate as tech professionals, we helped transform the campus into a launchpad for tomorrow''s digital leaders.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     6)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'pes')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — VELS
-- =====================================================
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds training programs at VELS University reshaped technical education for first-year students, delivering high-impact, project-based training in emerging technologies. The initiative successfully bridged classroom learning with real-world application, equipping students with future-ready skills and confidence for the evolving digital workplace.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "Industrial Metaverse", "description": "Two 45-hour experiential training programs — Industrial Metaverse — were delivered to undergraduate students as part of this collaboration. These programs combined cutting-edge tools like VR and AI with hands-on projects, enabling students to simulate real-world industrial environments from day one."},
         {"title": "Web Full Stack Development", "description": "Two 45-hour experiential training programs — Web Full Stack Development — were delivered to undergraduate students as part of this collaboration. These programs combined the MERN stack with hands-on projects, enabling students to code, build, and deploy real-world applications from day one."}
     ]}',
     2),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "200+", "label": "Students trained through structured, mentor-led sessions"},
         {"value": "90%",  "label": "Participants built deployable full-stack applications using modern frameworks and platforms"},
         {"value": "95%",  "label": "Rated training 8/10 or higher for content, delivery, and usefulness"},
         {"value": "85%",  "label": "Reported improved career confidence for internships and interviews"},
         {"value": "",    "label": "Students demonstrated enhanced critical thinking and teamwork, with active participation in all sessions"},
         {"value": "",    "label": "Positive institutional feedback from faculty who observed increased engagement, curiosity, and practical understanding"}
     ]}',
     3),
    ('strategic_alignment', 'cards', 'Strategic Alignment with VELS University Goals', NULL,
     '{"items": [
         {"title": "NAAC & NIRF",          "description": "Enhancement through experiential learning and tech integration"},
         {"title": "Employability",         "description": "Improved employability outcomes via skill-based, industry-aligned content"},
         {"title": "Curriculum Innovation", "description": "Aligned with NEP 2020 and industry expectations"},
         {"title": "Student Engagement",    "description": "Higher engagement contributes to improved retention and satisfaction"}
     ]}',
     4),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     5),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "This successful collaboration with VELS University demonstrated Rareminds'' ability to deliver measurable outcomes, transform student learning, and align with institutional goals. By turning classrooms into innovation labs, we empowered students to become creators, not just consumers of technology.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     6)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'vels')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — DSATM
-- =====================================================
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'The Real-World Leap: How DSATM Students Gained a Competitive Edge', NULL,
     '{"text": "Rareminds has been a long-standing training partner for DSATM, driving student employability through curated, career-oriented workshops. By integrating both technical and soft skill components, these programs empowered engineering and management students with practical tools to thrive in professional settings.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "MBA Students", "description": "5-Day Advanced Excel Workshop (Sept–Oct 2019), Focused on business analytics and reporting through practical spreadsheet applications."},
         {"title": "Non-Teaching Staff", "description": "MS Office & Email Etiquette (Feb 2019) – 3-day session on digital tools and workplace communication. Advanced Excel, Time Management & Personal Branding via Social Media (July 2019) – 3-day program for productivity and professional presence."},
         {"title": "Civil Engineering Students", "description": "Day 1 – Surveying & geospatial analysis using Total Station & GIS. Day 2 – Construction Project Management tools (PERT, CPM, EVM). Day 3 – BIM, Risk Management, and digital modeling. 60 students participated."}
     ]}',
     2),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "100+", "label": "Participants trained across engineering, management, and staff categories"},
         {"value": "",     "label": "Practical exposure to MS Excel, Total Station, and BIM"},
         {"value": "",     "label": "Positive feedback for delivery, content relevance, and applicability"},
         {"value": "",     "label": "Strengthened cross-functional competencies like project planning, digital communication, and personal branding"},
         {"value": "",     "label": "Programs led by industry experts ensured real-world context and engagement"}
     ]}',
     3),
    ('strategic_alignment', 'cards', 'Strategic Alignment with DSATM Goals', NULL,
     '{"items": [
         {"title": "Employability",       "description": "Enhance student employability through skill-based learning"},
         {"title": "Industry Linkage",    "description": "Encourage interdisciplinary exposure and industry linkage"},
         {"title": "Digital Readiness",   "description": "Build digital and workplace readiness across academic and administrative stakeholders"},
         {"title": "Continuous Learning", "description": "Foster a continuous learning culture in both student and staff communities"}
     ]}',
     4),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     5),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "Rareminds'' collaboration with DSATM highlights how focused, practical training can drive institutional growth, individual confidence, and long-term career success. By delivering real-world learning across multiple touchpoints, this partnership continues to shape a more future-ready, skilled campus ecosystem.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     6)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'dsatm')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- NOTE: Visvesvaraya Technological University has no sections — skipped.

-- =====================================================
-- PROGRAM SECTIONS — BLDEA
-- =====================================================
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Elevating Everyday Teaching into Transformational Practice', NULL,
     '{"text": "Building great schools begins with investing in great teachers. BLDEA Schools in Karnataka recognized the need to move beyond routine training and focus on structured, high-impact development. Teachers were navigating classrooms without consistent support in pedagogy, communication, emotional intelligence, and NEP-aligned practices. A unified approach was necessary to ensure that professional growth was intact across levels and that the student engagement remained consistent, meaningful, and aligned with evolving learning needs. Rareminds delivered a concentrated, practice-based model focused on both mindset and method. Rareminds conducted a 3-day intensive program for over 200 teachers across the BLDEA network. Sessions were led by 5 master trainers and grounded in real classroom challenges.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('modules', 'cards', 'Modules Covered', NULL,
     '{"items": [
         {"title": "NEP 2020 Alignment",    "description": "NEP 2020 Alignment and Classroom Planning"},
         {"title": "Assessment Frameworks", "description": "Assessment Frameworks and Tools"},
         {"title": "Inclusive Teaching",    "description": "Inclusive Teaching Practices"},
         {"title": "Empathy in Education",  "description": "Empathy in Education"},
         {"title": "Student Motivation",    "description": "Positive Engagement and Student Motivation"}
     ]}',
     2),
    ('approaches', 'cards', 'Multiple Approaches', NULL,
     '{"items": [
         {"title": "Roleplays",          "description": "Roleplays and Scenario-Based Problem Solving"},
         {"title": "Lesson Design Labs", "description": "Lesson Design Labs"},
         {"title": "Peer Reflection",    "description": "Peer Reflection Circles and Collaborative Planning"}
     ]}',
     3),
    ('impact', 'stats', 'Outcomes and Impact', NULL,
     '{"items": [
         {"value": "90%", "label": "Teachers submitted revised lesson plans aligned to new practices"},
         {"value": "",    "label": "Higher ownership, clarity, and classroom strategy observed"},
         {"value": "",    "label": "School leadership committed to ongoing mentoring circles and internal CPD"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with BLDEA Goals', NULL,
     '{"items": [
         {"title": "NEP 2020 Integration",    "description": "NEP 2020 Integration in Teaching Practice"},
         {"title": "Professional Development", "description": "Structured Professional Development for Staff"},
         {"title": "Student Engagement",       "description": "Improved Student Engagement through Active Methodologies"},
         {"title": "Peer Mentoring",           "description": "Internal Leadership Capacity through Peer Mentoring Models"},
         {"title": "Outcome-Based Delivery",   "description": "Outcome-Based Approaches in Academic Delivery"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Turning Teachers into Changemakers', NULL,
     '{"text": "At BLDEA Schools, Rareminds didn''t just train teachers—we helped shift the culture of classrooms. By building both confidence and capability, our approach enabled teachers to become reflective practitioners who lead learning with clarity, care, and consistency. Together, we laid the foundation for a sustainable teaching excellence model rooted in purpose, pedagogy, and practice.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'bldea')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — NAAN MUDHALVAN 2024
-- =====================================================
-- introduction: Naan Mudhalvan — NOT modified
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds proudly partnered with the Tamil Nadu Skill Development Corporation (TNSDC) under the Naan Mudhalvan flagship initiative to transform technical education for Arts and Science students across Tamil Nadu. This program focused on delivering high-impact, project-based training in critical emerging technologies—bridging classroom theory with real-world practice. The partnership empowered students with future-ready skills, practical exposure, and the confidence to meet the demands of an evolving digital and industrial workforce."}',
     1),
    ('about', 'text', 'About the Program', NULL,
     '{"text": "Through this collaboration, Rareminds delivered four specialized 45-hour experiential training programs to undergraduate students during the Even Semesters of the 2024–2025 academic year. These mandatory programs provided immersive, hands-on learning experiences in: Organic Food Practices, Food Analysis Processing and Preservation, Medical Coding, and Agri Business Management. Each course blended in-person instruction with LMS-based support, enabling students to work on real-time simulations, hands-on projects, and practical applications from day one."}',
     2),
    ('course_enrollment', 'courses', 'Course Enrollment by University', NULL,
     '{"courses": [
         {"title": "Organic Food Practices", "total": 2312, "universities": [
             {"name": "Bharathidasan University",         "students": 1056},
             {"name": "Manonmaniam Sundranar University", "students": 569},
             {"name": "Alagappa University",              "students": 294},
             {"name": "Madurai Kamaraj University",       "students": 276},
             {"name": "Mother Teresa University",         "students": 117}
         ]},
         {"title": "Food Analysis Processing and Preservation", "total": 2230, "universities": [
             {"name": "Periyar University",    "students": 1419},
             {"name": "Annamalai University",  "students": 589},
             {"name": "Bharathiar University", "students": 222}
         ]},
         {"title": "Medical Coding", "total": 3807, "universities": [
             {"name": "Thiruvalluvar University",   "students": 1532},
             {"name": "Annamalai University",       "students": 1416},
             {"name": "Madurai Kamaraj University", "students": 643},
             {"name": "Mother Teresa University",   "students": 216}
         ]},
         {"title": "Agri Business Management", "total": 2449, "universities": [
             {"name": "Thiruvalluvar University", "students": 1237},
             {"name": "University of Madras",     "students": 1212}
         ]}
     ]}',
     3),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "10,798", "label": "Students trained across partner universities"},
         {"value": "100%",   "label": "Participants completed comprehensive final projects"},
         {"value": "✓",      "label": "Active participation in mandatory hackathons fostering innovation"},
         {"value": "✓",      "label": "Overwhelmingly positive feedback from TNSDC and partner universities"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Skill Development & Employability", "description": "Industry-aligned content enhanced job readiness of Arts and Science graduates"},
         {"title": "Curriculum Innovation",             "description": "Courses aligned academic learning with evolving industry demands"},
         {"title": "Student Engagement & Retention",   "description": "Project-based methodologies improved interest, satisfaction, and retention"},
         {"title": "Workforce Readiness",               "description": "Created a skilled talent pipeline in critical sectors supporting Tamil Nadu''s development"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "The collaboration between Rareminds and TNSDC''s Naan Mudhalvan program stands as a model for impactful public–private partnerships in higher education. By turning traditional classrooms into hubs of innovation and applied learning, Rareminds empowered thousands of students to transition from passive learners to confident, industry-ready contributors across agriculture, food technology, and healthcare sectors.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'naan-mudhalvan-2024')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — NAAN MUDHALVAN 2023
-- =====================================================
-- FIX [A]: Rareminds' → Rareminds''  in impact bullet #2
-- FIX [B]: Added missing closing quote ]}', at end of impact JSON
-- introduction: Naan Mudhalvan — NOT modified
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds proudly partnered with the Tamil Nadu Skill Development Corporation (TNSDC) under the Naan Mudhalvan flagship program to significantly enhance the technical education landscape for Arts and Science students across Tamil Nadu. This initiative focused on delivering high-impact, project-based training in critical emerging technologies, effectively bridging traditional classroom learning with practical, real-world applications."}',
     1),
    ('about', 'text', 'About the Program', NULL,
     '{"text": "Rareminds delivered four specialized 45-hour experiential training programs to undergraduate students during the Even Semester of the 2023–2024 academic year. Mandatory courses covered: Agribusiness Management, EV Battery Management, Food Analysis, and Organic Food Production Techniques. Each program combined theoretical knowledge with practical application, supported by physical classroom interventions and supplementary LMS-based content for a blended learning experience."}',
     2),
    ('course_enrollment', 'courses', 'Detailed Course Enrollment by University', NULL,
     '{"courses": [
         {"title": "Agribusiness Management", "total": 2072, "universities": [
             {"name": "Alagappa University",               "students": 296},
             {"name": "Bharathidasan University",          "students": 963},
             {"name": "Madurai Kamaraj University",        "students": 223},
             {"name": "Mother Teresa University",          "students": 93},
             {"name": "Manonmaniam Sundaranar University", "students": 497}
         ]},
         {"title": "EV Battery Management", "total": 14564, "universities": [
             {"name": "Periyar University",                "students": 3653},
             {"name": "Thiruvalluvar University",          "students": 2541},
             {"name": "Bharathidasan University",          "students": 1749},
             {"name": "Annamalai University",              "students": 1651},
             {"name": "University of Madras",              "students": 1472},
             {"name": "Manonmaniam Sundaranar University", "students": 953},
             {"name": "Bharathiar University",             "students": 879},
             {"name": "Madurai Kamaraj University",        "students": 789},
             {"name": "Alagappa University",               "students": 632},
             {"name": "Mother Teresa University",          "students": 245}
         ]},
         {"title": "Food Analysis", "total": 1637, "universities": [
             {"name": "Thiruvalluvar University", "students": 813},
             {"name": "University of Madras",     "students": 824}
         ]},
         {"title": "Organic Food Production Techniques", "total": 2044, "universities": [
             {"name": "Periyar University",    "students": 1282},
             {"name": "Annamalai University",  "students": 541},
             {"name": "Bharathiar University", "students": 221}
         ]}
     ]}',
     3),
    -- FIX [A]: Rareminds'' (doubled) fixes the bare apostrophe that broke SQL parsing.
    -- FIX [B]: ]}', closes the string literal correctly — was missing in v3.
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "20,317", "label": "Students trained through structured, mentor-led sessions across universities in Tamil Nadu"},
         {"value": "100%",   "label": "Participants completed comprehensive final projects, demonstrating practical application of their learning. Evaluations were conducted jointly by college faculty and Rareminds'' industry experts"},
         {"value": "",       "label": "High engagement in mandatory hackathons, wherever applicable, fostering innovation, critical thinking, and collaborative problem-solving"},
         {"value": "",       "label": "Strengthened employability outcomes, with integrated placement, internship, and hackathon support initiatives"},
         {"value": "",       "label": "Positive institutional feedback from TNSDC and partner universities, highlighting increased student engagement, curiosity, and application-based learning"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Skill Development & Employability", "description": "Industry-aligned content boosted job-readiness of Arts and Science graduates"},
         {"title": "Curriculum Innovation",             "description": "Introduction of emerging technology domains aligned academic offerings with industry needs"},
         {"title": "Student Engagement & Retention",   "description": "Project-based learning significantly increased student interest, satisfaction, and retention"},
         {"title": "Workforce Readiness",               "description": "The program nurtured a talent pipeline in sectors critical to Tamil Nadu''s socio-economic development"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "The successful collaboration between Rareminds and the TNSDC''s Naan Mudhalvan program demonstrated Rareminds'' proven capacity to deliver measurable impact, reimagine classroom learning, and align with both institutional and governmental priorities. By turning classrooms into active innovation spaces, Rareminds empowered thousands of students to transition from passive learners to confident contributors in technology, agriculture, and sustainability. This initiative remains a shining example of how public-private partnerships can reshape education for a future-ready India.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'naan-mudhalvan-2023')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — NAAN MUDHALVAN 4TH SEM 2025
-- =====================================================
-- introduction: Naan Mudhalvan — NOT modified
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds partnered with the Tamil Nadu Skill Development Corporation (TNSDC) under the Naan Mudhalvan flagship initiative to transform technical education for Arts and Science students across Tamil Nadu. The program delivered high-impact, project-based training in emerging technologies, effectively bridging classroom theory with real-world application. It empowered students with future-ready skills, practical exposure, and the confidence to meet evolving industry demands."}',
     1),
    ('about', 'text', 'About the Program', NULL,
     '{"text": "Rareminds delivered specialized 45-hour experiential training programs to undergraduate students during the 4th Semester of the 2024–2025 academic year. These mandatory programs offered immersive, hands-on learning in the following domains: Chemical Safety in Battery Management, Food Analysis Processing and Preservation Techniques, Organic Food Production Techniques, and Sustainability & Green Chemistry in EV Sector. The programs combined in-person instruction with LMS-based support, enabling students to engage in real-time simulations, projects, and practical applications from day one."}',
     2),
    ('course_enrollment', 'courses', 'Detailed Course Enrollment by University', NULL,
     '{"courses": [
         {"title": "Chemical Safety in Battery Management (4th Semester)", "total": 2755, "universities": [
             {"name": "Manonmaniam Sundaranar University", "students": 1044},
             {"name": "Madurai Kamaraj University",        "students": 893},
             {"name": "Alagappa University",               "students": 572},
             {"name": "Mother Teresa University",          "students": 246}
         ]},
         {"title": "Food Analysis, Processing and Preservation Techniques (4th Semester)", "total": 5219, "universities": [
             {"name": "Periyar University",                "students": 1351},
             {"name": "Thiruvalluvar University",          "students": 929},
             {"name": "University of Madras",              "students": 850},
             {"name": "Annamalai University",              "students": 565},
             {"name": "Manonmaniam Sundaranar University", "students": 555},
             {"name": "Bharathiar University",             "students": 323},
             {"name": "Alagappa University",               "students": 301},
             {"name": "Madurai Kamaraj University",        "students": 224},
             {"name": "Mother Teresa University",          "students": 121}
         ]},
         {"title": "Organic Food Production Techniques (4th Semester)", "total": 991, "universities": [
             {"name": "Bharathidasan University", "students": 991}
         ]},
         {"title": "Sustainability & Green Chemistry in EV Sector (4th Semester)", "total": 7483, "universities": [
             {"name": "Bharathidasan University",          "students": 1693},
             {"name": "Annamalai University",              "students": 1648},
             {"name": "Thiruvalluvar University",          "students": 1550},
             {"name": "Manonmaniam Sundaranar University", "students": 968},
             {"name": "Madurai Kamaraj University",        "students": 878},
             {"name": "Alagappa University",               "students": 516},
             {"name": "Mother Teresa University",          "students": 230}
         ]}
     ]}',
     3),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "2,755", "label": "Students trained in Chemical Safety in Battery Management"},
         {"value": "5,219", "label": "Students trained in Food Analysis, Processing and Preservation Techniques"},
         {"value": "991",   "label": "Students trained in Organic Food Production Techniques"},
         {"value": "7,483", "label": "Students trained in Sustainability & Green Chemistry in EV Sector"},
         {"value": "",      "label": "Large-scale implementation across leading universities in Tamil Nadu"},
         {"value": "",      "label": "Strong hands-on learning outcomes through mentor-led sessions and real-world applications"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Skill Development & Employability", "description": "Delivered industry-relevant, practical skills to Arts and Science graduates"},
         {"title": "Curriculum Innovation",             "description": "Introduced cutting-edge, policy-aligned programs in EV and food technology sectors"},
         {"title": "Student Engagement",                "description": "Strengthened participation and knowledge retention through experiential learning"},
         {"title": "Workforce Readiness",               "description": "Built a pipeline of skilled graduates prepared for high-demand industries"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "The Rareminds–TNSDC collaboration under the Naan Mudhalvan initiative demonstrates strong industry-academia synergy. By combining innovation, hands-on learning, and outcome-driven delivery, Rareminds enabled thousands of students to transition into confident, future-ready professionals.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'naan-mudhalvan-4th-sem-2025')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — NAAN MUDHALVAN 6TH SEM 2025
-- =====================================================
-- introduction: Naan Mudhalvan — NOT modified
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds partnered with the Tamil Nadu Skill Development Corporation (TNSDC) under the Naan Mudhalvan flagship initiative to enhance technical education for Arts and Science students across Tamil Nadu. The program focused on delivering project-based training in emerging technologies, bridging academic learning with practical industry application."}',
     1),
    ('about', 'text', 'About the Program', NULL,
     '{"text": "Rareminds delivered a specialized 45-hour experiential training program during the 6th Semester of the 2024–2025 academic year focused on EV Battery Management System. The mandatory program combined in-person sessions with LMS-enabled learning, allowing students to work on simulations, projects, and practical applications from the outset."}',
     2),
    ('course_enrollment', 'courses', 'Detailed Course Enrollment by University', NULL,
     '{"courses": [
         {"title": "EV Battery Management System (6th Semester)", "total": 5198, "universities": [
             {"name": "Annamalai University",     "students": 1811},
             {"name": "Thiruvalluvar University", "students": 1740},
             {"name": "Bharathidasan University", "students": 1647}
         ]}
     ]}',
     3),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "5,198", "label": "Students trained on EV Battery Management System"},
         {"value": "",      "label": "Implementation across major universities"},
         {"value": "100%",  "label": "Project completion evaluated jointly by faculty and Rareminds experts"},
         {"value": "70%+",  "label": "Student participation in mandatory hackathons"},
         {"value": "",      "label": "Improved employability through placements and internships"},
         {"value": "",      "label": "Positive institutional feedback from TNSDC and participating universities"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Skill Development & Employability", "description": "Delivered industry-relevant, practical skills to Arts and Science graduates"},
         {"title": "Curriculum Innovation",             "description": "Introduced cutting-edge EV technology topics aligned with industry demands"},
         {"title": "Student Engagement",                "description": "Strengthened participation and curiosity through experiential learning"},
         {"title": "Workforce Readiness",               "description": "Built a pipeline of skilled graduates prepared for the EV sector"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "The Rareminds–TNSDC collaboration under the Naan Mudhalvan initiative highlights the effectiveness of large-scale, outcome-driven training. By equipping students with practical skills and industry exposure, the program strengthened workforce readiness and created a scalable model for education transformation.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'naan-mudhalvan-6th-sem-2025')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — NAAN MUDHALVAN 2025 (5th Semester / 2025-26)
-- =====================================================
-- introduction: Naan Mudhalvan — NOT modified
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds proudly partnered with the Tamil Nadu Skill Development Corporation (TNSDC) under the Naan Mudhalvan flagship initiative to transform technical education for Arts and Science students across Tamil Nadu. This program focused on delivering high-impact, project-based training in critical emerging technologies—bridging classroom theory with real-world practice. The partnership empowered students with future-ready skills, practical exposure, and the confidence to meet the demands of an evolving digital and industrial workforce."}',
     1),
    ('about', 'text', 'About the Program', NULL,
     '{"text": "Through this collaboration, Rareminds delivered three specialized 45-hour experiential training programs to undergraduate students during the Odd Semester (5th) of the 2025–2026 academic year. These mandatory programs provided immersive, hands-on learning experiences in the following sectors: Good Manufacturing Practices, Medical Coding, and Food Safety and Quality Management. The courses blended in-person classes with LMS-based support, enabling students to work on real-time simulations, projects, and practical applications from day one."}',
     2),
    ('course_enrollment', 'courses', 'Detailed Course Enrollment by University', NULL,
     '{"courses": [
         {"title": "Medical Coding (5th Semester)", "total": 3886, "universities": [
             {"name": "Periyar University",    "students": 2987},
             {"name": "Bharathiar University", "students": 899}
         ]},
         {"title": "Good Manufacturing Practices (5th Semester)", "total": 5049, "universities": [
             {"name": "Periyar University",                "students": 2148},
             {"name": "Manonmaniam Sundaranar University", "students": 949},
             {"name": "Madurai Kamaraj University",        "students": 797},
             {"name": "Alagappa University",               "students": 508},
             {"name": "Bharathiar University",             "students": 420},
             {"name": "Mother Teresa University",          "students": 227}
         ]},
         {"title": "Food Safety and Quality Management (5th Semester)", "total": 5560, "universities": [
             {"name": "Periyar University",                "students": 1283},
             {"name": "Thiruvalluvar University",          "students": 888},
             {"name": "Bharathidasan University",          "students": 868},
             {"name": "University of Madras",              "students": 557},
             {"name": "Annamalai University",              "students": 556},
             {"name": "Manonmaniam Sundaranar University", "students": 540},
             {"name": "Bharathiar University",             "students": 301},
             {"name": "Alagappa University",               "students": 292},
             {"name": "Madurai Kamaraj University",        "students": 157},
             {"name": "Mother Teresa University",          "students": 118}
         ]}
     ]}',
     3),
    ('impact', 'stats', 'Objectives', NULL,
     '{"items": [
         {"value": "14,495", "label": "Students to be trained through hands-on, mentor-led sessions across major Tamil Nadu universities"},
         {"value": "100%",   "label": "Project completion across all enrolled students, evaluated jointly by Master Assessor Faculty and Rareminds'' industry experts"},
         {"value": "70%+",   "label": "Student participation in mandatory hackathons promotes innovation, collaboration, and problem-solving"},
         {"value": "25%",    "label": "Target placement conversion through post-training support including placement drives and internship opportunities"},
         {"value": "",       "label": "Positive feedback from TNSDC and universities citing better engagement, curiosity, and practical understanding among students"}
     ]}',
     4),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Skill Development & Employability", "description": "Provide students with industry-relevant, practical skills"},
         {"title": "Curriculum Innovation",             "description": "Introduce cutting-edge topics aligned with national education policy"},
         {"title": "Student Engagement",                "description": "Elevate learning interest through experiential pedagogy"},
         {"title": "Workforce Readiness",               "description": "Create a pipeline of skilled graduates prepared for high-demand industries"}
     ]}',
     5),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     6),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "The Rareminds–TNSDC collaboration under the Naan Mudhalvan initiative exemplifies impactful industry-academia synergy. By integrating innovation, hands-on learning, and outcome-driven models, Rareminds helped thousands of students transition from passive learners to future-ready professionals. This program stands as a scalable model for education transformation and skill empowerment across India.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     7)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'naan-mudhalvan-2025')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — TRIPURA
-- =====================================================
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Equipping Candidates for Global Careers with Confidence & Clarity', NULL,
     '{"text": "Overseas job interviews demand more than just qualifications — they require candidates to present themselves with poise, adapt to cross-cultural environments, and navigate high-stakes conversations effectively. Tripura Skill Development Corporation (TSDC) identified the need to prepare aspiring overseas placement candidates with focused, practical training that would address both interview performance and communication competency. A targeted approach was implemented to ensure that participants — ranging from ITI graduates to young professionals — received actionable strategies, hands-on practice, and cross-cultural readiness for international job markets. Rareminds, under the leadership of CEO Dr. Subhashini, delivered a structured 10-hour training program (2 hours/day across 5 days) for 200 candidates in two batches of 100 each, covering ITI graduates, diploma holders, graduates, postgraduates, and young professionals. Dr. Subhashini personally conducted the sessions, bringing strategic insights and real-world experience directly to participants.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "Program Structure",   "description": "Total Training Hours: 10 hours. Schedule: 2 hours/day across 5 days. Participants Trained: 200 candidates in two batches of 100."},
         {"title": "Participant Profile", "description": "ITI graduates, diploma holders, graduates, postgraduates, and young professionals preparing for overseas placement opportunities."},
         {"title": "Expert Training",     "description": "Program delivered by Dr. Subhashini, CEO of Rareminds, bringing extensive industry experience and leadership in skill development."}
     ]}',
     2),
    ('modules', 'cards', 'Modules Covered', NULL,
     '{"items": [
         {"title": "Resume & Cover Letter",         "description": "Effective Resume and Cover Letter Writing"},
         {"title": "Interview Best Practices",      "description": "Common Interview Questions & Best Practices"},
         {"title": "Non-verbal Communication",      "description": "Non-verbal Communication & Body Language"},
         {"title": "Stress Management",             "description": "Handling Difficult Questions & Stress Management"},
         {"title": "Mock Interviews",               "description": "Mock Interviews with Personalized Feedback"},
         {"title": "Cross-cultural Communication",  "description": "Understanding Cultural Differences and Sensitivities"},
         {"title": "Global Business Etiquette",     "description": "Global Business Etiquette and Intercultural Negotiation"}
     ]}',
     3),
    ('approaches', 'cards', 'Multiple Approaches', NULL,
     '{"items": [
         {"title": "Presentations & Case Studies", "description": "Interactive Presentations & Case Studies"},
         {"title": "Group Discussions",            "description": "Group Discussions & Peer Activities"},
         {"title": "Roleplays & Simulations",      "description": "Roleplays & Interview Simulations"},
         {"title": "Individualized Coaching",      "description": "Individualized Coaching & Feedback"}
     ]}',
     4),
    ('impact', 'stats', 'Outcomes and Impact', NULL,
     '{"items": [
         {"value": "95%",  "label": "Participants reported improved confidence in handling interviews"},
         {"value": "92%",  "label": "Demonstrated better articulation in mock interview evaluations"},
         {"value": "87%",  "label": "Showed improvement in cross-cultural awareness and etiquette"},
         {"value": "100%", "label": "Completed mock interviews with personalized feedback"},
         {"value": "40%",  "label": "Average improvement in self-assessment scores across key skill areas"}
     ]}',
     5),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TSDC Goals', NULL,
     '{"items": [
         {"title": "Strengthening Global Employability", "description": "This initiative directly supported TSDC''s mission to strengthen global employability for regional youth"},
         {"title": "Bridging Skill Gaps",                "description": "Bridge skill gaps through targeted communication and interview training"},
         {"title": "Cultural & Professional Readiness",  "description": "Prepare candidates for diverse cultural and professional environments"},
         {"title": "Improving Placement Success",        "description": "Enhance placement success rates through practical readiness"}
     ]}',
     6),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     7),
    ('conclusion', 'text', 'Turning Aspirants into Global Professionals', NULL,
     '{"text": "Through this focused intervention, Rareminds — under the direct leadership and facilitation of CEO Dr. Subhashini — empowered Tripura''s overseas placement aspirants with the tools, confidence, and global readiness essential for success. The program served not only as a skill-building platform but also as a mindset transformation, directly contributing to TSDC''s vision of creating globally competitive talent.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     8)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'tripura')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — TNSDC ITI (SPOKEN ENGLISH)
-- =====================================================
-- FIX [C]: Rareminds' → Rareminds'' in impact bullet #5
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds partnered with Tamil Nadu Skill Development Corporation (TNSDC) to improve English and personality development among students in government welfare hostels. This was hands-on training that equipped students with critical communication skills and confidence for their future academic and professional life.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "Target Audience",          "description": "Full English and Personality Development program offered to 2nd and 3rd year students in Tribal, ADW, BC, MBC, DNC, and Minorities Welfare Department Hostels."},
         {"title": "Curriculum Approach",      "description": "The curriculum used open-source documentary movies for listening/speaking practice, English newspapers for reading/writing, and dedicated workbooks for structured assessments."},
         {"title": "Assessment & Certification","description": "Cambridge University administered pre- and post-training exams to monitor student progress and track improvement on the CEFR scale."}
     ]}',
     2),
    -- FIX [C]: Rareminds'' (doubled apostrophe) in bullet #5 label.
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "10,210",  "label": "Trained 10,210 students over 7 Months on English communication and personal development skills."},
         {"value": "7",       "label": "The program was offered in 7 districts of Tamil Nadu (Nammakkal, Coimbatore, Tiruppur, Nilgiris, Erode, Salem, and Karur) in 90+ hostels."},
         {"value": "150+",    "label": "The program was delivered by 150+ trainers."},
         {"value": "Core",    "label": "Core Competencies: Students improved their basic English, conversational skills, and reading comprehension."},
         {"value": "Cambridge","label": "Cambridge assessments are at the heart of Rareminds'' outcome-driven approach, which is about measurable improvement (at least one CEFR level up). The following are the grades as assessed by Cambridge."},
         {"value": "52.14%",  "label": "52.14% of students achieved A2, indicating strong foundational English proficiency post-training."},
         {"value": "6.84%",   "label": "6.84% of students reached B1, showing above-basic competence and readiness for workplace communication."},
         {"value": "6.84%",   "label": "6.84% of students remained at A1, suggesting emerging skills that need continued support."},
         {"value": "0.85%",   "label": "0.85% improved from A1 to A2, demonstrating upward growth."},
         {"value": "0.85%",   "label": "0.85% progressed from A2 to B1, showing measurable advancement."}
     ]}',
     3),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC & Government Goals', NULL,
     '{"items": [
         {"title": "Empowering Underprivileged Students", "description": "Training life and communication skills in Tribal, ADW, BC, MBC, DNC, and Minority welfare hostels"},
         {"title": "Better Job Prospects",               "description": "Building confidence and communication skills for better future opportunities"},
         {"title": "Quality Assurance",                  "description": "Cambridge University Press independent standardized assessments for accountability"},
         {"title": "Practical English",                  "description": "Practical English for daily use and future opportunities, not just academic proficiency"}
     ]}',
     4),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     5),
    ('conclusion', 'text', 'Building Lasting Confidence', NULL,
     '{"text": "Rareminds delivers measurable impact in English communication and personality development across diverse learner groups. By aligning with the government''s student empowerment goals, Rareminds focuses on practical, confidence-building interventions grounded in the CEFR framework, ensuring structured and outcome-driven progress. While rote learning has its place in foundational skill-building, Rareminds integrates it with real-world communication strategies to foster both accuracy and fluency. Students gain the ability to apply language meaningfully — in interviews, group settings, and digital communication. The program is adaptable, culturally relevant, and designed to support lifelong language confidence across regions and learner levels.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     6)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'tnsdc-iti-spoken-english')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- PROGRAM SECTIONS — TNSDC SCHOOLS
-- =====================================================
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    ('introduction', 'text', 'Introduction', NULL,
     '{"text": "Rareminds, in a significant partnership with the Tamil Nadu Skill Development Corporation, concluded a transformative 7-day (45-hour) vocational training program across 121 Government Higher Secondary Schools (GHSS). This initiative was designed to empower 12th-grade students with tangible, in-demand skills, paving the way for entrepreneurship and enhancing employability in key growth sectors.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program',
     'The program successfully reached 1,974 students allocated by the Tamil Nadu Skill Development Corporation, demonstrating Rareminds'' expertise in large-scale, impactful educational delivery. The 7-day engagement offered students two distinct, yet equally valuable, vocational pathways:',
     '{"items": [
         {"title": "Cloud Kitchen Operations: Encouraging the Entrepreneur", "description": "This stream was designed to give students a comprehensive understanding of the burgeoning cloud kitchen industry, equipping them with the knowledge to launch and manage their food ventures. Five Villupuram schools successfully implemented this program, training 76 aspiring food entrepreneurs."},
         {"title": "Agri-Food Processing & Preservation: Cultivating Skills and Opportunities", "description": "This comprehensive 40-hour curriculum equips students with vital knowledge of the agri-food industry, focusing on practical ways to enhance food value, improve safety standards, and extend shelf life. Implemented in 116 schools, 1,570 students gained practical skills. Activities included canning, bottling, pickling, fermentation, drying, and freezing techniques. Students were introduced to food safety principles, hygiene practices, HACCP basics, and quality control measures."}
     ]}',
     2),
    ('impact', 'stats', 'Key Outcomes & Impact', NULL,
     '{"items": [
         {"value": "121",   "label": "The program was implemented across 121 Government Higher Secondary Schools (GHSS)."},
         {"value": "1,974", "label": "1,974 students were successfully trained"},
         {"value": "76",    "label": "Five Villupuram schools successfully implemented the Cloud Kitchen entrepreneurship program, training 76 aspiring food entrepreneurs."},
         {"value": "1,570", "label": "The Agri-Food Processing & Preservation program was implemented in 116 schools, where 1,570 students gained practical skills and knowledge and started their home business"},
         {"value": "✓",     "label": "Students gained hands-on experience through activities such as canning, bottling, pickling, fermentation, drying, and freezing techniques."},
         {"value": "✓",     "label": "Students were introduced to food safety principles, hygiene practices, HACCP basics, and quality control measures."},
         {"value": "✓",     "label": "Students who started business registered under FSSAI"}
     ]}',
     3),
    ('strategic_alignment', 'cards', 'Strategic Alignment with TNSDC Goals', NULL,
     '{"items": [
         {"title": "Entrepreneurship",        "description": "Effortless Entrepreneurship alignment through skill-based, experiential learning"},
         {"title": "Employability",           "description": "Enhanced student employability with practical, in-demand skills"},
         {"title": "Future-proof Curriculum", "description": "Curriculum in high-growth sectors like food technology and entrepreneurship"},
         {"title": "Government Partnership",  "description": "Proven partnership ensuring reliable implementation of large-scale programs"},
         {"title": "Integrated Delivery",     "description": "Fully integrated program delivery reducing administrative burden for institutions"},
         {"title": "Measurable Impact",       "description": "Structured reporting and feedback on student skills and confidence"}
     ]}',
     4),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     5),
    ('conclusion', 'text', 'Conclusion', NULL,
     '{"text": "This successful GHSS project underscores Rareminds'' dedication to delivering high-quality, large-scale vocational training in collaboration with government bodies. By empowering nearly 2,000 students with practical knowledge and entrepreneurial insights, we are actively shaping a more skilled, confident, and future-ready generation.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     6)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'tnsdc-schools')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- NOTE: AICTE and KSDC have no sections — skipped.

-- =====================================================
-- PROGRAM SECTIONS — GLOBAL INTERNATIONAL SCHOOL
-- =====================================================
-- FIX [D]: today's → today''s  in introduction text
--          Also fixed unclosed JSON string (missing closing " before }')
-- introduction: images ADDED (patch v5)
-- conclusion:   images ADDED (patch v5)

INSERT INTO program_sections (
    program_id, section_key, content_type, title, preamble, content, display_order
)
SELECT p.id, s.section_key::section_key_type, s.content_type::content_type,
       s.title, s.preamble, s.content::jsonb, s.display_order
FROM programs p
JOIN (VALUES
    -- FIX [D]: today''s (doubled apostrophe). Closing " and }' are now correct.
    ('introduction', 'text', 'Global International School – Empowering Teachers', NULL,
     '{"text": "Teachers shape the learning environment, but they can only transform classrooms when they are equipped and inspired. However, most lacked structured exposure to NEP-aligned pedagogy, meaningful technology integration, and effective strategies to manage young, modern learners. The shift from traditional instruction to learner-centric approaches demanded more than content knowledge. It required mindset shifts, new tools, and practical strategies. Yet, most training programs remained too theoretical or generic to create lasting change. Rareminds was invited to bridge this critical gap with focused, hands-on capacity-building for today''s classrooms.", "images": [{"url": "https://picsum.photos/800/600?random=intro1"}, {"url": "https://picsum.photos/800/600?random=intro2"}, {"url": "https://picsum.photos/800/600?random=intro3"}]}',
     1),
    ('about', 'cards', 'About the Program', NULL,
     '{"items": [
         {"title": "Program Overview",   "description": "In November 2023, Rareminds conducted a 2-day intensive capacity-building program for 40 teachers at Global International School."},
         {"title": "Expert-Led Training","description": "Led by 3 expert master trainers, the sessions blended foundational understanding with practical application, ensuring teachers gained both theoretical knowledge and hands-on skills."}
     ]}',
     2),
    ('modules', 'cards', 'Modules Covered', NULL,
     '{"items": [
         {"title": "Contemporary Education",  "description": "Contemporary Education and Classroom Skills"},
         {"title": "Digital Tools",           "description": "Digital Tools for Teaching"},
         {"title": "Feedback Culture",        "description": "Creating a Feedback Culture"},
         {"title": "Learner Profiles",        "description": "Student Engagement Based on Learner Profiles"},
         {"title": "Activity-Based Teaching", "description": "Activity-Based Teaching Modules"},
         {"title": "Action Planning",         "description": "Personalized Reflection and Action Planning"}
     ]}',
     3),
    ('approaches', 'cards', 'Multiple Approaches', NULL,
     '{"items": [
         {"title": "Group Activities & Demos",  "description": "Interactive Group Activities and Demos"},
         {"title": "Peer Discussions",          "description": "Peer Discussions and Application Circles"},
         {"title": "Micro-Innovation Planning", "description": "Micro-Innovation Planning for Classroom Practice"}
     ]}',
     4),
    ('impact', 'stats', 'Outcomes and Impact', NULL,
     '{"items": [
         {"value": "100%", "label": "Participation and engagement across all sessions"},
         {"value": "",     "label": "Teachers developed classroom innovation plans post-training"},
         {"value": "",     "label": "Improved lesson planning confidence and use of engagement tools"}
     ]}',
     5),
    ('strategic_alignment', 'cards', 'Strategic Alignment with Global International School Goals', NULL,
     '{"items": [
         {"title": "Teacher Capacity Building", "description": "Teacher Capacity Building and NEP Integration"},
         {"title": "Rapid Upskilling",          "description": "Rapid Upskilling with Practical Teaching Tools"},
         {"title": "Classroom Innovation",      "description": "Personalized Classroom Innovation Initiatives"},
         {"title": "Student Engagement",        "description": "Enhanced Student Engagement and Retention"}
     ]}',
     6),
    ('video', 'text', NULL, NULL,
     '{"text": "https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/,https://www.pexels.com/download/video/4625286/"}',
     7),
    ('conclusion', 'text', 'Conclusion: Turning Educators into Enablers', NULL,
     '{"text": "At Global International School, Rareminds supported teachers to go beyond delivery. By equipping them with modern strategies, tech tools, and learner-focused frameworks, we helped lay the groundwork for classrooms that are engaging, inclusive, and impact-driven. It was more than training—it was a catalyst for everyday transformation.", "image": {"url": "https://picsum.photos/800/600?random=conclusion"}}',
     8)
) AS s(section_key, content_type, title, preamble, content, display_order)
ON (p.slug = 'global-international-school')
ON CONFLICT (program_id, section_key) DO UPDATE SET
    content_type  = EXCLUDED.content_type,
    title         = EXCLUDED.title,
    preamble      = EXCLUDED.preamble,
    content       = EXCLUDED.content,
    display_order = EXCLUDED.display_order,
    updated_at    = NOW();

-- =====================================================
-- END OF SEED FILE
-- =====================================================
-- Total Programs  : 17
-- Total Sections  : 14 programs with sections, 3 without (VTU, AICTE, KSDC)
-- Sections merged into other sections:
--                   'program_delivery' (merged into about — Tripura)
--                   'intervention' (merged into about — Global International School)
--                   'cloud_kitchen' (merged into about — TNSDC Schools)
--                   'agri_food' (merged into about — TNSDC Schools)
-- Sections kept as standalone:
--                   'video' (inserted as separate section with display_order before conclusion)
--
-- FIXES APPLIED (patch v4):
--   [A] naan-mudhalvan-2023 → Rareminds'' in impact bullet #2
--   [B] naan-mudhalvan-2023 → closing ]}', added to impact JSON
--   [C] tnsdc-iti-spoken-english → Rareminds'' in impact bullet #5
--   [D] global-international-school → today''s in introduction text
--
-- IMAGE ADDITIONS (patch v5):
--   Introduction images added (NON-Naan Mudhalvan, 3 images each):
--     vels, dsatm, bldea, tripura, tnsdc-iti-spoken-english,
--     tnsdc-schools, global-international-school
--   Introduction images already present (unchanged):
--     acharya, pes
--   Introduction images skipped (Naan Mudhalvan — rule):
--     naan-mudhalvan-2024, naan-mudhalvan-2023, naan-mudhalvan-4th-sem-2025,
--     naan-mudhalvan-6th-sem-2025, naan-mudhalvan-2025
--   Conclusion images added (ALL programs with sections, 1 image each):
--     acharya, pes, vels, dsatm, bldea, tripura, tnsdc-iti-spoken-english,
--     tnsdc-schools, global-international-school, naan-mudhalvan-2024,
--     naan-mudhalvan-2023, naan-mudhalvan-4th-sem-2025,
--     naan-mudhalvan-6th-sem-2025, naan-mudhalvan-2025
--
-- DATA NOTE: NM 2025-26 source doc says "five specialized programs"
--   but only 3 courses appear in enrollment tables. Seed reflects
--   3 actual courses. Source doc inconsistency logged here for reference.
-- =====================================================

COMMIT;
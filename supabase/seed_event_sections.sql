-- =====================================================
-- EVENT SECTION CONTENT SEED
-- =====================================================
-- File:    supabase/seed_event_sections.sql
-- Purpose: Hand-authored section content for events.
--          Stores stats, features, testimonials, and cta
--          sections in the entity_sections + section_contents
--          architecture.
--
-- Schema source:
--   20260601000000_entity_sections_schema.sql
--
-- Depends on (must run after):
--   seed.sql         — programs + program_sections
--   seed_remote.sql  — events, existing entity_sections,
--                       existing section_contents
--
-- Execution:
--   Runs automatically on: supabase db reset
--   Registered in config.toml under [db.seed] sql_paths.
--
-- KEY SCHEMA CONSTRAINTS:
-- entity_sections.section_key  → entity_section_key_enum:
--     'hero' | 'about' | 'highlights' | 'agenda' | 'gallery' |
--     'speakers' | 'stats' | 'features' | 'testimonials' | 'faq' | 'cta'
-- entity_sections.content_type → CHECK IN:
--     'text' | 'list' | 'stats' | 'cards' | 'gallery' | 'faq'
--
-- content JSONB shapes used here:
--   stats  → { "heading": "...", "items": [{"value":"...","label":"..."}], "badges": [...] }
--   cards  → { "heading": "...", "subheading": "...", "items": [{"title":"...","description":"..."}] }
--   cards  → { "heading": "...", "tag": "...", "items": [{"name":"...","rating":5,"review":"..."}] }
--   text   → { "text": "...", "button": "...", "badges": [...] }
--
-- SAFETY:
--   All inserts use ON CONFLICT DO NOTHING — fully idempotent.
--   entity_section_id is never hardcoded; always resolved at
--   runtime by (entity_type, entity_id, section_key) lookup.
--
-- TRIGGER:
--   auto_assign_section_content_item_ids is LEFT ENABLED.
--   All content.items in this file are JSON objects.
--   The trigger fires on each INSERT and assigns a UUID to
--   every item that lacks one. The cta section has no items
--   key — the trigger does not fire for it.
-- =====================================================


BEGIN;


-- =====================================================
-- EVENT: AI Teacher Webinar  (slug: 'v')
-- =====================================================
-- entity_id: c796ae89-09a9-4494-9b34-04dc28280e12
--
-- Sections already seeded by seed_remote.sql:
--   about        display_order 1   content_type text
--   highlights   display_order 2   content_type list
--   gallery      display_order 4   content_type gallery
--   speakers     display_order 5   content_type cards
--   faq          display_order 6   content_type faq
--
-- New sections added here:
--   stats        display_order 7   content_type stats
--   features     display_order 8   content_type cards
--   testimonials display_order 9   content_type cards
--   cta          display_order 10  content_type text


-- =====================================================
-- ENTITY SECTIONS
-- =====================================================

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
VALUES
    ('event', 'c796ae89-09a9-4494-9b34-04dc28280e12', 'stats',        'stats',  7,  true),
    ('event', 'c796ae89-09a9-4494-9b34-04dc28280e12', 'features',     'cards',  8,  true),
    ('event', 'c796ae89-09a9-4494-9b34-04dc28280e12', 'testimonials', 'cards',  9,  true),
    ('event', 'c796ae89-09a9-4494-9b34-04dc28280e12', 'cta',          'text',   10, true)
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;


-- =====================================================
-- SECTION CONTENTS
-- =====================================================


-- -----------------------------------------------------
-- stats
-- "Educators Across India Trust Us"
-- 6 stat cards + 4 trust badges
-- Trigger fires → UUIDs assigned to each item in items[].
-- badges[] is outside items — no UUIDs assigned there.
-- -----------------------------------------------------

INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    '{
        "heading": "Educators Across India Trust Us",
        "items": [
            {"value": "150K+",  "label": "Teachers Trained"},
            {"value": "22+",    "label": "States Covered"},
            {"value": "4.9",    "label": "Average Rating"},
            {"value": "94%",    "label": "Would Recommend"},
            {"value": "200+",   "label": "Schools Partnered"},
            {"value": "11 Yrs", "label": "Training Experience"}
        ],
        "badges": [
            {"label": "Certified Educator Training"},
            {"label": "Trusted by Indian Schools"},
            {"label": "NCERT Aligned Content"},
            {"label": "100% Safe & Verified"}
        ]
    }'::jsonb
FROM public.entity_sections es
WHERE es.entity_type = 'event'
  AND es.entity_id   = 'c796ae89-09a9-4494-9b34-04dc28280e12'
  AND es.section_key = 'stats'
ON CONFLICT (entity_section_id) DO NOTHING;


-- -----------------------------------------------------
-- features
-- "What Teachers Can Do with AI in 45 Minutes"
-- Heading + subheading + 6 feature cards
-- Trigger fires → UUIDs assigned to each item in items[].
-- Apostrophes escaped: week''s, haven''t
-- Em dash — used directly (UTF-8)
-- -----------------------------------------------------

INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    '{
        "heading":    "What Teachers Can Do with AI in 45 Minutes",
        "subheading": "Simple. Practical. Designed for teachers, not tech experts.",
        "items": [
            {
                "title":       "Lesson Plans in Minutes",
                "description": "Create a full week''s lesson plan using AI in the time it used to take you for just one day."
            },
            {
                "title":       "Beautiful Presentations",
                "description": "Make engaging, visual slides for any topic without spending hours on PowerPoint."
            },
            {
                "title":       "Auto-Generate Quizzes",
                "description": "Type a topic and get 20 MCQs, fill-in-the-blanks, and short questions instantly."
            },
            {
                "title":       "Automate Routine Tasks",
                "description": "Parent communications, progress reports, notices — done in minutes, not hours."
            },
            {
                "title":       "Keep Students Hooked",
                "description": "Discover AI-powered techniques that make lessons interactive, fun, and memorable."
            },
            {
                "title":       "Grow Your Career",
                "description": "Become an AI-confident educator and open doors others in your school haven''t even seen yet."
            }
        ]
    }'::jsonb
FROM public.entity_sections es
WHERE es.entity_type = 'event'
  AND es.entity_id   = 'c796ae89-09a9-4494-9b34-04dc28280e12'
  AND es.section_key = 'features'
ON CONFLICT (entity_section_id) DO NOTHING;


-- -----------------------------------------------------
-- testimonials
-- "What Other Teachers Are Saying"
-- Section tag + 3 teacher reviews with rating
-- Trigger fires → UUIDs assigned to each item in items[].
-- Apostrophes escaped: I''m
-- -----------------------------------------------------

INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    '{
        "heading": "What Other Teachers Are Saying",
        "tag":     "Teacher Stories",
        "items": [
            {
                "name":        "Sunita Bhat",
                "designation": "Hindi Teacher",
                "school":      "Govt School",
                "location":    "Jaipur",
                "rating":      5,
                "review":      "I was skeptical at first - I''m 52 and not very tech-savvy. But this session was so simple and practical. I made my first AI lesson plan within 10 minutes of the webinar! My principal was genuinely impressed."
            },
            {
                "name":        "Ramesh Nair",
                "designation": "Science Teacher",
                "school":      "CBSE School",
                "location":    "Kochi",
                "rating":      5,
                "review":      "I used to spend my entire Sunday making lesson plans for the week. After attending this webinar, I now finish in 40 minutes using ChatGPT. The quality is actually better!"
            },
            {
                "name":        "Priyanka Dubey",
                "designation": "English Teacher",
                "school":      "Private School",
                "location":    "Lucknow",
                "rating":      5,
                "review":      "The fear of AI replacing teachers was real for me. But Dr. Ananya completely changed my perspective. I now feel in control, not threatened."
            }
        ]
    }'::jsonb
FROM public.entity_sections es
WHERE es.entity_type = 'event'
  AND es.entity_id   = 'c796ae89-09a9-4494-9b34-04dc28280e12'
  AND es.section_key = 'testimonials'
ON CONFLICT (entity_section_id) DO NOTHING;


-- -----------------------------------------------------
-- cta
-- Quote + button label + 3 assurance badges
-- No items key → trigger does NOT fire.
-- Apostrophes escaped: won''t
-- -----------------------------------------------------

INSERT INTO public.section_contents (entity_section_id, content)
SELECT
    es.id,
    '{
        "text":   "AI won''t replace teachers, but teachers using AI will move ahead faster.",
        "button": "Book My Free Seat Now",
        "badges": [
            {"label": "Free Bonus Resources"},
            {"label": "100% Safe"},
            {"label": "Only 45 Minutes"}
        ]
    }'::jsonb
FROM public.entity_sections es
WHERE es.entity_type = 'event'
  AND es.entity_id   = 'c796ae89-09a9-4494-9b34-04dc28280e12'
  AND es.section_key = 'cta'
ON CONFLICT (entity_section_id) DO NOTHING;


COMMIT;

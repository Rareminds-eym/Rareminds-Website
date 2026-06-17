-- =====================================================
-- SEED: AI for Teachers Webinar 2026
-- Category: Webinar | Virtual | Free
-- Tables: events, entity_sections, section_contents
-- =====================================================

BEGIN;

-- =====================================================
-- STEP 1: EVENT
-- =====================================================

INSERT INTO public.events (
    id,
    created_by,
    title,
    event_date,
    event_time,
    duration,
    category,
    price,
    registration_deadline,
    status,
    is_physical,
    slug,
    organizer_metadata,
    media_metadata,
    content_metadata,
    location_metadata
)
VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1),
    'How Teachers Are Using AI to Save 10+ Hours Every Week',
    '2026-08-15',
    '11:00:00',
    120,
    'Webinar'::public.event_category_enum,
    0.00,
    '2026-08-14',
    'upcoming'::public.event_status_enum,
    false,
    'ai-for-teachers-webinar-2026',
    jsonb_build_object(
        'name',  'Rareminds',
        'email', 'webinars@rareminds.in',
        'phone', '+91-9880123456'
    ),
    jsonb_build_object(
        'featured_image',        '',
        'event_banner',          '',
        'mobile_featured_image', '',
        'teaser_video',          '',
        'enquiry_pdf',           ''
    ),
    jsonb_build_object(
        'event_link',              'https://rareminds.in/events/ai-for-teachers-webinar-2026',
        'zoho_form_url',           'https://crm.zoho.in/crm/WebFormServeServlet?rid=aa1469fb1587951ec4ed5067046cd89c4a6e66db3411635aef9a73da61d10db13d831e490ff1ade0ea1568b268f6db77gid4b0dcaceef1554824590d9b1a568b4f58c24fed40275d7905d5b702b668731fd',
        'capacity',                500,
        'event_tags',              '["AI for teachers","education technology","free webinar","teacher training"]'::jsonb,
        'languages',               '["English","Hindi"]'::jsonb,
        'sponsors',                '["Rareminds"]'::jsonb,
        'requirements',            'Open to all teachers and education professionals. Stable internet required.',
        'additional_contact_info', 'Queries: webinars@rareminds.in | WhatsApp: +91-9880123456'
    ),
    jsonb_build_object(
        'address', 'Online — Zoom',
        'lat',     null,
        'lng',     null
    )
)
ON CONFLICT (slug) DO NOTHING;


-- =====================================================
-- STEP 2: ENTITY SECTIONS
-- =====================================================

INSERT INTO public.entity_sections
    (entity_type, entity_id, section_key, content_type, display_order, is_active)
SELECT
    'event'::public.entity_type_enum,
    e.id,
    s.section_key,
    s.content_type,
    s.display_order,
    true
FROM public.events e
CROSS JOIN (VALUES
    ('hero'::public.entity_section_key_enum,         'text',    0),
    ('about'::public.entity_section_key_enum,        'text',    1),
    ('highlights'::public.entity_section_key_enum,   'list',    2),
    ('speakers'::public.entity_section_key_enum,     'cards',   3),
    ('gallery'::public.entity_section_key_enum,      'gallery', 4),
    ('stats'::public.entity_section_key_enum,        'stats',   5),
    ('features'::public.entity_section_key_enum,     'cards',   6),
    ('testimonials'::public.entity_section_key_enum, 'cards',   7),
    ('faq'::public.entity_section_key_enum,          'faq',     8),
    ('cta'::public.entity_section_key_enum,          'text',    9)
) AS s(section_key, content_type, display_order)
WHERE e.slug = 'ai-for-teachers-webinar-2026'
ON CONFLICT (entity_type, entity_id, section_key) DO NOTHING;


-- =====================================================
-- STEP 3: SECTION CONTENTS
-- =====================================================

-- hero
-- formUrl intentionally omitted — zoho_form_url lives in
-- content_metadata.zoho_form_url on the events table.
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "title":       "How Teachers Are Using AI to Save 10+ Hours Every Week",
    "description": "A free, beginner-friendly live session for teachers across all subjects and age groups. No tech background needed.",
    "benefits": [
        "100% Free – No hidden charges",
        "No technical knowledge required",
        "Real classroom use cases, not theory",
        "Interactive live Q&A session",
        "Bonus resources for all attendees"
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'hero'
ON CONFLICT (entity_section_id) DO NOTHING;

-- about
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "text": "Rareminds presents a free live webinar for teachers — How Teachers Are Using AI to Save 10+ Hours Every Week. This beginner-friendly session is designed for educators across all subjects and grade levels. Learn practical, classroom-ready AI tools that save time on lesson planning, assessment, and admin tasks. Led by Rareminds training experts, this 2-hour session is packed with real use cases, live demos, and a Q&A to answer your specific questions."
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'about'
ON CONFLICT (entity_section_id) DO NOTHING;

-- highlights
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "items": [
        {"text": "100% Free — No registration fee"},
        {"text": "Live 2-hour interactive session"},
        {"text": "Practical AI tools for the classroom"},
        {"text": "No tech background required"},
        {"text": "Certificate of participation for all attendees"},
        {"text": "Bonus resource kit shared after the session"}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'highlights'
ON CONFLICT (entity_section_id) DO NOTHING;

-- speakers
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "heading": "Your Hosts",
    "items": [
        {
            "name": "Subhashini Ramaswamy",
            "role": "CEO, Rareminds",
            "photo": "",
            "linkedin": "",
            "description": "Dr. Subhashini Ramaswamy is an educator, entrepreneur, mentor, and social innovator dedicated to transforming education and empowering communities through learning. With decades of experience, she has trained over 1.5 lakh teachers and impacted the learning journeys of more than 5 lakh students across India and beyond. Her initiatives include establishing social learning centres in the Nilgiris and rural communities of Tamil Nadu, creating opportunities for accessible and meaningful education. A strong advocate for teacher empowerment, skill development, and lifelong learning, Dr. Subhashini continues to inspire individuals and institutions through her leadership, vision, and commitment to social impact."
        },
        {
            "name": "Arvind Menon",
            "role": "Senior Trainer, Rareminds",
            "photo": "",
            "linkedin": "",
            "description": ""
        }
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'speakers'
ON CONFLICT (entity_section_id) DO NOTHING;

-- gallery
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "items": [
        {"image_url": "", "caption": "Opening session — AI tools for educators"},
        {"image_url": "", "caption": "Live demo — lesson planning with AI"},
        {"image_url": "", "caption": "Q&A session with participants"},
        {"image_url": "", "caption": "Hands-on activity — generating quiz questions"},
        {"image_url": "", "caption": "Participants from across India joining live"},
        {"image_url": "", "caption": "Certificate distribution ceremony"}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'gallery'
ON CONFLICT (entity_section_id) DO NOTHING;

-- stats
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "heading": "Trusted by Educators Across India",
    "items": [
        {"value": "150K+", "label": "Teachers Trained"},
        {"value": "22+",   "label": "States Covered"},
        {"value": "4.9",   "label": "Average Rating"},
        {"value": "98%",   "label": "Would Recommend"},
        {"value": "18+",   "label": "Years of Experience"},
        {"value": "500+",  "label": "Webinars Conducted"}
    ],
    "badges": [
        {"label": "ISO Certified"},
        {"label": "100% Free"},
        {"label": "Live Interactive Session"},
        {"label": "Certificate Included"}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'stats'
ON CONFLICT (entity_section_id) DO NOTHING;

-- features
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "heading":    "What You Will Learn",
    "subheading": "Practical AI skills you can use in your classroom from day one.",
    "items": [
        {"title": "AI for Lesson Planning",     "description": "Create detailed lesson plans in minutes, not hours."},
        {"title": "Smart Assessment Tools",     "description": "Generate quizzes, rubrics, and feedback automatically."},
        {"title": "Classroom Content Creation", "description": "Build presentations and worksheets with AI assistance."},
        {"title": "Admin Task Automation",      "description": "Automate reports and parent communications."},
        {"title": "Personalised Learning",      "description": "Use AI to identify student gaps and personalise learning paths."},
        {"title": "Responsible AI Use",         "description": "Understand the ethics and best practices of AI for educators."}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'features'
ON CONFLICT (entity_section_id) DO NOTHING;

-- testimonials
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "heading": "What Teachers Are Saying",
    "tag":     "Success Stories",
    "items": [
        {
            "name": "Priya Nair", "designation": "Science Teacher",
            "school": "Delhi Public School", "location": "Bengaluru", "rating": 5,
            "review": "This webinar completely changed how I prepare lessons. I now save at least 2 hours every day. Highly recommend to every teacher!"
        },
        {
            "name": "Ramesh Iyer", "designation": "Mathematics Faculty",
            "school": "St. Xavier College", "location": "Mumbai", "rating": 5,
            "review": "I was skeptical about AI but the Rareminds team made it so simple. Walked away with tools I could use immediately."
        },
        {
            "name": "Anitha Krishnan", "designation": "English Teacher",
            "school": "Kendriya Vidyalaya", "location": "Chennai", "rating": 5,
            "review": "Best free webinar I have attended. Very practical, no fluff. The Q&A session answered all my doubts."
        }
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'testimonials'
ON CONFLICT (entity_section_id) DO NOTHING;

-- faq
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "items": [
        {"question": "Is this webinar really free?",          "answer": "Yes, 100% free. No hidden charges, no credit card required."},
        {"question": "Do I need any technical background?",   "answer": "Not at all. Designed for complete beginners."},
        {"question": "Will I receive a certificate?",         "answer": "Yes, all attendees who join live will receive a certificate from Rareminds."},
        {"question": "What platform will the webinar be on?", "answer": "The webinar will be on Zoom. Joining link sent to your email 24 hours before."},
        {"question": "Can I watch a recording if I miss it?", "answer": "A recording will be shared with registered participants within 48 hours."}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'faq'
ON CONFLICT (entity_section_id) DO NOTHING;

-- cta
INSERT INTO public.section_contents (entity_section_id, content)
SELECT es.id, '{
    "text":   "Join 500+ teachers already saving hours every week with AI. Reserve your free seat now.",
    "button": "Reserve My Free Seat",
    "badges": [
        {"label": "100% Free"},
        {"label": "Only 500 Seats"},
        {"label": "Certificate Included"}
    ]
}'::jsonb
FROM public.entity_sections es
JOIN public.events e ON e.id = es.entity_id
WHERE e.slug = 'ai-for-teachers-webinar-2026'
  AND es.entity_type = 'event' AND es.section_key = 'cta'
ON CONFLICT (entity_section_id) DO NOTHING;

COMMIT;

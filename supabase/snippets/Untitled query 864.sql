SELECT
    es.section_key,
    sc.content
FROM public.entity_sections es
JOIN public.section_contents sc ON sc.entity_section_id = es.id
WHERE es.entity_type = 'event'
  AND es.entity_id   = 'c796ae89-09a9-4494-9b34-04dc28280e12'
  AND es.section_key IN ('stats', 'features', 'testimonials', 'cta')
ORDER BY es.display_order;

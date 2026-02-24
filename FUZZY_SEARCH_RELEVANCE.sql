-- Enable pg_trgm extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN trigram indexes
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm 
ON courses USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_courses_description_trgm 
ON courses USING gin (description gin_trgm_ops);

-- Drop existing function if exists
DROP FUNCTION IF EXISTS search_courses_fuzzy(TEXT, TEXT, INTEGER[], TEXT[], TEXT[], DECIMAL, DECIMAL, TEXT, INTEGER, INTEGER);

-- Create fuzzy search function with relevance-based sorting
CREATE OR REPLACE FUNCTION search_courses_fuzzy(
  p_service_type TEXT,
  p_search_term TEXT DEFAULT NULL,
  p_durations INTEGER[] DEFAULT NULL,
  p_modes TEXT[] DEFAULT NULL,
  p_levels TEXT[] DEFAULT NULL,
  p_price_min DECIMAL DEFAULT NULL,
  p_price_max DECIMAL DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'newest',
  p_limit INTEGER DEFAULT 15,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  slug VARCHAR,
  title VARCHAR,
  subtitle VARCHAR,
  description TEXT,
  duration_hours INTEGER,
  mode course_mode_type,
  level course_level_type,
  price DECIMAL,
  currency VARCHAR,
  course_category VARCHAR,
  banner_url TEXT,
  is_featured BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  total_count BIGINT
) AS $$
DECLARE
  v_total_count BIGINT;
BEGIN
  -- Get total count first
  SELECT COUNT(*) INTO v_total_count
  FROM courses c
  WHERE c.category = 'course'
    AND c.is_active = true
    AND c.course_category ILIKE '%' || p_service_type || '%'
    AND (p_search_term IS NULL OR p_search_term = '' OR (
      similarity(c.title, p_search_term) > 0.1
      OR similarity(c.description, p_search_term) > 0.1
      OR c.title ILIKE '%' || p_search_term || '%'
      OR c.description ILIKE '%' || p_search_term || '%'
    ))
    AND (p_durations IS NULL OR c.duration_hours = ANY(p_durations))
    AND (p_modes IS NULL OR c.mode::TEXT = ANY(p_modes))
    AND (p_levels IS NULL OR c.level::TEXT = ANY(p_levels))
    AND (p_price_min IS NULL OR c.price >= p_price_min)
    AND (p_price_max IS NULL OR c.price <= p_price_max);

  -- Return paginated results with relevance-based sorting
  RETURN QUERY
  SELECT 
    c.id,
    c.slug,
    c.title,
    c.subtitle,
    c.description,
    c.duration_hours,
    c.mode,
    c.level,
    c.price,
    c.currency,
    c.course_category,
    c.banner_url,
    c.is_featured,
    c.created_at,
    v_total_count
  FROM courses c
  WHERE c.category = 'course'
    AND c.is_active = true
    AND c.course_category ILIKE '%' || p_service_type || '%'
    AND (p_search_term IS NULL OR p_search_term = '' OR (
      similarity(c.title, p_search_term) > 0.1
      OR similarity(c.description, p_search_term) > 0.1
      OR c.title ILIKE '%' || p_search_term || '%'
      OR c.description ILIKE '%' || p_search_term || '%'
    ))
    AND (p_durations IS NULL OR c.duration_hours = ANY(p_durations))
    AND (p_modes IS NULL OR c.mode::TEXT = ANY(p_modes))
    AND (p_levels IS NULL OR c.level::TEXT = ANY(p_levels))
    AND (p_price_min IS NULL OR c.price >= p_price_min)
    AND (p_price_max IS NULL OR c.price <= p_price_max)
  ORDER BY
    CASE 
      WHEN p_search_term IS NOT NULL AND p_search_term != '' THEN
        CASE
          WHEN LOWER(c.title) = LOWER(p_search_term) THEN 1
          WHEN LOWER(c.title) LIKE LOWER(p_search_term) || '%' THEN 2
          WHEN LOWER(c.title) LIKE '%' || LOWER(p_search_term) || '%' THEN 3
          WHEN LOWER(c.description) LIKE '%' || LOWER(p_search_term) || '%' THEN 4
          ELSE 5
        END
      ELSE 999
    END ASC,
    CASE 
      WHEN p_search_term IS NOT NULL AND p_search_term != '' THEN
        GREATEST(
          similarity(c.title, p_search_term),
          similarity(c.description, p_search_term)
        )
      ELSE 0
    END DESC,
    CASE WHEN p_sort_by = 'name-asc' AND (p_search_term IS NULL OR p_search_term = '') THEN c.title END ASC,
    CASE WHEN p_sort_by = 'name-desc' AND (p_search_term IS NULL OR p_search_term = '') THEN c.title END DESC,
    CASE WHEN p_sort_by = 'price-low' AND (p_search_term IS NULL OR p_search_term = '') THEN c.price END ASC,
    CASE WHEN p_sort_by = 'price-high' AND (p_search_term IS NULL OR p_search_term = '') THEN c.price END DESC,
    CASE WHEN p_sort_by = 'oldest' AND (p_search_term IS NULL OR p_search_term = '') THEN c.created_at END ASC,
    CASE WHEN p_sort_by = 'newest' AND (p_search_term IS NULL OR p_search_term = '') THEN c.created_at END DESC,
    c.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE;

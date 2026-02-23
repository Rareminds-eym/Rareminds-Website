-- =====================================================
-- FUZZY SEARCH SETUP FOR COURSES
-- PostgreSQL pg_trgm Extension + GIN Indexes
-- =====================================================

-- Enable pg_trgm extension for trigram similarity matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN trigram indexes on title and description for fast fuzzy search
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm 
ON courses USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_courses_description_trgm 
ON courses USING gin (description gin_trgm_ops);

-- =====================================================
-- RPC FUNCTION FOR FUZZY SEARCH (OPTIONAL)
-- =====================================================
-- Note: This RPC function provides TRUE fuzzy search with typo tolerance.
-- If you want to use this, uncomment and run the function below.
-- Then update courseService.ts to use .rpc('search_courses_fuzzy', {...})

/*
CREATE OR REPLACE FUNCTION search_courses_fuzzy(
  p_service_type TEXT,
  p_search_term TEXT,
  p_durations TEXT[] DEFAULT NULL,
  p_modes TEXT[] DEFAULT NULL,
  p_levels TEXT[] DEFAULT NULL,
  p_price_ranges JSONB DEFAULT NULL,
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
  v_query TEXT;
  v_count_query TEXT;
  v_total_count BIGINT;
BEGIN
  -- Build base query
  v_query := 'SELECT 
    c.id, c.slug, c.title, c.subtitle, c.description,
    c.duration_hours, c.mode, c.level, c.price, c.currency,
    c.course_category, c.banner_url, c.is_featured, c.created_at
  FROM courses c
  WHERE c.category = ''course''
    AND c.is_active = true
    AND c.course_category ILIKE ' || quote_literal('%' || p_service_type || '%');

  -- Add fuzzy search with similarity threshold
  IF p_search_term IS NOT NULL AND p_search_term != '' THEN
    v_query := v_query || '
    AND (
      c.title % ' || quote_literal(p_search_term) || '
      OR c.description % ' || quote_literal(p_search_term) || '
      OR c.title ILIKE ' || quote_literal('%' || p_search_term || '%') || '
      OR c.description ILIKE ' || quote_literal('%' || p_search_term || '%') || '
    )';
  END IF;

  -- Add filters
  IF p_durations IS NOT NULL THEN
    v_query := v_query || ' AND c.duration_hours = ANY(' || quote_literal(p_durations) || '::INTEGER[])';
  END IF;

  IF p_modes IS NOT NULL THEN
    v_query := v_query || ' AND c.mode = ANY(' || quote_literal(p_modes) || '::course_mode_type[])';
  END IF;

  IF p_levels IS NOT NULL THEN
    v_query := v_query || ' AND c.level = ANY(' || quote_literal(p_levels) || '::course_level_type[])';
  END IF;

  -- Add sorting
  CASE p_sort_by
    WHEN 'name-asc' THEN v_query := v_query || ' ORDER BY c.title ASC';
    WHEN 'name-desc' THEN v_query := v_query || ' ORDER BY c.title DESC';
    WHEN 'price-low' THEN v_query := v_query || ' ORDER BY c.price ASC';
    WHEN 'price-high' THEN v_query := v_query || ' ORDER BY c.price DESC';
    WHEN 'oldest' THEN v_query := v_query || ' ORDER BY c.created_at ASC';
    ELSE v_query := v_query || ' ORDER BY c.created_at DESC';
  END CASE;

  -- Add pagination
  v_query := v_query || ' LIMIT ' || p_limit || ' OFFSET ' || p_offset;

  -- Get total count
  v_count_query := 'SELECT COUNT(*) FROM courses c WHERE c.category = ''course'' AND c.is_active = true AND c.course_category ILIKE ' || quote_literal('%' || p_service_type || '%');
  
  IF p_search_term IS NOT NULL AND p_search_term != '' THEN
    v_count_query := v_count_query || ' AND (c.title % ' || quote_literal(p_search_term) || ' OR c.description % ' || quote_literal(p_search_term) || ' OR c.title ILIKE ' || quote_literal('%' || p_search_term || '%') || ' OR c.description ILIKE ' || quote_literal('%' || p_search_term || '%') || ')';
  END IF;

  EXECUTE v_count_query INTO v_total_count;

  -- Return results with total count
  RETURN QUERY EXECUTE v_query || ', ' || v_total_count || ' AS total_count';
END;
$$ LANGUAGE plpgsql;
*/

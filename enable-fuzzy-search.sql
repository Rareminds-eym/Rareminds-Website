-- Enable pg_trgm extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN indexes for trigram fuzzy matching
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm
ON courses USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_courses_description_trgm
ON courses USING gin (description gin_trgm_ops);

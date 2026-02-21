-- Fix: Remove course_category from the Engineering service
-- Services should not have a course_category value
UPDATE courses 
SET course_category = NULL 
WHERE category = 'service' 
  AND slug = 'engineering';

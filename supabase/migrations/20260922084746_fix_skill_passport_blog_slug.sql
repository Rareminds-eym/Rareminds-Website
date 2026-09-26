-- Fix leading-slash typo in the "Skill Passport" blog post slug.
--
-- The slug was stored as "/skill-passport-verified-digital-skill-identity"
-- (with a stray leading "/"), which broke the slug lookup on the blog
-- detail page (BlogDetail.tsx builds routes as /<section>/blogs/:slug and
-- looks the post up via `.eq('slug', slug)`), causing a false
-- "Post Not Found" for this post everywhere it's linked.
--
-- Scoped by the corrupted slug value itself, not a hardcoded row id --
-- the post's UUID is generated at insert time and is not guaranteed to
-- match between local, staging, and production. Matching on the old
-- slug (which is unique) works identically in every environment and is
-- safe to re-run: a row that's already fixed, or never had the bug,
-- simply won't match.
update public.blog_posts
set slug = 'skill-passport-verified-digital-skill-identity'
where slug = '/skill-passport-verified-digital-skill-identity';

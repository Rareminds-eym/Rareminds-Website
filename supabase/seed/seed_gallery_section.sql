-- Gallery sectors, exactly mirroring the gallery.pdf design frames.
-- sort_order follows the hub rotation order shown in the deck:
--   Teachers -> Universities -> Government -> Training -> Recruitment -> Students
insert into public.gallery_sectors
  (slug, title, group_name, description, parent_path, gallery_path, topic_options, sort_order)
values
  ('school-teachers', 'School – Teachers', 'School',
     'Approved photos and videos for teachers and educators.',
     '/school/teacher', '/school/teacher/gallery',
     array['Teacher workshops', 'Educator development', 'Classroom innovation'], 0),
  ('universities', 'Universities', 'Universities',
     'Approved photos and videos of university and campus activities.',
     '/universities', '/universities/gallery',
     array['Campus programs', 'Hackathons', 'Career-readiness activities'], 1),
  ('government', 'Government', 'Government',
     'Approved photos and videos of government-sector initiatives and outreach.',
     '/government', '/government/gallery',
     array['Initiatives', 'Outreach', 'Program collaboration'], 2),
  ('corporate-training', 'Corporate – Training', 'Corporate',
     'Approved photos and videos related to training and learning.',
     '/corporate/training', '/corporate/training/gallery',
     array['Learning workshops', 'Leadership', 'Workplace upskilling'], 3),
  ('corporate-recruitment', 'Corporate – Recruitment', 'Corporate',
     'Approved photos and videos related to recruitment.',
     '/corporate/recruitment', '/corporate/recruitment/gallery', '{}', 4),
  ('school-students', 'School – Students', 'School',
     'Approved photos and videos of student learning, activities and projects.',
     '/school/student', '/school/student/gallery',
     array['Learning', 'Activities', 'Projects', 'Showcases'], 5)
on conflict (slug) do update set
  title         = excluded.title,
  group_name    = excluded.group_name,
  description   = excluded.description,
  parent_path   = excluded.parent_path,
  gallery_path  = excluded.gallery_path,
  topic_options = excluded.topic_options,
  sort_order    = excluded.sort_order,
  is_active     = true;

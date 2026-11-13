-- Temporary Gallery redesign image seed.
-- These direct images.unsplash.com URLs are demo assets only. Replace them
-- with the corresponding Cloudflare R2 URLs before production use.
-- This filename sorts after z_gallery_items_seed.sql so the base gallery
-- rows exist before their image URLs are updated.
--
-- Only image_url for the eight photo rows and thumbnail_url for the four
-- video rows are changed; titles and all other gallery metadata are preserved.
-- The schema generates gallery_items.id, so rows are matched by their existing
-- unique image/video URLs together with their media type and title.

begin;

update public.gallery_items as item
set image_url = demo.demo_url
from (values
  ('Media title 01', 'https://cdn.rareminds.in/gallery/photos/media-01.jpg',
   'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 02', 'https://cdn.rareminds.in/gallery/photos/media-02.jpg',
   'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 04', 'https://cdn.rareminds.in/gallery/photos/media-04.jpg',
   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 05', 'https://cdn.rareminds.in/gallery/photos/media-05.jpg',
   'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 07', 'https://cdn.rareminds.in/gallery/photos/media-07.jpg',
   'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 08', 'https://cdn.rareminds.in/gallery/photos/media-08.jpg',
   'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 10', 'https://cdn.rareminds.in/gallery/photos/media-10.jpg',
   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 11', 'https://cdn.rareminds.in/gallery/photos/media-11.jpg',
   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80')
) as demo(title, existing_url, demo_url)
where item.media_type = 'photo'
  and item.title = demo.title
  and item.image_url in (demo.existing_url, demo.demo_url);

update public.gallery_items as item
set thumbnail_url = demo.demo_url
from (values
  ('Media title 03', 'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://cdn.rareminds.in/gallery/videos/media-03.jpg',
   'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 06', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
   'https://cdn.rareminds.in/gallery/videos/media-06.jpg',
   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 09', 'https://vjs.zencdn.net/v/oceans.mp4',
   'https://cdn.rareminds.in/gallery/videos/media-09.jpg',
   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80'),
  ('Media title 12', 'https://www.w3schools.com/html/movie.mp4',
   'https://cdn.rareminds.in/gallery/videos/media-12.jpg',
   'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&auto=format&fit=crop&q=80')
) as demo(title, video_url, existing_thumbnail_url, demo_url)
where item.media_type = 'video'
  and item.title = demo.title
  and item.video_url = demo.video_url
  and item.thumbnail_url in (demo.existing_thumbnail_url, demo.demo_url);

commit;

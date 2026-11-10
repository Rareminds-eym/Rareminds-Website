-- ========================================
-- 0. helper: keeps updated_at current
-- ========================================

create or replace function public.gallery_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ========================================
-- 1. gallery_sectors
-- ========================================

create table if not exists public.gallery_sectors (
  id               uuid primary key default gen_random_uuid(),

  slug             text not null unique check (slug in (
                     'school-teachers',
                     'school-students',
                     'corporate-recruitment',
                     'corporate-training',
                     'government',
                     'universities')),

  title            text not null,                  -- "School – Teachers"
  group_name       text not null check (group_name in (
                     'School', 'Corporate', 'Government', 'Universities')),
  description      text,                           -- line under the title
  card_image_url   text check (card_image_url is null or card_image_url ~ '^https://'),
  parent_path      text not null,                  -- e.g. /school/teacher
  gallery_path     text not null unique,           -- e.g. /school/teacher/gallery
  topic_options    text[] not null default '{}',   -- chips under All / Photos / Videos
  sort_order       int  not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ========================================
-- 2. gallery_items  (one photo or one video)
-- ========================================

create table if not exists public.gallery_items (
  id                            uuid primary key default gen_random_uuid(),

  media_type                    text not null check (media_type in ('photo', 'video')),
  title                         text not null,
  caption                       text,
  alt_text                      text,                 -- required for a published photo
  image_url                     text unique check (image_url is null or image_url ~ '^https://'),   -- photo only
  video_url                     text unique check (video_url is null or video_url ~ '^https://'),   -- video only
  thumbnail_url                 text check (thumbnail_url is null or thumbnail_url ~ '^https://'),  -- required for video
  video_provider                text check (video_provider in ('youtube', 'vimeo', 'hosted')),
  subtitles_url                 text check (subtitles_url is null or subtitles_url ~ '^https://'),
  duration_seconds              int  check (duration_seconds > 0),

  -- event details (filters: Years, Names, Locations, Categories)
  event_name                    text,
  event_date                    date,
  event_year                    smallint check (event_year between 2000 and 2100),
  program                       text,                 -- e.g. "Naan Mudhalvan"
  institution_type              text check (institution_type in (
                                  'College', 'Government Body', 'Organization', 'School', 'University')),
  organization_name             text,
  location                      text,                 -- e.g. "Karnataka", "Pan India"

  -- publishing
  status                        text not null default 'draft' check (status in (
                                  'draft', 'pending_review', 'approved',
                                  'published', 'unpublished', 'revoked')),
  show_in_central_gallery       boolean not null default false,
  central_clearance_status      text check (central_clearance_status in (
                                  'pending', 'approved', 'revoked')),
  central_clearance_expires_at  timestamptz,
  published_at                  timestamptz,
  expires_at                    timestamptz,
  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),

  -- a photo has only image_url; a video has only video_url + thumbnail + provider
  check (
    (media_type = 'photo'
       and image_url is not null
       and video_url is null
       and video_provider is null
       and subtitles_url is null
       and duration_seconds is null)
    or
    (media_type = 'video'
       and video_url is not null
       and image_url is null
       and thumbnail_url is not null
       and video_provider is not null)
  ),
  check (media_type <> 'photo' or status <> 'published'
         or length(btrim(coalesce(alt_text, ''))) > 0),
  check (status <> 'published' or published_at is not null),
  check (expires_at is null or published_at is null or expires_at > published_at),
  check (event_date is null or event_year is null
         or extract(year from event_date)::int = event_year)
);

create index if not exists idx_gallery_items_status_published on public.gallery_items(status, published_at);
create index if not exists idx_gallery_items_media_type       on public.gallery_items(media_type);
create index if not exists idx_gallery_items_event_year       on public.gallery_items(event_year);
create index if not exists idx_gallery_items_location         on public.gallery_items(location);
create index if not exists idx_gallery_items_organization     on public.gallery_items(organization_name);

-- ========================================
-- 3. gallery_item_sectors  (item placed in a sector + clearance)
-- ========================================

create table if not exists public.gallery_item_sectors (
  item_id                 uuid not null references public.gallery_items(id) on delete cascade,
  sector_id               uuid not null references public.gallery_sectors(id) on delete restrict,

  topics                  text[] not null default '{}',   -- must be inside the sector topic_options
  sort_order              int  not null default 0,        -- position inside this sector
  is_featured             boolean not null default false,
  clearance_status        text not null default 'pending' check (clearance_status in (
                            'pending', 'approved', 'revoked')),
  clearance_scope         text,
  clearance_expires_at    timestamptz,
  clearance_reviewer      text,                           -- PRIVATE
  clearance_evidence_ref  text,                           -- PRIVATE: never in public API
  revoked_at              timestamptz,
  assigned_at             timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  primary key (item_id, sector_id),
  check (revoked_at is null or clearance_status = 'revoked')
);

create index if not exists idx_gallery_item_sectors_sector_order
  on public.gallery_item_sectors(sector_id, sort_order, item_id);
create index if not exists idx_gallery_item_sectors_topics
  on public.gallery_item_sectors using gin (topics);

-- ========================================
-- 4. gallery_audit_logs  (private, backend only)
-- ========================================

create table if not exists public.gallery_audit_logs (
  id              uuid primary key default gen_random_uuid(),

  item_id         uuid not null references public.gallery_items(id) on delete restrict,
  actor_id        text,
  action          text not null check (action in ('publish', 'tag_change', 'revoke', 'remove')),
  change_details  jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists idx_gallery_audit_logs_item
  on public.gallery_audit_logs(item_id, created_at desc);

-- ========================================
-- 5. topics on a placement must exist in the sector's topic_options
-- ========================================

create or replace function public.gallery_validate_item_sector_topics()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_options text[];
begin
  select topic_options into v_options from public.gallery_sectors where id = new.sector_id;
  if not (new.topics <@ coalesce(v_options, '{}')) then
    raise exception 'Topics % are not allowed for this sector (allowed: %)', new.topics, v_options
      using errcode = '23514';
  end if;
  return new;
end;
$$;

drop trigger if exists validate_gallery_item_sector_topics on public.gallery_item_sectors;
create trigger validate_gallery_item_sector_topics
  before insert or update of topics, sector_id on public.gallery_item_sectors
  for each row execute function public.gallery_validate_item_sector_topics();

-- ========================================
-- 6. updated_at triggers
-- ========================================

drop trigger if exists gallery_sectors_set_updated_at on public.gallery_sectors;
create trigger gallery_sectors_set_updated_at
  before update on public.gallery_sectors
  for each row execute function public.gallery_set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
  before update on public.gallery_items
  for each row execute function public.gallery_set_updated_at();

drop trigger if exists gallery_item_sectors_set_updated_at on public.gallery_item_sectors;
create trigger gallery_item_sectors_set_updated_at
  before update on public.gallery_item_sectors
  for each row execute function public.gallery_set_updated_at();

-- ========================================
-- 7. Row Level Security + policies (after all tables exist)
-- ========================================

alter table public.gallery_sectors      enable row level security;
alter table public.gallery_items        enable row level security;
alter table public.gallery_item_sectors enable row level security;
alter table public.gallery_audit_logs   enable row level security;

create policy "Public can read active gallery sectors"
  on public.gallery_sectors
  for select
  using (is_active = true);

-- public sees an item only if it is published, inside its publish window,
-- and cleared for the central gallery or for at least one sector
create policy "Public can read cleared published gallery items"
  on public.gallery_items
  for select
  using (
    status = 'published'
    and published_at <= now()
    and (expires_at is null or expires_at > now())
    and (
      (show_in_central_gallery
        and central_clearance_status = 'approved'
        and (central_clearance_expires_at is null or central_clearance_expires_at > now()))
      or exists (
        select 1 from public.gallery_item_sectors p
        where p.item_id = gallery_items.id
      )
    )
  );

-- public sees a placement only if approved, not revoked, not expired, sector active
create policy "Public can read approved gallery placements"
  on public.gallery_item_sectors
  for select
  using (
    clearance_status = 'approved'
    and revoked_at is null
    and (clearance_expires_at is null or clearance_expires_at > now())
    and exists (
      select 1 from public.gallery_sectors s
      where s.id = gallery_item_sectors.sector_id and s.is_active
    )
  );

-- gallery_audit_logs: no policy = nobody outside the backend can read it

-- ========================================
-- 8. Grants
-- ========================================

revoke all on table public.gallery_sectors      from anon, authenticated;
revoke all on table public.gallery_items        from anon, authenticated;
revoke all on table public.gallery_item_sectors from anon, authenticated;
revoke all on table public.gallery_audit_logs   from anon, authenticated;

grant select on table public.gallery_sectors to anon, authenticated;
grant select on table public.gallery_items   to anon, authenticated;

-- column-level grant: clearance_reviewer and clearance_evidence_ref stay private
-- (so the API must list columns, never select *)
grant select (item_id, sector_id, topics, sort_order, is_featured,
              clearance_status, clearance_scope, clearance_expires_at, revoked_at)
  on table public.gallery_item_sectors to anon, authenticated;

grant all on table public.gallery_sectors      to service_role;
grant all on table public.gallery_items        to service_role;
grant all on table public.gallery_item_sectors to service_role;
grant select, insert on table public.gallery_audit_logs to service_role;
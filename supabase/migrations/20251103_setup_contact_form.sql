-- Drop existing objects if they exist
drop trigger if exists contact_form_email_trigger on public.contact_form;
drop function if exists public.notify_contact_form();
drop table if exists public.contact_form;

-- Create the contact form table
create table public.contact_form (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  name text null,
  email text null,
  role text null,
  phone text null,
  message text null,
  is_processed boolean default false,
  constraint contact_form_pkey primary key (id)
) tablespace pg_default;

-- Create indexes
create index if not exists idx_contact_form_email 
  on public.contact_form using btree (email) 
  tablespace pg_default;

create index if not exists idx_contact_form_created_at 
  on public.contact_form using btree (created_at desc) 
  tablespace pg_default;

-- Enable RLS
alter table public.contact_form enable row level security;

-- Create policy to allow anonymous inserts
create policy "Allow anonymous form submissions"
  on public.contact_form
  for insert
  to anon
  with check (true);

-- Add useful comments
comment on table public.contact_form is 'Stores website contact form submissions';
comment on column public.contact_form.is_processed is 'Indicates if this submission has been processed';
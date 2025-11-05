-- Create contact form table
create table if not exists public.contact_form (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now(),
    name text not null,
    email text not null,
    role text,
    phone text,
    message text not null
);

-- Enable RLS
alter table public.contact_form enable row level security;

-- Create policy to allow inserts from anonymous users
create policy "Anyone can insert contact forms"
    on public.contact_form
    for insert
    to anon
    with check (true);

-- Create index on created_at for sorting
create index if not exists contact_form_created_at_idx on public.contact_form (created_at desc);
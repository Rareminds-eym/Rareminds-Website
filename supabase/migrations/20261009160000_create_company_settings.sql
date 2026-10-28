-- Migration: Create company_settings table
-- Description:
--   Stores the RareMinds office address and logo URL so the Dashboard can
--   update them and the website can display the saved values.
-- Date: 2026-10-09

-- ========================================
-- PART 1: Company Settings Table
-- ========================================

create table if not exists public.company_settings (
    id uuid not null default gen_random_uuid() primary key,
    office_address text not null, -- street and locality, e.g. '#143, 10th Cross Road, Binnamangala, Stage 1, Indiranagar'
    city text not null,
    state text not null,
    pincode text not null constraint company_settings_pincode_check check (pincode ~ '^[0-9]{6}$'),
    logo_url text, -- NULL = company logo is not configured
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    updated_by uuid references auth.users(id) on delete set null
);

-- ========================================
-- PART 2: Indexes and Triggers
-- ========================================

-- Only one row is allowed
create unique index if not exists unique_company_settings_single_row on public.company_settings((true));

drop trigger if exists update_company_settings_updated_at on public.company_settings;
create trigger update_company_settings_updated_at
    before update on public.company_settings
    for each row
    execute function update_updated_at_column();

-- ========================================
-- PART 3: Row Level Security
-- ========================================

alter table public.company_settings enable row level security;

create policy "Company settings are viewable by everyone"
    on public.company_settings
    for select
    using (true);

create policy "Authenticated users can insert company settings"
    on public.company_settings
    for insert
    to authenticated
    with check (true);

create policy "Authenticated users can update company settings"
    on public.company_settings
    for update
    to authenticated
    using (true)
    with check (true);

grant select on table public.company_settings to anon;
grant select, insert, update on table public.company_settings to authenticated;
grant all on table public.company_settings to service_role;

-- ========================================
-- PART 4: Documentation Comments
-- ========================================

comment on table public.company_settings is 'RareMinds company-wide settings (office address and logo). Only one row is allowed';
comment on column public.company_settings.logo_url is 'Public URL of the uploaded company logo. NULL means the company logo is not configured';
comment on column public.company_settings.updated_by is 'User who last updated the settings';

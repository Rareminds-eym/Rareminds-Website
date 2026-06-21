-- Migration: Create forms tables and add event_type
-- Description: 
--   1. Add dynamic form builder tables for events
--   2. Add event_type column to distinguish paid/free events
-- Date: 2026-06-15

-- ========================================
-- PART 1: Event Type Enum and Column
-- ========================================

-- Create enum type for event_type (if not exists)
do $$ 
begin
    if not exists (select 1 from pg_type where typname = 'event_type_enum') then
        create type public.event_type_enum as enum ('paid', 'free');
    end if;
end $$;

-- Add event_type column to events table (if not exists)
do $$ 
begin
    if not exists (
        select 1 from information_schema.columns 
        where table_schema = 'public' 
        and table_name = 'events' 
        and column_name = 'event_type'
    ) then
        alter table public.events 
        add column event_type public.event_type_enum not null default 'free';
    end if;
end $$;

-- Add index for event_type (if not exists)
create index if not exists idx_events_event_type on public.events(event_type);

-- Add comment
comment on column public.events.event_type is 'Event type: paid or free';

-- ========================================
-- PART 2: Forms and Form Fields Tables
-- ========================================

-- 1. forms table (stores form definitions)
create table if not exists public.forms (
    id uuid not null default gen_random_uuid() primary key,
    created_by uuid not null references auth.users(id),
    title text not null,
    description text,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. form_fields table (each field is one row)
create table if not exists public.form_fields (
    id uuid not null default gen_random_uuid() primary key,
    form_id uuid not null references public.forms(id) on delete cascade,
    field_name text not null, -- internal key: 'first_name', 'company' etc.
    field_label text not null, -- display label: 'First Name'
    field_type text not null, -- 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox'
    is_required boolean not null default false,
    options jsonb, -- for select fields: ["Option A","Option B"]
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

-- 3. Add form_id column to events table (if not exists)
do $$ 
begin
    if not exists (
        select 1 from information_schema.columns 
        where table_schema = 'public' 
        and table_name = 'events' 
        and column_name = 'form_id'
    ) then
        alter table public.events 
        add column form_id uuid references public.forms(id) on delete set null;
    end if;
end $$;

-- ========================================
-- PART 3: Indexes and Triggers
-- ========================================

-- Create indexes for better query performance (if not exists)
create index if not exists idx_forms_created_by on public.forms(created_by);
create index if not exists idx_forms_is_active on public.forms(is_active);
create index if not exists idx_form_fields_form_id on public.form_fields(form_id);
create index if not exists idx_form_fields_sort_order on public.form_fields(form_id, sort_order);
create index if not exists idx_events_form_id on public.events(form_id);

-- Add updated_at trigger for forms table
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists set_forms_updated_at on public.forms;
create trigger set_forms_updated_at
    before update on public.forms
    for each row
    execute function public.handle_updated_at();

-- ========================================
-- PART 4: Documentation Comments
-- ========================================

comment on table public.forms is 'Stores form definitions that can be attached to events';
comment on table public.form_fields is 'Stores individual fields for each form with their configuration';
comment on column public.form_fields.field_type is 'Field type: text, email, tel, select, textarea, checkbox';
comment on column public.form_fields.options is 'JSON array of options for select fields';
comment on column public.events.form_id is 'Optional reference to a custom form for event registration';


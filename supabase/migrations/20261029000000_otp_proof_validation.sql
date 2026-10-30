-- Server-side validation of OTP proofs on form notifications.
-- Email proofs come from consume_email_otp (email_otps rows); phone proofs are
-- issued here after the SMS provider confirms the code, and both are consumed
-- single-use by the Cloudflare Pages notify handler.

create table if not exists public.phone_otps (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  verified boolean not null default false,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.phone_otps enable row level security;
revoke all on table public.phone_otps from anon, authenticated, service_role;

create or replace function public.store_phone_proof(
  p_phone text,
  p_expires_at timestamptz
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_id uuid;
begin
  if v_phone !~ '^[6-9][0-9]{9}$' or p_expires_at <= now() then
    raise exception 'Invalid phone proof data' using errcode = '22023';
  end if;
  delete from public.phone_otps where expires_at < now();
  insert into public.phone_otps (phone, verified, expires_at)
  values (v_phone, true, p_expires_at)
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.consume_email_proof(
  p_proof uuid,
  p_email text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  delete from public.email_otps
  where id = p_proof
    and lower(email) = lower(btrim(coalesce(p_email, '')))
    and verified is true
    and expires_at > now();
  return found;
end $$;

create or replace function public.consume_phone_proof(
  p_proof uuid,
  p_phone text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
begin
  delete from public.phone_otps
  where id = p_proof
    and phone = v_phone
    and verified is true
    and expires_at > now();
  return found;
end $$;

revoke all on function public.store_phone_proof(text, timestamptz) from public, anon, authenticated;
revoke all on function public.consume_email_proof(uuid, text) from public, anon, authenticated;
revoke all on function public.consume_phone_proof(uuid, text) from public, anon, authenticated;
grant execute on function public.store_phone_proof(text, timestamptz) to service_role;
grant execute on function public.consume_email_proof(uuid, text) to service_role;
grant execute on function public.consume_phone_proof(uuid, text) to service_role;

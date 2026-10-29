-- Fail early with actionable counts instead of an opaque "could not create unique
-- index" when duplicate submissions already exist (same style as
-- 20260909150000_move_email_to_pages_bff.sql). Existing conflicts must be reviewed
-- and cleaned before this migration can create the indexes.
do $$
declare
  v_email_dups text[] := '{}';
  v_phone_dups text[] := '{}';
  v_tables text[] := array['contact_form','acdemia_form','footer_email','recruitment_forms','training_forms','government_form','demo_requests'];
  v_phone_tables text[] := array['contact_form','acdemia_form','government_form'];
  v_name text;
  v_count bigint;
begin
  foreach v_name in array v_tables loop
    execute format(
      'select count(*) from (select lower(email) from %I where email <> '''' group by 1 having count(*) > 1) d',
      v_name) into v_count;
    if v_count > 0 then
      v_email_dups := v_email_dups || format('%s: %s duplicate email group(s)', v_name, v_count);
    end if;
  end loop;
  foreach v_name in array v_phone_tables loop
    execute format(
      'select count(*) from (select right(regexp_replace(phone::text, ''\D'', '''', ''g''), 10) from %I where phone::text <> '''' group by 1 having count(*) > 1) d',
      v_name) into v_count;
    if v_count > 0 then
      v_phone_dups := v_phone_dups || format('%s: %s duplicate phone group(s)', v_name, v_count);
    end if;
  end loop;
  if array_length(v_email_dups, 1) > 0 or array_length(v_phone_dups, 1) > 0 then
    raise exception 'Migration blocked: review and remove existing duplicates before the unique indexes can be created. Email: %; Phone: %',
      coalesce(array_to_string(v_email_dups, ', '), 'none'),
      coalesce(array_to_string(v_phone_dups, ', '), 'none');
  end if;
end $$;

create unique index if not exists contact_form_email_uq      on contact_form (lower(email)) where email <> '';
create unique index if not exists acdemia_form_email_uq      on acdemia_form (lower(email)) where email <> '';
create unique index if not exists footer_email_email_uq      on footer_email (lower(email)) where email <> '';
create unique index if not exists recruitment_forms_email_uq on recruitment_forms (lower(email)) where email <> '';
create unique index if not exists training_forms_email_uq    on training_forms (lower(email)) where email <> '';
create unique index if not exists government_form_email_uq   on government_form (lower(email)) where email <> '';
create unique index if not exists demo_requests_email_uq     on demo_requests (lower(email)) where email <> '';
create unique index if not exists contact_form_phone_uq      on contact_form (right(regexp_replace(phone::text,'\D','','g'),10)) where phone::text <> '';
create unique index if not exists acdemia_form_phone_uq      on acdemia_form (right(regexp_replace(phone::text,'\D','','g'),10)) where phone::text <> '';
create unique index if not exists government_form_phone_uq   on government_form (right(regexp_replace(phone::text,'\D','','g'),10)) where phone::text <> '';

create or replace function public.contact_exists(
  p_table text, p_email text default null, p_phone text default null
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare email_hit boolean := false; phone_hit boolean := false;
begin
  p_table := case p_table
    when 'corporate'    then 'recruitment_forms'
    when 'recruitment'  then 'recruitment_forms'
    when 'trainer'      then 'training_forms'
    when 'training'     then 'training_forms'
    when 'institutions' then 'demo_requests'
    when 'government'   then 'government_form'
    when 'academia'     then 'acdemia_form'
    else p_table end;

  if p_table not in ('contact_form','acdemia_form','footer_email','recruitment_forms',
                     'training_forms','government_form','demo_requests') then
    raise exception 'invalid table: %', p_table;
  end if;
  if p_email is not null and p_email <> '' then
    execute format('select exists(select 1 from %I where lower(email) = lower($1))', p_table)
      into email_hit using p_email;
  end if;
  if p_phone is not null and p_phone <> ''
     and p_table in ('contact_form','acdemia_form','government_form') then
    execute format(
      'select exists(select 1 from %I where right(regexp_replace(phone::text,''\D'','''',''g''),10) = right(regexp_replace($1,''\D'','''',''g''),10))',
      p_table) into phone_hit using p_phone;
  end if;
  return jsonb_build_object('email', email_hit, 'phone', phone_hit);
end $$;

grant execute on function public.contact_exists(text,text,text) to anon, authenticated;
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
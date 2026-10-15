   drop policy if exists "Verified users can submit form" on public.contact_form;

   create policy "Verified users can submit form"
   on public.contact_form
   for insert
   to authenticated
   with check (
     lower(auth.jwt() ->> 'email') = lower(email)
     and coalesce(is_processed, false) = false
   );
   
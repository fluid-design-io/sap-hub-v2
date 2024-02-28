set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_pack_count(amount integer, row_id uuid)
 RETURNS void
 LANGUAGE sql
AS $function$
  update packs 
  set copy_count = copy_count + amount
  where id = row_id
$function$
;

create policy "Enable CRUD for users based on user_id"
on "public"."users"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);




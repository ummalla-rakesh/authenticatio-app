alter table "public"."course_tags" enable row level security;

alter table "public"."courses" enable row level security;

alter table "public"."tags" enable row level security;


  create policy "Enable read access for all users"
  on "public"."course_tags"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."courses"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."tags"
  as permissive
  for select
  to public
using (true);




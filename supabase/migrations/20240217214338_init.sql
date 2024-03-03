create type "public"."overview_archetype" as enum ('Mana', 'Diva', 'Standard', 'Ailer', 'Cycler', 'Perky', 'Roller', 'Summoner', 'Toys', 'Bacta', 'Leveler', 'Trumpet', 'Strawberry', 'Banker', 'Foodie', 'Pusher', 'Guard', 'Cutter');

create type "public"."overview_role" as enum ('Enabler', 'Tempo', 'Tech', 'Scaler', 'Pivot', 'Carry', 'Comeback', 'Scaler Tempo', 'Scaler Pivot');

create type "public"."overview_type" as enum ('Pet', 'Food');

create table "public"."food" (
    "ability" text not null,
    "id" text not null,
    "name" text not null,
    "tier" integer not null,
    "packs" text[],
    "packs_required" text[],
    "rollable" boolean not null
);


alter table "public"."food" enable row level security;

create table "public"."overview" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "Name" text not null,
    "Tier" text not null,
    "Effect" text,
    "Released" boolean not null default false,
    "Packs" text not null,
    "Ownership" text not null,
    "Archetype" overview_archetype,
    "Type" overview_type not null,
    "Trigger" text,
    "Roles" overview_role
);


alter table "public"."overview" enable row level security;

create table "public"."pets" (
    "attack" integer not null,
    "health" integer not null,
    "abilities" jsonb not null,
    "id" text not null,
    "name" text not null,
    "tier" integer not null,
    "tier_max" integer not null,
    "packs" text[] not null,
    "packs_required" text[] not null,
    "rollable" boolean not null,
    "perk_note" text
);


alter table "public"."pets" enable row level security;

create table "public"."toys" (
    "id" text not null,
    "attack" integer not null,
    "health" integer not null,
    "abilities" jsonb not null,
    "type" integer not null,
    "toy_type" integer not null,
    "name" text not null,
    "tier" integer not null,
    "tier_max" integer not null,
    "packs" jsonb not null,
    "packs_required" jsonb not null,
    "rollable" boolean not null
);

create table "public"."daily_spotlight" (
    "food_id" text not null,
    "food_name" text not null,
    "food_tier" integer not null,
    "toy_id" text not null,
    "toy_name" text not null,
    "toy_tier" integer not null,
    "pet_id" text not null,
    "pet_name" text not null,
    "pet_tier" integer not null,
    "id" bigint not null
);

create table "public"."users" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "avatar_url" text,
    "username" text not null default gen_random_uuid(),
    "full_name" text,
    "email" text
);

create table "public"."packs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text,
    "minion" numeric not null,
    "archetype" overview_archetype[],
    "user_id" uuid not null default auth.uid(),
    "copy_count" integer not null default 0,
    "code" jsonb not null
);

create table "public"."tutorials" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "body" jsonb,
    "cover_image" text,
    "slug" text not null,
    "published_at" timestamp with time zone default now(),
    "is_published" boolean not null default false,
    "user_id" uuid not null default auth.uid()
);

alter table "public"."packs" enable row level security;

alter table "public"."users" enable row level security;

alter table "public"."daily_spotlight" enable row level security;

alter table "public"."toys" enable row level security;

CREATE UNIQUE INDEX food_id_key ON public.food USING btree (id);

CREATE UNIQUE INDEX food_pkey ON public.food USING btree (id);

CREATE UNIQUE INDEX overview_pkey ON public.overview USING btree (id);

CREATE UNIQUE INDEX pets_id_key ON public.pets USING btree (id);

CREATE UNIQUE INDEX pets_pkey ON public.pets USING btree (id);

CREATE UNIQUE INDEX toys_pkey ON public.toys USING btree (id);

CREATE UNIQUE INDEX daily_spotlight_id_key ON public.daily_spotlight USING btree (id);

CREATE UNIQUE INDEX daily_spotlight_pkey ON public.daily_spotlight USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX packs_pkey ON public.packs USING btree (id);

CREATE UNIQUE INDEX tutorials_pkey ON public.tutorials USING btree (id);

CREATE UNIQUE INDEX tutorials_slug_key ON public.tutorials USING btree (slug);

alter table "public"."food" add constraint "food_pkey" PRIMARY KEY using index "food_pkey";

alter table "public"."overview" add constraint "overview_pkey" PRIMARY KEY using index "overview_pkey";

alter table "public"."pets" add constraint "pets_pkey" PRIMARY KEY using index "pets_pkey";

alter table "public"."toys" add constraint "toys_pkey" PRIMARY KEY using index "toys_pkey";

alter table "public"."food" add constraint "food_id_key" UNIQUE using index "food_id_key";

alter table "public"."pets" add constraint "pets_id_key" UNIQUE using index "pets_id_key";

alter table "public"."daily_spotlight" add constraint "daily_spotlight_pkey" PRIMARY KEY using index "daily_spotlight_pkey";

alter table "public"."daily_spotlight" add constraint "daily_spotlight_food_id_fkey" FOREIGN KEY (food_id) REFERENCES food(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."daily_spotlight" validate constraint "daily_spotlight_food_id_fkey";

alter table "public"."daily_spotlight" add constraint "daily_spotlight_id_key" UNIQUE using index "daily_spotlight_id_key";

alter table "public"."daily_spotlight" add constraint "daily_spotlight_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."daily_spotlight" validate constraint "daily_spotlight_pet_id_fkey";

alter table "public"."daily_spotlight" add constraint "daily_spotlight_toy_id_fkey" FOREIGN KEY (toy_id) REFERENCES toys(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."daily_spotlight" validate constraint "daily_spotlight_toy_id_fkey";

alter table "public"."users" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."packs" add constraint "packs_pkey" PRIMARY KEY using index "packs_pkey";

alter table "public"."packs" add constraint "packs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."packs" validate constraint "packs_user_id_fkey";

alter table "public"."tutorials" add constraint "tutorials_pkey" PRIMARY KEY using index "tutorials_pkey";

alter table "public"."tutorials" add constraint "tutorials_slug_key" UNIQUE using index "tutorials_slug_key";

alter table "public"."tutorials" add constraint "tutorials_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tutorials" validate constraint "tutorials_user_id_fkey";

grant delete on table "public"."food" to "anon";

grant insert on table "public"."food" to "anon";

grant references on table "public"."food" to "anon";

grant select on table "public"."food" to "anon";

grant trigger on table "public"."food" to "anon";

grant truncate on table "public"."food" to "anon";

grant update on table "public"."food" to "anon";

grant delete on table "public"."food" to "authenticated";

grant insert on table "public"."food" to "authenticated";

grant references on table "public"."food" to "authenticated";

grant select on table "public"."food" to "authenticated";

grant trigger on table "public"."food" to "authenticated";

grant truncate on table "public"."food" to "authenticated";

grant update on table "public"."food" to "authenticated";

grant delete on table "public"."food" to "service_role";

grant insert on table "public"."food" to "service_role";

grant references on table "public"."food" to "service_role";

grant select on table "public"."food" to "service_role";

grant trigger on table "public"."food" to "service_role";

grant truncate on table "public"."food" to "service_role";

grant update on table "public"."food" to "service_role";

grant delete on table "public"."overview" to "anon";

grant insert on table "public"."overview" to "anon";

grant references on table "public"."overview" to "anon";

grant select on table "public"."overview" to "anon";

grant trigger on table "public"."overview" to "anon";

grant truncate on table "public"."overview" to "anon";

grant update on table "public"."overview" to "anon";

grant delete on table "public"."overview" to "authenticated";

grant insert on table "public"."overview" to "authenticated";

grant references on table "public"."overview" to "authenticated";

grant select on table "public"."overview" to "authenticated";

grant trigger on table "public"."overview" to "authenticated";

grant truncate on table "public"."overview" to "authenticated";

grant update on table "public"."overview" to "authenticated";

grant delete on table "public"."overview" to "service_role";

grant insert on table "public"."overview" to "service_role";

grant references on table "public"."overview" to "service_role";

grant select on table "public"."overview" to "service_role";

grant trigger on table "public"."overview" to "service_role";

grant truncate on table "public"."overview" to "service_role";

grant update on table "public"."overview" to "service_role";

grant delete on table "public"."pets" to "anon";

grant insert on table "public"."pets" to "anon";

grant references on table "public"."pets" to "anon";

grant select on table "public"."pets" to "anon";

grant trigger on table "public"."pets" to "anon";

grant truncate on table "public"."pets" to "anon";

grant update on table "public"."pets" to "anon";

grant delete on table "public"."pets" to "authenticated";

grant insert on table "public"."pets" to "authenticated";

grant references on table "public"."pets" to "authenticated";

grant select on table "public"."pets" to "authenticated";

grant trigger on table "public"."pets" to "authenticated";

grant truncate on table "public"."pets" to "authenticated";

grant update on table "public"."pets" to "authenticated";

grant delete on table "public"."pets" to "service_role";

grant insert on table "public"."pets" to "service_role";

grant references on table "public"."pets" to "service_role";

grant select on table "public"."pets" to "service_role";

grant trigger on table "public"."pets" to "service_role";

grant truncate on table "public"."pets" to "service_role";

grant update on table "public"."pets" to "service_role";

grant delete on table "public"."toys" to "anon";

grant insert on table "public"."toys" to "anon";

grant references on table "public"."toys" to "anon";

grant select on table "public"."toys" to "anon";

grant trigger on table "public"."toys" to "anon";

grant truncate on table "public"."toys" to "anon";

grant update on table "public"."toys" to "anon";

grant delete on table "public"."toys" to "authenticated";

grant insert on table "public"."toys" to "authenticated";

grant references on table "public"."toys" to "authenticated";

grant select on table "public"."toys" to "authenticated";

grant trigger on table "public"."toys" to "authenticated";

grant truncate on table "public"."toys" to "authenticated";

grant update on table "public"."toys" to "authenticated";

grant delete on table "public"."toys" to "service_role";

grant insert on table "public"."toys" to "service_role";

grant references on table "public"."toys" to "service_role";

grant select on table "public"."toys" to "service_role";

grant trigger on table "public"."toys" to "service_role";

grant truncate on table "public"."toys" to "service_role";

grant update on table "public"."toys" to "service_role";

grant delete on table "public"."daily_spotlight" to "anon";

grant insert on table "public"."daily_spotlight" to "anon";

grant references on table "public"."daily_spotlight" to "anon";

grant select on table "public"."daily_spotlight" to "anon";

grant trigger on table "public"."daily_spotlight" to "anon";

grant truncate on table "public"."daily_spotlight" to "anon";

grant update on table "public"."daily_spotlight" to "anon";

grant delete on table "public"."daily_spotlight" to "authenticated";

grant insert on table "public"."daily_spotlight" to "authenticated";

grant references on table "public"."daily_spotlight" to "authenticated";

grant select on table "public"."daily_spotlight" to "authenticated";

grant trigger on table "public"."daily_spotlight" to "authenticated";

grant truncate on table "public"."daily_spotlight" to "authenticated";

grant update on table "public"."daily_spotlight" to "authenticated";

grant delete on table "public"."daily_spotlight" to "service_role";

grant insert on table "public"."daily_spotlight" to "service_role";

grant references on table "public"."daily_spotlight" to "service_role";

grant select on table "public"."daily_spotlight" to "service_role";

grant trigger on table "public"."daily_spotlight" to "service_role";

grant truncate on table "public"."daily_spotlight" to "service_role";

grant update on table "public"."daily_spotlight" to "service_role";

grant delete on table "public"."packs" to "anon";

grant insert on table "public"."packs" to "anon";

grant references on table "public"."packs" to "anon";

grant select on table "public"."packs" to "anon";

grant trigger on table "public"."packs" to "anon";

grant truncate on table "public"."packs" to "anon";

grant update on table "public"."packs" to "anon";

grant delete on table "public"."packs" to "authenticated";

grant insert on table "public"."packs" to "authenticated";

grant references on table "public"."packs" to "authenticated";

grant select on table "public"."packs" to "authenticated";

grant trigger on table "public"."packs" to "authenticated";

grant truncate on table "public"."packs" to "authenticated";

grant update on table "public"."packs" to "authenticated";

grant delete on table "public"."packs" to "service_role";

grant insert on table "public"."packs" to "service_role";

grant references on table "public"."packs" to "service_role";

grant select on table "public"."packs" to "service_role";

grant trigger on table "public"."packs" to "service_role";

grant truncate on table "public"."packs" to "service_role";

grant update on table "public"."packs" to "service_role";

grant delete on table "public"."tutorials" to "anon";

grant insert on table "public"."tutorials" to "anon";

grant references on table "public"."tutorials" to "anon";

grant select on table "public"."tutorials" to "anon";

grant trigger on table "public"."tutorials" to "anon";

grant truncate on table "public"."tutorials" to "anon";

grant update on table "public"."tutorials" to "anon";

grant delete on table "public"."tutorials" to "authenticated";

grant insert on table "public"."tutorials" to "authenticated";

grant references on table "public"."tutorials" to "authenticated";

grant select on table "public"."tutorials" to "authenticated";

grant trigger on table "public"."tutorials" to "authenticated";

grant truncate on table "public"."tutorials" to "authenticated";

grant update on table "public"."tutorials" to "authenticated";

grant delete on table "public"."tutorials" to "service_role";

grant insert on table "public"."tutorials" to "service_role";

grant references on table "public"."tutorials" to "service_role";

grant select on table "public"."tutorials" to "service_role";

grant trigger on table "public"."tutorials" to "service_role";

grant truncate on table "public"."tutorials" to "service_role";

grant update on table "public"."tutorials" to "service_role";

create policy "Enable read access for all users"
on "public"."food"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."overview"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."pets"
as permissive
for select
to public
using (true);

create policy "Enable read access for all users"
on "public"."toys"
as permissive
for select
to public
using (true);

create policy "Enable read access for all users"
on "public"."daily_spotlight"
as permissive
for select
to public
using (true);

create policy "Enable CRUD for users based on user_id"
on "public"."packs"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."packs"
as permissive
for select
to public
using (true);


create policy "Enable CRUD for users based on user_id"
on "public"."tutorials"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."tutorials"
as permissive
for select
to public
using (true);


CREATE OR REPLACE FUNCTION public.gen_spotlight_items()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    food_result RECORD;
    toy_result RECORD;
    pet_result RECORD;
BEGIN
    -- Get one random item from each category
    SELECT 'Food', id, name, tier INTO food_result FROM food WHERE rollable = TRUE ORDER BY random() LIMIT 1;
    SELECT 'Toy', id, name, tier INTO toy_result FROM toys ORDER BY random() LIMIT 1;
    SELECT 'Pet', id, name, tier INTO pet_result FROM pets WHERE rollable = TRUE ORDER BY random() LIMIT 1;

    -- Upsert into daily_spotlight
    INSERT INTO daily_spotlight(id, food_id, food_name, food_tier, toy_id, toy_name, toy_tier, pet_id, pet_name, pet_tier)
    VALUES (1, food_result.id, food_result.name, food_result.tier, toy_result.id, toy_result.name, toy_result.tier, pet_result.id, pet_result.name, pet_result.tier)
    ON CONFLICT (id)
    DO UPDATE SET
        food_id = EXCLUDED.food_id,
        food_name = EXCLUDED.food_name,
        food_tier = EXCLUDED.food_tier,
        toy_id = EXCLUDED.toy_id,
        toy_name = EXCLUDED.toy_name,
        toy_tier = EXCLUDED.toy_tier,
        pet_id = EXCLUDED.pet_id,
        pet_name = EXCLUDED.pet_name,
        pet_tier = EXCLUDED.pet_tier;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_profile_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  UPDATE public.users
  SET email = NEW.email,
  phone = NEW.raw_user_meta_data->>'phone',
  full_name = NEW.raw_user_meta_data->>'full_name'
  WHERE id = NEW.id;
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_profile_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  UPDATE public.users
  SET email = NEW.email,
  full_name = NEW.raw_user_meta_data->>'full_name'
  WHERE id = NEW.id;
  RETURN NEW;
END;$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER update_profile_email_trigger AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION update_profile_email();

-- Create Image Storage Bucket

-- insert into
-- storage.buckets (id, name, public, owner, avif_autodetection)
-- values
-- ('images', 'images', true, null, false);

-- insert into
-- storage.buckets (id, name, public, owner, avif_autodetection)
-- values
-- ('tutorials', 'tutorials', true, null, false);
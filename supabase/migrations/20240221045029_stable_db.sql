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

-- Start of the passkey schema

create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);

CREATE TYPE "public"."authenticator_transport" AS ENUM (
    'usb',
    'ble',
    'cable',
    'nfc',
    'internal',
    'hybrid'
);

ALTER TYPE "public"."authenticator_transport" OWNER TO "postgres";

CREATE TYPE "public"."credential_device_type" AS ENUM (
    'singleDevice',
    'multiDevice'
);

ALTER TYPE "public"."credential_device_type" OWNER TO "postgres";

CREATE SCHEMA IF NOT EXISTS "passkey";

ALTER SCHEMA "passkey" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "passkey"."authenticators" (
    "counter" bigint NOT NULL,
    "credential_device_type" public.credential_device_type NOT NULL,
    "credential_backed_up" boolean NOT NULL,
    "user_id" uuid NOT NULL,
    "transports" public.authenticator_transport[],
    "credential_id" text NOT NULL,
    "credential_public_key" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "metadata" jsonb,
    "friendly_name" text
);

ALTER TABLE "passkey"."authenticators" OWNER TO "postgres";

ALTER TABLE ONLY "passkey"."authenticators"
    ADD CONSTRAINT "authenticators_credential_id_key" UNIQUE ("credential_id");

ALTER TABLE ONLY "passkey"."authenticators"
    ADD CONSTRAINT "authenticators_pkey" PRIMARY KEY ("credential_id");

ALTER TABLE ONLY "passkey"."authenticators"
ADD CONSTRAINT "authenticators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable all access for users based on user_id" ON "passkey"."authenticators" TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Enable read access for all authenticated users" ON "passkey"."authenticators" FOR SELECT TO authenticated USING (true);

GRANT USAGE ON SCHEMA "passkey" TO "anon";
GRANT USAGE ON SCHEMA "passkey" TO "authenticated";
GRANT USAGE ON SCHEMA "passkey" TO "service_role";

GRANT ALL ON TABLE "passkey"."authenticators" TO "authenticated";
GRANT ALL ON TABLE "passkey"."authenticators" TO "service_role";
GRANT ALL ON TABLE "passkey"."authenticators" TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "passkey" GRANT ALL ON TABLES  TO "service_role";





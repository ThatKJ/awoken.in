-- Disable permissive public SELECT for anon role
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."assessments";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."leads";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."conversations";

-- Ensure RLS is enabled for all tables
ALTER TABLE "public"."assessments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."conversations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."appointments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."tasks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."opportunities" ENABLE ROW LEVEL SECURITY;

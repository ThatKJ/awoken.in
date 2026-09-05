-- Pilot request intake. Deliberately separate from `assessments` — different
-- funnel, different fields, different downstream workflow.
--
-- Data model note: this table stores information ABOUT the prospect and their
-- sales operation only (name, company, role, rough lead volumes, contact
-- details). It never stores the prospect's own customer/lead database — that
-- is out of scope for the public website by design (see Phase 4 privacy
-- decision) and is handled later through a separate, intentionally-designed
-- secure transfer workflow once a pilot is scoped.

create table if not exists "public"."pilot_requests" (
  "id" uuid primary key default gen_random_uuid(),
  "created_at" timestamptz not null default now(),

  -- request reference shown to the visitor (never the raw id above)
  "request_ref" text not null unique,

  -- about the company / person
  "name" text not null check (char_length("name") between 1 and 255),
  "company" text not null check (char_length("company") between 1 and 255),
  "role" text not null check (char_length("role") between 1 and 255),
  "city" text check (char_length("city") <= 255),
  "company_type" text not null check (
    "company_type" in (
      'Residential Developer',
      'Channel Partner / Brokerage',
      'Real-Estate Sales Organization',
      'Other'
    )
  ),

  -- about their lead pipeline (never the leads themselves)
  "monthly_lead_volume_range" text not null check (char_length("monthly_lead_volume_range") <= 50),
  "dead_lead_database_range" text not null check (char_length("dead_lead_database_range") <= 50),
  "lead_sources" text[],
  "current_crm" text check (char_length("current_crm") <= 255),

  -- contact — the prospect's own business contact, not their customers'
  "work_email" text not null check (char_length("work_email") <= 255),
  "phone" text not null check (char_length("phone") <= 32),
  "note" text check (char_length("note") <= 1000),

  -- internal sales pipeline state — never writable from the browser (see RLS below)
  "status" text not null default 'new' check (
    "status" in ('new', 'contacted', 'qualified', 'pilot', 'closed', 'not_fit')
  ),

  -- attribution — coarse only, no browsing history / fingerprinting
  "source" text check (char_length("source") <= 255),
  "utm_source" text check (char_length("utm_source") <= 255),
  "utm_medium" text check (char_length("utm_medium") <= 255),
  "utm_campaign" text check (char_length("utm_campaign") <= 255),
  "utm_content" text check (char_length("utm_content") <= 255),
  "utm_term" text check (char_length("utm_term") <= 255)
);

create index if not exists "pilot_requests_created_at_idx" on "public"."pilot_requests" ("created_at" desc);
create index if not exists "pilot_requests_work_email_idx" on "public"."pilot_requests" ("work_email");

-- RLS: default-deny. No policies are created for the anon or authenticated
-- roles, so the browser has zero direct access — no SELECT, no INSERT, no
-- UPDATE, no DELETE. All writes happen exclusively through the server-side
-- API route using the service-role key, which bypasses RLS by design. This
-- mirrors the pattern already established for `assessments`.
alter table "public"."pilot_requests" enable row level security;

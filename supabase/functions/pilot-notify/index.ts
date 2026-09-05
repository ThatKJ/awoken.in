import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * Internal-only notification for a new pilot request. Mirrors
 * assessment-notify's architecture: the caller (the /api/pilot route,
 * running with the service-role key) passes only a reference; this
 * function re-fetches the authoritative row itself rather than trusting an
 * arbitrary payload. verify_jwt is enabled on deploy, so an unauthenticated
 * public caller cannot invoke this at all — the browser never talks to
 * this function directly, only the server does, and only ever with
 * {requestRef, action:"notify"}. There is no code path here that accepts a
 * recipient, subject, or HTML body from the caller — the destination and
 * format are both fixed by this function, not the request.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("EMAIL_FROM") ?? "Awoken <hello@awoken.in>";
const REPLY_TO = Deno.env.get("EMAIL_REPLY_TO") ?? "hello@awoken.in";
const INTERNAL_TO = Deno.env.get("INTERNAL_NOTIFY_EMAIL") ?? "contact@awoken.in";

// Single-line only — a crafted field value must never be able to inject
// extra email headers via a stray newline.
function oneLine(value: unknown, fallback = "—"): string {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value).replace(/[\r\n]+/g, " ").trim() || fallback;
}

function formatList(value: unknown): string {
  if (Array.isArray(value) && value.length) return value.map((v) => oneLine(v)).join(", ");
  return "—";
}

function notifyText(row: Record<string, unknown>): string {
  const submitted = typeof row.created_at === "string" ? new Date(row.created_at).toISOString() : new Date().toISOString();
  return [
    "NEW PILOT REQUEST",
    "",
    `Reference: ${oneLine(row.request_ref)}`,
    "",
    `Name: ${oneLine(row.name)}`,
    `Company: ${oneLine(row.company)}`,
    `Role: ${oneLine(row.role)}`,
    `Company Type: ${oneLine(row.company_type)}`,
    `City: ${oneLine(row.city)}`,
    "",
    `Monthly Leads: ${oneLine(row.monthly_lead_volume_range)}`,
    `Old / Unresponsive Database: ${oneLine(row.dead_lead_database_range)}`,
    `Lead Sources: ${formatList(row.lead_sources)}`,
    `Current CRM: ${oneLine(row.current_crm)}`,
    "",
    `Email: ${oneLine(row.work_email)}`,
    `Phone: ${oneLine(row.phone)}`,
    `Note: ${oneLine(row.note)}`,
    "",
    "SOURCE",
    `utm_source: ${oneLine(row.utm_source)}`,
    `utm_medium: ${oneLine(row.utm_medium)}`,
    `utm_campaign: ${oneLine(row.utm_campaign)}`,
    "",
    `Submitted: ${submitted}`,
  ].join("\n");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const { requestRef } = await req.json();
    if (!requestRef || typeof requestRef !== "string") {
      return new Response(JSON.stringify({ ok: false, error: "missing requestRef" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const res = await fetch(
      `${supabaseUrl}/rest/v1/pilot_requests?request_ref=eq.${encodeURIComponent(requestRef)}&select=*`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    if (!res.ok) throw new Error("pilot request not found");
    const [row] = await res.json();
    if (!row) throw new Error("pilot request not found");

    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured; skipped notification for", requestRef);
      return new Response(JSON.stringify({ ok: true, email: "skipped" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subject = `New Awoken Pilot Request — ${oneLine(row.company, "Unknown company")}`;

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        reply_to: REPLY_TO,
        to: INTERNAL_TO,
        subject,
        text: notifyText(row),
      }),
    });

    if (!resend.ok) {
      const body = await resend.text();
      throw new Error(`resend ${resend.status}: ${body}`);
    }

    return new Response(JSON.stringify({ ok: true, email: "sent" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    // Structured, no payload dump — the caller logs this on its side too.
    console.error("pilot-notify failed:", String(err));
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { pilotRequestSchema } from "@/lib/pilot-schema"

/**
 * KNOWN LIMITATION: this is an in-memory rate limiter. On Vercel's
 * serverless/edge infrastructure each function instance (and each cold
 * start) gets its own memory, and traffic isn't guaranteed to hit the same
 * instance twice — so this is a best-effort per-instance backstop, not a
 * real distributed rate limit. A determined abuser spread across instances
 * would not be reliably throttled by this alone. Upgrading to a real
 * distributed limiter (e.g. Upstash Redis) would need infrastructure this
 * project doesn't currently have; documenting the gap honestly rather than
 * pretending this is production-grade. Mirrors the same pattern already
 * used in /api/assessment.
 */
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_REQUESTS = 5

/** Same per-instance caveat as above — used only for the short-window duplicate check. */
const recentSubmissions = new Map<string, number>()
const DUPLICATE_WINDOW_MS = 60 * 1000

/** Basic spam heuristics — no CAPTCHA, no external dependency. */
const MIN_FILL_TIME_MS = 2500

/**
 * The legitimate payload (8-12 short fields, note capped at 1000 chars) is
 * at most a couple KB. 32KB is generous headroom, not a real form size —
 * anything past that is rejected before it's even fully parsed. This is an
 * app-level guard in addition to, not instead of, whatever ceiling the
 * hosting platform itself imposes.
 */
const MAX_BODY_BYTES = 32 * 1024

const PILOT_TABLE = "pilot_requests"

function generateRequestRef(): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `PLT-${stamp}${rand}`
}

type ApiSuccess = { success: true; requestId: string }
type ApiFailure = { success: false; code: string; message?: string }

function fail(code: string, status: number, message?: string) {
  return NextResponse.json<ApiFailure>({ success: false, code, message }, { status })
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()

    // 1. Best-effort rate limit (see caveat above)
    const limit = rateLimit.get(ip) ?? { count: 0, resetTime: now + RATE_LIMIT_WINDOW }
    if (now > limit.resetTime) {
      limit.count = 1
      limit.resetTime = now + RATE_LIMIT_WINDOW
    } else {
      limit.count++
    }
    rateLimit.set(ip, limit)
    if (limit.count > MAX_REQUESTS) {
      return fail("RATE_LIMITED", 429)
    }

    // 2. Reject oversized bodies before/while parsing. Content-Length is
    // checked first (cheap, catches the honest case); the actual byte
    // length is re-checked after reading in case Content-Length was absent
    // or understated (e.g. chunked transfer).
    const declaredLength = Number(req.headers.get("content-length") ?? 0)
    if (declaredLength > MAX_BODY_BYTES) {
      return fail("PAYLOAD_TOO_LARGE", 413, "Request too large.")
    }

    let rawText: string
    try {
      rawText = await req.text()
    } catch {
      return fail("VALIDATION_ERROR", 400, "Invalid request format.")
    }
    if (new TextEncoder().encode(rawText).length > MAX_BODY_BYTES) {
      console.warn("Pilot API: rejected oversized body", { bytes: rawText.length, ip })
      return fail("PAYLOAD_TOO_LARGE", 413, "Request too large.")
    }

    let body: unknown
    try {
      body = JSON.parse(rawText)
    } catch {
      return fail("VALIDATION_ERROR", 400, "Invalid request format.")
    }

    const parsed = pilotRequestSchema.safeParse(body)
    if (!parsed.success) {
      return fail("VALIDATION_ERROR", 400, "Some fields need a second look.")
    }
    const data = parsed.data

    // 3. Spam heuristics — honeypot + fill-time. Suspected bots get a
    // generic success-shaped response (industry-standard: don't tip off
    // spam scripts) but nothing is written to the database. A real visitor
    // filling a 3-step, 8-field form in under ~2.5s is not a realistic
    // false-positive scenario.
    const honeypotTripped = !!data.honeypot && data.honeypot.trim().length > 0
    const tooFast =
      typeof data.formStartedAt === "number" && now - data.formStartedAt < MIN_FILL_TIME_MS
    if (honeypotTripped || tooFast) {
      console.warn("Pilot request flagged as spam (not stored)", { honeypotTripped, tooFast, ip })
      return NextResponse.json<ApiSuccess>({ success: true, requestId: generateRequestRef() })
    }

    // 4. Duplicate-submit guard — short window only, keyed on email. This is
    // about absorbing an accidental rapid double-click, not deduplicating a
    // legitimate prospect who submits again later.
    const dedupeKey = data.workEmail
    const lastSubmitted = recentSubmissions.get(dedupeKey)
    if (lastSubmitted && now - lastSubmitted < DUPLICATE_WINDOW_MS) {
      return NextResponse.json<ApiSuccess>({ success: true, requestId: generateRequestRef() })
    }

    // 5. Server-side insert using the service role — the browser never gets
    // direct table access (see supabase/migrations for RLS: no anon
    // SELECT/INSERT/UPDATE/DELETE policies exist on pilot_requests at all).
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      console.error("Pilot API: Supabase server credentials are not configured")
      return fail("STORAGE_ERROR", 500, "We couldn't submit your request. Your details haven't been sent. Please try again.")
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const requestRef = generateRequestRef()

    const { error } = await supabase.from(PILOT_TABLE).insert({
      request_ref: requestRef,
      name: data.name,
      company: data.company,
      role: data.role,
      city: data.city ?? null,
      company_type: data.companyType,
      monthly_lead_volume_range: data.monthlyLeadVolume,
      dead_lead_database_range: data.deadLeadDatabase,
      lead_sources: data.leadSources?.length ? data.leadSources : null,
      current_crm: data.currentCrm ?? null,
      work_email: data.workEmail,
      phone: data.phone,
      note: data.note ?? null,
      status: "new",
      source: data.source ?? null,
      utm_source: data.utmSource ?? null,
      utm_medium: data.utmMedium ?? null,
      utm_campaign: data.utmCampaign ?? null,
      utm_content: data.utmContent ?? null,
      utm_term: data.utmTerm ?? null,
    })

    if (error) {
      console.error("Pilot API: Supabase insert failed", error.message)
      return fail("STORAGE_ERROR", 500, "We couldn't submit your request. Your details haven't been sent. Please try again.")
    }

    recentSubmissions.set(dedupeKey, now)

    // 6. Best-effort internal notification. Mirrors assessment-notify's
    // pattern exactly: pass only the reference, the function re-fetches the
    // row itself using its own service-role credential. Keeps PII out of
    // this call's payload/logs — one source of truth for email content
    // instead of duplicating field-mapping logic in two places. A failure
    // here must never fail the user-facing request — the data is already
    // safely stored — but must stay observable (structured log, no payload).
    supabase.functions
      .invoke("pilot-notify", { body: { requestRef, action: "notify" } })
      .then(({ error: notifyError }) => {
        if (notifyError) {
          console.error("Pilot API: internal notification failed", { requestRef, error: notifyError.message })
        }
      })
      .catch((notifyError) => {
        console.error("Pilot API: internal notification threw", { requestRef, error: String(notifyError) })
      })

    return NextResponse.json<ApiSuccess>({ success: true, requestId: requestRef })
  } catch (err) {
    console.error("Pilot API: unexpected error", err)
    return fail("INTERNAL_ERROR", 500, "We couldn't submit your request. Your details haven't been sent. Please try again.")
  }
}

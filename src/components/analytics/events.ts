/**
 * Typed funnel-event abstraction. Fans out to whatever analytics providers
 * are actually wired up (currently: gtag if present, Clarity custom
 * events if present) without every call site needing to know which
 * provider is live — and without ever passing PII (name/email/phone) as
 * an event property.
 *
 * This is a skeleton: the EventName union matches the funnel this site
 * needs to measure, but wiring it into components happens as those
 * components are built (Phase 3/4), not in this foundation pass.
 */

export type EventName =
  | "homepage_view"
  | "hero_pilot_click"
  | "how_it_works_view"
  | "pilot_section_view"
  | "pilot_page_view"
  | "pilot_cta_click"
  | "pilot_form_start"
  | "pilot_form_step_complete"
  | "pilot_form_submit"
  | "pilot_form_success"
  | "pilot_form_error"
  | "book_call_click"
  | "whatsapp_click"
  | "email_click"
  | "phone_click"

type EventProps = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

const PII_KEYS = ["email", "phone", "name", "whatsapp"]

function stripPii(props?: EventProps): EventProps | undefined {
  if (!props) return props
  const clean: EventProps = {}
  for (const [key, value] of Object.entries(props)) {
    if (PII_KEYS.some((pii) => key.toLowerCase().includes(pii))) continue
    clean[key] = value
  }
  return clean
}

export function track(event: EventName, props?: EventProps) {
  if (typeof window === "undefined") return
  const safeProps = stripPii(props)

  try {
    window.gtag?.("event", event, safeProps)
  } catch {
    /* analytics must never break the page */
  }

  try {
    window.clarity?.("event", event)
  } catch {
    /* analytics must never break the page */
  }
}

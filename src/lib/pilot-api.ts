export interface PilotSubmitPayload {
  name: string
  company: string
  role: string
  city?: string
  companyType: string
  monthlyLeadVolume: string
  deadLeadDatabase: string
  leadSources: string[]
  currentCrm?: string
  workEmail: string
  phone: string
  note?: string
  // anti-spam + attribution — not shown as visible fields
  honeypot: string
  formStartedAt: number
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

export type PilotSubmitResult =
  | { ok: true; requestId: string }
  | {
      ok: false
      code: "VALIDATION_ERROR" | "RATE_LIMITED" | "STORAGE_ERROR" | "PAYLOAD_TOO_LARGE" | "INTERNAL_ERROR" | "NETWORK_ERROR"
      message: string
    }

const GENERIC_ERROR = "We couldn't submit your request. Your details haven't been sent. Please try again."

export async function submitPilotRequest(payload: PilotSubmitPayload): Promise<PilotSubmitResult> {
  let response: Response
  try {
    response = await fetch("/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch {
    return { ok: false, code: "NETWORK_ERROR", message: "You appear to be offline. Please check your connection and try again." }
  }

  let data: { success: boolean; requestId?: string; code?: string; message?: string }
  try {
    data = await response.json()
  } catch {
    return { ok: false, code: "INTERNAL_ERROR", message: GENERIC_ERROR }
  }

  if (data.success && data.requestId) {
    return { ok: true, requestId: data.requestId }
  }

  if (data.code === "RATE_LIMITED") {
    return { ok: false, code: "RATE_LIMITED", message: "Too many requests — please wait a moment and try again." }
  }
  if (data.code === "VALIDATION_ERROR") {
    return { ok: false, code: "VALIDATION_ERROR", message: data.message || "Please check the highlighted fields." }
  }
  if (data.code === "PAYLOAD_TOO_LARGE") {
    return { ok: false, code: "PAYLOAD_TOO_LARGE", message: "That note is too long — please shorten it and try again." }
  }

  return { ok: false, code: "INTERNAL_ERROR", message: GENERIC_ERROR }
}

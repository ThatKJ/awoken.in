import { z } from "zod"
import { companyTypeOptions, monthlyLeadVolumeOptions, deadLeadDatabaseOptions, leadSourceOptions } from "@/data/pilot"

/**
 * Canonical pilot-request schema — used for both client-side form
 * validation/typing and server-side API validation. Never trust the client
 * pass alone; the API route re-validates with this same schema.
 */

const NOTE_MAX = 1000

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Lightweight international-leaning phone normalization. Not a full
 * libphonenumber replacement (deliberately avoided — no need for that
 * weight here) — strips formatting characters and, for the common case of
 * a bare 10-digit Indian mobile number with no country code, assumes +91
 * as a visual/UX default. Anything already carrying a "+" is left to the
 * user's own country code. Storage target is E.164-*compatible*, not a
 * guarantee of strict E.164 correctness for every country's numbering plan.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim()
  const hasPlus = trimmed.startsWith("+")
  const digits = trimmed.replace(/[^\d]/g, "")
  if (hasPlus) return `+${digits}`
  if (digits.length === 10) return `+91${digits}`
  return `+${digits}`
}

const phoneField = z
  .string()
  .min(1, "Phone number is required")
  .transform((val) => normalizePhone(val))
  .refine((val) => /^\+[1-9]\d{7,14}$/.test(val), {
    message: "Enter a valid phone number, with country code if outside India",
  })

const emailField = z
  .string()
  .min(1, "Work email is required")
  .transform((val) => normalizeEmail(val))
  .pipe(z.string().email("Enter a valid email address"))

const shortText = (label: string, max = 255) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long`)

const optionalShortText = (max = 255) =>
  z
    .string()
    .trim()
    .max(max, "Too long")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined))

export const step1Schema = z.object({
  name: shortText("Name"),
  company: shortText("Company"),
  role: shortText("Role"),
  city: optionalShortText(255),
  companyType: z.enum(companyTypeOptions, { message: "Select a company type" }),
})

export const step2Schema = z.object({
  monthlyLeadVolume: z.enum(monthlyLeadVolumeOptions, { message: "Select your approximate lead volume" }),
  deadLeadDatabase: z.enum(deadLeadDatabaseOptions, { message: "Select your approximate old-lead database size" }),
  leadSources: z.array(z.enum(leadSourceOptions)).max(leadSourceOptions.length).optional().default([]),
  currentCrm: optionalShortText(255),
})

export const step3Schema = z.object({
  workEmail: emailField,
  phone: phoneField,
  note: z
    .string()
    .trim()
    .max(NOTE_MAX, `Keep it under ${NOTE_MAX} characters`)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
})

/** Not shown to the visitor as fields — anti-spam + attribution. */
export const metaSchema = z.object({
  honeypot: z.string().max(255).optional().or(z.literal("")),
  formStartedAt: z.number().optional(),
  source: optionalShortText(255),
  utmSource: optionalShortText(255),
  utmMedium: optionalShortText(255),
  utmCampaign: optionalShortText(255),
  utmContent: optionalShortText(255),
  utmTerm: optionalShortText(255),
})

export const pilotRequestSchema = step1Schema.and(step2Schema).and(step3Schema).and(metaSchema)

export type Step1Values = z.infer<typeof step1Schema>
export type Step2Values = z.infer<typeof step2Schema>
export type Step3Values = z.infer<typeof step3Schema>
export type PilotRequestInput = z.infer<typeof pilotRequestSchema>

export const emptyPilotForm = {
  name: "",
  company: "",
  role: "",
  city: "",
  companyType: undefined as unknown as (typeof companyTypeOptions)[number],
  monthlyLeadVolume: undefined as unknown as (typeof monthlyLeadVolumeOptions)[number],
  deadLeadDatabase: undefined as unknown as (typeof deadLeadDatabaseOptions)[number],
  leadSources: [] as string[],
  currentCrm: "",
  workEmail: "",
  phone: "",
  note: "",
}

export type PilotFormState = typeof emptyPilotForm

"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormProgress } from "./form-progress"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { Step1Company, Step2Pipeline, Step3Contact } from "./pilot-form-steps"
import { step1Schema, step2Schema, step3Schema, emptyPilotForm, type PilotFormState } from "@/lib/pilot-schema"
import { submitPilotRequest } from "@/lib/pilot-api"
import { track } from "@/components/analytics/events"
import Link from "next/link"

const TOTAL_STEPS = 3

type FieldErrors = Partial<Record<keyof PilotFormState, string>>

function firstIssueMap(issues: { path: PropertyKey[]; message: string }[]): FieldErrors {
  const map: FieldErrors = {}
  for (const issue of issues) {
    const key = issue.path[0]
    if (typeof key !== "string") continue
    const fieldKey = key as keyof PilotFormState
    if (!map[fieldKey]) map[fieldKey] = issue.message
  }
  return map
}

export function PilotForm() {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState<PilotFormState>(emptyPilotForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [attempted, setAttempted] = useState<Record<number, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ requestId: string } | null>(null)

  const startedRef = useRef(false)
  const formStartedAtRef = useRef<number>(0)
  const utmRef = useRef<Record<string, string | undefined>>({})
  const honeypotRef = useRef<HTMLInputElement>(null)
  /**
   * Synchronous guard against a real race: two clicks landing in the same
   * tick both close over the same (stale, pre-update) `submitting` state,
   * since React batches the setState — the state check alone isn't enough
   * to stop a genuine rapid double-click from firing handleSubmit twice.
   * A ref updates immediately, before React re-renders.
   */
  const submitLockRef = useRef(false)

  useEffect(() => {
    formStartedAtRef.current = Date.now()
    try {
      const params = new URLSearchParams(window.location.search)
      utmRef.current = {
        source: window.location.pathname,
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
        utmTerm: params.get("utm_term") ?? undefined,
      }
    } catch {
      /* URL parsing best-effort only */
    }
  }, [])

  const update = (patch: Partial<PilotFormState>) => {
    if (!startedRef.current) {
      startedRef.current = true
      track("pilot_form_start")
    }
    const next = { ...values, ...patch }
    setValues(next)
    // Once a step has been attempted, keep validating live so errors clear
    // as the visitor fixes them instead of staying stuck.
    if (attempted[step]) {
      setErrors((prevErrors) => ({ ...prevErrors, ...validateStep(step, next) }))
    }
  }

  function validateStep(stepNumber: number, currentValues: PilotFormState): FieldErrors {
    const schema = stepNumber === 1 ? step1Schema : stepNumber === 2 ? step2Schema : step3Schema
    const result = schema.safeParse(currentValues)
    if (result.success) return {}
    return firstIssueMap(result.error.issues)
  }

  function focusFirstError(fieldErrors: FieldErrors) {
    const firstKey = Object.keys(fieldErrors)[0]
    if (!firstKey) return
    requestAnimationFrame(() => {
      document.getElementById(firstKey)?.focus()
    })
  }

  function goBack() {
    if (step > 1) setStep(step - 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    setAttempted((prev) => ({ ...prev, [step]: true }))
    const stepErrors = validateStep(step, values)
    // Merge — clear only this step's fields, keep any unrelated errors intact.
    setErrors((prev) => ({ ...prev, ...stepErrors }))

    if (Object.keys(stepErrors).length > 0) {
      focusFirstError(stepErrors)
      return
    }

    if (step < TOTAL_STEPS) {
      track("pilot_form_step_complete", { step })
      setStep(step + 1)
      return
    }

    // Final step — submit. Ref check/set is synchronous, unlike the
    // `submitting` state — closes the race a genuine rapid double-click can
    // hit before React re-renders with the button disabled.
    if (submitLockRef.current) return
    submitLockRef.current = true

    setSubmitting(true)
    setSubmitError(null)
    track("pilot_form_submit")

    const result = await submitPilotRequest({
      name: values.name,
      company: values.company,
      role: values.role,
      city: values.city || undefined,
      companyType: values.companyType,
      monthlyLeadVolume: values.monthlyLeadVolume,
      deadLeadDatabase: values.deadLeadDatabase,
      leadSources: values.leadSources,
      currentCrm: values.currentCrm || undefined,
      workEmail: values.workEmail,
      phone: values.phone,
      note: values.note || undefined,
      honeypot: honeypotRef.current?.value ?? "",
      formStartedAt: formStartedAtRef.current,
      source: utmRef.current.source,
      utmSource: utmRef.current.utmSource,
      utmMedium: utmRef.current.utmMedium,
      utmCampaign: utmRef.current.utmCampaign,
      utmContent: utmRef.current.utmContent,
      utmTerm: utmRef.current.utmTerm,
    })

    setSubmitting(false)
    submitLockRef.current = false

    if (result.ok) {
      track("pilot_form_success")
      setSuccess({ requestId: result.requestId })
    } else {
      track("pilot_form_error", { code: result.code })
      setSubmitError(result.message)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-10 shadow-premium">
        <FormSuccess requestId={success.requestId} />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-10 shadow-premium">
      <FormProgress step={step} total={TOTAL_STEPS} />

      {submitError && <FormError message={submitError} />}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — visually hidden, off the tab order, ignored by real visitors */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="company_website">Leave this field blank</label>
          <input ref={honeypotRef} id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {step === 1 && <Step1Company values={values} errors={errors} onChange={update} />}
        {step === 2 && <Step2Pipeline values={values} errors={errors} onChange={update} />}
        {step === 3 && <Step3Contact values={values} errors={errors} onChange={update} />}

        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={goBack} disabled={submitting}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" variant="primary" disabled={submitting} className="min-w-[140px]">
            {submitting ? "Submitting…" : step < TOTAL_STEPS ? "Continue" : "Submit pilot request"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-xs text-muted-foreground text-center">
        By submitting, you agree that Awoken may contact you about this pilot. See our{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@/components/analytics/events"

const nextSteps = [
  "We review the lead workflow you submitted.",
  "We confirm whether the pilot is a good fit.",
  "If it is, we'll agree on a safe way to transfer an old lead segment.",
  "Awoken then scopes the re-engagement test.",
]

export function FormSuccess({ requestId }: { requestId: string }) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Move focus into the success state so screen-reader / keyboard users
    // land on the confirmation rather than a now-vanished form.
    headingRef.current?.focus()
  }, [])

  return (
    <div ref={headingRef} tabIndex={-1} className="text-center outline-none">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light">
        <CheckCircle2 className="h-7 w-7 text-accent" strokeWidth={2} />
      </div>
      <h2 className="text-h2 text-foreground">Your pilot request is in.</h2>
      <p className="mt-3 text-base text-muted-foreground max-w-md mx-auto">
        We&apos;ll review your lead setup and follow up with the next step.
      </p>

      <ol className="mt-8 space-y-3 text-left max-w-sm mx-auto">
        {nextSteps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-foreground mt-0.5">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/book" onClick={() => track("book_call_click")}>
          <Button variant="primary" size="lg">
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">
            <Home className="h-4 w-4" />
            Back to homepage
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted-foreground/60">Reference: {requestId}</p>
    </div>
  )
}

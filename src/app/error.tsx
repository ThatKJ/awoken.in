"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { RotateCcw, Home } from "lucide-react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section size="hero" className="text-center">
      <div className="mx-auto max-w-2xl">
        <p className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-5">
          Something Went Wrong
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          We hit a snag loading this page
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">
          An unexpected error occurred while rendering this page
          {error.digest ? <span className="text-accent"> (ref: {error.digest})</span> : null}.
          It&apos;s usually temporary — try again, or head back home.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={unstable_retry}>
            <RotateCcw className="size-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

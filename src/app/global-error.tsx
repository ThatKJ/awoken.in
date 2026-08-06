"use client"

import { useEffect } from "react"
import Link from "next/link"
import "./globals.css"

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <p className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4">
            Something Went Wrong
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            We hit a snag loading this page
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
            An unexpected error occurred
            {error.digest ? <span className="text-accent"> (ref: {error.digest})</span> : null}.
            It&apos;s usually temporary — try again, or head back home.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={unstable_retry}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold transition-all duration-200 hover:bg-surface"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}

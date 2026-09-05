"use client"

import { useEffect, useRef } from "react"
import { track, type EventName } from "./events"

/**
 * Fires a single analytics event the first time its children scroll into
 * view (IntersectionObserver, not framer-motion — this wraps sections that
 * don't otherwise need a motion library loaded). Renders its children
 * unchanged; adds no visual wrapper styling of its own beyond passing
 * through className.
 */
export function TrackView({
  event,
  className,
  children,
}: {
  event: EventName
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true
            track(event)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [event])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

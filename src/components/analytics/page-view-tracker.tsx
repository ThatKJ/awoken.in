"use client"

import { useEffect } from "react"
import { track, type EventName } from "./events"

/** Fires one event on mount. Renders nothing. */
export function PageViewTracker({ event }: { event: EventName }) {
  useEffect(() => {
    track(event)
    // Fire once per mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

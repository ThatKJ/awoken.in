"use client"

import { useRef, useEffect, useState } from "react"
import { useInView, animate } from "framer-motion"
import { cn } from "@/lib/utils"

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function CountUp({ value, suffix = "", prefix = "", decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    })
    return controls.stop
  }, [isInView, value])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}

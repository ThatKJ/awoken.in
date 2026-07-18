"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, Check } from "lucide-react"

interface ComparisonItem {
  label: string
  before: boolean
  after: boolean
}

interface BeforeAfterProps {
  beforeLabel?: string
  afterLabel?: string
  beforeTitle?: string
  afterTitle?: string
  items: ComparisonItem[]
  className?: string
}

export function BeforeAfter({
  beforeLabel = "Traditional Business",
  afterLabel = "Awoken",
  beforeTitle = "Before",
  afterTitle = "After",
  items,
  className,
}: BeforeAfterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-2xl border border-border bg-background overflow-hidden shadow-xl shadow-black/5",
        className
      )}
    >
      {/* Labels */}
      <div className="grid grid-cols-2 border-b border-border">
        <div className="p-3 sm:p-4 bg-red-50/50 border-r border-border">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-red-600/70">
            {beforeLabel}
          </p>
        </div>
        <div className="p-3 sm:p-4 bg-emerald-50/50">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-600/70">
            {afterLabel}
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="grid grid-cols-2"
          >
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-r border-border">
              <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <X className="h-2.5 w-2.5 text-red-500" />
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 text-emerald-600" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

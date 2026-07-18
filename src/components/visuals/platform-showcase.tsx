"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PlatformShowcaseProps {
  children: ReactNode
  type?: "browser" | "macos" | "safari"
  title?: string
  url?: string
  className?: string
}

function DotGroup() {
  return (
    <div className="flex items-center gap-1.5 px-3 sm:px-4">
      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
    </div>
  )
}

export function PlatformShowcase({
  children,
  type = "browser",
  title = "Awoken Dashboard",
  url = "app.awoken.in",
  className,
}: PlatformShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-2xl border border-border overflow-hidden shadow-premium bg-background",
        className
      )}
    >
      {/* Chrome */}
      <div className={cn(
        "flex items-center border-b border-border",
        type === "macos" ? "h-10 sm:h-12 bg-gradient-to-b from-background to-surface/50" : "h-10 sm:h-11 bg-surface/50"
      )}>
        <DotGroup />
        {type !== "macos" && (
          <div className="ml-2 sm:ml-3 flex-1 max-w-[180px] sm:max-w-[240px] h-5 sm:h-6 rounded-md bg-border/50 flex items-center justify-center px-2">
            <span className="text-[9px] sm:text-[10px] text-muted-foreground/60 truncate">{url}</span>
          </div>
        )}
        {type === "macos" && (
          <div className="flex-1 text-center">
            <span className="text-[11px] text-muted-foreground/50 font-medium">{title}</span>
          </div>
        )}
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}

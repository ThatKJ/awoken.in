"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalLine {
  text: string
  type?: "output" | "command" | "success" | "error" | "info"
  indent?: number
}

interface TerminalWindowProps {
  lines: TerminalLine[]
  title?: string
  className?: string
  prompt?: string
}

export function TerminalWindow({
  lines,
  title = "Terminal",
  className,
  prompt = "$",
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-xl border border-border overflow-hidden shadow-premium bg-[#0D0D0D]",
        className
      )}
    >
      {/* Chrome */}
      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1A1A1A] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        <span className="ml-3 text-[10px] text-white/30 font-mono">{title}</span>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4 lg:p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className={cn(
              "flex items-start gap-2",
              line.indent && "ml-4"
            )}
          >
            {line.type === "command" && (
              <span className="text-emerald-400 shrink-0 select-none">{prompt}</span>
            )}
            {line.type === "info" && (
              <span className="text-blue-400 shrink-0 select-none">ℹ</span>
            )}
            {line.type === "error" && (
              <span className="text-red-400 shrink-0 select-none">✕</span>
            )}
            {line.type === "success" && (
              <span className="text-emerald-400 shrink-0 select-none">✓</span>
            )}
            <span
              className={cn(
                line.type === "command" && "text-white/90",
                line.type === "output" && "text-white/50",
                line.type === "success" && "text-emerald-300",
                line.type === "error" && "text-red-300",
                line.type === "info" && "text-blue-300",
                !line.type && "text-white/70"
              )}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

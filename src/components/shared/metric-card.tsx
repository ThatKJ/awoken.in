"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  value: string
  label: string
  description?: string
  icon?: React.ElementType
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({ value, label, description, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-xl border border-border bg-background p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {Icon && (
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      )}
      <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-1">
        {value}
      </span>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground">{label}</span>
      {description && (
        <p className="text-[11px] text-muted-foreground/60 mt-1.5 leading-relaxed max-w-[20ch]">
          {description}
        </p>
      )}
      {trend && (
        <div
          className={cn(
            "mt-2 flex items-center gap-1 text-[10px] font-medium",
            trend === "up" && "text-emerald-600",
            trend === "down" && "text-red-500",
            trend === "neutral" && "text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "inline-block w-0 h-0 border-x-4 border-x-transparent",
              trend === "up" && "border-b-4 border-b-emerald-500",
              trend === "down" && "border-t-4 border-t-red-500"
            )}
          />
          {trend === "up" && "Improving"}
          {trend === "down" && "Needs attention"}
          {trend === "neutral" && "Stable"}
        </div>
      )}
    </motion.div>
  )
}

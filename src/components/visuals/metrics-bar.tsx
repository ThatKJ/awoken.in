"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricItem {
  value: string
  label: string
  change?: string
  positive?: boolean
  icon?: React.ElementType
}

interface MetricsBarProps {
  metrics: MetricItem[]
  columns?: 2 | 3 | 4 | 5
  className?: string
  variant?: "default" | "bordered" | "glass"
}

export function MetricsBar({ metrics, columns = 4, className, variant = "default" }: MetricsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "grid gap-px overflow-hidden rounded-xl",
        variant === "bordered" && "border border-border",
        variant === "glass" && "glass shadow-glass rounded-xl",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4",
        columns === 5 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
        className
      )}
    >
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={cn(
              "p-4 sm:p-5 lg:p-6",
              variant === "default" && "bg-background",
              variant === "bordered" && "bg-background border-r border-b border-border last:border-r-0",
              variant === "glass" && ""
            )}
          >
            <div className="flex items-center justify-between mb-1">
              {Icon && (
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                </div>
              )}
              {metric.change && (
                <span className={cn(
                  "inline-flex items-center gap-0.5 text-[10px] font-medium",
                  metric.positive ? "text-emerald-600" : "text-red-500"
                )}>
                  {metric.positive ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                  {metric.change}
                </span>
              )}
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-1">{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{metric.label}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CheckCircle, Clock, ArrowUpRight, Zap, UserPlus, Bell, MessageSquare, AlertCircle } from "lucide-react"

type ActivityType = "success" | "warning" | "info" | "neutral"

interface Activity {
  icon?: React.ElementType
  label: string
  description?: string
  time: string
  type?: ActivityType
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
  className?: string
  compact?: boolean
}

const typeIcons: Record<ActivityType, React.ElementType> = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Bell,
  neutral: Clock,
}

const typeColors: Record<ActivityType, string> = {
  success: "text-emerald-600 bg-emerald-50 border-emerald-200",
  warning: "text-amber-600 bg-amber-50 border-amber-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
  neutral: "text-muted-foreground bg-surface border-border",
}

export function ActivityFeed({ activities, title = "Recent Activity", className, compact }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-xl border border-border bg-background shadow-soft overflow-hidden",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-muted-foreground">{title}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/50">Live</span>
        </div>
      )}
      <div className={cn("divide-y divide-border/50", compact ? "py-1" : "py-2")}>
        {activities.map((activity, i) => {
          const Icon = activity.icon || typeIcons[activity.type || "neutral"]
          const color = typeColors[activity.type || "neutral"]

          return (
            <motion.div
              key={`${activity.label}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className={cn(
                "flex items-start gap-3 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-surface/50 transition-colors",
                compact && "py-2"
              )}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border",
                color
              )}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("font-medium", compact ? "text-xs" : "text-sm")}>{activity.label}</p>
                {activity.description && (
                  <p className={cn("text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>
                    {activity.description}
                  </p>
                )}
              </div>
              <span className={cn("text-muted-foreground/50 shrink-0", compact ? "text-[9px]" : "text-[10px]")}>
                {activity.time}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

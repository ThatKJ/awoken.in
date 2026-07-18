"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bell, CheckCircle, AlertCircle, X, Zap, MessageSquare, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

type NotificationType = "success" | "warning" | "info" | "update"

interface NotificationToastProps {
  icon?: React.ElementType
  title: string
  description?: string
  type?: NotificationType
  duration?: number
  className?: string
  stacked?: boolean
}

const defaultIcons: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Bell,
  update: TrendingUp,
}

const typeStyles: Record<NotificationType, string> = {
  success: "border-emerald-200 bg-emerald-50/80",
  warning: "border-amber-200 bg-amber-50/80",
  info: "border-blue-200 bg-blue-50/80",
  update: "border-accent/20 bg-accent/5",
}

const typeIconColors: Record<NotificationType, string> = {
  success: "text-emerald-600",
  warning: "text-amber-600",
  info: "text-blue-600",
  update: "text-accent",
}

export function NotificationToast({
  icon: Icon,
  title,
  description,
  type = "info",
  duration = 4000,
  className,
  stacked,
}: NotificationToastProps) {
  const [visible, setVisible] = useState(false)
  const DefaultIcon = defaultIcons[type]

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    const hide = setTimeout(() => setVisible(false), duration + 300)
    return () => { clearTimeout(timer); clearTimeout(hide) }
  }, [duration])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            "flex items-start gap-3 px-4 py-3 rounded-xl border shadow-premium backdrop-blur-sm",
            typeStyles[type],
            stacked && "shadow-glass",
            className
          )}
        >
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", typeIconColors[type])}>
            {Icon ? <Icon className="h-4 w-4" /> : <DefaultIcon className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function NotificationStack({ notifications, className }: {
  notifications: NotificationToastProps[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {notifications.map((n, i) => (
        <NotificationToast key={i} {...n} stacked />
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  icon: LucideIcon
}

export function StatsCard({ label, value, change, positive, icon: Icon }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      {change && (
        <p className={cn("text-xs mt-1", positive ? "text-green-600" : "text-muted-foreground")}>
          {change}
        </p>
      )}
    </div>
  )
}

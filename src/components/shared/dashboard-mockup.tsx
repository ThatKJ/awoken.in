"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Activity,
} from "lucide-react"

interface Metric {
  label: string
  value: string
  change?: string
  positive?: boolean
}

interface Row {
  label: string
  value: string
  status?: "success" | "warning" | "error"
}

interface DashboardMockupProps {
  title?: string
  subtitle?: string
  metrics?: Metric[]
  rows?: Row[]
  chart?: "bar" | "line" | "area"
  className?: string
}

function MiniBarChart() {
  return (
    <div className="flex items-end gap-1 h-16">
      {[40, 65, 45, 80, 55, 90, 70, 95, 75, 85, 60, 78].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
          className="flex-1 rounded-t-sm bg-accent/20 group-hover:bg-accent/30 transition-colors"
        />
      ))}
    </div>
  )
}

function MiniLineChart() {
  const points = [30, 45, 38, 55, 48, 62, 58, 72, 65, 78, 70, 85]
  const maxH = 48
  const w = 160
  const stepX = w / (points.length - 1)
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${maxH - (p / 100) * maxH}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${maxH}`} className="w-full h-12">
      <motion.path
        d={pathD}
        fill="none"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d={`${pathD} L ${w} ${maxH} L 0 ${maxH} Z`}
        fill="url(#gradient)"
        opacity={0.1}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const statusColors = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-red-500",
}

const statusIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
}

export function DashboardMockup({
  title = "Business Intelligence",
  subtitle = "Real-time overview of your operations",
  metrics,
  rows,
  chart = "bar",
  className,
}: DashboardMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-2xl border border-border bg-background shadow-xl shadow-black/5 overflow-hidden group",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        <div className="ml-4 flex-1 max-w-[200px] h-5 rounded-md bg-border/50 flex items-center px-2">
          <span className="text-[9px] text-muted-foreground/60 truncate">app.awoken.in/dashboard</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-14 lg:w-16 py-4 border-r border-border bg-surface/30 items-center gap-3">
          {[BarChart3, Users, Activity, Clock].map((Icon, i) => (
            <div
              key={i}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                i === 0 ? "bg-accent/10 text-accent" : "text-muted-foreground/40 hover:text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="text-[11px] text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-surface px-2.5 py-1 rounded-md border border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-lg border border-border bg-surface/50 p-2.5 sm:p-3"
                >
                  <p className="text-[10px] text-muted-foreground mb-0.5">{m.label}</p>
                  <p className="text-base sm:text-lg font-bold tracking-tight">{m.value}</p>
                  {m.change && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-[10px] font-medium mt-0.5",
                        m.positive ? "text-emerald-600" : "text-red-500"
                      )}
                    >
                      {m.positive ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                      {m.change}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Chart */}
          <div className="rounded-lg border border-border bg-surface/30 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-muted-foreground">Revenue Intelligence</span>
              <span className="text-[9px] text-muted-foreground/60">Last 30 days</span>
            </div>
            {chart === "bar" ? <MiniBarChart /> : <MiniLineChart />}
          </div>

          {/* Table rows */}
          {rows && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-2 py-1">
                <span>Activity</span>
                <span>Status</span>
              </div>
              {rows.map((row, i) => {
                const StatusIcon = statusIcons[row.status ?? "success"]
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-surface/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("h-3 w-3", statusColors[row.status ?? "success"])} />
                      <span className="text-xs text-foreground">{row.label}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{row.value}</span>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Minimal state */}
          {!metrics && !rows && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-lg border border-border bg-surface/30 p-3">
                    <div className="w-12 h-2 rounded bg-border/50 mb-2" />
                    <div className="w-20 h-4 rounded bg-border/30" />
                  </div>
                ))}
              </div>
              <MiniBarChart />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

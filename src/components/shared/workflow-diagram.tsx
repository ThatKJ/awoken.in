"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowDown, Zap, Bot, CheckCircle, Mail, Calendar, Bell, BarChart3 } from "lucide-react"

interface WorkflowNode {
  icon: React.ElementType
  label: string
  subtitle?: string
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[]
  className?: string
  direction?: "vertical" | "horizontal"
}

const defaultNodes: WorkflowNode[] = [
  { icon: Mail, label: "Lead Captured", subtitle: "Website / Call / Email" },
  { icon: Bot, label: "AI Qualification", subtitle: "Intent & fit scoring" },
  { icon: CheckCircle, label: "CRM Updated", subtitle: "Contact created" },
  { icon: Calendar, label: "Meeting Booked", subtitle: "Auto-scheduled" },
  { icon: Bell, label: "Owner Notified", subtitle: "Slack / SMS / Email" },
  { icon: Zap, label: "Follow-up Automation", subtitle: "Sequence triggered" },
  { icon: BarChart3, label: "Dashboard Updated", subtitle: "Real-time reporting" },
]

export function WorkflowDiagram({
  nodes = defaultNodes,
  className,
  direction = "vertical",
}: WorkflowDiagramProps) {
  const isHorizontal = direction === "horizontal"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl border border-border bg-background p-5 sm:p-6 lg:p-8 shadow-xl shadow-black/5",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 sm:mb-6 pb-4 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-[11px] font-medium text-muted-foreground">Automation Flow &mdash; Active</span>
      </div>

      <div
        className={cn(
          "relative",
          isHorizontal
            ? "flex items-start justify-between gap-2 overflow-x-auto pb-2"
            : "flex flex-col items-center"
        )}
      >
        {nodes.map((node, i) => {
          const Icon = node.icon
          return (
            <div key={node.label} className={cn("flex flex-col items-center", isHorizontal && "shrink-0")}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                className="group flex flex-col items-center"
              >
                {isHorizontal && (
                  <div className="flex flex-col items-center px-2">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-[11px] font-semibold text-center leading-tight">{node.label}</span>
                    {node.subtitle && (
                      <span className="text-[9px] text-muted-foreground text-center mt-0.5">{node.subtitle}</span>
                    )}
                  </div>
                )}
                {!isHorizontal && (
                  <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{node.label}</p>
                      {node.subtitle && (
                        <p className="text-[11px] text-muted-foreground">{node.subtitle}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Arrow connector */}
              {i < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
                  className={cn(
                    "flex items-center justify-center text-accent/40",
                    isHorizontal ? "mx-2" : "my-2"
                  )}
                >
                  <ArrowDown className={cn("h-4 w-4", isHorizontal && "rotate-[270deg]")} />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Glow line behind nodes (vertical only) */}
      {!isHorizontal && (
        <div className="absolute left-[26px] sm:left-[28px] top-[60px] bottom-6 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent pointer-events-none hidden sm:block" />
      )}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowDown } from "lucide-react"

interface FlowStep {
  icon: React.ElementType
  label: string
  description?: string
}

interface ProcessFlowProps {
  steps: FlowStep[]
  className?: string
  direction?: "horizontal" | "vertical"
  variant?: "default" | "compact" | "cards"
  title?: string
}

export function ProcessFlow({
  steps,
  className,
  direction = "horizontal",
  variant = "default",
  title,
}: ProcessFlowProps) {
  const isHorizontal = direction === "horizontal"

  if (variant === "cards") {
    const cols = Math.min(steps.length, 5)
    const colClass = {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    }[cols] || "sm:grid-cols-4"

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "grid grid-cols-1",
          colClass,
          "gap-3 sm:gap-4",
          className
        )}
      >
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="relative group"
            >
              <div className="rounded-xl border border-border bg-background p-4 sm:p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-accent/50">Step {i + 1}</span>
                  {i < steps.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-accent/30 ml-auto hidden sm:block" />
                  )}
                </div>
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-2.5">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-sm font-semibold mb-0.5">{step.label}</h4>
                {step.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative",
        isHorizontal
          ? "flex items-start justify-between gap-2 overflow-x-auto pb-2"
          : "flex flex-col items-center",
        className
      )}
    >
      {steps.map((step, i) => {
        const Icon = step.icon
        return (
          <div key={step.label} className={cn("flex flex-col items-center", isHorizontal && "shrink-0")}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={cn(
                "flex flex-col items-center",
                variant === "compact" && "px-2"
              )}
            >
              <div className={cn(
                "flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.2)]",
                variant === "compact"
                  ? "w-10 h-10 rounded-lg bg-accent/10"
                  : "w-12 h-12 rounded-xl bg-accent/10 mb-2"
              )}>
                <Icon className={cn("text-accent", variant === "compact" ? "h-4 w-4" : "h-5 w-5")} />
              </div>
              <span className={cn(
                "font-semibold text-center leading-tight",
                variant === "compact" ? "text-[10px]" : "text-xs sm:text-sm mt-1"
              )}>
                {step.label}
              </span>
              {step.description && variant !== "compact" && (
                <span className="text-[9px] sm:text-[10px] text-muted-foreground text-center mt-0.5 max-w-[12ch]">
                  {step.description}
                </span>
              )}
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
                className="flex items-center justify-center text-accent/30"
              >
                {isHorizontal ? (
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-2" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 my-1" />
                )}
              </motion.div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

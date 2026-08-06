"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Cpu, Network, AlertTriangle, Workflow, BarChart3, TrendingUp, Gauge, FileText, Check,
} from "lucide-react"

const PHASES = [
  { label: "Connecting business profile", icon: Cpu, duration: 900 },
  { label: "Mapping operational workflow", icon: Workflow, duration: 1100 },
  { label: "Detecting operational bottlenecks", icon: AlertTriangle, duration: 1300 },
  { label: "Analyzing sales pipeline", icon: BarChart3, duration: 1200 },
  { label: "Benchmarking against similar businesses", icon: Network, duration: 1400 },
  { label: "Estimating revenue opportunities", icon: TrendingUp, duration: 1400 },
  { label: "Calculating Business Health Score", icon: Gauge, duration: 1200 },
  { label: "Preparing executive report", icon: FileText, duration: 1100 },
]

const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0) + 800

interface PhaseState {
  done: boolean
  active: boolean
  progress: number
}

export function AnalysisStep({ businessName, onComplete }: { businessName: string; onComplete: () => void }) {
  const [phaseStates, setPhaseStates] = useState<PhaseState[]>(() => PHASES.map((_, i) => ({
    done: false, active: i === 0, progress: 0,
  })))
  const [revenue, setRevenue] = useState(210000)
  const [gauge, setGauge] = useState(0)
  const finishedRef = useRef(false)

  useEffect(() => {
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      let acc = 0
      const next = PHASES.map((phase, i) => {
        const startAt = acc
        acc += phase.duration
        const local = Math.max(0, Math.min(phase.duration, elapsed - startAt))
        const progress = local / phase.duration
        return {
          done: elapsed >= startAt + phase.duration,
          active: elapsed >= startAt && elapsed < startAt + phase.duration,
          progress,
        }
      })
      setPhaseStates(next)

      const revStart = PHASES.slice(0, 5).reduce((s, p) => s + p.duration, 0)
      const revDur = PHASES[5].duration
      const revProgress = Math.max(0, Math.min(1, (elapsed - revStart) / revDur))
      if (revProgress > 0 && revProgress < 1) {
        setRevenue(Math.round(210000 + (710000 - 210000) * easeOutCubic(revProgress)))
      }

      const gaugeStart = revStart + revDur
      const gaugeDur = PHASES[6].duration
      const gaugeProgress = Math.max(0, Math.min(1, (elapsed - gaugeStart) / gaugeDur))
      if (gaugeProgress > 0 && gaugeProgress < 1) {
        setGauge(Math.round(38 + (74 - 38) * easeOutCubic(gaugeProgress)))
      }

      if (elapsed >= TOTAL && !finishedRef.current) {
        finishedRef.current = true
        setTimeout(onComplete, 500)
      } else if (elapsed < TOTAL) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  const doneCount = phaseStates.filter((p) => p.done).length
  const allDone = doneCount === PHASES.length

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!allDone && (
          <motion.div key="engine" exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8 text-center"
            >
              <div className="relative mx-auto mb-5 flex size-16 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-2xl bg-accent/20" style={{ animationDuration: "2.4s" }} />
                <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F97316] to-[#ea580c] shadow-lg shadow-[#F97316]/25">
                  <Cpu className="size-7 text-foreground" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Initializing Awoken Intelligence Engine
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Analyzing {businessName || "your business"}
              </p>
            </motion.div>

            <div className="space-y-2">
              {PHASES.map((phase, i) => {
                const st = phaseStates[i]
                const Icon = phase.icon
                const showRevenue = i === 5 && st.active
                const showGauge = i === 6 && st.active
                return (
                  <motion.div
                    key={phase.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(0.05 * i, 0.3) }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-300",
                      st.done
                        ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                        : st.active
                          ? "border-accent/30 bg-accent/[0.05]"
                          : "border-border/60 bg-transparent opacity-35"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", st.done ? "text-green" : st.active ? "text-accent" : "text-muted-foreground")} />
                    <span className={cn("flex-1 text-sm font-medium", st.done ? "text-muted-foreground" : st.active ? "text-foreground" : "text-muted-foreground")}>
                      {phase.label}
                    </span>
                    {st.done ? (
                      <Check className="size-4 text-green" />
                    ) : st.active ? (
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted sm:w-36">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-[#fb923c] transition-[width] duration-100 ease-linear"
                          style={{ width: `${st.progress * 100}%` }}
                        />
                      </div>
                    ) : (
                      <div className="h-1.5 w-28 rounded-full bg-black/[0.06] sm:w-36" />
                    )}
                    {showRevenue && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-1 hidden text-sm font-bold tabular-nums text-foreground sm:block"
                      >
                        {formatINR(revenue)}
                      </motion.span>
                    )}
                    {showGauge && (
                      <span className="ml-1 hidden text-sm font-bold tabular-nums text-foreground sm:block">
                        {gauge}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-xs text-muted-foreground"
            >
              Compared against 147 similar operational patterns
            </motion.div>
          </motion.div>
        )}

        {allDone && (
          <motion.div
            key="report"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="py-16 text-center"
          >
            <FileText className="mx-auto mb-5 size-12 text-accent" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Executive report ready</h2>
            <p className="mt-2 text-sm text-muted-foreground">Opening your Business Intelligence Report…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatINR(value: number) {
  return "₹" + value.toLocaleString("en-IN")
}

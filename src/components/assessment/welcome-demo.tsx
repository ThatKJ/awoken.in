"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { ArrowRight, Check, ClipboardList, FileText, Lock, Search, TriangleAlert, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRIMARY } from "./ui"

const DEMO_SEEN_KEY = "awoken-demo-seen"

const spring = { type: "spring", stiffness: 260, damping: 26 } as const
const softSpring = { type: "spring", stiffness: 110, damping: 22 } as const

type SceneId =
  | "profile"
  | "workflow"
  | "patterns"
  | "health"
  | "bottlenecks"
  | "summary"
  | "assemble"
  | "final"

interface TimelineStep {
  id: SceneId
  at: number
}

const FULL_TIMELINE: TimelineStep[] = [
  { id: "profile", at: 0 },
  { id: "workflow", at: 3 },
  { id: "patterns", at: 7.5 },
  { id: "health", at: 16.5 },
  { id: "bottlenecks", at: 22 },
  { id: "summary", at: 26.5 },
  { id: "assemble", at: 36 },
  { id: "final", at: 40 },
]

const SHORT_TIMELINE: TimelineStep[] = [
  { id: "profile", at: 0 },
  { id: "workflow", at: 1.5 },
  { id: "patterns", at: 4 },
  { id: "health", at: 9 },
  { id: "bottlenecks", at: 12 },
  { id: "summary", at: 14 },
  { id: "assemble", at: 20 },
  { id: "final", at: 22 },
]

const STATUS_BY_SCENE: Record<SceneId, string> = {
  profile: "Loading business profile",
  workflow: "Mapping workflow",
  patterns: "Detecting patterns",
  health: "Computing health score",
  bottlenecks: "Identifying bottlenecks",
  summary: "Drafting executive summary",
  assemble: "Assembling report",
  final: "Report ready",
}

const PATTERN_STEPS = [
  { msg: "Analyzing lead response patterns...", insight: "Avg response: 11 hours", hot: true },
  { msg: "Mapping workflow maturity...", insight: "3 manual stage transitions", hot: false },
  { msg: "Evaluating management visibility...", insight: "Reporting: weekly only", hot: false },
  { msg: "Benchmarking against similar businesses...", insight: "Top quartile responds in 4h", hot: true },
]

const HEALTH_METRICS = [
  { label: "Operational Maturity", value: 68 },
  { label: "Visibility", value: 52 },
  { label: "Automation", value: 39 },
]

const BOTTLENECKS = [
  { title: "Slow lead response", detail: "11h average · risk of lost deals" },
  { title: "Manual follow-up", detail: "No automation across stages" },
  { title: "Low management visibility", detail: "No live operational reporting" },
]

const SUMMARY_TEXT =
  "Skyline Realty generates strong lead flow, but response delays, manual follow-ups, and limited management visibility are quietly suppressing conversion. Three operational bottlenecks require immediate attention — starting with lead response time."

const REPORT_PAGES = [
  { title: "Executive Summary", sub: "Findings at a glance" },
  { title: "Business Health", sub: "Score 74 · Silver Tier" },
  { title: "Workflow Analysis", sub: "Maturity & automation" },
  { title: "Implementation Roadmap", sub: "90-day plan" },
]

const RISK_ROWS = [
  { label: "Lead response delays", sev: "High" },
  { label: "Manual follow-up gaps", sev: "Medium" },
  { label: "Low management visibility", sev: "High" },
]

const NEXT_STEPS = [
  {
    n: "01",
    phase: "Input",
    title: "Understand your business",
    desc: "Answer 8 guided questions about your operations, pipeline, and tools.",
    icon: ClipboardList,
  },
  {
    n: "02",
    phase: "Analysis",
    title: "Analyze operations",
    desc: "The Intelligence Engine maps workflow, process maturity, and risk.",
    icon: Search,
  },
  {
    n: "03",
    phase: "Generation",
    title: "Generate executive report",
    desc: "A personalized Business Health Report with prioritized opportunities.",
    icon: FileText,
  },
  {
    n: "04",
    phase: "Strategy",
    title: "Review with a strategist",
    desc: "Walk through findings and an implementation plan with Awoken.",
    icon: Users,
  },
]

const REPORT_SPREADS = [
  {
    title: "Executive Summary",
    why: "The findings, distilled into a page a consultant would hand to your board.",
    variant: "cover",
    locked: false,
  },
  {
    title: "Business Health",
    why: "One number that tells you whether your business is getting stronger.",
    variant: "gauge",
    locked: false,
  },
  {
    title: "Workflow Analysis",
    why: "Shows where work slows down between stages.",
    variant: "line",
    locked: false,
  },
  {
    title: "Operational Risks",
    why: "Identifies the issues most likely to impact growth or revenue.",
    variant: "risk",
    locked: false,
  },
  {
    title: "Opportunity Matrix",
    why: "Prioritizes improvements by business impact versus implementation effort.",
    variant: "matrix",
    locked: false,
  },
  {
    title: "Implementation Roadmap",
    why: "Turns recommendations into a sequenced 90-day plan.",
    variant: "roadmap",
    locked: true,
  },
]

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const sync = () => setMatches(mql.matches)
    sync()
    mql.addEventListener("change", sync)
    return () => mql.removeEventListener("change", sync)
  }, [query])
  return matches
}

function useCountUp(target: number, duration: number, delay = 0): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    const t = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])
  return value
}

function useInViewCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return { ref, value }
}

function WordTypewriter({
  text,
  speed = 100,
  delay = 350,
  active = true,
}: {
  text: string
  speed?: number
  delay?: number
  active?: boolean
}) {
  const words = useMemo(() => text.split(" "), [text])
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let interval: number | undefined
    const t = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= words.length) {
            if (interval) window.clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(t)
      if (interval) window.clearInterval(interval)
    }
  }, [words, speed, delay, active])
  const done = count >= words.length
  return (
    <span>
      {words.slice(0, count).join(" ")}
      {count > 0 && " "}
      <span
        className={cn(
          "ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-accent",
          done && "animate-pulse"
        )}
      />
    </span>
  )
}

const PARTICLES = [
  { l: "6%", t: "18%", s: 3, d: 7, dl: 0 },
  { l: "12%", t: "64%", s: 2, d: 8, dl: 1.2 },
  { l: "20%", t: "34%", s: 3, d: 6.5, dl: 0.6 },
  { l: "28%", t: "80%", s: 2, d: 9, dl: 2 },
  { l: "48%", t: "12%", s: 3, d: 7.5, dl: 0.3 },
  { l: "62%", t: "72%", s: 2, d: 6, dl: 1.5 },
  { l: "76%", t: "28%", s: 3, d: 8.5, dl: 0.9 },
  { l: "84%", t: "58%", s: 2, d: 7, dl: 2.4 },
  { l: "92%", t: "20%", s: 3, d: 6.8, dl: 1.8 },
  { l: "40%", t: "88%", s: 2, d: 8.2, dl: 0.2 },
]

function HeroBackground({ reduced }: { reduced: boolean | null }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 15%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 15%, black 10%, transparent 70%)",
        }}
      />
      <div className="absolute -top-40 right-[-8%] h-[560px] w-[560px] rounded-full bg-accent/[0.05] blur-3xl" />
      <div className="absolute bottom-[-25%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/[0.045] blur-3xl" />
      {!reduced && (
        <>
          <motion.div
            className="absolute left-0 right-0 top-[38%] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: [0, 0.6, 0], scaleX: [0.3, 1, 0.3], x: ["-20%", "20%", "-20%"] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent/25"
              style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
              animate={{ y: [0, -26, 0], opacity: [0.1, 0.45, 0.1] }}
              transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: "easeInOut" }}
            />
          ))}
        </>
      )}
    </div>
  )
}

export function WelcomeStep({ onStart }: { onStart: () => void }) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [manualPlay, setManualPlay] = useState(false)
  const [seenDemo] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(DEMO_SEEN_KEY) === "1"
  )
  const timeline = useMemo(() => (isMobile ? SHORT_TIMELINE : FULL_TIMELINE), [isMobile])
  const finalPhase = timeline.length - 1

  const [phase, setPhase] = useState(0)
  const [demoDone, setDemoDone] = useState(false)

  useEffect(() => {
    if (reduced || (seenDemo && !manualPlay)) {
      const t = window.setTimeout(() => {
        setPhase(finalPhase)
        setDemoDone(true)
      }, 0)
      return () => window.clearTimeout(t)
    }
    const timers = timeline.map((t, i) => window.setTimeout(() => setPhase(i), t.at * 1000))
    const done = window.setTimeout(() => {
      setDemoDone(true)
      window.localStorage.setItem(DEMO_SEEN_KEY, "1")
    }, timeline[finalPhase].at * 1000 + 1500)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(done)
    }
  }, [timeline, finalPhase, reduced, seenDemo, manualPlay])

  const replay = () => {
    setManualPlay(true)
    setPhase(0)
    setDemoDone(false)
  }

  const scene = timeline[Math.min(phase, finalPhase)].id
  const progress = Math.min(1, phase / finalPhase)

  return (
    <div className="relative">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <HeroBackground reduced={reduced} />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12 min-[1920px]:px-24">
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="flex items-center justify-between gap-4 pt-6 sm:pt-8 lg:pt-10"
          >
            <img src="/logo.svg" alt="Awoken" className="h-12 w-auto sm:h-14 lg:h-[108px]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
              <span className="relative flex size-1.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-accent",
                    !reduced && "animate-ping"
                  )}
                />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {demoDone ? "Report ready" : STATUS_BY_SCENE[scene]}
            </span>
          </motion.header>

          <div className="grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pb-24 lg:pt-6 xl:gap-20">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.05 }}
                className="text-base font-semibold uppercase tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-8"
              >
                Business Intelligence Engine
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.12 }}
                className="mt-6 max-w-[16ch] text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]"
              >
                See your business the way a consultant does.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.22 }}
                className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base"
              >
                Complete a guided assessment and watch Awoken generate a personalized executive
                intelligence report in real time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.32 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <button
                  type="button"
                  onClick={onStart}
                  disabled={!demoDone}
                  className={cn(
                    PRIMARY,
                    "group min-w-[260px] justify-between px-6 disabled:pointer-events-none disabled:opacity-55",
                    demoDone &&
                      "shadow-[0_8px_30px_-6px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_44px_-4px_rgba(249,115,22,0.55)]"
                  )}
                >
                  {demoDone ? (
                    <>
                      Generate My Business Report
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  ) : (
                    <>
                      Intelligence Engine Running
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                        <span className="relative inline-flex size-2 rounded-full bg-white" />
                      </span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={replay}
                  className="group inline-flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  Watch Demo Again
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring, delay: 0.45 }}
                className="mt-5 text-xs text-muted-foreground"
              >
                Estimated time 5–7 min <span className="mx-1.5 text-border">·</span> Private{" "}
                <span className="mx-1.5 text-border">·</span> No spam
              </motion.p>
            </div>

            <div className="order-1 lg:order-2">
              <IntelligenceWorkspace
                reduced={reduced}
                scene={scene}
                demoDone={demoDone}
                progress={progress}
              />
            </div>
          </div>
        </div>
      </div>

      <ReportContents />
      <WhatHappensNext />
    </div>
  )
}

function IntelligenceWorkspace({
  reduced,
  scene,
  demoDone,
  progress,
}: {
  reduced: boolean | null
  scene: SceneId
  demoDone: boolean
  progress: number
}) {
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotateY = useSpring(mvX, { stiffness: 40, damping: 18 })
  const rotateX = useSpring(mvY, { stiffness: 40, damping: 18 })

  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      onMouseMove={(e) => {
        if (reduced) return
        const r = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        mvX.set(x * 5)
        mvY.set(-y * 5)
      }}
      onMouseLeave={() => {
        mvX.set(0)
        mvY.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1300 }}
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-premium"
        >
          <div className="flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#FF5F57]/70" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]/70" />
              <span className="size-2.5 rounded-full bg-[#28C840]/70" />
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/50" />
                <span className="relative inline-flex size-2 rounded-full bg-green" />
              </span>
              Awoken Intelligence Engine
            </div>
            <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Live
            </span>
          </div>

          {!reduced && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
              animate={{ x: ["-160%", "420%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
            />
          )}

          <div className="relative h-[430px] overflow-hidden bg-background sm:h-[500px] lg:h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute inset-0 p-5 sm:p-6"
              >
                {scene === "profile" && <ProfileScene />}
                {scene === "workflow" && <WorkflowScene />}
                {scene === "patterns" && <PatternScene />}
                {scene === "health" && <HealthScene />}
                {scene === "bottlenecks" && <BottleneckScene />}
                {scene === "summary" && <SummaryScene />}
                {scene === "assemble" && <AssembleScene />}
                {scene === "final" && <FinalScene demoDone={demoDone} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 border-t border-border bg-background/70 px-4 py-2.5">
            <span className="flex-1 truncate font-mono text-[10px] text-muted-foreground">
              {STATUS_BY_SCENE[scene]}
            </span>
            <span className="tabular-nums text-[10px] font-semibold text-muted-foreground">
              {Math.round(progress * 100)}%
            </span>
            <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-[#fb923c]"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SceneShell({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      {title && (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      )}
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}

const PROFILE_STATS = [
  { label: "Employees", value: "24" },
  { label: "Revenue", value: "₹3.2 Cr" },
  { label: "Industry", value: "Real Estate" },
]

function ProfileScene() {
  return (
    <SceneShell title="Business Profile">
      <div className="mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-base font-bold text-accent">
            SR
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">Skyline Realty</p>
            <p className="text-xs text-muted-foreground">Business profile loaded</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2 py-1 text-[10px] font-semibold text-green">
            <Check className="size-3" /> Synced
          </span>
        </motion.div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {PROFILE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.25 + i * 0.12 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-bold tabular-nums text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}

const WORKFLOW_NODES = ["Lead", "Qualification", "Site Visit", "Negotiation", "Booking"]

function WorkflowScene() {
  const nodeH = 40
  const gapH = 30
  const totalH = WORKFLOW_NODES.length * nodeH + (WORKFLOW_NODES.length - 1) * gapH
  return (
    <SceneShell title="Workflow Map">
      <div className="relative mx-auto w-full max-w-sm">
        <svg
          viewBox={`0 0 40 ${totalH}`}
          preserveAspectRatio="none"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          aria-hidden
        >
          {WORKFLOW_NODES.slice(1).map((_, i) => {
            const y1 = i * (nodeH + gapH) + nodeH
            const y2 = (i + 1) * (nodeH + gapH)
            return (
              <motion.path
                key={i}
                d={`M 20 ${y1} L 20 ${y2}`}
                fill="none"
                strokeWidth="2"
                className="stroke-border"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ ...spring, delay: 0.4 + i * 0.55 }}
              />
            )
          })}
        </svg>
        {WORKFLOW_NODES.map((node, i) => (
          <motion.div
            key={node}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 + i * 0.55 }}
            className="relative z-10 flex items-center justify-center gap-2.5 rounded-lg border border-border bg-card px-4 py-2.5"
            style={{ marginBottom: i < WORKFLOW_NODES.length - 1 ? gapH : 0 }}
          >
            <motion.span
              className="size-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 + i * 0.55 }}
            />
            <span className="text-sm font-medium text-foreground">{node}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  )
}

function PatternScene() {
  const traceH = 236
  return (
    <SceneShell title="Pattern Detection">
      <div className="relative mx-auto w-full max-w-md pl-7">
        <svg
          viewBox={`0 0 2 ${traceH}`}
          preserveAspectRatio="none"
          className="absolute left-2 top-2 h-[calc(100%-12px)] w-0.5"
          aria-hidden
        >
          <motion.path
            d={`M 1 0 L 1 ${traceH}`}
            fill="none"
            strokeWidth="2"
            className="stroke-accent/40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7.5, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
        {PATTERN_STEPS.map((step, i) => (
          <motion.div
            key={step.msg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 + i * 2 }}
            className="relative mb-4"
          >
            <span className="absolute -left-7 top-2.5 size-2 rounded-full border-2 border-accent bg-card" />
            <p className="text-sm font-medium text-foreground">{step.msg}</p>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 + i * 2 + 0.85 }}
              className={cn(
                "mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                step.hot
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              {step.hot && <TriangleAlert className="size-3" />}
              {step.insight}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  )
}

function HealthScene() {
  const health = useCountUp(74, 1800, 300)
  return (
    <SceneShell title="Business Health Score">
      <div className="mx-auto grid w-full max-w-md items-center gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 120 110" className="h-32 w-auto">
              <g transform="rotate(-120 60 60)">
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44 * (240 / 360)}
                  strokeDashoffset={0}
                  className="stroke-muted/60"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="44"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44 * (240 / 360)}
                  strokeDashoffset={2 * Math.PI * 44 * (240 / 360)}
                  className="stroke-accent"
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 44 * (240 / 360) -
                      (2 * Math.PI * 44 * (240 / 360) * health) / 100,
                  }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(249,115,22,0.45))" }}
                />
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
              <span className="text-4xl font-black tabular-nums tracking-tight text-foreground">
                {health}
                <span className="text-lg font-bold text-muted-foreground">/100</span>
              </span>
              <span className="mt-0.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Silver Tier
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {HEALTH_METRICS.map((metric, i) => (
            <div key={metric.label}>
              <div className="mb-1 flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-bold tabular-nums text-foreground">{metric.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-[#fb923c]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ ...spring, delay: 0.4 + i * 0.25 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}

function BottleneckScene() {
  return (
    <SceneShell title="Bottlenecks Detected">
      <div className="mx-auto w-full max-w-md space-y-3">
        {BOTTLENECKS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.25 + i * 0.4 }}
            className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent/15">
              <TriangleAlert className="size-3.5 text-accent" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  )
}

function SummaryScene() {
  return (
    <SceneShell title="Executive Summary">
      <div className="mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-[10px] font-bold text-accent">
              AI
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Awoken Intelligence Engine
            </p>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            <WordTypewriter text={SUMMARY_TEXT} speed={110} delay={500} />
          </p>
        </motion.div>
      </div>
    </SceneShell>
  )
}

function AssembleScene() {
  return (
    <SceneShell>
      <div className="relative mx-auto h-[320px] w-full max-w-sm sm:h-[360px]">
        {REPORT_PAGES.map((page, i) => (
          <motion.div
            key={page.title}
            initial={{ x: 110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...softSpring, delay: 0.2 + i * 0.75 }}
            className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-premium"
            style={{
              zIndex: 10 - i,
              rotate: (i - 1.5) * -0.9,
              translateY: -52 + i * 26,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Awoken Intelligence Engine
              </span>
              <span className="size-2 rounded-full bg-accent/40" />
            </div>
            <p className="text-sm font-bold text-foreground">{page.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{page.sub}</p>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded-full bg-muted" />
              <div className="h-1.5 w-1/2 rounded-full bg-muted" />
              <div className="h-1.5 w-2/3 rounded-full bg-muted/70" />
            </div>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  )
}

function FinalScene({ demoDone }: { demoDone: boolean }) {
  const health = useCountUp(74, 1400, 250)
  return (
    <SceneShell>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: demoDone ? [0, -6, 0] : 0 }}
          transition={
            demoDone
              ? { opacity: spring, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
              : spring
          }
          className="w-full rounded-2xl border border-border bg-background p-6 shadow-premium"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Business Health
          </p>
          <p className="mt-1 text-5xl font-black tabular-nums tracking-tight text-foreground">
            {health}
            <span className="text-xl font-bold text-muted-foreground">/100</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground">
              <span className="size-1.5 rounded-full bg-green" /> 17 Opportunities Found
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <TriangleAlert className="size-3" /> 3 High Priority
            </span>
          </div>
        </motion.div>
        <AnimatePresence>
          {demoDone && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="mt-5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
            >
              <Check className="size-3.5 text-green" />
              Analysis complete — ready for your business
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}

function ReportContents() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28 xl:px-12 min-[1920px]:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-8">
            What your report contains
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Six pages of executive intelligence.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Real report pages, generated from your answers — every chart below previews live,
            straight from the Intelligence Engine.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {REPORT_SPREADS.map((spread, i) => (
            <ReportSpread key={spread.title} spread={spread} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReportSpread({
  spread,
  index,
}: {
  spread: (typeof REPORT_SPREADS)[number]
  index: number
}) {
  const { ref: gaugeRef, value: gaugeValue } = useInViewCountUp(74)
  const typingRef = useRef<HTMLParagraphElement>(null)
  const typingInView = useInView(typingRef, { once: true, amount: 0.5 })
  const pageNo = index + 1
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...spring, delay: (index % 2) * 0.1 }}
      tabIndex={spread.locked ? 0 : -1}
      className="group relative cursor-pointer"
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-premium transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent/40 group-hover:shadow-[0_18px_48px_-12px_rgba(249,115,22,0.3)]",
          index === 0 ? "p-6 sm:p-7" : "p-5"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Awoken</span>
            <span className="size-2 rounded-full bg-accent/40 transition-colors group-hover:bg-accent" />
          </span>
          <span className="font-mono text-[10px] font-semibold text-muted-foreground">
            Page {pageNo} / 6
          </span>
        </div>

        <p className={cn("font-bold text-foreground", index === 0 ? "text-lg" : "text-sm")}>
          {spread.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{spread.why}</p>

        <div className="mt-5 flex-1">
          {spread.variant === "cover" && (
            <div>
              <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-background/60 p-3 text-[11px]">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Prepared For</p>
                  <p className="mt-0.5 font-semibold text-foreground">Skyline Realty</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Generated</p>
                  <p className="mt-0.5 font-semibold text-foreground">August 2026</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Assessment ID</p>
                  <p className="mt-0.5 font-mono font-semibold text-foreground">AWK-48291</p>
                </div>
              </div>
              <p ref={typingRef} className="mt-4 min-h-[84px] text-sm leading-relaxed text-foreground/85">
                <WordTypewriter
                  text="Skyline Realty generates strong lead flow, but response delays and manual follow-ups are quietly suppressing conversion. The opportunity is concentrated in response speed, automation, and management visibility."
                  speed={80}
                  delay={500}
                  active={typingInView}
                />
              </p>
            </div>
          )}

          {spread.variant === "gauge" && (
            <div ref={gaugeRef} className="flex min-h-[116px] items-center gap-5">
              <MiniGauge value={gaugeValue} />
              <div>
                <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {gaugeValue}
                  <span className="text-base font-bold text-muted-foreground">/100</span>
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green/[0.07] px-2.5 py-1 text-[10px] font-semibold text-green">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-green" />
                  </span>
                  AI Confidence 96%
                </span>
              </div>
            </div>
          )}

          {spread.variant === "line" && (
            <div className="flex min-h-[116px] flex-col justify-center" aria-hidden>
              <svg viewBox="0 0 140 80" className="mx-auto h-24 w-auto max-w-full">
                <motion.path
                  d="M 4 62 L 30 50 L 56 56 L 82 30 L 108 40 L 136 16"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-accent"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                />
                <circle cx="136" cy="16" r="3.5" className="fill-accent" />
                <circle cx="136" cy="16" r="7" fill="none" className="stroke-accent/40" />
              </svg>
            </div>
          )}

          {spread.variant === "risk" && (
            <div className="min-h-[116px] space-y-2">
              {RISK_ROWS.map((risk, i) => (
                <motion.div
                  key={risk.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.15 + i * 0.12 }}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <TriangleAlert className="size-3 shrink-0 text-accent" />
                    {risk.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      risk.sev === "High" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {risk.sev}
                  </span>
                </motion.div>
              ))}
              <span className="inline-flex items-center gap-1.5 px-1 pt-0.5 text-[10px] font-semibold text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Finding confidence · High
              </span>
            </div>
          )}

          {spread.variant === "matrix" && (
            <div className="relative min-h-[116px] pt-4" aria-hidden>
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground [writing-mode:vertical-rl]">
                Impact
              </span>
              <div className="relative ml-7 h-full">
                {[
                  [12, 64], [34, 38], [58, 72], [82, 24], [104, 52],
                ].map(([x, y], i) => (
                  <motion.span
                    key={i}
                    className="absolute size-2.5 rounded-full"
                    style={{ left: `${x / 1.5}%`, top: `${y / 1.25}%` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: 0.15 + i * 0.1 }}
                  >
                    <span className={cn("block size-full rounded-full", i === 3 ? "bg-accent" : "bg-accent/40")} />
                    {i === 3 && <span className="absolute -inset-1.5 rounded-full border border-accent/50" />}
                  </motion.span>
                ))}
                <span className="absolute bottom-0 right-0 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Effort →
                </span>
              </div>
            </div>
          )}

          {spread.variant === "roadmap" && (
            <div className="flex min-h-[116px] flex-col justify-center gap-3" aria-hidden>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-[#fb923c]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "72%" }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.2 }}
                />
              </div>
              <div className="flex justify-between px-0.5 text-[10px] font-semibold text-muted-foreground">
                <span>Week 1</span>
                <span>Week 4</span>
                <span>Week 8</span>
                <span>Week 12</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative mt-5">
          <div className="space-y-1.5" aria-hidden>
            <div className="h-1.5 w-3/4 rounded-full bg-muted" />
            <div className="h-1.5 w-full rounded-full bg-muted" />
            <div className="h-1.5 w-2/3 rounded-full bg-muted/70" />
          </div>
          <div className="absolute inset-0 backdrop-blur-[2.5px]" />
          <div className="pointer-events-none absolute inset-x-0 -top-3 bottom-0 bg-gradient-to-b from-transparent via-background/40 to-background/60" />
        </div>

        {spread.locked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 rounded-xl bg-background/90 p-4 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <span className="flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
              <Lock className="size-4 text-accent" />
            </span>
            <p className="text-xs font-semibold text-foreground">Available after your strategy session</p>
            <p className="max-w-[30ch] text-[11px] leading-relaxed text-muted-foreground">
              The complete roadmap is reviewed together with an Awoken consultant so recommendations can be tailored to your business.
            </p>
          </div>
        )}
      </div>
    </motion.article>
  )
}

function MiniGauge({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 120 80" className="h-24 w-auto shrink-0" aria-hidden>
      <path
        d="M 10 70 A 50 50 0 0 1 110 70"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        className="stroke-muted/70"
      />
      <motion.path
        d="M 10 70 A 50 50 0 0 1 110 70"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        className="stroke-accent"
        style={{ filter: "drop-shadow(0 0 6px rgba(249,115,22,0.4))" }}
        animate={{ pathLength: value / 100 }}
        transition={spring}
      />
    </svg>
  )
}

function WhatHappensNext() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28 xl:px-12 min-[1920px]:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-8">
            What happens next
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From answers to decisions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Four phases between you and a board-ready business intelligence report.
          </p>
        </motion.div>

        <div className="relative mt-16 md:mt-20">
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block"
            aria-hidden
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent/40 via-accent to-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {NEXT_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ...spring, delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-premium">
                    <step.icon className="size-5 text-accent" />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[9px] font-bold text-accent">
                      {step.n}
                    </span>
                    <motion.span
                      className="absolute inset-0 rounded-2xl border border-accent/40"
                      initial={{ opacity: 0.6, scale: 1 }}
                      whileInView={{ opacity: 0, scale: 1.3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 + i * 0.15 }}
                    />
                  </div>
                  <div className="md:mt-5">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {step.phase}
                    </p>
                    <p className="mt-1.5 font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1.5 max-w-[30ch] text-sm leading-relaxed text-muted-foreground md:mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

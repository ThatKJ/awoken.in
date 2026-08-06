"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Users, Wallet, MapPin, Target, Zap, Rocket, EyeOff, UserCheck, Bot, Lock,
  CheckCircle2, GripVertical, ArrowDown, Shield, Store, Layers, Globe, Gauge,
} from "lucide-react"
import {
  type AssessmentAnswers,
  industryOptions, employeesOptions, revenueOptions, monthlyLeadsOptions, locationsOptions,
  businessModelOptions, primaryGoalOptions, leadChannelOptions, leadsPerMonthOptions,
  responseTimeOptions, responderOptions, pipelineStageOptions, stuckStageOptions,
  operationalPainOptions, toolOptions, goalOptions,
} from "@/data/assessment"
import { LABEL, OPTACTIVE, OPTIDLE, INPUT } from "./ui"

interface StepProps {
  answers: AssessmentAnswers
  update: (patch: Partial<AssessmentAnswers>) => void
}

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

function StepShell({ question, hint, children }: { question: string; hint?: string; children: React.ReactNode }) {
  return (
    <motion.div variants={containerStagger} initial="hidden" animate="show" className="w-full">
      <motion.div variants={stagger}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">{question}</h2>
        {hint && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{hint}</p>}
      </motion.div>
      <motion.div variants={stagger} className="mt-8 sm:mt-10">
        {children}
      </motion.div>
    </motion.div>
  )
}

export function ProfileStep({ answers, update }: StepProps) {
  return (
    <StepShell question="Tell us about your business" hint="A few basics so the engine can calibrate against businesses like yours.">
      <div className="space-y-8">
        <div>
          <p className={cn(LABEL, "mb-3")}>Business name</p>
          <input
            autoFocus
            type="text"
            value={answers.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            placeholder="ABC Developers"
            className={INPUT}
          />
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>What industry are you in?</p>
          <OptionGrid options={industryOptions} selected={answers.industry} onSelect={(v) => update({ industry: v })} columns={3} />
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>How do you operate?</p>
          <OptionGrid options={businessModelOptions} selected={answers.businessModel} onSelect={(v) => update({ businessModel: v })} columns={3} icons={{
            B2B: Layers, B2C: Users, "B2B + B2C": Layers, "Service-based": Store, "Product-based": PackageIcon, "Service + Product": Store, Other: Globe,
          }} />
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>Size &amp; revenue</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MiniSelect label="Employees" options={employeesOptions} value={answers.employees} onChange={(v) => update({ employees: v })} icon={Users} />
            <MiniSelect label="Revenue" options={revenueOptions} value={answers.revenue} onChange={(v) => update({ revenue: v })} icon={Wallet} />
            <MiniSelect label="Leads / month" options={monthlyLeadsOptions} value={answers.monthlyLeads} onChange={(v) => update({ monthlyLeads: v })} icon={Target} />
            <MiniSelect label="Locations" options={locationsOptions} value={answers.locations} onChange={(v) => update({ locations: v })} icon={MapPin} />
          </div>
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>Primary objective right now</p>
          <OptionGrid options={primaryGoalOptions} selected={answers.primaryGoal} onSelect={(v) => update({ primaryGoal: v })} columns={3} icons={{
            "Increase Revenue": Target, "Reduce Costs": Wallet, "Improve Operations": Zap,
            "Scale Faster": Rocket, "Increase Customer Satisfaction": Users,
          }} />
        </div>
      </div>
    </StepShell>
  )
}

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Shield {...props} />
}

function MiniSelect({ label, options, value, onChange, icon: Icon }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; icon: React.ElementType
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-accent" />
        <p className={LABEL}>{label}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("w-full cursor-pointer bg-transparent text-[15px] font-medium text-foreground outline-none", !value && "text-muted-foreground")}
      >
        <option value="" disabled>Select</option>
        {options.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
      </select>
    </div>
  )
}

export function LeadsStep({ answers, update }: StepProps) {
  return (
    <StepShell question="Where do your leads come from?" hint="Select every channel that brings you business.">
      <div className="space-y-8">
        <MultiGrid options={leadChannelOptions} selected={answers.leadChannels} onToggle={(v) => toggle(answers.leadChannels, v, update, "leadChannels")} columns={3} />
        <div>
          <p className={cn(LABEL, "mb-3")}>How many leads do you get monthly?</p>
          <OptionGrid options={leadsPerMonthOptions} selected={answers.leadsPerMonth} onSelect={(v) => update({ leadsPerMonth: v })} />
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>Average response time</p>
          <OptionGrid options={responseTimeOptions} selected={answers.responseTime} onSelect={(v) => update({ responseTime: v })} columns={3} icons={{ Immediately: Zap, "Within an hour": Zap, "Same day": Zap, "1–2 days": Zap, "We don't track": EyeOff }} />
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>Who owns first response?</p>
          <OptionGrid options={responderOptions} selected={answers.responder} onSelect={(v) => update({ responder: v })} icons={{ Reception: UserCheck, "Sales team": UserCheck, Manager: UserCheck, Automation: Bot, Nobody: Lock }} />
        </div>
      </div>
    </StepShell>
  )
}

export function SalesStep({ answers, update }: StepProps) {
  const [dragging, setDragging] = useState<string | null>(null)
  const ordered = [...answers.pipelineStages]
  const activeSet = new Set(ordered)

  const moveStage = (stage: string, toIndex: number) => {
    const next = [...ordered]
    const from = next.indexOf(stage)
    if (from < 0) return
    next.splice(from, 1)
    next.splice(toIndex, 0, stage)
    update({ pipelineStages: next })
  }

  const toggleStage = (stage: string) => {
    if (activeSet.has(stage)) {
      update({ pipelineStages: ordered.filter((s) => s !== stage) })
    } else {
      update({ pipelineStages: [...ordered, stage] })
    }
  }

  return (
    <StepShell
      question="Map your sales workflow"
      hint="Tap the stages your business uses, then drag them into the correct order."
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {pipelineStageOptions.map((stage) => {
              const active = activeSet.has(stage)
              return (
                <button
                  key={stage}
                  type="button"
                  onClick={() => toggleStage(stage)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
                    active ? "border-accent/70 bg-accent text-accent-foreground" : "border-border bg-background text-muted-foreground hover:border-accent/40"
                  )}
                >
                  {stage}
                </button>
              )
            })}
          </div>

          {ordered.length > 0 && (
            <div className="mt-6 flex flex-col gap-2">
              {ordered.map((stage, i) => (
                <div
                  key={stage}
                  draggable
                  onDragStart={() => setDragging(stage)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (dragging && dragging !== stage) moveStage(dragging, i); setDragging(null) }}
                  onDragEnd={() => setDragging(null)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-all duration-200",
                    dragging === stage && "opacity-40 border-accent/50"
                  )}
                >
                  <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex size-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">{i + 1}</span>
                  <span className="flex-1 text-sm font-semibold text-foreground">{stage}</span>
                  {i < ordered.length - 1 && <ArrowDown className="size-3.5 text-muted-foreground" />}
                </div>
              ))}
            </div>
          )}

          {ordered.length >= 4 && (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green">
              <CheckCircle2 className="size-4" /> {ordered.length} stages mapped — clear pipeline structure
            </p>
          )}
        </div>
        <div>
          <p className={cn(LABEL, "mb-3")}>Where do most leads stop progressing?</p>
          <OptionGrid options={stuckStageOptions} selected={answers.stuckStage} onSelect={(v) => update({ stuckStage: v })} />
        </div>
      </div>
    </StepShell>
  )
}

export function OperationsStep({ answers, update }: StepProps) {
  return (
    <StepShell question="What slows your operations down?" hint="Select everything that sounds familiar — this is where the engine focuses.">
      <MultiGrid options={operationalPainOptions} selected={answers.operationalPains} onToggle={(v) => toggle(answers.operationalPains, v, update, "operationalPains")} columns={2} />
    </StepShell>
  )
}

export function TechnologyStep({ answers, update }: StepProps) {
  return (
    <StepShell question="Which tools do you use today?" hint="Select all that apply. There are no wrong answers.">
      <MultiGrid options={toolOptions} selected={answers.tools} onToggle={(v) => toggle(answers.tools, v, update, "tools")} columns={3} />
    </StepShell>
  )
}

export function VisibilityStep({ answers, update }: StepProps) {
  return (
    <StepShell
      question="How confident are you answering these about your business right now?"
      hint="Drag each slider — honesty here drives accuracy."
    >
      <div className="space-y-4">
        {answers.visibilityScores.map((item, i) => {
          const score = item.score
          const level = score >= 75 ? "High" : score >= 40 ? "Partial" : "Low"
          return (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-[15px] font-semibold text-foreground">{item.label}</span>
                <span className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold",
                  level === "High" ? "bg-emerald-500/15 text-green" : level === "Partial" ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400"
                )}>
                  {score}% · {level}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={score}
                onChange={(e) => {
                  const next = [...answers.visibilityScores]
                  next[i] = { ...item, score: Number(e.target.value) }
                  update({ visibilityScores: next })
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-accent"
              />
            </div>
          )
        })}
      </div>
      <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
        <Gauge className="mt-0.5 size-4 shrink-0 text-accent" />
        These six answers determine your Management Visibility Score — the gap between what&apos;s happening and what&apos;s being seen.
      </p>
    </StepShell>
  )
}

export function GoalsStep({ answers, update }: StepProps) {
  const ranked = answers.rankedGoals
  const rankOf = (goal: string) => ranked.indexOf(goal) + 1

  const toggleRank = (goal: string) => {
    if (ranked.includes(goal)) {
      update({ rankedGoals: ranked.filter((g) => g !== goal) })
    } else if (ranked.length < 3) {
      update({ rankedGoals: [...ranked, goal] })
    }
  }

  return (
    <StepShell question="What matters most right now?" hint="Tap up to 3 priorities — first tap is your top priority.">
      <div className="grid gap-3 sm:grid-cols-2">
        {goalOptions.map((goal) => {
          const rank = rankOf(goal)
          const active = rank > 0
          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggleRank(goal)}
              className={cn(
                "flex items-center gap-4 rounded-xl border px-4 sm:px-5 py-4 text-left text-[15px] font-medium transition-all duration-200",
                active ? OPTACTIVE : cn(OPTIDLE, "text-foreground"),
                !active && ranked.length >= 3 && "pointer-events-none opacity-30"
              )}
            >
              <span className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200",
                active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              )}>
                {active ? rank : "–"}
              </span>
              <span className="flex-1">{goal}</span>
              {active && <span className="text-xs font-semibold text-accent">Priority #{rank}</span>}
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}

function toggle(selected: string[], v: string, update: (p: Partial<AssessmentAnswers>) => void, key: "leadChannels" | "operationalPains" | "tools") {
  update({ [key]: selected.includes(v) ? selected.filter((c) => c !== v) : [...selected, v] } as Partial<AssessmentAnswers>)
}

function OptionGrid({ options, selected, onSelect, columns = 2, icons }: {
  options: string[]; selected: string; onSelect: (v: string) => void; columns?: 2 | 3; icons?: Record<string, React.ElementType>
}) {
  return (
    <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {options.map((option) => {
        const Icon = icons?.[option]
        const active = selected === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 sm:px-5 py-4 text-left text-[15px] font-medium transition-all duration-200",
              active ? OPTACTIVE : cn(OPTIDLE, "text-foreground")
            )}
          >
            {Icon && <Icon className={cn("size-4.5 shrink-0", active ? "text-accent" : "text-muted-foreground")} />}
            <span className="flex-1">{option}</span>
            {active && <CheckCircle2 className="size-4.5 shrink-0 text-accent" />}
          </button>
        )
      })}
    </div>
  )
}

function MultiGrid({ options, selected, onToggle, columns = 2 }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; columns?: 2 | 3
}) {
  return (
    <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 sm:px-5 py-3.5 text-left text-[15px] font-medium transition-all duration-200",
              active ? OPTACTIVE : cn(OPTIDLE, "text-foreground")
            )}
          >
            <span className="flex-1">{option}</span>
            <span className={cn(
              "flex size-5 items-center justify-center rounded-md border text-xs font-bold transition-colors",
              active ? "border-accent bg-accent text-accent-foreground" : "border-border text-transparent"
            )}>
              ✓
            </span>
          </button>
        )
      })}
    </div>
  )
}

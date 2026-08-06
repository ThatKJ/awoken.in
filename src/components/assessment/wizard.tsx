"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  type StepId, type AssessmentAnswers, emptyAnswers, computeReport,
} from "@/data/assessment"
import { saveAssessment, sendPreviewEmail } from "@/lib/assessment-api"
import { ProfileStep, LeadsStep, SalesStep, OperationsStep, TechnologyStep, VisibilityStep, GoalsStep } from "./question-steps"
import { ContactStep } from "./contact"
import { AnalysisStep } from "./analysis"
import { ReportStep } from "./report"
import { PRIMARY } from "./ui"
import { WelcomeStep } from "./welcome-demo"

const STORAGE_KEY = "awoken-assessment-v2"

const questionSteps: StepId[] = [
  "profile", "leads", "sales", "operations", "technology", "visibility", "goals", "contact",
]
const allSteps: StepId[] = ["welcome", ...questionSteps, "analysis", "report"]

function stepIndex(step: StepId) {
  return allSteps.indexOf(step)
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function canContinue(step: StepId, answers: AssessmentAnswers): boolean {
  switch (step) {
    case "profile":
      return !!answers.businessName.trim() && !!answers.industry && !!answers.businessModel &&
        !!answers.employees && !!answers.revenue && !!answers.primaryGoal
    case "leads":
      return answers.leadChannels.length > 0 && !!answers.leadsPerMonth && !!answers.responseTime && !!answers.responder
    case "sales":
      return answers.pipelineStages.length >= 4 && !!answers.stuckStage
    case "operations":
      return answers.operationalPains.length > 0
    case "technology":
      return answers.tools.length > 0
    case "visibility":
      return true
    case "goals":
      return answers.rankedGoals.length > 0
    case "contact":
      return !!answers.contactName.trim() && !!answers.contactEmail.trim() && emailRe.test(answers.contactEmail.trim()) && answers.consent
    default:
      return true
  }
}

function loadSaved(): { answers: AssessmentAnswers; step: StepId } | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { answers: AssessmentAnswers; step: StepId }
    return { answers: { ...emptyAnswers, ...parsed.answers }, step: parsed.step ?? "welcome" }
  } catch {
    return null
  }
}

export function AssessmentWizard() {
  const [step, setStep] = useState<StepId>("welcome")
  const [answers, setAnswers] = useState<AssessmentAnswers>(emptyAnswers)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [permalink, setPermalink] = useState<string>()
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => {
      const savedState = loadSaved()
      if (savedState) {
        setAnswers(savedState.answers)
        setStep(savedState.step)
      }
      setHasLoaded(true)
    }, 0)
    return () => window.clearTimeout(t)
  }, [])

  const update = useCallback((patch: Partial<AssessmentAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }))
  }, [])

  useEffect(() => {
    if (!hasLoaded) return
    const state = JSON.stringify({ answers, step })
    try {
      localStorage.setItem(STORAGE_KEY, state)
    } catch {
      /* storage unavailable */
    }
  }, [answers, step, hasLoaded])

  const report = useMemo(() => computeReport(answers), [answers])

  useEffect(() => {
    if (step !== "analysis") return
    let cancelled = false
    const saved = saveAssessment(answers, report)
    saved
      .then((res) => {
        if (!cancelled) setPermalink(res.permalink)
      })
      .catch((err) => {
        console.error("Failed to save assessment", err)
      })
    return () => {
      cancelled = true
    }
  }, [step, answers, report])

  const goTo = (next: StepId) => setStep(next)

  const progress = Math.min(1, stepIndex(step) / questionSteps.length)

  const handleEmailMe = async () => {
    if (!permalink) return
    const id = permalink.replace("https://www.awoken.in/assessment/", "")
    await sendPreviewEmail(id)
    setEmailSent(true)
  }

  const isActiveStep = questionSteps.includes(step) || step === "analysis" || step === "report"

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAnswers(emptyAnswers)
    setStep("welcome")
    setPermalink(undefined)
    setEmailSent(false)
  }

  return (
    <div className="min-h-screen">
      {step !== "welcome" && isActiveStep && (
        <div className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 py-4 flex items-center gap-4">
            {step !== "analysis" && (
              <button
                type="button"
                onClick={() => {
                  if (step === "report") {
                    reset()
                    return
                  }
                  const idx = stepIndex(step)
                  if (idx > 1) goTo(allSteps[idx - 1])
                }}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-black/[0.04] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                aria-label={step === "report" ? "Back to assessment start" : "Go back"}
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <div className="flex-1">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span>
                  {step === "analysis" ? "Awoken Intelligence Engine" : step === "report" ? "Report Ready" : `Step ${stepIndex(step)} of ${questionSteps.length}`}
                </span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-[#fb923c]"
                  initial={false}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "welcome" ? (
        <WelcomeStep onStart={() => goTo("profile")} />
      ) : (
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 pt-16 sm:pt-20 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {step === "profile" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("leads")}>
                <ProfileStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "leads" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("sales")}>
                <LeadsStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "sales" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("operations")}>
                <SalesStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "operations" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("technology")}>
                <OperationsStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "technology" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("visibility")}>
                <TechnologyStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "visibility" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("goals")}>
                <VisibilityStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "goals" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("contact")}>
                <GoalsStep answers={answers} update={update} />
              </QuestionFrame>
            )}
            {step === "contact" && (
              <QuestionFrame step={step} answers={answers} next={() => goTo("analysis")}>
                <ContactStep answers={answers} update={update} />
              </QuestionFrame>
            )}

            {step === "analysis" && (
              <AnalysisStep businessName={answers.businessName} onComplete={() => goTo("report")} />
            )}

            {step === "report" && (
              <ReportStep
                report={report}
                answers={answers}
                permalink={permalink}
                onEmailMe={handleEmailMe}
                emailSent={emailSent}
              />
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function QuestionFrame({ step, answers, next, children }: {
  step: StepId; answers: AssessmentAnswers; next: () => void; children: React.ReactNode
}) {
  const canProceed = canContinue(step, answers)
  const hint =
    step === "operations" ? "Select at least one" :
    step === "technology" ? "Select at least one" :
    step === "goals" ? "Pick at least one priority" :
    step === "sales" ? "Map at least 4 stages" :
    step === "contact" ? "Name, valid email and consent required" : "\u00A0"

  return (
    <div>
      {children}
      <div className="mt-10 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{hint}</p>
        <button type="button" onClick={next} disabled={!canProceed} className={cn(PRIMARY, "min-w-[140px] disabled:opacity-40")}>
          {step === "contact" ? (
            <>
              Generate Business Intelligence Report
              <ArrowRight className="size-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}


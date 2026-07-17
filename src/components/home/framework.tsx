"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useMotionValue } from "framer-motion"
import type { Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { Search, Stethoscope, Target, Building2, LineChart, Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Discover",
    subtitle: "Understand before you act",
    description: "We immerse ourselves in your business operations before making a single recommendation.",
    items: [
      "Interview key stakeholders across departments",
      "Shadow workflows to see the real process",
      "Map goals, constraints, and success metrics",
    ],
  },
  {
    title: "Diagnose",
    subtitle: "Find the friction points",
    description: "We identify exactly where your business is leaking time, money, and efficiency.",
    items: [
      "Pinpoint operational bottlenecks",
      "Surface repetitive manual work",
      "Quantify hidden inefficiencies",
    ],
  },
  {
    title: "Prioritize",
    subtitle: "Focus on what matters most",
    description: "Not every problem needs solving. We focus on changes that create disproportionate value.",
    items: [
      "Score each opportunity by impact vs effort",
      "Recommend the highest-value improvements first",
      "Skip automation that doesn't move the needle",
    ],
  },
  {
    title: "Implement",
    subtitle: "Build systems that work",
    description: "We deploy custom AI systems, dashboards, and automations tailored to your business.",
    items: [
      "Build and deploy custom AI pipelines",
      "Connect dashboards and automate workflows",
      "Integrate internal tools and ERP modules",
    ],
  },
  {
    title: "Measure",
    subtitle: "Optimize continuously",
    description: "We track outcomes and iterate so your systems keep delivering results.",
    items: [
      "Track key improvements against baseline metrics",
      "Iterate based on real usage data",
      "Continuously optimize for changing conditions",
    ],
  },
]

const stepIcons = [Search, Stethoscope, Target, Building2, LineChart] as const
const stepLabels = ["Discover", "Diagnose", "Prioritize", "Implement", "Measure"]

const PER_STEP_VH = 70
const CONTAINER_VH = steps.length * PER_STEP_VH

const mobileCardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.18, ease: "easeOut" },
  }),
}

const checkVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: -12,
    transition: { duration: 0.25, ease: "easeOut" },
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.35, ease: "easeOut" },
  }),
}

const desktopCardVariants: Variants = {
  hiddenAbove: {
    opacity: 0,
    scale: 0.98,
    y: -30,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 24,
      mass: 1.2,
    },
  },
  hiddenBelow: {
    opacity: 0,
    scale: 0.98,
    y: 40,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

function DesktopCard({
  step,
  index,
  currentStep,
}: {
  step: (typeof steps)[number]
  index: number
  currentStep: number
}) {
  const Icon = stepIcons[index]
  const isActive = index === currentStep

  let variant: string
  if (index === currentStep) {
    variant = "active"
  } else if (index < currentStep) {
    variant = "hiddenAbove"
  } else {
    variant = "hiddenBelow"
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-2 sm:px-0"
      initial={false}
      animate={variant}
      variants={desktopCardVariants}
      style={{
        zIndex: steps.length - index,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="w-full mx-auto">
        <div
          className={cn(
            "rounded-2xl sm:rounded-[24px] border bg-background p-5 sm:p-6 lg:p-8 transition-all duration-500 ease-out",
            isActive
              ? "border-orange-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              : "border-orange-200/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)]",
          )}
        >
          <div className="flex items-start gap-5 sm:gap-6 mb-7">
            <motion.div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              animate={
                isActive
                  ? { scale: 1.08, backgroundColor: "rgba(249,115,22,0.12)" }
                  : { scale: 1, backgroundColor: "rgba(249,115,22,0.04)" }
              }
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
            </motion.div>
            <div className="min-w-0">
              <span className="inline-block text-[11px] sm:text-xs font-semibold text-accent px-3 py-1 rounded-md bg-accent/5 mb-2 tracking-wide">
                Step {index + 1}
              </span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-base font-medium text-muted-foreground/80 mt-1">
                {step.subtitle}
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
            {step.description}
          </p>
          <ul className="space-y-3 pl-3">
            {step.items.map((item, i) => (
              <motion.li
                key={item}
                custom={i}
                variants={checkVariants}
                initial="hidden"
                animate="visible"
                className="text-sm sm:text-base text-muted-foreground flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                </div>
                <span className="leading-snug">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function MobileCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const Icon = stepIcons[index]
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={mobileCardVariants}
    >
      <div className="group rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <div>
            <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/5">
              Step {index + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold mt-0.5">{step.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
        <ul className="space-y-2">
          {step.items.map((item) => (
            <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
              <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function StepIndicator({ index, currentStep }: { index: number; currentStep: number }) {
  const isPast = index < currentStep
  const isActive = index === currentStep

  return (
    <div className="flex items-center gap-1 py-[11px] group select-none">
      <div className="relative z-10">
        <div className="bg-neutral-50 rounded-full p-[3px]">
          {isActive && (
            <motion.span
              className="absolute inset-[-2px] rounded-full border-2 border-accent"
              aria-hidden
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", repeatType: "reverse" }}
            />
          )}
          <div
            className={cn(
              "w-[32px] h-[32px] rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ease-out",
              isPast && "border-accent bg-accent text-accent-foreground",
              isActive && "border-accent bg-accent text-accent-foreground scale-110 shadow-[0_0_0_4px_rgba(249,115,22,0.15)]",
              !isPast && !isActive && "border-border/50 text-muted-foreground/35",
            )}
          >
            {isPast ? (
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            ) : isActive ? (
              <motion.div
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
        </div>
      </div>
      <span
        className={cn(
          "text-sm font-medium hidden lg:inline transition-all duration-300",
          isActive ? "text-foreground font-semibold" : isPast ? "text-muted-foreground/70" : "text-muted-foreground/35",
        )}
      >
        {stepLabels[index]}
      </span>
    </div>
  )
}

export function Framework() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const currentStepRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Direction-aware smoothing: forward is slow cinematic, reverse is fast escape
  const smoothProgress = useMotionValue(0)
  const prevRawRef = useRef(0)

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const prev = smoothProgress.get()
      const isReverse = v < prevRawRef.current
      prevRawRef.current = v

      // Forward (0.2): slow cinematic follow
      // Reverse (0.85): ~4x faster for quick escape
      const factor = isReverse ? 0.85 : 0.2
      smoothProgress.set(prev + (v - prev) * factor)
    })
    return unsub
  }, [scrollYProgress, smoothProgress])

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      const newStep = Math.min(Math.max(Math.floor(v * steps.length), 0), steps.length - 1)
      if (newStep !== currentStepRef.current) {
        currentStepRef.current = newStep
        setCurrentStep(newStep)
      }
    })
    return unsub
  }, [smoothProgress])

  return (
    <section ref={sectionRef} id="framework-section" className="bg-neutral-50">
      <div className="md:hidden">
        <div className="mx-auto w-full max-w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
            <SectionHeader
            eyebrow="The Awoken Framework"
            title="A structured approach to operational clarity."
            description="Every engagement follows our proprietary five-step framework. We begin by understanding how your business operates, identify where time and revenue are being lost, prioritize the highest-impact opportunities, implement the right AI systems, and continuously measure outcomes."
          />
        </div>
        <div className="space-y-6 px-4 sm:px-6 pb-16">
          {steps.map((step, i) => (
            <MobileCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: `${CONTAINER_VH}vh` }}
      >
        <div className="sticky top-[48px] h-[calc(100vh-48px)]">
          <div className="flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 md:pt-20">
            <div className="shrink-0 mb-14 text-center">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                The Awoken Framework
              </p>
              <h2 className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-snug mx-auto max-w-3xl">
                A structured approach to operational clarity.
              </h2>
              <p className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mx-auto max-w-[700px]">
                Every engagement follows our proprietary five-step framework. We begin by understanding how your business operates, identify where time and revenue are being lost, prioritize the highest-impact opportunities, implement the right AI systems, and continuously measure outcomes.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-[auto_minmax(0,1fr)] gap-10 min-h-0">
                <div className="w-full pt-[50px]">
                  <div className="flex flex-col items-start gap-0 relative">
                    <div className="absolute left-[19px] top-[11px] bottom-[11px] w-px bg-border/30 rounded-full" />
                    <motion.div
                      className="absolute left-[19px] top-[11px] w-px bg-accent rounded-full origin-top"
                      style={{ scaleY: smoothProgress }}
                    />
                    {steps.map((_, i) => (
                      <StepIndicator key={i} index={i} currentStep={currentStep} />
                    ))}
                  </div>
                </div>

                <div className="min-w-0 w-full">
                  <div className="relative h-[57vh] w-full max-w-[790px] min-w-[700px] -mt-10 mx-auto">
                    {steps.map((step, i) => (
                      <DesktopCard
                        key={step.title}
                        step={step}
                        index={i}
                        currentStep={currentStep}
                      />
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

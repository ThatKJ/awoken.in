"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { Search, Stethoscope, Target, Building2, LineChart, Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

const cardVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 16 : direction < 0 ? -16 : 0,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -16 : direction < 0 ? 16 : 0,
    filter: "blur(4px)",
  })
}

function StepIndicator({ index, currentStep, onClick }: { index: number; currentStep: number; onClick: () => void }) {
  const isPast = index < currentStep
  const isActive = index === currentStep

  return (
    <button 
      onClick={onClick} 
      className="flex items-center gap-4 py-4 lg:py-5 group select-none text-left w-full relative z-10"
      aria-label={`Go to step ${index + 1}: ${stepLabels[index]}`}
    >
      <div className="relative shrink-0">
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
              "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300",
              isPast && "border-accent bg-accent text-accent-foreground",
              isActive && "border-accent bg-accent text-accent-foreground shadow-[0_0_0_4px_rgba(249,115,22,0.15)]",
              !isPast && !isActive && "border-border/60 text-muted-foreground/40 group-hover:border-accent/40",
            )}
          >
            {isPast ? (
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            ) : isActive ? (
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
        </div>
      </div>
      <span
        className={cn(
          "text-sm lg:text-base font-medium transition-all duration-300",
          isActive ? "text-foreground font-bold" : isPast ? "text-muted-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground/80",
        )}
      >
        {stepLabels[index]}
      </span>
    </button>
  )
}

export function Framework() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigateToStep = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1)
    setCurrentStep(newStep)
  }

  return (
    <section id="framework-section" className="bg-neutral-50 w-full py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <SectionHeader
            eyebrow="The Awoken Framework"
            title="A structured approach to operational clarity."
            description="Every engagement follows our proprietary five-step framework. We begin by understanding how your business operates, identify where time and revenue are being lost, prioritize the highest-impact opportunities, implement the right AI systems, and continuously measure outcomes."
            className="!mb-0"
          />
        </div>

        {/* Framework UI Container */}
        <div className="mx-auto max-w-[1100px] w-full">
          
          {/* Mobile: Horizontal Step Selector */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-6 mb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => navigateToStep(i)}
                className={cn(
                  "snap-start shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border",
                  currentStep === i 
                    ? "bg-accent border-accent text-accent-foreground shadow-sm" 
                    : "bg-background border-border/50 text-muted-foreground hover:border-accent/30"
                )}
                aria-label={`Go to step ${i + 1}: ${stepLabels[i]}`}
              >
                {i + 1}. {stepLabels[i]}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-16">
            
            {/* Desktop/Tablet: Vertical Step Navigation */}
            <div className="hidden md:flex shrink-0 w-[200px] lg:w-[240px] flex-col relative">
              <div className="absolute left-[19px] top-[32px] bottom-[32px] w-[1px] bg-border/40" />
              <div className="absolute left-[18px] top-[32px] bottom-[32px] w-[3px]">
                <motion.div
                  className="w-full bg-accent rounded-full origin-top"
                  initial={false}
                  animate={{ height: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                />
              </div>
              {steps.map((_, i) => (
                <StepIndicator key={i} index={i} currentStep={currentStep} onClick={() => navigateToStep(i)} />
              ))}
            </div>

            {/* Active Card Container */}
            <div className="flex-1 w-full min-w-0 relative">
              <motion.div layout className="w-full relative">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className="w-full"
                  >
                    {currentStep === steps.length ? (
                      // Completion State
                      <div className="rounded-2xl sm:rounded-[24px] border border-orange-200/50 bg-background p-8 sm:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center min-h-[400px] w-full">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                          <Check className="h-8 w-8" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Framework Complete</h3>
                        <p className="text-muted-foreground text-lg mb-10 max-w-md">
                          Five steps. One system built around your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                          <Button 
                            variant="ghost" 
                            onClick={() => navigateToStep(0)}
                            className="w-full sm:w-auto"
                          >
                            Review Again
                          </Button>
                          <Button 
                            variant="primary" 
                            className="rounded-full group w-full sm:w-auto hover:-translate-y-[1.5px] transition-all duration-200"
                            asChild
                          >
                            <Link href="/assessment">
                              Start Free Assessment <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Framework Step Card
                      <div className="rounded-2xl sm:rounded-[24px] border border-orange-200/50 bg-background p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col w-full h-full min-h-[400px]">
                        <div className="flex-1">
                          <div className="flex items-start gap-5 sm:gap-6 mb-7">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 bg-accent/10 mt-1">
                              {(() => {
                                const Icon = stepIcons[currentStep]
                                return <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                              })()}
                            </div>
                            <div className="min-w-0">
                              <span className="inline-block text-[11px] sm:text-xs font-semibold text-accent px-3 py-1 rounded-md bg-accent/5 mb-2 tracking-wide uppercase">
                                Step {currentStep + 1}
                              </span>
                              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-foreground">
                                {steps[currentStep].title}
                              </h3>
                              <p className="text-base sm:text-lg font-medium text-muted-foreground/80 mt-1.5">
                                {steps[currentStep].subtitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                            {steps[currentStep].description}
                          </p>
                          <ul className="space-y-4 pl-1 mb-10">
                            {steps[currentStep].items.map((item, i) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + (i * 0.1), duration: 0.3 }}
                                className="text-base sm:text-lg text-muted-foreground flex items-start gap-4"
                              >
                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                                </div>
                                <span className="leading-snug">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Navigation Footer */}
                        <div className="pt-6 sm:pt-8 border-t border-border/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-auto">
                          {currentStep > 0 ? (
                            <Button 
                              variant="ghost" 
                              className="text-muted-foreground w-full sm:w-auto"
                              onClick={() => navigateToStep(currentStep - 1)}
                            >
                              ← Previous
                            </Button>
                          ) : (
                            <div className="hidden sm:block" />
                          )}
                          
                          <Button 
                            variant="primary" 
                            className="rounded-full group w-full sm:w-auto text-[15px] px-6 sm:px-8 hover:-translate-y-[1.5px] transition-all duration-200"
                            onClick={() => navigateToStep(currentStep + 1)}
                          >
                            {currentStep === steps.length - 1 ? "Complete Framework" : `Next: ${steps[currentStep + 1].title}`}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


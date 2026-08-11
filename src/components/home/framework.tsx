"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { Search, Stethoscope, Target, Building2, LineChart, Check, ArrowRight, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    title: "Focus on what matters.",
    subtitle: "Understand before you act",
    description: "We immerse ourselves in your business operations before making a single recommendation. Every decision is grounded in real workflow data.",
    items: [
      "Interview key stakeholders across departments",
      "Shadow workflows to see the real process",
      "Map goals, constraints, and success metrics",
    ],
  },
  {
    title: "Find the friction points.",
    subtitle: "Identify the real issues",
    description: "We identify exactly where your business is leaking time, money, and efficiency. We look for patterns of repetitive manual work.",
    items: [
      "Pinpoint operational bottlenecks",
      "Surface repetitive manual work",
      "Quantify hidden inefficiencies",
    ],
  },
  {
    title: "Focus on what matters most.",
    subtitle: "Prioritize high-impact changes",
    description: "Not every problem needs solving. We focus on changes that create disproportionate value for your business.",
    items: [
      "Score each opportunity by impact vs effort",
      "Recommend the highest-value improvements first",
      "Skip automation that doesn't move the needle",
    ],
  },
  {
    title: "Build systems that work.",
    subtitle: "Deploy reliable automation",
    description: "We deploy custom AI systems, dashboards, and automations tailored to your business, integrating seamlessly with your existing tools.",
    items: [
      "Build and deploy custom AI pipelines",
      "Connect dashboards and automate workflows",
      "Integrate internal tools and ERP modules",
    ],
  },
  {
    title: "Optimize continuously.",
    subtitle: "Measure the business impact",
    description: "We track outcomes and iterate so your systems keep delivering results. You get visibility into how much time and money is being saved.",
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
  enter: { opacity: 0, y: 12, scale: 0.985, filter: "blur(2px)" },
  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, scale: 0.985, filter: "blur(2px)" }
}

const DiscoverVisual = () => (
  <div className="relative flex items-center justify-center w-full h-full">
     <motion.div 
       animate={{ rotate: 360 }} 
       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
       className="absolute w-24 h-24 sm:w-28 sm:h-28 border border-accent/20 rounded-full border-dashed"
     />
     <motion.div
       initial={{ scale: 0.8, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ duration: 0.5 }}
       className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-border/50 z-10"
     >
       <Search className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
     </motion.div>
  </div>
)

const DiagnoseVisual = () => (
  <div className="flex items-center gap-2 sm:gap-4 w-full h-full justify-center">
    <div className="w-10 sm:w-12 h-1.5 rounded-full bg-border/50" />
    <motion.div 
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1], backgroundColor: ["#fef08a", "#f97316", "#fef08a"] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent"
    />
    <div className="w-10 sm:w-12 h-1.5 rounded-full bg-border/50" />
  </div>
)

const PrioritizeVisual = () => (
  <div className="flex flex-col gap-2 sm:gap-3 items-center justify-center w-full h-full">
    <motion.div className="w-36 h-6 sm:h-8 bg-accent/10 rounded-md border border-accent/30 flex items-center px-3 gap-2">
      <div className="w-2 h-2 rounded-full bg-accent" />
      <div className="w-16 h-1.5 bg-accent/40 rounded-full" />
    </motion.div>
    <motion.div className="w-36 h-6 sm:h-8 bg-border/30 rounded-md flex items-center px-3 gap-2 opacity-50">
      <div className="w-2 h-2 rounded-full bg-border" />
      <div className="w-12 h-1.5 bg-border/50 rounded-full" />
    </motion.div>
    <motion.div className="w-36 h-6 sm:h-8 bg-border/30 rounded-md flex items-center px-3 gap-2 opacity-30">
      <div className="w-2 h-2 rounded-full bg-border" />
      <div className="w-10 h-1.5 bg-border/50 rounded-full" />
    </motion.div>
  </div>
)

const ImplementVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      animate={{ strokeDashoffset: [100, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <svg className="w-full h-full text-accent/40" stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="35%" y1="50%" x2="65%" y2="50%" strokeDasharray="4 4" />
      </svg>
    </motion.div>
    <div className="flex gap-12 sm:gap-16 items-center">
       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg border border-border/50 shadow-sm flex items-center justify-center z-10"><Building2 className="w-5 h-5 text-muted-foreground" /></div>
       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg border border-accent/20 shadow-sm flex items-center justify-center z-10"><Check className="w-5 h-5 text-accent" /></div>
    </div>
  </div>
)

const MeasureVisual = () => (
  <div className="flex items-end gap-1.5 sm:gap-2 h-16 sm:h-20">
    {[30, 50, 40, 70, 100].map((h, i) => (
      <motion.div 
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
        className={cn("w-4 sm:w-6 rounded-t-sm", i === 4 ? "bg-accent" : "bg-border/60")}
      />
    ))}
  </div>
)

const visualComponents = [DiscoverVisual, DiagnoseVisual, PrioritizeVisual, ImplementVisual, MeasureVisual]

function StepIndicator({ index, currentStep }: { index: number; currentStep: number }) {
  const isPast = index < currentStep
  const isActive = index === currentStep

  return (
    <div className="flex items-center gap-4 py-4 relative z-10 w-full group">
      <div className="relative shrink-0 flex items-center justify-center w-8 h-8">
        <div
          className={cn(
            "rounded-full flex items-center justify-center transition-all duration-500 ease-out",
            isPast ? "w-6 h-6 bg-accent text-accent-foreground shadow-sm" : 
            isActive ? "w-8 h-8 bg-accent shadow-[0_0_0_6px_rgba(249,115,22,0.15)] ring-1 ring-accent/30" : 
            "w-3 h-3 bg-border"
          )}
        >
          {isPast && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
        </div>
      </div>
      <span
        className={cn(
          "text-[15px] transition-all duration-500 ease-out",
          isActive ? "text-foreground font-semibold" : 
          isPast ? "text-muted-foreground font-medium" : 
          "text-muted-foreground/40 font-medium"
        )}
      >
        {stepLabels[index]}
      </span>
    </div>
  )
}

export function Framework() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const frameworkRef = useRef<HTMLElement>(null)
  const isInView = useInView(frameworkRef, { amount: 0.5 })
  const scrollData = useRef({ deltaY: 0, lastTransitionTime: 0 })

  const navigateToStep = (newStep: number) => {
    setCurrentStep(newStep)
    scrollData.current.lastTransitionTime = Date.now()
    scrollData.current.deltaY = 0
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isInView) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        if (currentStep < steps.length) navigateToStep(currentStep + 1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        if (currentStep > 0) navigateToStep(currentStep - 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isInView, currentStep])

  // Wheel interception
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px) and (hover: hover)").matches
    if (!isDesktop) return

    const handleWheel = (e: WheelEvent) => {
      if (!isInView) return

      const now = Date.now()
      
      // Cooldown period
      if (now - scrollData.current.lastTransitionTime < 800) {
        if ((currentStep === 0 && e.deltaY < 0) || (currentStep === steps.length && e.deltaY > 0)) {
          return // Let boundary scroll
        }
        e.preventDefault()
        return
      }

      // Boundary releases
      if (currentStep === 0 && e.deltaY < 0) {
        scrollData.current.deltaY = 0
        return
      }
      if (currentStep === steps.length && e.deltaY > 0) {
        scrollData.current.deltaY = 0
        return
      }

      // We are intercepting
      e.preventDefault()
      scrollData.current.deltaY += e.deltaY
      
      const threshold = 60
      if (Math.abs(scrollData.current.deltaY) > threshold) {
        const moveDir = scrollData.current.deltaY > 0 ? 1 : -1
        const newStep = Math.max(0, Math.min(steps.length, currentStep + moveDir))
        
        if (newStep !== currentStep) {
          navigateToStep(newStep)
        } else {
          scrollData.current.deltaY = 0 // reset if blocked
        }
      }
    }

    const section = frameworkRef.current
    if (section) {
      section.addEventListener("wheel", handleWheel, { passive: false })
    }
    return () => {
      if (section) {
        section.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isInView, currentStep])

  return (
    <section ref={frameworkRef} id="framework-section" className="bg-neutral-50 w-full pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-32 overflow-hidden relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 lg:mb-16">
          <SectionHeader
            eyebrow="The Awoken Framework"
            title="A structured approach to operational clarity."
            description="Every engagement follows our proprietary five-step framework. We begin by understanding how your business operates, identify where time and revenue are being lost, prioritize the highest-impact opportunities, implement the right AI systems, and continuously measure outcomes."
            className="!mb-0"
            descriptionClassName="!mt-6 md:!mt-7"
          />
        </div>

        {/* Framework UI Container */}
        <div className="mx-auto max-w-[1100px] w-full">
          
          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-16">
            
            {/* Desktop/Tablet: Vertical Step Navigation */}
            <div className="hidden md:flex shrink-0 w-[200px] lg:w-[220px] flex-col relative">
              <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[2px] bg-border/40" />
              <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[2px]">
                <motion.div
                  className="w-full bg-accent origin-top"
                  initial={false}
                  animate={{ height: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.7 }}
                />
              </div>
              {steps.map((_, i) => (
                <StepIndicator key={i} index={i} currentStep={currentStep} />
              ))}
              
              <AnimatePresence>
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[100%] mt-8 left-0 flex flex-col items-center gap-2 text-muted-foreground/60 text-xs font-medium w-full"
                  >
                    <span>Scroll to explore</span>
                    <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Card Container */}
            <div className="flex-1 w-full min-w-0 relative">
              <motion.div layout className="w-full relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentStep}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    {currentStep === steps.length ? (
                      // Completion State
                      <div className="rounded-2xl sm:rounded-[24px] border border-orange-200/50 bg-background p-8 sm:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center min-h-[400px] w-full">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                          <Check className="h-8 w-8" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Build what moves the business forward.</h3>
                        <p className="text-muted-foreground text-lg mb-10 max-w-md">
                          Five steps. One system built around your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                          <Button 
                            variant="primary" 
                            className="rounded-full group w-full sm:w-auto hover:-translate-y-[1.5px] transition-all duration-200"
                            asChild
                          >
                            <Link href="/assessment">
                              Start Your Assessment <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Framework Step Card
                      <div className="rounded-2xl sm:rounded-[24px] border border-orange-200/50 bg-background p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col w-full h-full">
                        
                        <div className="flex-1">
                          {/* Eyebrow & Label */}
                          <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block text-[11px] sm:text-xs font-bold text-accent tracking-widest uppercase">
                              STEP 0{currentStep + 1} / 05 — {stepLabels[currentStep]}
                            </span>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                            <div className="flex-1">
                              <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight leading-tight text-foreground mb-3">
                                {steps[currentStep].title}
                              </h3>
                              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                                {steps[currentStep].description}
                              </p>
                              
                              <ul className="space-y-4">
                                {steps[currentStep].items.map((item, i) => (
                                  <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.4 }}
                                    className="text-[15px] sm:text-base text-muted-foreground flex items-start gap-3"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                                    </div>
                                    <span className="leading-snug">{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="w-full lg:w-5/12 shrink-0">
                              <div className="w-full h-40 sm:h-48 rounded-xl bg-neutral-100/50 border border-neutral-200/60 flex items-center justify-center overflow-hidden">
                                {(() => {
                                  const Visual = visualComponents[currentStep]
                                  return <Visual />
                                })()}
                              </div>
                            </div>
                          </div>

                        </div>
                        
                        {/* Navigation Footer */}
                        <div className="pt-8 mt-10 border-t border-border/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
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
                            {currentStep === steps.length - 1 ? "See How Awoken Measures Impact" : `Next: ${stepLabels[currentStep + 1]}`}
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

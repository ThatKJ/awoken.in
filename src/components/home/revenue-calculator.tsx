"use client"

import { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { calculatorConfig } from "@/data/revenue-calculator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function RevenueCalculator() {
  const [values, setValues] = useState({
    monthlyLeads: 500,
    missedCalls: 30,
    avgValue: 15000,
    responseTime: 60,
  })

  const calculateLoss = () => {
    const missedRevenue = (values.monthlyLeads * values.missedCalls / 100) * values.avgValue
    const slowResponseLoss = values.monthlyLeads * 0.5 * values.avgValue * (values.responseTime > 5 ? 0.4 : 0.05)
    return Math.round(missedRevenue + slowResponseLoss)
  }

  const loss = calculateLoss()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 30, stiffness: 100 })
  const displayValue = useTransform(spring, (v) => {
    const formatted = new Intl.NumberFormat("en-IN").format(Math.round(v))
    return `₹${formatted}/month`
  })

  const updateValue = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    motionValue.set(0)
    setTimeout(() => motionValue.set(calculateLoss()), 50)
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {calculatorConfig.title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
              {calculatorConfig.description}
            </p>
            <div className="mt-8 space-y-6">
              {calculatorConfig.inputs.map((input) => (
                <div key={input.key}>
                  <label className="text-sm font-medium mb-2 block">
                    {input.label}
                  </label>
                  <input
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={(values as any)[input.key]}
                    onChange={(e) => updateValue(input.key, Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{(values as any)[input.key]}{input.suffix || ""}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background flex flex-col h-full p-6 lg:p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {calculatorConfig.resultLabel}
            </p>
            <motion.p className="text-4xl sm:text-5xl font-bold tracking-tight text-accent">
              {displayValue}
            </motion.p>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on your current metrics
            </p>
            <Link href={calculatorConfig.ctaHref} className="mt-8 inline-block">
              <Button variant="primary" size="lg">
                {calculatorConfig.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

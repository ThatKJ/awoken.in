"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.97]"
            >
              Stop Losing Revenue to Manual Work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-[700px]"
            >
              We design and implement AI systems that answer calls, qualify leads, automate follow-ups and eliminate repetitive work—so your team can focus on growing the business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/book">
                <Button variant="primary" size="xl">
                  Book Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="xl">
                  See Live Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <DashboardMockup mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

const DASHBOARD_WIDTH = 560

function DashboardMockup({
  mouseX,
  mouseY,
}: {
  mouseX: any
  mouseY: any
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const x = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const y = useTransform(mouseY, [-0.5, 0.5], [-12, 12])

  useEffect(() => {
    const updateScale = () => {
      if (!ref.current) return
      const parent = ref.current.parentElement
      if (!parent) return
      const parentW = parent.clientWidth
      setScale(parentW < DASHBOARD_WIDTH ? parentW / DASHBOARD_WIDTH : 1)
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl mx-auto w-full max-w-[1100px]"
    >
      <div className="aspect-[4/3] relative">
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: DASHBOARD_WIDTH,
            height: DASHBOARD_WIDTH * 0.75,
            transform: `scale(${scale})`,
          }}
        >
          {/* Browser Chrome */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-background border-b border-border flex items-center px-4 gap-2 z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-4 flex-1 max-w-xs h-6 rounded-md bg-surface flex items-center px-3 text-xs text-muted-foreground">
              app.awoken.in/dashboard
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="pt-14 p-5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Calls Today", value: "47", accent: false },
                { label: "Leads Qualified", value: "23", accent: false },
                { label: "Revenue Recovered", value: "₹1,82,400", accent: true },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-background border border-border p-3">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-lg font-semibold mt-0.5 ${stat.accent ? "text-accent" : ""}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 rounded-xl bg-background border border-border p-3">
                <p className="text-xs text-muted-foreground mb-2">Recent Calls</p>
                {[
                  { name: "Priya S.", status: "Qualified", time: "2 min ago" },
                  { name: "Rahul M.", status: "Booked", time: "8 min ago" },
                  { name: "Anita K.", status: "Follow-up", time: "15 min ago" },
                ].map((call) => (
                  <div
                    key={call.name}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-medium">{call.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{call.time}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                        {call.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-2 rounded-xl bg-background border border-border p-3 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground">AI Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">24/7 Receptionist online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

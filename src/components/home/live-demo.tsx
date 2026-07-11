"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Headphones, Play, Mic, MessageSquare } from "lucide-react"
import Link from "next/link"

export function LiveDemo() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Experience an AI Employee in Action
            </h2>
<p className="mt-4 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-[700px]">
               See how Awoken answers calls, qualifies leads, books appointments, and follows up automatically. Every conversation is designed to help businesses recover more revenue.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Answers instantly, 24/7",
                "Qualifies leads automatically",
                "Books appointments into your calendar",
                "Sends WhatsApp and email follow-ups",
                "Integrates with your CRM",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button variant="primary" size="lg">
                  Book a Live Demo
                  <Play className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-we-work">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="relative rounded-[32px] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />
        <div className="pt-8 pb-4 px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">AI Receptionist</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                02:34
              </motion.span>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Mic className="h-3.5 w-3.5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">AI</p>
                <p className="text-sm text-muted-foreground">
                  Thank you for calling. I can help you schedule an appointment. What time works best for you?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Caller</p>
                <p className="text-sm text-muted-foreground">
                  I'd like to book a consultation for next Tuesday.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-accent/30 rounded-full"
                animate={{
                  height: [4, Math.random() * 20 + 4, 4],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="rounded-lg border border-border p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium">CRM Sync</span>
            </div>
            <span className="text-xs text-muted-foreground">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

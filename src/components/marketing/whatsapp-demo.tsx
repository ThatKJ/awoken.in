"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { whatsappDemoScript } from "@/data/whatsapp-demo"
import { EASE_PREMIUM } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Light chat surface — no phone bezel, no WhatsApp logo/branding, no
 * black device stage. Messages reveal in sequence once the section
 * scrolls into view; reduced-motion visitors get the full script
 * immediately instead of a staged reveal.
 */
export function WhatsAppDemo() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <Section id="whatsapp-demo" className="bg-background-alt scroll-mt-16 lg:scroll-mt-20">
      <SectionHeader
        eyebrow="What the buyer experiences"
        title="One conversation, over WhatsApp."
        description="This is what a re-engaged lead actually looks like — not a chatbot demo, a real qualification conversation."
      />

      <div className="mx-auto max-w-md" ref={sectionRef}>
        <div className="rounded-2xl border border-border bg-background shadow-premium overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent font-semibold text-sm">
              A
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Awoken · via WhatsApp</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                Active conversation
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-3 px-4 py-5 sm:px-5">
            {whatsappDemoScript.map((message, i) => (
              <Bubble
                key={i}
                message={message}
                index={i}
                inView={inView}
                reduceMotion={!!shouldReduceMotion}
              />
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Example conversation</span> — illustrative, not a
          real customer exchange.
        </p>
      </div>
    </Section>
  )
}

function Bubble({
  message,
  index,
  inView,
  reduceMotion,
}: {
  message: { from: "awoken" | "lead"; text: string }
  index: number
  inView: boolean
  reduceMotion: boolean
}) {
  const isAwoken = message.from === "awoken"

  return (
    <motion.li
      initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.28,
        ease: EASE_PREMIUM,
        delay: reduceMotion ? 0 : Math.min(index * 0.35, 2.1),
      }}
      className={cn("flex", isAwoken ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isAwoken
            ? "bg-accent-light text-foreground rounded-tr-sm"
            : "bg-surface text-foreground rounded-tl-sm"
        )}
      >
        {message.text}
      </div>
    </motion.li>
  )
}

"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Megaphone,
  Inbox,
  PhoneOff,
  Sparkles,
  MessageCircle,
  MessageSquareText,
  CheckCircle2,
  MapPinned,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { EASE_PREMIUM } from "@/lib/motion"

/**
 * Bespoke lead-recovery visual for the hero. No dashboard mockup, no
 * numbers, no invented metrics — just the two paths a lead can take:
 * abandoned (muted, ends at "No response") vs. recovered by Awoken
 * (accent, continues through to site-visit intent). A single vertical
 * timeline reads identically at every breakpoint, so there's no separate
 * mobile layout to maintain.
 */
const abandonedPath = [
  { label: "Meta / portal lead", icon: Megaphone },
  { label: "Enters the CRM", icon: Inbox },
  { label: "No response", icon: PhoneOff, dropoff: true },
]

const recoveredPath = [
  { label: "Awoken picks it up", icon: Sparkles },
  { label: "WhatsApp follow-up", icon: MessageCircle },
  { label: "Buyer responds", icon: MessageSquareText },
  { label: "Qualified", icon: CheckCircle2 },
  { label: "Site-visit intent", icon: MapPinned, destination: true },
]

export function LeadRecoveryPipeline() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <ol className="relative">
        {abandonedPath.map((node, i) => (
          <PipelineNode
            key={node.label}
            node={node}
            index={i}
            isFirst={i === 0}
            tone="muted"
            reduceMotion={!!shouldReduceMotion}
          />
        ))}

        {/* Transition marker — the lead doesn't disappear, the follow-up does */}
        <li className="relative flex items-center gap-3 pl-[15px] py-2" aria-hidden="true">
          <span className="h-full w-px border-l border-dashed border-border" />
          <span className="text-xs text-muted-foreground/70 italic">
            the lead is still here — nobody followed up
          </span>
        </li>

        {recoveredPath.map((node, i) => (
          <PipelineNode
            key={node.label}
            node={node}
            index={i}
            isFirst={i === 0}
            isLast={i === recoveredPath.length - 1}
            tone="accent"
            reduceMotion={!!shouldReduceMotion}
          />
        ))}
      </ol>
    </div>
  )
}

interface Node {
  label: string
  icon: React.ElementType
  dropoff?: boolean
  destination?: boolean
}

function PipelineNode({
  node,
  index,
  isFirst,
  isLast,
  tone,
  reduceMotion,
}: {
  node: Node
  index: number
  isFirst?: boolean
  isLast?: boolean
  tone: "muted" | "accent"
  reduceMotion: boolean
}) {
  const Icon = node.icon
  const accent = tone === "accent"

  return (
    <motion.li
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : index * 0.08 }}
      className="relative flex items-center gap-3 py-1.5"
    >
      {!isFirst && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-[15px] -top-1.5 h-3 w-px",
            accent ? "bg-accent/40" : "bg-border"
          )}
        />
      )}
      <span
        className={cn(
          "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border",
          node.dropoff && "border-dashed border-border bg-background text-muted-foreground/60",
          !node.dropoff && !accent && "border-border bg-background text-muted-foreground",
          accent && !node.destination && "border-accent/30 bg-accent-light text-accent",
          node.destination && "border-accent bg-accent text-accent-foreground shadow-sm"
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
      <span
        className={cn(
          "text-sm",
          node.dropoff && "text-muted-foreground/60 line-through decoration-border",
          !node.dropoff && !accent && "text-muted-foreground font-medium",
          accent && "text-foreground font-semibold",
          node.destination && "text-foreground font-semibold"
        )}
      >
        {node.label}
      </span>
      {isLast && (
        <span className="ml-auto rounded-full bg-accent-light px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
          Recovered
        </span>
      )}
    </motion.li>
  )
}

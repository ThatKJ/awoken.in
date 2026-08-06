"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { AssessmentAnswers } from "@/data/assessment"
import { INPUT, LABEL, MUTED } from "./ui"
import { Mail, ShieldCheck, FileText, LinkIcon } from "lucide-react"

interface Props {
  answers: AssessmentAnswers
  update: (patch: Partial<AssessmentAnswers>) => void
}

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const containerStagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export function ContactStep({ answers, update }: Props) {
  const set = (patch: Partial<AssessmentAnswers>) => update(patch)

  return (
    <motion.div variants={containerStagger} initial="hidden" animate="show" className="w-full">
      <motion.div variants={stagger}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
          <Mail className="size-3.5" />
          Your report is ready to generate
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
          Where should we send your report?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We&apos;ll email you the full preview audit and a link to view it any time. No spam — one email, and only the
          intelligence you asked for.
        </p>
      </motion.div>

      <motion.div variants={stagger} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className={cn(LABEL, "mb-2")}>Your name</p>
            <input type="text" value={answers.contactName} onChange={(e) => set({ contactName: e.target.value })} placeholder="Priya Sharma" className={INPUT} />
          </div>
          <div>
            <p className={cn(LABEL, "mb-2")}>Email</p>
            <input type="email" value={answers.contactEmail} onChange={(e) => set({ contactEmail: e.target.value })} placeholder="priya@company.com" className={INPUT} />
          </div>
          <div>
            <p className={cn(LABEL, "mb-2")}>Phone <span className="normal-case tracking-normal text-muted-foreground">(optional)</span></p>
            <input type="tel" value={answers.contactPhone} onChange={(e) => set({ contactPhone: e.target.value })} placeholder="+91 98765 43210" className={INPUT} />
          </div>
          <div>
            <p className={cn(LABEL, "mb-2")}>Company website <span className="normal-case tracking-normal text-muted-foreground">(optional)</span></p>
            <input type="text" value={answers.companyWebsite} onChange={(e) => set({ companyWebsite: e.target.value })} placeholder="company.com" className={INPUT} />
          </div>
        </div>
        <div>
          <p className={cn(LABEL, "mb-2")}>LinkedIn <span className="normal-case tracking-normal text-muted-foreground">(optional)</span></p>
          <input type="text" value={answers.linkedin} onChange={(e) => set({ linkedin: e.target.value })} placeholder="linkedin.com/in/you" className={INPUT} />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4">
          <input
            type="checkbox"
            checked={answers.consent}
            onChange={(e) => set({ consent: e.target.checked })}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-accent"
          />
          <span className="text-sm leading-relaxed text-muted-foreground">
            I agree to receive my Business Intelligence Report and related insights. Awoken never shares your business
            data with third parties.
          </span>
        </label>
      </motion.div>

      <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
          <ShieldCheck className="size-4 shrink-0 text-accent" />
          <span className={cn("text-xs leading-snug", MUTED)}>Never share your business data</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
          <FileText className="size-4 shrink-0 text-accent" />
          <span className={cn("text-xs leading-snug", MUTED)}>Preview audit + secure report link</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
          <LinkIcon className="size-4 shrink-0 text-accent" />
          <span className={cn("text-xs leading-snug", MUTED)}>No spam — one email, nothing more</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

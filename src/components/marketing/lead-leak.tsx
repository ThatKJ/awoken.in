import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Reveal } from "@/components/shared/reveal"
import { Megaphone, Inbox, PhoneOff, Layers, ArrowRight, Sparkles, MessageCircle, Users } from "lucide-react"

const today = [
  { label: "Lead generated", icon: Megaphone },
  { label: "Sales rep calls", icon: Inbox },
  { label: "No answer", icon: PhoneOff },
  { label: "Fresh leads arrive", icon: Layers },
]

const withAwoken = [
  { label: "Old lead", icon: Inbox },
  { label: "Awoken re-engages", icon: Sparkles },
  { label: "WhatsApp response", icon: MessageCircle },
  { label: "Human handoff", icon: Users },
]

function FlowRow({ steps, tone }: { steps: typeof today; tone: "muted" | "accent" }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 sm:gap-x-3">
      {steps.map((step, i) => {
        const Icon = step.icon
        const isLast = i === steps.length - 1
        return (
          <div key={step.label} className="flex items-center gap-2 sm:gap-3">
            <div
              className={
                "flex items-center gap-2 rounded-full border px-3.5 py-2 sm:px-4 sm:py-2.5 " +
                (tone === "accent"
                  ? "border-accent/25 bg-accent-light text-accent"
                  : "border-border bg-background text-muted-foreground")
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              <span
                className={
                  "text-sm font-medium whitespace-nowrap " +
                  (tone === "accent" ? "text-foreground" : "text-muted-foreground")
                }
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-border" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function LeadLeak() {
  return (
    <Section id="lead-leak" className="bg-background-alt scroll-mt-16 lg:scroll-mt-20">
      <SectionHeader
        eyebrow="The lead leak"
        title="You paid for the lead. Don't lose it after one unanswered call."
        description="Fresh leads keep arriving. Your team's attention goes to them first — and the older lead quietly gets buried in the CRM, not because anyone gave up on it, but because there was never enough time to get back to it."
      />

      <div className="mx-auto max-w-3xl space-y-10">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            What usually happens
          </p>
          <FlowRow steps={today} tone="muted" />
        </Reveal>

        <div className="mx-auto max-w-lg rounded-xl border border-border bg-background px-6 py-5 text-center">
          <p className="text-sm sm:text-base font-medium text-foreground">
            Your CRM remembers every lead.
            <br className="hidden sm:block" /> Your sales team cannot follow every lead forever.
          </p>
        </div>

        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent mb-5">
            What Awoken does instead
          </p>
          <FlowRow steps={withAwoken} tone="accent" />
        </Reveal>
      </div>
    </Section>
  )
}

import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { PilotForm } from "@/components/forms/pilot-form"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ShieldCheck, Layers, UserCheck, Ban } from "lucide-react"
import { PageViewTracker } from "@/components/analytics/page-view-tracker"

export const metadata: Metadata = {
  title: "Run a Real-Estate Lead Reactivation Pilot",
  description:
    "Tell Awoken about your current real-estate lead pipeline and explore a pilot for re-engaging old, unresponsive leads over WhatsApp.",
  alternates: { canonical: "https://www.awoken.in/pilot" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Run a Real-Estate Lead Reactivation Pilot | Awoken",
    description:
      "Tell Awoken about your current real-estate lead pipeline and explore a pilot for re-engaging old, unresponsive leads over WhatsApp.",
    url: "https://www.awoken.in/pilot",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Run a pilot with Awoken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Run a Real-Estate Lead Reactivation Pilot | Awoken",
    description:
      "Tell Awoken about your current real-estate lead pipeline and explore a pilot for re-engaging old, unresponsive leads over WhatsApp.",
    images: ["/og-image.png"],
  },
}

const lowRiskPoints = [
  { icon: Layers, title: "Old leads only", description: "The pilot uses a segment you've already written off — not fresh demand." },
  { icon: Ban, title: "No CRM replacement", description: "Awoken works alongside your existing CRM, not instead of it." },
  { icon: UserCheck, title: "Human review first", description: "We review your submission before anything else happens." },
  { icon: ShieldCheck, title: "No customer data yet", description: "This form asks about your operation — not your lead database." },
]

const nextSteps = [
  "We review the lead workflow you submitted.",
  "We confirm whether the pilot is a good fit.",
  "If it is, we'll agree on a safe way to transfer an old lead segment.",
  "Awoken then scopes the re-engagement test.",
]

const faqs = [
  {
    q: "Will you ask for my customer database right away?",
    a: "No. This form only asks about your company and lead pipeline. If a pilot moves forward, we'll agree on a secure way to transfer a lead segment separately.",
  },
  {
    q: "What if we're not a good fit?",
    a: "We'll tell you directly. There's no obligation, and nothing further happens with your information beyond reviewing this submission.",
  },
  {
    q: "Do I need to replace my CRM to try this?",
    a: "No. Awoken works alongside your existing CRM rather than replacing it.",
  },
  {
    q: "How is my information used?",
    a: "Only to evaluate and follow up on your pilot request. See our Privacy Policy for details.",
  },
]

export default function PilotPage() {
  return (
    <>
      <PageViewTracker event="pilot_page_view" />
      <Section size="hero" className="bg-background">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-eyebrow font-semibold uppercase text-accent mb-5">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            Run a pilot
          </p>
          <h1 className="text-h1 text-foreground">Start with the leads your team already gave up on.</h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Tell us how your current lead pipeline works. If Awoken looks like a fit, we&apos;ll scope a pilot
            using a segment of old, unresponsive leads — without replacing your CRM.
          </p>
        </div>
      </Section>

      <Section size="small" className="bg-background-alt">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {lowRiskPoints.map((point) => {
            const Icon = point.icon
            return (
              <div key={point.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-light">
                  <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.25} />
                </div>
                <p className="text-sm font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="mx-auto max-w-xl">
          <PilotForm />
        </div>
      </Section>

      <Section size="small" className="bg-background-alt">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h3 text-foreground text-center mb-8">What happens next</h2>
          <ol className="space-y-4">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background border border-border text-sm font-semibold text-foreground">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section size="small" className="bg-background">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h3 text-foreground text-center mb-8">Questions before you submit</h2>
          <Accordion type="single" collapsible>
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  )
}

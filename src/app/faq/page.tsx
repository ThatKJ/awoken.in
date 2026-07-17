import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Awoken's Business Intelligence Audit, AI implementation, and consulting services.",
  openGraph: { title: "FAQ | Awoken", description: "Frequently asked questions about our services.", url: "https://awoken.in/faq", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken FAQ" }] },
  twitter: { card: "summary_large_image", title: "FAQ | Awoken", description: "Frequently asked questions about our services.", images: ["/og-image.png"] },
}

const faqItems = [
  { question: "What is the Business Intelligence Audit?", answer: "The Business Intelligence Audit is a 30-45 minute strategy session where we analyze your business operations, identify bottlenecks, and uncover revenue opportunities. You'll receive a detailed report with recommendations at no cost." },
  { question: "How long does implementation take?", answer: "Timelines depend on scope. A single workflow automation can be deployed in 2-3 weeks. Complex multi-system integrations typically take 4-8 weeks." },
  { question: "Do you work with small businesses?", answer: "Yes. We work with businesses of all sizes, from small teams to multi-location operations. Our solutions are tailored to your scale and budget." },
  { question: "What industries do you serve?", answer: "We work across service-based industries including home services, healthcare, professional services, real estate, retail, and hospitality." },
]

export default function FAQPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">FAQ</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Answers to the questions we hear most often.
          </p>
        </div>
      </Section>
      <Section className="bg-background-alt">
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  )
}

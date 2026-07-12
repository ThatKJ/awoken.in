import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { integrationCategories } from "@/data/integrations"

export const metadata: Metadata = {
  title: "Integrations — Business Intelligence & Implementation Consultancy",
  description: "We work with your existing tools. Every system we build connects with your CRM, phone system, calendar, and more.",
}

export default function IntegrationsPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Integrations
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              We work with your existing tools. Every system we build is designed to connect with what you already use.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-20 md:pb-24 lg:pb-[120px]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-border p-3 hover:border-accent/30 transition-colors"
                    >
                      <p className="text-base font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="rounded-xl border border-border bg-surface p-6 lg:p-8 max-w-2xl">
            <h2 className="text-2xl font-semibold mb-3">Our Tech Stack</h2>
            <p className="text-sm text-muted-foreground mb-4">
              We select the best technology for each use case. Here is the stack we work with most frequently.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { category: "AI Models", items: "OpenAI, Anthropic, Gemini" },
                { category: "Voice", items: "Retell AI, ElevenLabs, Twilio" },
                { category: "Automation", items: "n8n, Make" },
                { category: "CRM", items: "HubSpot, GoHighLevel, Salesforce" },
                { category: "Databases", items: "Supabase, PostgreSQL" },
                { category: "Messaging", items: "WhatsApp, SMS, Email" },
                { category: "Scheduling", items: "Cal.com, Google Calendar" },
                { category: "Payments", items: "Stripe, Razorpay" },
              ].map((group) => (
                <div key={group.category}>
                  <p className="text-sm font-medium text-muted-foreground">{group.category}</p>
                  <p className="text-sm">{group.items}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

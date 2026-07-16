import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { integrationCategories } from "@/data/integrations"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "We work with your existing tools. Every system we build connects with your CRM, phone system, calendar, email, and business applications.",
  openGraph: {
    title: "Integrations | Awoken",
    description:
      "We work with your existing tools. Every system we build connects with your CRM, phone system, calendar, email, and business applications.",
    url: "https://awoken.in/integrations",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Integrations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations | Awoken",
    description:
      "We work with your existing tools. Every system we build connects with your CRM, phone system, calendar, email, and business applications.",
    images: ["/og-image.png"],
  },
}

export default function IntegrationsPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
          <div className="max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Integrations
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We work with your existing tools. Every system we build is designed to connect with what you already use.
            </p>
          </div>
      </Section>
      <Section className="bg-background-alt">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {integrationCategories.map((category) => (
              <div key={category.name}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-border p-3 hover:border-accent/20 hover:-translate-y-1 transition-all duration-300 ease-out"
                    >
                      <p className="text-base font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </Section>
      <Section className="bg-background">
          <div className="rounded-xl border border-border bg-surface p-6 lg:p-8 max-w-2xl mx-auto">
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
                <div key={group.category} className="flex flex-col items-center">
                  <p className="text-sm font-medium text-muted-foreground text-center">{group.category}</p>
                  <p className="text-sm text-center">{group.items}</p>
                </div>
              ))}
            </div>
          </div>
      </Section>
    </>
  )
}

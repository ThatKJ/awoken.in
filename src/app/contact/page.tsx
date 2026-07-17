import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { Mail, Clock, CalendarCheck, Shield, ArrowRight } from "lucide-react"
import { CONTACT_EMAIL } from "@/lib/constants"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Awoken to book a free Business Intelligence Audit. Discover where AI and automation can create the biggest impact in your business operations.",
  openGraph: {
    title: "Contact | Awoken",
    description:
      "Contact Awoken to book a free Business Intelligence Audit. Discover where AI and automation can create the biggest impact in your business.",
    url: "https://awoken.in/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Awoken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Awoken",
    description:
      "Contact Awoken to book a free Business Intelligence Audit. Discover where AI and automation can create the biggest impact in your business.",
    images: ["/og-image.png"],
  },
}

export default function ContactPage() {
  return (
    <Section size="hero" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Let's Understand Your Business
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Book a free Business Intelligence Audit and discover where operational improvements can create the biggest impact in your business.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                  >
                    contact@awoken.in
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">Response Time</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Typically within 2 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">Business Hours</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mon–Sat, 9 AM – 7 PM IST</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 rounded-xl border border-border bg-surface p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Every consultation is confidential. We respect your privacy and never share your information.
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
              <Link href="/book">
                <Button variant="primary" size="xl" className="w-full sm:w-auto text-sm sm:text-base">
                  Book Free Audit
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-border shadow-sm overflow-hidden">
              <iframe
                src="https://cal.com/awoken-in/strategy-call?embed=1"
                width="100%"
                height="650"
                frameBorder="0"
                title="Book a Strategy Call"
                className="w-full min-h-[500px] sm:min-h-[700px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
    </Section>
  )
}

import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Mail, Video, ListChecks, Home, BookOpen, PlayCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description:
    "Your Business Intelligence Audit is confirmed. We'll review your business operations before the meeting so we can focus on solutions.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Booking Confirmed | Awoken",
    description:
      "Your Business Intelligence Audit is confirmed. We'll review your business operations before the meeting so we can focus on solutions.",
    url: "https://awoken.in/thank-you",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Booking Confirmed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Confirmed | Awoken",
    description:
      "Your Business Intelligence Audit is confirmed.",
    images: ["/og-image.png"],
  },
}

export default function ThankYouPage() {
  return (
    <>
    <Section size="hero" className="bg-background pt-28 md:pt-36">
      <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            You&apos;re booked.
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              We&apos;ll review your business before the meeting so we can spend our time discussing solutions instead of asking basic questions. Your Business Intelligence Audit is confirmed.
            </p>
            <div className="mt-8 text-left max-w-sm mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-base">Calendar invite sent</span>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-base">Confirmation email sent</span>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-base">Google Meet link included</span>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-base">Prepare your biggest workflow challenges</span>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <Button variant="primary" size="lg">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Resources
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  See Live Demo
                </Button>
              </Link>
            </div>
          </div>
      </Section>
    </>
  )
}

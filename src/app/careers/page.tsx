import type { Metadata } from "next"
import { Section } from "@/components/shared/section"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Awoken and help businesses transform their operations through AI. View open positions and apply today.",
  openGraph: { title: "Careers | Awoken", description: "Join Awoken and help businesses transform their operations through AI.", url: "https://awoken.in/careers", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Careers at Awoken" }] },
  twitter: { card: "summary_large_image", title: "Careers | Awoken", description: "Join Awoken and help businesses transform their operations through AI.", images: ["/og-image.png"] },
}

export default function CareersPage() {
  return (
    <Section size="hero" className="bg-background">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Careers</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
          We&apos;re building the future of business intelligence. Join us.
        </p>
      </div>
    </Section>
  )
}

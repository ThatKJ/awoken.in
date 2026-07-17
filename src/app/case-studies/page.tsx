import type { Metadata } from "next"
import { Section } from "@/components/shared/section"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from real businesses. See how Awoken helped organizations recover revenue and optimize operations.",
  openGraph: { title: "Case Studies | Awoken", description: "Real results from real businesses.", url: "https://awoken.in/case-studies", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Case Studies" }] },
  twitter: { card: "summary_large_image", title: "Case Studies | Awoken", description: "Real results from real businesses.", images: ["/og-image.png"] },
}

export default function CaseStudiesPage() {
  return (
    <Section size="hero" className="bg-background">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Case Studies</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
          See how we&apos;ve helped businesses recover revenue and transform operations.
        </p>
      </div>
    </Section>
  )
}

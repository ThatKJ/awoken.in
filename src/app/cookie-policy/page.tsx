import type { Metadata } from "next"
import { Section } from "@/components/shared/section"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn how Awoken uses cookies and similar technologies on our website.",
  openGraph: { title: "Cookie Policy | Awoken", description: "Learn how Awoken uses cookies.", url: "https://awoken.in/cookie-policy", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Cookie Policy" }] },
  twitter: { card: "summary_large_image", title: "Cookie Policy | Awoken", description: "Learn how Awoken uses cookies.", images: ["/og-image.png"] },
}

export default function CookiePolicyPage() {
  return (
    <Section size="hero" className="bg-background">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
          This policy explains how we use cookies and similar tracking technologies on our website.
        </p>
      </div>
    </Section>
  )
}

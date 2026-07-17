import type { Metadata } from "next"
import { Section } from "@/components/shared/section"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI, business intelligence, automation, and operational efficiency from the Awoken team.",
  openGraph: { title: "Blog | Awoken", description: "Insights on AI, business intelligence, and operational efficiency.", url: "https://awoken.in/blog", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Blog" }] },
  twitter: { card: "summary_large_image", title: "Blog | Awoken", description: "Insights on AI, business intelligence, and operational efficiency.", images: ["/og-image.png"] },
}

export default function BlogPage() {
  return (
    <Section size="hero" className="bg-background">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Insights and stories on AI, automation, and business intelligence.
        </p>
      </div>
    </Section>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How We Work | Awoken",
  description:
    "Discover Awoken's proven Business Intelligence and AI implementation process—from discovery and strategy to deployment and optimization.",
  openGraph: {
    title: "How We Work | Awoken",
    description:
      "Discover Awoken's proven Business Intelligence and AI implementation process—from discovery and strategy to deployment and optimization.",
    url: "https://awoken.in/how-we-work",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "How Awoken Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | Awoken",
    description:
      "Discover Awoken's proven Business Intelligence and AI implementation process—from discovery and strategy to deployment and optimization.",
    images: ["/og-image.png"],
  },
}

export default function HowWeWorkLayout({ children }: { children: React.ReactNode }) {
  return children
}

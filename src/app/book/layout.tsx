import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Free Business Intelligence Audit",
  description:
    "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
  openGraph: {
    title: "Book a Free Business Intelligence Audit | Awoken",
    description:
      "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
    url: "https://awoken.in/book",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken — Book a Free Business Intelligence Audit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Business Intelligence Audit | Awoken",
    description:
      "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
    images: ["/og-image.png"],
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}

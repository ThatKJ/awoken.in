import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Free Business Intelligence Audit",
  description:
    "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
  alternates: { canonical: "https://www.awoken.in/book" },
  openGraph: {
    title: "Book a Free Business Intelligence Audit | Awoken",
    description:
      "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
    url: "https://www.awoken.in/book",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken — Book a Free Business Intelligence Audit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Business Intelligence Audit | Awoken",
    description:
      "Schedule a free 30-minute Business Intelligence Audit. We'll understand your business, identify operational bottlenecks, and show where improvements can create the biggest impact.",
    images: ["/og-image.svg"],
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}

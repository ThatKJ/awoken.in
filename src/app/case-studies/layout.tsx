import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies | Awoken",
  description:
    "Discover how Awoken helps businesses uncover opportunities, implement AI systems, and drive measurable business outcomes. Follow our growing collection of real client transformations.",
  alternates: { canonical: "https://www.awoken.in/case-studies" },
  openGraph: {
    title: "Case Studies | Awoken",
    description:
      "Discover how Awoken helps businesses uncover opportunities, implement AI systems, and drive measurable business outcomes.",
    url: "https://www.awoken.in/case-studies",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Awoken",
    description:
      "Discover how Awoken helps businesses uncover opportunities, implement AI systems, and drive measurable business outcomes.",
    images: ["/og-image.svg"],
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}

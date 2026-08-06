import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Discover Awoken's Business Intelligence Audit and custom AI implementation services. Every solution is tailored to your business goals.",
  alternates: { canonical: "https://www.awoken.in/pricing" },
  openGraph: {
    title: "Pricing | Awoken",
    description:
      "Discover Awoken's Business Intelligence Audit and custom AI implementation services. Every solution is tailored to your business goals.",
    url: "https://www.awoken.in/pricing",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Awoken",
    description:
      "Discover Awoken's Business Intelligence Audit and custom AI implementation services. Every solution is tailored to your business goals.",
    images: ["/og-image.svg"],
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

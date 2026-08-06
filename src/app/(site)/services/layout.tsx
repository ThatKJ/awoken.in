import type { Metadata } from "next"

const title = "Services"
const description =
  "Awoken's Business Intelligence Audit, AI implementation, workflow automation, and CRM integration services to eliminate revenue leaks and operational bottlenecks."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/services" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/services",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

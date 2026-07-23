import type { Metadata } from "next"

const title = "Solutions"
const description =
  "Awoken's AI-powered solutions for local businesses — from lead recovery and automated follow-ups to intelligent appointment booking and CRM automation."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/solutions" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/solutions",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}

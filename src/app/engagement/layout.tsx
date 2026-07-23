import type { Metadata } from "next"

const title = "Engagement Models"
const description =
  "Flexible engagement options — from one-time Business Intelligence Audits to ongoing AI implementation partnerships. Find the right fit for your business."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/engagement" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/engagement",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Engagement Models" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function EngagementLayout({ children }: { children: React.ReactNode }) {
  return children
}

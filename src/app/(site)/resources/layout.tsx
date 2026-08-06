import type { Metadata } from "next"

const title = "Resources"
const description =
  "Guides, templates, and insights on Business Intelligence, AI automation, operational efficiency, and revenue recovery for local businesses."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/resources" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/resources",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}

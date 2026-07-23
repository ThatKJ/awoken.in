import type { Metadata } from "next"

const title = "Integrations"
const description =
  "Awoken integrates with your existing tools — CRMs, calendars, phone systems, and business platforms — so AI works alongside your current workflow."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/integrations" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/integrations",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Integrations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children
}

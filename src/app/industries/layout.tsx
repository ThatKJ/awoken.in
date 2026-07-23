import type { Metadata } from "next"

const title = "Industries"
const description =
  "Awoken serves local businesses across healthcare, professional services, retail, home services, and more. Discover how Business Intelligence transforms your industry."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/industries" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/industries",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Industries" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

const title = "About"
const description =
  "Meet the team behind Awoken. We help businesses find hidden opportunities, eliminate operational bottlenecks, and implement AI that drives real results."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/about" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/about",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "About Awoken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Awoken and help build the future of Business Intelligence and AI-powered business transformation. We're looking for curious builders, designers, engineers, and problem solvers.",
  openGraph: {
    title: "Careers | Awoken",
    description:
      "Join Awoken and help build the future of Business Intelligence and AI-powered business transformation.",
    url: "https://awoken.in/careers",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Careers at Awoken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Awoken",
    description:
      "Join Awoken and help build the future of Business Intelligence and AI-powered business transformation.",
    images: ["/og-image.png"],
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Awoken",
  description:
    "Find answers about Awoken's Business Intelligence Audits, AI consulting, implementation process, pricing, security, and support.",
  openGraph: {
    title: "Frequently Asked Questions | Awoken",
    description:
      "Find answers about Awoken's Business Intelligence Audits, AI consulting, implementation process, pricing, security, and support.",
    url: "https://awoken.in/faq",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Awoken",
    description:
      "Find answers about Awoken's Business Intelligence Audits, AI consulting, implementation process, pricing, security, and support.",
    images: ["/og-image.png"],
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}

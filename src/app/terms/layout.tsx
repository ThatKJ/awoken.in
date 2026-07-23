import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Awoken",
  description:
    "Read the terms and conditions governing your use of Awoken's website and consulting services, including Business Intelligence Audits, AI implementation, and related offerings.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.awoken.in/terms" },
  openGraph: {
    title: "Terms & Conditions | Awoken",
    description:
      "Read the terms and conditions governing your use of Awoken's website and consulting services.",
    url: "https://www.awoken.in/terms",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Terms & Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Awoken",
    description:
      "Read the terms and conditions governing your use of Awoken's website and consulting services.",
    images: ["/og-image.svg"],
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}

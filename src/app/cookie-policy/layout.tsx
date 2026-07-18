import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Awoken",
  description:
    "Learn how Awoken uses cookies and similar tracking technologies on our website.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cookie Policy | Awoken",
    description:
      "Learn how Awoken uses cookies and similar tracking technologies on our website.",
    url: "https://awoken.in/cookie-policy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Cookie Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Awoken",
    description:
      "Learn how Awoken uses cookies and similar tracking technologies on our website.",
    images: ["/og-image.png"],
  },
}

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}

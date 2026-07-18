import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Awoken",
  description:
    "Learn how Awoken collects, uses, and protects your personal and business information when you book a consultation or use our services.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Awoken",
    description:
      "Learn how Awoken collects, uses, and protects your personal and business information.",
    url: "https://awoken.in/privacy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Awoken",
    description:
      "Learn how Awoken collects, uses, and protects your personal and business information.",
    images: ["/og-image.png"],
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}

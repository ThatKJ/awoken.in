import type { Metadata } from "next"

const title = "Contact"
const description =
  "Reach out to Awoken for Business Intelligence inquiries, partnership opportunities, or general questions. Book a free consultation or call us."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.awoken.in/contact" },
  openGraph: {
    title: `${title} | Awoken`,
    description,
    url: "https://www.awoken.in/contact",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Contact Awoken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Awoken`,
    description,
    images: ["/og-image.svg"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

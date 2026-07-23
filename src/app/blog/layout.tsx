import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Awoken",
  description:
    "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
  alternates: { canonical: "https://www.awoken.in/blog" },
  openGraph: {
    title: "Blog | Awoken",
    description:
      "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
    url: "https://www.awoken.in/blog",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Awoken Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Awoken",
    description:
      "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
    images: ["/og-image.svg"],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}

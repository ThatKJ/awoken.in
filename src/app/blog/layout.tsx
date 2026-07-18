import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Awoken",
  description:
    "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
  openGraph: {
    title: "Blog | Awoken",
    description:
      "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
    url: "https://awoken.in/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Awoken",
    description:
      "Explore practical insights on AI, Business Intelligence, automation, growth, and operational excellence from the team at Awoken.",
    images: ["/og-image.png"],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}

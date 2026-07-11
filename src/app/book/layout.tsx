import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book an AI Strategy Call | Awoken",
  description:
    "Schedule a complimentary 30-minute strategy session to identify workflow bottlenecks, revenue leakage, and automation opportunities for your business.",
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}

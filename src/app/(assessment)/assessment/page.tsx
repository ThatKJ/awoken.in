import type { Metadata } from "next"
import { AssessmentWizard } from "@/components/assessment/wizard"

export const metadata: Metadata = {
  title: "Business Intelligence Assessment",
  description:
    "Discover what's slowing your business down. Complete a 5-minute Business Intelligence Assessment and receive an AI-powered Business Health Report with your biggest operational opportunities.",
  alternates: { canonical: "https://www.awoken.in/assessment" },
  robots: { index: true, follow: true },
}

export default function AssessmentPage() {
  return <AssessmentWizard />
}
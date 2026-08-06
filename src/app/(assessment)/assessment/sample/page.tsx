import type { Metadata } from "next"
import { ReportStep } from "@/components/assessment/report"
import { computeReport, type AssessmentAnswers } from "@/data/assessment"

export const metadata: Metadata = {
  title: "Sample Business Intelligence Report | Awoken",
  robots: { index: false, follow: false },
}

const sampleAnswers: AssessmentAnswers = {
  businessName: "ABC Developers",
  industry: "Real Estate",
  employees: "26–50",
  revenue: "₹1Cr – ₹5Cr / year",
  monthlyLeads: "150–500",
  locations: "2–3 locations",
  businessModel: "B2B + B2C",
  primaryGoal: "Increase Revenue",
  leadChannels: ["Meta Ads", "Google Ads", "Website", "Referrals"],
  leadsPerMonth: "200–500",
  responseTime: "Same day",
  responder: "Reception",
  pipelineStages: ["Lead", "Assigned", "Call", "WhatsApp", "Qualified", "Meeting", "Booking"],
  stuckStage: "Qualification",
  operationalPains: ["Manual work", "Duplicate work", "No dashboard", "No follow-up system", "No automation", "No visibility"],
  tools: ["WhatsApp", "Email", "Excel"],
  visibilityScores: [
    { label: "Current pipeline value", score: 35 },
    { label: "Average response time", score: 40 },
    { label: "Highest-performing employee", score: 55 },
    { label: "Revenue lost this month", score: 20 },
    { label: "Lead conversion", score: 45 },
    { label: "Marketing ROI", score: 30 },
  ],
  rankedGoals: ["Increase Sales", "Improve Conversion", "Reduce Manual Work"],
  contactName: "Sample",
  contactEmail: "sample@example.com",
  contactPhone: "",
  companyWebsite: "",
  linkedin: "",
  consent: true,
}

const report = computeReport(sampleAnswers)

export default function SampleReportPage() {
  return (
    <div className="min-h-screen">
      <ReportStep report={report} answers={sampleAnswers} />
    </div>
  )
}
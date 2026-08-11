import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ReportStep } from "@/components/assessment/report"
import { computeReport, emptyAnswers, type AssessmentAnswers } from "@/data/assessment"
import { getServerSupabase, ASSESSMENT_TABLE } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Business Intelligence Report | Awoken",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Row {
  assessment_id: string
  business_name: string | null
  industry: string | null
  employees: string | null
  revenue: string | null
  monthly_leads: string | null
  locations: string | null
  business_model: string | null
  primary_goal: string | null
  lead_channels: string[] | null
  leads_per_month: string | null
  response_time: string | null
  responder: string | null
  pipeline_stages: string[] | null
  stuck_stage: string | null
  operational_pains: string[] | null
  tools: string[] | null
  visibility_scores: { label: string; score: number }[] | null
  ranked_goals: string[] | null
}

function answersFromRow(row: Row): AssessmentAnswers {
  return {
    ...emptyAnswers,
    businessName: row.business_name ?? "",
    industry: row.industry ?? "",
    employees: row.employees ?? "",
    revenue: row.revenue ?? "",
    monthlyLeads: row.monthly_leads ?? "",
    locations: row.locations ?? "",
    businessModel: row.business_model ?? "",
    primaryGoal: row.primary_goal ?? "",
    leadChannels: row.lead_channels ?? [],
    leadsPerMonth: row.leads_per_month ?? "",
    responseTime: row.response_time ?? "",
    responder: row.responder ?? "",
    pipelineStages: row.pipeline_stages ?? [],
    stuckStage: row.stuck_stage ?? "",
    operationalPains: row.operational_pains ?? [],
    tools: row.tools ?? [],
    visibilityScores: row.visibility_scores ?? emptyAnswers.visibilityScores,
    rankedGoals: row.ranked_goals ?? [],
  }
}

export default async function AssessmentReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await getServerSupabase()
    .from(ASSESSMENT_TABLE)
    .select(
      "assessment_id, business_name, industry, employees, revenue, monthly_leads, locations, business_model, primary_goal, lead_channels, leads_per_month, response_time, responder, pipeline_stages, stuck_stage, operational_pains, tools, visibility_scores, ranked_goals"
    )
    .eq("assessment_id", id)
    .single()

  if (error || !data) notFound()

  const answers = answersFromRow(data as unknown as Row)
  const report = computeReport(answers)

  return (
    <div className="min-h-screen">
      <ReportStep
        report={report}
        answers={answers}
        permalink={`https://www.awoken.in/assessment/${data.assessment_id}`}
      />
    </div>
  )
}
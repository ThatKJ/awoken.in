import { getSupabase, ASSESSMENT_TABLE } from "./supabase"
import type { AssessmentAnswers, ReportResult } from "@/data/assessment"

export interface SavedAssessment {
  id: string
  assessmentId: string
  permalink: string
}

export function generateAssessmentId(): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `AWD-${stamp}${rand}`
}

export async function saveAssessment(answers: AssessmentAnswers, report: ReportResult): Promise<SavedAssessment> {
  const assessmentId = generateAssessmentId()
  const byKey = (key: string) => report.categories.find((c) => c.key === key)

  const { data, error } = await getSupabase()
    .from(ASSESSMENT_TABLE)
    .insert({
      assessment_id: assessmentId,
      status: "new",
      business_name: answers.businessName,
      industry: answers.industry,
      employees: answers.employees,
      revenue: answers.revenue,
      monthly_leads: answers.monthlyLeads,
      locations: answers.locations,
      business_model: answers.businessModel,
      primary_goal: answers.primaryGoal,
      lead_channels: answers.leadChannels,
      leads_per_month: answers.leadsPerMonth,
      response_time: answers.responseTime,
      responder: answers.responder,
      pipeline_stages: answers.pipelineStages,
      stuck_stage: answers.stuckStage,
      operational_pains: answers.operationalPains,
      tools: answers.tools,
      visibility_scores: answers.visibilityScores,
      ranked_goals: answers.rankedGoals,
      contact_name: answers.contactName,
      contact_email: answers.contactEmail,
      contact_phone: answers.contactPhone,
      company_website: answers.companyWebsite,
      linkedin: answers.linkedin,
      consent: answers.consent,
      health_score: report.healthScore,
      maturity_score: report.maturityScore,
      ai_readiness: report.aiReadiness,
      risk_level: report.riskLevel,
      opportunity_level: report.opportunityLevel,
      lead_management: byKey("leadManagement")?.score ?? 0,
      sales_operations: byKey("salesOperations")?.score ?? 0,
      reporting: byKey("reporting")?.score ?? 0,
      automation: byKey("automation")?.score ?? 0,
      visibility: byKey("visibility")?.score ?? 0,
      customer_journey: byKey("customerJourney")?.score ?? 0,
      findings: report.bottlenecks,
      scores: report.categories,
      quick_wins: report.quickWins,
      benchmarks: report.benchmarks,
      opportunity_estimate: report.opportunityEstimate,
      lead_score: report.leadScore,
      estimated_deal: report.estimatedDeal,
      completed_at: new Date().toISOString(),
    })
    .select("id, assessment_id")
    .single()

  if (error) throw new Error(error.message)
  const row = data as { id: string; assessment_id: string }

  notifyInternal(assessmentId)

  return {
    id: row.id,
    assessmentId: row.assessment_id,
    permalink: `https://www.awoken.in/assessment/${row.assessment_id}`,
  }
}

export async function sendPreviewEmail(assessmentId: string): Promise<void> {
  await getSupabase().functions.invoke("assessment-notify", {
    body: { assessmentId, action: "email-preview" },
  })
}

function notifyInternal(assessmentId: string) {
  getSupabase()
    .functions.invoke("assessment-notify", {
      body: { assessmentId, action: "notify" },
    })
    .catch(() => {
      /* notification is best-effort */
    })
}

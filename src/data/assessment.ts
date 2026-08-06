export type StepId =
  | "welcome"
  | "profile"
  | "leads"
  | "sales"
  | "operations"
  | "technology"
  | "visibility"
  | "goals"
  | "contact"
  | "analysis"
  | "report"

export interface VisibilityItem {
  label: string
  score: number
}

export interface AssessmentAnswers {
  businessName: string
  industry: string
  employees: string
  revenue: string
  monthlyLeads: string
  locations: string
  businessModel: string
  primaryGoal: string
  leadChannels: string[]
  leadsPerMonth: string
  responseTime: string
  responder: string
  pipelineStages: string[]
  stuckStage: string
  operationalPains: string[]
  tools: string[]
  visibilityScores: VisibilityItem[]
  rankedGoals: string[]
  contactName: string
  contactEmail: string
  contactPhone: string
  companyWebsite: string
  linkedin: string
  consent: boolean
}

export const emptyAnswers: AssessmentAnswers = {
  businessName: "",
  industry: "",
  employees: "",
  revenue: "",
  monthlyLeads: "",
  locations: "",
  businessModel: "",
  primaryGoal: "",
  leadChannels: [],
  leadsPerMonth: "",
  responseTime: "",
  responder: "",
  pipelineStages: [],
  stuckStage: "",
  operationalPains: [],
  tools: [],
  visibilityScores: [
    { label: "Current pipeline value", score: 50 },
    { label: "Average response time", score: 50 },
    { label: "Highest-performing employee", score: 50 },
    { label: "Revenue lost this month", score: 50 },
    { label: "Lead conversion", score: 50 },
    { label: "Marketing ROI", score: 50 },
  ],
  rankedGoals: [],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  companyWebsite: "",
  linkedin: "",
  consent: false,
}

export const industryOptions = [
  "Real Estate", "Healthcare", "Education", "E-commerce", "Professional Services",
  "Manufacturing", "Hospitality", "Automotive", "Financial Services", "Retail",
  "Construction", "Other",
]

export const employeesOptions = ["1–10", "11–25", "26–50", "51–100", "100+"]

export const revenueOptions = [
  "Under ₹25L / year",
  "₹25L – ₹1Cr / year",
  "₹1Cr – ₹5Cr / year",
  "₹5Cr – ₹20Cr / year",
  "Above ₹20Cr / year",
]

export const monthlyLeadsOptions = [
  "Under 50", "50–150", "150–500", "500–1000", "1000+",
]

export const locationsOptions = ["1 location", "2–3 locations", "4–10 locations", "10+ locations"]

export const businessModelOptions = [
  "B2B", "B2C", "B2B + B2C", "Service-based", "Product-based", "Service + Product", "Other",
]

export const primaryGoalOptions = [
  "Increase Revenue", "Reduce Costs", "Improve Operations", "Scale Faster", "Increase Customer Satisfaction",
]

export const leadChannelOptions = [
  "Meta Ads", "Google Ads", "Website", "WhatsApp", "Referrals", "Property Portals", "Offline", "Other",
]

export const leadsPerMonthOptions = [
  "Fewer than 10", "10–50", "50–200", "200–500", "500+",
]

export const responseTimeOptions = [
  "Immediately", "Within an hour", "Same day", "1–2 days", "We don't track",
]

export const responderOptions = ["Reception", "Sales team", "Manager", "Automation", "Nobody"]

export const pipelineStageOptions = [
  "Lead", "Assigned", "Call", "WhatsApp", "Qualified", "Meeting", "Proposal", "Closed",
]

export const stuckStageOptions = [
  "Lead response", "Assignment", "Call / first contact", "Qualification", "Meeting",
  "Proposal", "Closing", "None — we close most leads",
]

export const operationalPainOptions = [
  "Manual work", "Duplicate work", "Poor reporting", "No dashboard", "No automation",
  "Poor communication", "Lead leakage", "No SOPs", "No visibility", "No accountability",
]

export const toolOptions = [
  "CRM", "ERP", "WhatsApp", "Email", "Google Sheets", "Excel", "Automation Tools", "Calling Software", "Internal Software",
]

export const goalOptions = [
  "Increase Sales", "Improve Conversion", "Reduce Manual Work", "Increase Visibility",
  "Scale Operations", "Improve Customer Experience", "Reduce Costs", "Other",
]

export const visibilityQuestions = [
  "Current pipeline value",
  "Average response time",
  "Highest-performing employee",
  "Revenue lost this month",
  "Lead conversion",
  "Marketing ROI",
]

export interface CategoryScore {
  key: "leadManagement" | "salesOperations" | "reporting" | "automation" | "visibility" | "customerJourney"
  label: string
  score: number
  weight: number
}

export interface Bottleneck {
  title: string
  impact: "High" | "Medium"
  confidence: number
  estimatedImpact: "Significant" | "Moderate"
  detail: string
}

export interface Benchmark {
  label: string
  yours: string
  industryMedian: string
  topPerformers: string
  progress: number
}

export interface QuickWin {
  title: string
  difficulty: "Easy" | "Medium"
  impact: "High" | "Medium"
  timeline: string
}

export interface ReportResult {
  healthScore: number
  maturityScore: number
  maturityTier: "Bronze" | "Silver" | "Gold" | "Platinum"
  aiReadiness: number
  riskLevel: "Low" | "Moderate" | "High" | "Critical"
  opportunityLevel: "High" | "Medium" | "Low"
  impactLevel: "Significant" | "Moderate" | "Incremental"
  categories: CategoryScore[]
  bottlenecks: Bottleneck[]
  benchmarks: Benchmark[]
  quickWins: QuickWin[]
  opportunityEstimate: string
  executiveSummary: string
  leadScore: number
  estimatedDeal: string
}

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))
const scale = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin)

function scoreByLabel(value: string, map: Record<string, number>) {
  return value ? map[value] ?? 0 : 0
}

const responseMinutes: Record<string, number> = {
  Immediately: 2, "Within an hour": 30, "Same day": 300, "1–2 days": 1800, "We don't track": 4320,
}

export function computeReport(answers: AssessmentAnswers): ReportResult {
  const pains = new Set(answers.operationalPains)
  const tools = new Set(answers.tools)

  const responseTimeScore = scoreByLabel(answers.responseTime, {
    Immediately: 100, "Within an hour": 78, "Same day": 55, "1–2 days": 30, "We don't track": 8,
  })
  const responderScore = scoreByLabel(answers.responder, {
    Automation: 100, "Sales team": 80, Manager: 58, Reception: 38, Nobody: 5,
  })

  let leadManagement = responseTimeScore * 0.6 + responderScore * 0.4
  if (answers.leadChannels.length >= 3) leadManagement += 5
  if (pains.has("Lead leakage")) leadManagement -= 15
  leadManagement = clamp(leadManagement)

  const structureScore = scale(answers.pipelineStages.length, 1, 8, 20, 95)
  const stuckPenalty = scoreByLabel(answers.stuckStage, {
    "Lead response": 10, Assignment: 25, "Call / first contact": 35, Qualification: 50,
    Meeting: 60, Proposal: 70, Closing: 75, "None — we close most leads": 100,
  })
  let salesOperations = structureScore * 0.35 + stuckPenalty * 0.65
  if (pains.has("No SOPs")) salesOperations -= 10
  if (pains.has("No accountability")) salesOperations -= 8
  salesOperations = clamp(salesOperations)

  let reporting = 60
  if (pains.has("Poor reporting")) reporting -= 30
  if (pains.has("No dashboard")) reporting -= 20
  if (pains.has("No visibility")) reporting -= 15
  if (tools.has("Excel") || tools.has("Google Sheets")) reporting -= 5
  if (tools.has("CRM")) reporting += 8
  reporting = clamp(reporting)

  let automation = 0
  if (tools.has("CRM")) automation += 28
  if (tools.has("ERP")) automation += 15
  if (tools.has("Calling Software")) automation += 10
  if (tools.has("Automation Tools")) automation += 20
  if (tools.has("Internal Software")) automation += 8
  if (pains.has("No automation")) automation -= 15
  if (pains.has("Manual work")) automation -= 10
  if (pains.has("Duplicate work")) automation -= 8
  if (answers.responder === "Automation") automation += 10
  automation = clamp(automation)

  const visibilityScores = answers.visibilityScores.length ? answers.visibilityScores : []
  const avgConfidence = visibilityScores.length
    ? visibilityScores.reduce((s, v) => s + v.score, 0) / visibilityScores.length
    : 50
  let visibility = clamp(scale(100 - avgConfidence, 0, 100, 0, 100)) * 0.7 + 30
  if (pains.has("No visibility")) visibility -= 10
  if (pains.has("No dashboard")) visibility -= 6
  if (pains.has("Poor communication")) visibility -= 6
  visibility = clamp(visibility)

  let customerJourney = structureScore * 0.4 + stuckPenalty * 0.3
  if (pains.has("No follow-up system") === false && pains.has("Lead leakage")) customerJourney -= 10
  if (pains.has("Poor communication")) customerJourney -= 8
  if (pains.has("Manual work")) customerJourney -= 5
  customerJourney = clamp(customerJourney)

  const categories: CategoryScore[] = [
    { key: "leadManagement", label: "Sales", score: Math.round(leadManagement), weight: 25 },
    { key: "salesOperations", label: "Operations", score: Math.round(salesOperations), weight: 20 },
    { key: "automation", label: "Automation", score: Math.round(automation), weight: 20 },
    { key: "visibility", label: "Visibility", score: Math.round(visibility), weight: 15 },
    { key: "reporting", label: "Reporting", score: Math.round(reporting), weight: 10 },
    { key: "customerJourney", label: "Customer Journey", score: Math.round(customerJourney), weight: 10 },
  ]

  const healthScore = Math.round(
    categories.reduce((sum, c) => sum + (c.score / 100) * c.weight, 0)
  )

  const maturityScore = Math.round(
    salesOperations * 0.3 + automation * 0.25 + reporting * 0.2 + customerJourney * 0.25
  )
  const maturityTier = maturityScore < 45 ? "Bronze" : maturityScore < 70 ? "Silver" : maturityScore < 85 ? "Gold" : "Platinum"
  const aiReadiness = Math.round(automation * 0.6 + reporting * 0.2 + visibility * 0.2)
  const riskLevel = healthScore < 40 ? "Critical" : healthScore < 55 ? "High" : healthScore < 70 ? "Moderate" : "Low"
  const opportunityLevel = healthScore < 55 ? "High" : healthScore < 75 ? "Medium" : "Low"
  const impactLevel = healthScore < 55 ? "Significant" : healthScore < 75 ? "Moderate" : "Incremental"

  const bottlenecks = buildBottlenecks(answers, categories)
  const benchmarks = buildBenchmarks(answers, pains, tools, automation, reporting)
  const quickWins = buildQuickWins(answers, pains, categories)
  const opportunityEstimate = estimateOpportunity(answers, healthScore)
  const executiveSummary = buildExecutiveSummary(answers, healthScore, categories)
  const leadScore = buildLeadScore(answers, healthScore)
  const estimatedDeal = estimateDeal(answers.revenue)

  return {
    healthScore, maturityScore, maturityTier, aiReadiness, riskLevel, opportunityLevel, impactLevel,
    categories, bottlenecks, benchmarks, quickWins, opportunityEstimate, executiveSummary,
    leadScore, estimatedDeal,
  }
}

function buildBottlenecks(answers: AssessmentAnswers, categories: CategoryScore[]): Bottleneck[] {
  const weakest = [...categories].sort((a, b) => a.score - b.score).slice(0, 3)
  const byKey = (key: string) => weakest.find((c) => c.key === key)
  const bottlenecks: Bottleneck[] = []

  if (byKey("leadManagement")) {
    const minutes = responseMinutes[answers.responseTime] ?? 300
    bottlenecks.push({
      title: "Lead Response Bottleneck",
      impact: "High",
      confidence: 94,
      estimatedImpact: "Significant",
      detail: answers.responseTime === "We don't track"
        ? "Response time isn't tracked, so slow replies are invisible and leads go cold silently."
        : `Leads are answered in ~${minutes < 60 ? `${minutes} min` : `${Math.round(minutes / 60)} hrs`}, well past the window where buyers still respond.`,
    })
  }
  if (byKey("salesOperations") || byKey("customerJourney")) {
    bottlenecks.push({
      title: "No Standardized Follow-up Process",
      impact: "High",
      confidence: 91,
      estimatedImpact: "Significant",
      detail: "Follow-up depends on memory and chance. Consistency is where deals are currently being lost.",
    })
  }
  if (byKey("visibility")) {
    bottlenecks.push({
      title: "Low Management Visibility",
      impact: "Medium",
      confidence: 88,
      estimatedImpact: "Moderate",
      detail: "Key pipeline decisions are being made from partial information — risks and opportunities go unnoticed.",
    })
  }
  if (byKey("reporting")) {
    bottlenecks.push({
      title: "Decisions Without Reliable Reporting",
      impact: "Medium",
      confidence: 89,
      estimatedImpact: "Moderate",
      detail: "Without dashboards and KPI tracking, improvements can't be measured or repeated.",
    })
  }
  if (byKey("automation")) {
    bottlenecks.push({
      title: "Manual Work Consuming Capacity",
      impact: "High",
      confidence: 90,
      estimatedImpact: "Significant",
      detail: "Data entry, duplicate work and manual handoffs absorb hours that don't scale with revenue.",
    })
  }

  if (bottlenecks.length === 0) {
    bottlenecks.push(
      { title: "Pipeline Structure Gap", impact: "Medium", confidence: 82, estimatedImpact: "Moderate", detail: "Stages exist but transitions aren't measured — the next lever is tuning each handoff." },
      { title: "Follow-up Consistency", impact: "Medium", confidence: 85, estimatedImpact: "Moderate", detail: "Even strong operations leak revenue in follow-up timing." },
      { title: "Automation Maturity", impact: "Medium", confidence: 80, estimatedImpact: "Moderate", detail: "The data points to selective automation as the next compounding win." },
    )
  }

  return bottlenecks.slice(0, 3)
}

function buildBenchmarks(answers: AssessmentAnswers, pains: Set<string>, tools: Set<string>, automation: number, reporting: number): Benchmark[] {
  const minutes = responseMinutes[answers.responseTime] ?? 300
  return [
    {
      label: "Response Time",
      yours: answers.responseTime === "We don't track" ? "Untracked" : minutes < 60 ? `${minutes} min` : `${Math.round(minutes / 60)} hrs`,
      industryMedian: "6 min",
      topPerformers: "<2 min",
      progress: clamp(Math.round(scale(minutes, 4320, 2, 0, 100))),
    },
    {
      label: "Automation Adoption",
      yours: `${automation}%`,
      industryMedian: "45%",
      topPerformers: "80%",
      progress: automation,
    },
    {
      label: "Reporting Maturity",
      yours: `${reporting}%`,
      industryMedian: "60%",
      topPerformers: "90%",
      progress: reporting,
    },
    {
      label: "Follow-up Consistency",
      yours: pains.has("No SOPs") || pains.has("Lead leakage") ? "30%" : tools.has("Automation Tools") ? "70%" : "45%",
      industryMedian: "55%",
      topPerformers: "85%",
      progress: pains.has("No SOPs") || pains.has("Lead leakage") ? 30 : tools.has("Automation Tools") ? 70 : 45,
    },
  ]
}

function buildQuickWins(answers: AssessmentAnswers, pains: Set<string>, categories: CategoryScore[]): QuickWin[] {
  const byKey = (key: string) => categories.find((c) => c.key === key)
  const wins: QuickWin[] = []

  const leadMgmt = byKey("leadManagement")?.score ?? 50
  if (leadMgmt < 65 || answers.responseTime === "We don't track") {
    wins.push({ title: "Instant lead acknowledgment", difficulty: "Easy", impact: "High", timeline: "2 Days" })
  }
  const followUpWeak = pains.has("Lead leakage") || pains.has("No SOPs") || (byKey("customerJourney")?.score ?? 50) < 65
  if (followUpWeak) {
    wins.push({ title: "Automated follow-up sequence", difficulty: "Medium", impact: "High", timeline: "7 Days" })
  }
  if ((byKey("reporting")?.score ?? 50) < 65) {
    wins.push({ title: "Weekly KPI dashboard", difficulty: "Medium", impact: "Medium", timeline: "14 Days" })
  }
  if ((byKey("automation")?.score ?? 50) < 60) {
    wins.push({ title: "Automate manual data entry", difficulty: "Easy", impact: "Medium", timeline: "5 Days" })
  }
  if ((byKey("visibility")?.score ?? 50) < 60) {
    wins.push({ title: "Daily pipeline report to WhatsApp", difficulty: "Easy", impact: "High", timeline: "3 Days" })
  }
  if (wins.length < 3) {
    wins.push({ title: "Structured pipeline review cadence", difficulty: "Easy", impact: "Medium", timeline: "1 Day" })
  }
  return wins.slice(0, 3)
}

function revenueMidpoint(revenue: string): number {
  switch (revenue) {
    case "Under ₹25L / year": return 12.5
    case "₹25L – ₹1Cr / year": return 62.5
    case "₹1Cr – ₹5Cr / year": return 300
    case "₹5Cr – ₹20Cr / year": return 1250
    case "Above ₹20Cr / year": return 4000
    default: return 100
  }
}

function estimateOpportunity(answers: AssessmentAnswers, healthScore: number): string {
  const base = revenueMidpoint(answers.revenue)
  const leakRate = clamp(scale(healthScore, 90, 35, 0.08, 0.22))
  const captured = base * leakRate * 0.6
  const roundTo = captured < 25 ? 1 : 5
  const low = Math.max(Math.round((captured * 0.7) / roundTo) * roundTo, 1)
  const highRaw = Math.max(Math.round((captured * 1.3) / roundTo) * roundTo, low + roundTo)
  const high = Math.max(highRaw, low + roundTo)
  const fmt = (v: number) => (v >= 100 ? `₹${v / 100}Cr` : `₹${v}L`)
  return `${fmt(low)} – ${fmt(high)} / year`
}

function estimateDeal(revenue: string): string {
  switch (revenue) {
    case "Under ₹25L / year": return "₹1L – ₹3L"
    case "₹25L – ₹1Cr / year": return "₹3L – ₹8L"
    case "₹1Cr – ₹5Cr / year": return "₹8L – ₹20L"
    case "₹5Cr – ₹20Cr / year": return "₹20L – ₹50L"
    case "Above ₹20Cr / year": return "₹50L+"
    default: return "₹3L – ₹8L"
  }
}

function buildLeadScore(answers: AssessmentAnswers, healthScore: number): number {
  let score = 50
  if (answers.contactEmail) score += 10
  if (answers.contactPhone) score += 5
  if (answers.companyWebsite) score += 5
  if (healthScore < 60) score += 10
  if (healthScore < 75 && healthScore >= 60) score += 5
  if (answers.rankedGoals.length >= 3) score += 5
  if (answers.leadChannels.length >= 3) score += 5
  if (answers.tools.length >= 3) score += 5
  return clamp(Math.round(score))
}

function buildExecutiveSummary(answers: AssessmentAnswers, healthScore: number, categories: CategoryScore[]): string {
  const lead = categories.find((c) => c.key === "leadManagement")?.score ?? 50
  const opening = lead >= 70
    ? "The business demonstrates strong lead acquisition capabilities, with a healthy flow of inbound demand."
    : "Lead generation is active, but the pipeline is not converting its full potential."
  const middle = healthScore >= 70
    ? "Operational foundations are in place, yet measurable efficiency gains remain available in follow-up consistency and management visibility."
    : "Significant operational inefficiencies exist after initial customer engagement — the largest opportunities lie in follow-up consistency, management visibility, and automation maturity."
  const closer = `The estimated revenue opportunity from addressing these bottlenecks is approximately ${estimateOpportunity(answers, healthScore)}.`
  return `${opening} ${middle} ${closer}`
}

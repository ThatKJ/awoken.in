export interface HowItWorksStep {
  n: string
  title: string
  description: string
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    n: "01",
    title: "Import",
    description: "Start with an old or unresponsive lead list — a CSV export from your CRM is enough.",
  },
  {
    n: "02",
    title: "Re-engage",
    description: "Awoken starts contextual WhatsApp follow-up, referencing what the lead already enquired about.",
  },
  {
    n: "03",
    title: "Qualify",
    description: "Awoken identifies project interest, budget, location and timeline through the conversation.",
  },
  {
    n: "04",
    title: "Move forward",
    description: "Interested buyers are guided toward a sales conversation or a site-visit slot.",
  },
  {
    n: "05",
    title: "Handoff",
    description: "Your sales team receives the prospect with the conversation and context attached.",
  },
]

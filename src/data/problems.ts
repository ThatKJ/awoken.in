export interface Problem {
  title: string;
  description: string;
  impact: string;
}

export const problems: Problem[] = [
  {
    title: "Missed Calls",
    description: "Every unanswered call is a potential customer who will call your competitor next.",
    impact: "Lost revenue from missed opportunities",
  },
  {
    title: "Slow Follow-up",
    description: "The longer you wait to respond, the less likely a lead converts. Speed is everything.",
    impact: "Conversions drop by 80% after 5 minutes",
  },
  {
    title: "Manual Operations",
    description: "Your team spends hours on repetitive admin work instead of selling and serving customers.",
    impact: "Wasted staff time and burnout",
  },
  {
    title: "Disconnected Systems",
    description: "Your CRM doesn't talk to your calendar. Your calendar doesn't talk to your phone. Nothing works together.",
    impact: "Data silos and manual data entry",
  },
  {
    title: "Leads Falling Through",
    description: "Leads come in from multiple channels but no system tracks or nurtures them properly.",
    impact: "50% of leads never get followed up",
  },
  {
    title: "CRM Never Updated",
    description: "Your team hates entering data. Your CRM is outdated within hours. Decisions are based on bad information.",
    impact: "Unreliable pipeline visibility",
  },
  {
    title: "Staff Bottlenecks",
    description: "Your best people are stuck doing work that should be automated. Growth is limited by headcount.",
    impact: "Scaling requires hiring, not systems",
  },
  {
    title: "Poor Customer Experience",
    description: "Customers expect instant responses. Long wait times and manual processes create frustration.",
    impact: "Churn increases, referrals decrease",
  },
];

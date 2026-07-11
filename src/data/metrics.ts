export interface Metric {
  value: string;
  label: string;
  description: string;
}

export const metrics: Metric[] = [
  {
    value: "87%",
    label: "Faster Lead Response",
    description: "Respond before competitors do. Every second matters when a lead comes in.",
  },
  {
    value: "3×",
    label: "More Qualified Meetings",
    description: "AI qualifies every lead instantly so your team only talks to ready buyers.",
  },
  {
    value: "24/7",
    label: "AI Receptionist",
    description: "Never miss an inquiry. Your business stays open even when your team is not.",
  },
  {
    value: "Zero",
    label: "Missed Opportunities",
    description: "Every call answered. Every lead followed up. Nothing falls through the cracks.",
  },
];

export interface WorkflowNode {
  id: string;
  label: string;
  description: string;
}

export const workflowNodes: WorkflowNode[] = [
  {
    id: "lead",
    label: "Lead Arrives",
    description: "A potential customer calls, fills a form, or sends a message. The system captures them instantly.",
  },
  {
    id: "answers",
    label: "AI Answers",
    description: "An AI receptionist answers within seconds, handles the conversation naturally, and collects key information.",
  },
  {
    id: "qualifies",
    label: "AI Qualifies",
    description: "The AI asks qualifying questions, scores the lead's intent, and decides the best next action.",
  },
  {
    id: "crm",
    label: "CRM Updates",
    description: "All conversation data, lead details, and outcomes are logged automatically into your CRM.",
  },
  {
    id: "calendar",
    label: "Calendar Books",
    description: "Qualified leads are offered available time slots. Appointment is booked and confirmed without human involvement.",
  },
  {
    id: "followup",
    label: "Follow-up Runs",
    description: "Automated WhatsApp, SMS, and email sequences nurture the lead until they convert or opt out.",
  },
  {
    id: "dashboard",
    label: "Revenue Dashboard",
    description: "Every metric—calls answered, leads qualified, appointments booked, revenue attributed—is tracked and visible in real time.",
  },
];

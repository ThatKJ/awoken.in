export interface ResourceItem {
  title: string;
  type: "playbook" | "guide" | "template" | "checklist" | "calculator";
  description: string;
}

export const resources: ResourceItem[] = [
  {
    title: "AI Lead Response Playbook",
    type: "playbook",
    description: "How to respond to leads faster and convert more using AI-powered automation.",
  },
  {
    title: "CRM Integration Guide",
    type: "guide",
    description: "Step-by-step guide to connecting your CRM with AI systems for automated data flow.",
  },
  {
    title: "Missed Call Recovery Workflow",
    type: "template",
    description: "A ready-to-implement workflow template for recovering revenue from missed calls.",
  },
  {
    title: "AI Readiness Assessment",
    type: "checklist",
    description: "Evaluate your business readiness for AI implementation across sales and operations.",
  },
  {
    title: "Revenue Recovery Calculator",
    type: "calculator",
    description: "Calculate how much revenue your business is losing to slow response and missed opportunities.",
  },
  {
    title: "Implementation Planning Guide",
    type: "guide",
    description: "What to expect during a 30-day AI implementation and how to prepare your team.",
  },
];

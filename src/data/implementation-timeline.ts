export interface TimelineStep {
  week: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const implementationTimeline: TimelineStep[] = [
  {
    week: "01",
    title: "Discovery",
    description:
      "We understand your business, map workflows, and identify where revenue is being lost.",
    deliverables: [
      "Workflow audit",
      "Revenue analysis",
      "Automation roadmap",
    ],
  },
  {
    week: "02",
    title: "System Design",
    description:
      "We design your AI workflow, choose the technology stack, and prepare implementation.",
    deliverables: [
      "Architecture design",
      "Tech stack",
      "Implementation plan",
    ],
  },
  {
    week: "03",
    title: "Build & Integrate",
    description:
      "We build the system and connect it with your CRM, communication tools, and workflows.",
    deliverables: [
      "AI system",
      "CRM integration",
      "Workflow automation",
    ],
  },
  {
    week: "04",
    title: "Launch",
    description:
      "We test, deploy, train your team, and continuously optimize the system after launch.",
    deliverables: [
      "Testing complete",
      "Team training",
      "Go-live support",
    ],
  },
];
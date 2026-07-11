export interface WhyFailPoint {
  title: string;
  description: string;
}

export const whyFailPoints: WhyFailPoint[] = [
  {
    title: "Most companies start with tools",
    description: "They pick an AI platform first, then try to force it into their business. The result is a system that doesn't fit their workflows.",
  },
  {
    title: "We start with workflows",
    description: "We study how your business operates, identify what's broken, and design the ideal workflow. Only then do we choose the right technology.",
  },
  {
    title: "Most AI projects lack clear metrics",
    description: "Without defined success criteria, AI implementations drift. Teams don't know if the system is working or not.",
  },
  {
    title: "We design around measurable outcomes",
    description: "Every system we build has clear KPIs: response time, conversion rate, appointments booked, revenue attributed. We know if it's working.",
  },
];

export interface EngagementTier {
  id: string;
  name: string;
  description: string;
  badge?: string;
  idealFor: string[];
  features: string[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary" | "outline";
  };
}

export const engagementTiers: EngagementTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For businesses beginning their AI transformation. Focused on high-impact, quick-deploy automation.",
    idealFor: ["Lead qualification", "Basic call handling", "CRM setup", "Appointment booking"],
    features: [
      "AI receptionist setup",
      "Lead capture and qualification",
      "CRM integration",
      "Basic follow-up automation",
      "Appointment scheduling",
      "30-day implementation",
    ],
    cta: {
      label: "Book a Strategy Call",
      href: "/contact",
      variant: "outline",
    },
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing businesses that want AI integrated across sales, operations, and customer experience.",
    badge: "Most Popular",
    idealFor: ["AI voice agents", "Multi-step follow-up", "CRM automation", "WhatsApp & email", "Reporting dashboards"],
    features: [
      "Everything in Starter",
      "Full AI voice agent deployment",
      "Multi-channel follow-up (WhatsApp, SMS, Email)",
      "Advanced CRM automation",
      "Custom reporting dashboard",
      "Workflow optimization",
      "Dedicated support",
    ],
    cta: {
      label: "Book a Strategy Call",
      href: "/contact",
      variant: "primary",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Fully custom AI systems built around your unique business workflows and operational requirements.",
    idealFor: ["Multiple AI agents", "Custom integrations", "Internal AI assistants", "Enterprise workflows", "Ongoing optimization"],
    features: [
      "Everything in Growth",
      "Multiple AI agent deployment",
      "Custom integration development",
      "Internal AI assistants",
      "Enterprise workflow automation",
      "Dedicated account manager",
      "Continuous system optimization",
      "Priority support",
    ],
    cta: {
      label: "Contact Sales",
      href: "/contact",
      variant: "secondary",
    },
  },
];

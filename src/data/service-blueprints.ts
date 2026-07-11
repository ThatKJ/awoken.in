export interface ServiceBlueprint {
  title: string;
  outcome: string;
  description: string;
  technology: string;
  href?: string;
}

export const serviceBlueprints: ServiceBlueprint[] = [
  {
    title: "Never Miss Another Call",
    outcome: "Every inbound call is answered instantly, 24/7, by an AI receptionist that sounds human.",
    description: "AI voice agents handle initial conversations, capture lead details, and route qualified callers to your team or book appointments automatically.",
    technology: "Retell AI, ElevenLabs, Twilio",
    href: "/services#voice-agents",
  },
  {
    title: "Every Lead Gets Qualified Instantly",
    outcome: "Leads are qualified within seconds of reaching out, not hours or days later.",
    description: "AI qualification engines engage every lead immediately, ask qualifying questions, and send only ready buyers to your sales team.",
    technology: "OpenAI, Anthropic, n8n",
    href: "/services#lead-qualification",
  },
  {
    title: "Appointments Book Themselves",
    outcome: "Customers book directly into your calendar without any back-and-forth emails or phone tag.",
    description: "AI scheduling assistants check availability, send booking links, confirm appointments, and send reminders automatically.",
    technology: "Cal.com, Google Calendar, WhatsApp",
    href: "/services#appointment-booking",
  },
  {
    title: "Your CRM Updates Itself",
    outcome: "Every interaction is logged automatically. No manual data entry required.",
    description: "CRM automation captures call transcripts, lead details, appointment outcomes, and follow-up tasks without your team lifting a finger.",
    technology: "HubSpot, GoHighLevel, Salesforce, n8n",
    href: "/services#crm-automation",
  },
  {
    title: "Every Lead Gets a Follow-up",
    outcome: "No lead is ever forgotten. Multi-channel follow-ups happen automatically until the lead converts or opts out.",
    description: "Automated follow-up sequences across WhatsApp, SMS, and email ensure every lead receives timely, relevant communication.",
    technology: "WhatsApp API, Twilio, n8n",
    href: "/services#follow-up",
  },
  {
    title: "Reviews Grow Automatically",
    outcome: "Happy customers are automatically invited to leave reviews. Your online reputation grows on autopilot.",
    description: "Review management systems send follow-up requests after appointments, monitor new reviews, and respond automatically.",
    technology: "n8n, Google API, WhatsApp",
    href: "/services#review-management",
  },
  {
    title: "Your Team Has an AI Assistant",
    outcome: "Your team gets instant access to company knowledge, call scripts, and customer history without searching.",
    description: "Internal AI assistants answer employee questions, summarize customer interactions, and provide real-time coaching during calls.",
    technology: "OpenAI, Supabase, Slack",
    href: "/services#ai-assistants",
  },
  {
    title: "Custom Revenue Systems",
    outcome: "Unique business challenges get unique solutions built around your specific workflows and goals.",
    description: "We design and build bespoke AI systems for complex workflows that off-the-shelf software cannot solve.",
    technology: "Full Stack: AI, Automation, CRM, Custom",
    href: "/services#custom",
  },
];

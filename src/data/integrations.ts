export interface IntegrationCategory {
  name: string;
  items: { name: string; description: string }[];
}

export const integrationCategories: IntegrationCategory[] = [
  {
    name: "CRM",
    items: [
      { name: "HubSpot", description: "Contact and deal management" },
      { name: "GoHighLevel", description: "Agency and client management" },
      { name: "Salesforce", description: "Enterprise CRM" },
      { name: "Zoho CRM", description: "Business CRM" },
    ],
  },
  {
    name: "Voice & Phone",
    items: [
      { name: "Twilio", description: "Voice and SMS infrastructure" },
      { name: "Retell AI", description: "AI voice agents" },
      { name: "ElevenLabs", description: "Voice synthesis" },
      { name: "Deepgram", description: "Speech recognition" },
    ],
  },
  {
    name: "Messaging",
    items: [
      { name: "WhatsApp API", description: "Business messaging" },
      { name: "Twilio SMS", description: "Text messaging" },
      { name: "Email (Resend)", description: "Transactional email" },
      { name: "Slack", description: "Team notifications" },
    ],
  },
  {
    name: "Scheduling",
    items: [
      { name: "Cal.com", description: "Appointment scheduling" },
      { name: "Google Calendar", description: "Calendar management" },
      { name: "Acuity", description: "Client scheduling" },
    ],
  },
  {
    name: "Payments",
    items: [
      { name: "Stripe", description: "Payment processing" },
      { name: "Razorpay", description: "Indian payments" },
    ],
  },
  {
    name: "AI Models",
    items: [
      { name: "OpenAI", description: "GPT language models" },
      { name: "Anthropic", description: "Claude language models" },
      { name: "Gemini", description: "Google AI models" },
    ],
  },
  {
    name: "Automation",
    items: [
      { name: "n8n", description: "Workflow automation" },
      { name: "Make", description: "Visual automation" },
      { name: "Zapier", description: "App integration" },
    ],
  },
  {
    name: "Databases & Infrastructure",
    items: [
      { name: "Supabase", description: "PostgreSQL and realtime" },
      { name: "PostgreSQL", description: "Relational database" },
      { name: "Upstash", description: "Redis and serverless" },
    ],
  },
];

export interface ExampleSolution {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const exampleSolutions: ExampleSolution[] = [
  {
    title: "AI Receptionist for Dental Clinics",
    industry: "Dental",
    challenge: "Dental clinics lose 30% of new patient calls when staff are busy with patients or after hours.",
    solution: "An AI receptionist answers every call, handles FAQs about services and insurance, schedules appointments, and sends confirmation messages.",
    outcome: "Zero missed calls. Appointments booked 24/7. Staff focus on patients instead of phones.",
  },
  {
    title: "Revenue Recovery for Gyms",
    industry: "Fitness",
    challenge: "Gyms receive dozens of membership inquiries daily but lack capacity to follow up with every lead.",
    solution: "AI lead qualification engine captures inquiries from calls, web forms, and social media, qualifies each lead, and books trial sessions automatically.",
    outcome: "3× more trial sessions booked. Membership conversion improved by 40%. No lead left uncontacted.",
  },
  {
    title: "AI Lead Qualification for Real Estate",
    industry: "Real Estate",
    challenge: "Real estate agents waste hours on unqualified leads and slow response times lose potential buyers.",
    solution: "AI voice agent answers property inquiries, qualifies buyers based on budget and timeline, books site visits, and updates CRM automatically.",
    outcome: "Lead response time reduced from hours to seconds. Agents only meet qualified buyers. CRM stays current.",
  },
  {
    title: "Law Firm Intake Automation",
    industry: "Legal",
    challenge: "Law firms handle complex intake processes manually, leading to lost potential clients and administrative overhead.",
    solution: "Automated intake system that captures client details via voice and web, schedules consultations, collects documents, and follows up automatically.",
    outcome: "Intake process streamlined by 70%. More consultations booked. Staff focus on cases, not paperwork.",
  },
  {
    title: "Roofing Company Follow-up Automation",
    industry: "Roofing",
    challenge: "Roofing companies generate many leads from estimates but lack systematic follow-up to close them.",
    solution: "Multi-channel follow-up system sends automated WhatsApp and email sequences after estimates, with SMS reminders and review requests post-service.",
    outcome: "Estimate-to-close rate improved by 35%. Customer reviews increased 5×. Repeat business grew.",
  },
  {
    title: "Agency Lead Routing & Response",
    industry: "Marketing Agencies",
    challenge: "Agencies receive leads from multiple channels but struggle to respond quickly and route to the right team.",
    solution: "Centralized lead capture system with AI qualification, instant WhatsApp response, intelligent team routing, and automated proposal follow-up.",
    outcome: "Lead response under 60 seconds. Conversion rates doubled. Sales team works qualified leads only.",
  },
];

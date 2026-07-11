export interface Industry {
  id: string;
  title: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  href: string;
}

export const industries: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Patient intake, appointment scheduling, follow-up automation, and administrative workflow optimization for clinics and hospitals.",
    painPoints: ["Missed appointment calls", "Manual patient intake", "Staff burnout from admin"],
    solutions: ["AI Receptionist", "Appointment Booking", "Patient Follow-up"],
    href: "/industries#healthcare",
  },
  {
    id: "dental",
    title: "Dental",
    description: "Automate appointment booking, patient reminders, insurance verification, and follow-up for dental practices.",
    painPoints: ["High no-show rates", "Manual confirmation calls", "Slow patient response"],
    solutions: ["AI Receptionist", "Automated Reminders", "Review Management"],
    href: "/industries#dental",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Instant lead response, property inquiry qualification, automated tour booking, and follow-up for real estate agencies.",
    painPoints: ["Slow lead response", "Unqualified inquiries", "Missed follow-ups"],
    solutions: ["Lead Qualification", "Appointment Booking", "Follow-up Automation"],
    href: "/industries#real-estate",
  },
  {
    id: "law",
    title: "Legal",
    description: "Client intake automation, consultation scheduling, case status updates, and document collection for law firms.",
    painPoints: ["Manual intake process", "Phone tag with clients", "Scheduling complexity"],
    solutions: ["AI Receptionist", "Client Intake", "Appointment Booking"],
    href: "/industries#legal",
  },
  {
    id: "roofing",
    title: "Roofing",
    description: "Lead capture from calls and forms, estimate scheduling, follow-up sequences, and job status updates for roofing companies.",
    painPoints: ["Missed job inquiries", "Slow estimate turnaround", "Disconnected communication"],
    solutions: ["Lead Capture", "Appointment Booking", "Follow-up Automation"],
    href: "/industries#roofing",
  },
  {
    id: "hvac",
    title: "HVAC",
    description: "Service call handling, emergency dispatch, appointment scheduling, and maintenance reminder automation for HVAC businesses.",
    painPoints: ["Emergency call management", "Service scheduling", "Maintenance follow-up"],
    solutions: ["AI Receptionist", "Service Booking", "Reminder Automation"],
    href: "/industries#hvac",
  },
  {
    id: "fitness",
    title: "Fitness",
    description: "Membership inquiries, class scheduling, trial booking, and member retention automation for gyms and studios.",
    painPoints: ["Tour scheduling", "Membership follow-up", "Class booking management"],
    solutions: ["Lead Qualification", "Scheduling", "Retention Automation"],
    href: "/industries#fitness",
  },
  {
    id: "marketing",
    title: "Marketing Agencies",
    description: "Lead routing, client intake, proposal follow-up, and account management automation for agencies.",
    painPoints: ["Lead response delays", "Manual client intake", "Proposal follow-up"],
    solutions: ["Lead Routing", "Client Intake", "Follow-up Automation"],
    href: "/industries#marketing-agencies",
  },
  {
    id: "home-services",
    title: "Home Services",
    description: "Call handling, service booking, job dispatch, and customer follow-up automation for home service businesses.",
    painPoints: ["Missed service calls", "Scheduling conflicts", "Customer communication gaps"],
    solutions: ["AI Receptionist", "Service Booking", "Customer Follow-up"],
    href: "/industries#home-services",
  },
];

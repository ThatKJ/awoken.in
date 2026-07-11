export interface FitCriteria {
  category: string;
  items: string[];
  isFit: boolean;
}

export const fitCriteria: FitCriteria[] = [
  {
    category: "Best Fit",
    isFit: true,
    items: [
      "10–100 employees",
      "Receiving 100+ leads per month",
      "Already using a CRM",
      "Spending significant time on admin work",
      "Growth-focused and ready to automate",
    ],
  },
  {
    category: "Probably Not a Fit",
    isFit: false,
    items: [
      "Looking for a cheap chatbot",
      "No repeatable sales process",
      "Very early-stage business",
      "Wanting a DIY solution",
      "Not ready to change workflows",
    ],
  },
];

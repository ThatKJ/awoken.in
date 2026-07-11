export interface CalculatorConfig {
  title: string;
  description: string;
  inputs: {
    key: string;
    label: string;
    placeholder: string;
    min: number;
    max: number;
    step: number;
    suffix?: string;
  }[];
  resultLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export const calculatorConfig: CalculatorConfig = {
  title: "Calculate Your Revenue Leakage",
  description: "Enter your business metrics below to see how much revenue you're losing to slow response and missed opportunities.",
  inputs: [
    { key: "monthlyLeads", label: "Monthly Leads", placeholder: "e.g. 500", min: 0, max: 100000, step: 10 },
    { key: "missedCalls", label: "Missed Calls (%)", placeholder: "e.g. 30", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "avgValue", label: "Average Customer Value (₹)", placeholder: "e.g. 15000", min: 0, max: 10000000, step: 100 },
    { key: "responseTime", label: "Current Response Time (minutes)", placeholder: "e.g. 60", min: 0, max: 1440, step: 5, suffix: "min" },
  ],
  resultLabel: "Estimated Revenue Lost Per Month",
  ctaLabel: "Recover This Revenue",
  ctaHref: "/contact",
};

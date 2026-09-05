export interface DemoMessage {
  from: "awoken" | "lead"
  text: string
}

/**
 * Illustrative script only — always rendered behind an explicit "Example
 * conversation" label. Deliberately stops at intent capture (a day
 * preference), not a completed booking — that would fabricate an outcome.
 */
export const whatsappDemoScript: DemoMessage[] = [
  { from: "awoken", text: "Hi Rahul — you had previously enquired about homes near Whitefield. Are you still exploring options?" },
  { from: "lead", text: "Depends on the price." },
  { from: "awoken", text: "Of course. What budget range are you considering?" },
  { from: "lead", text: "Around 1.2 Cr." },
  { from: "awoken", text: "Got it. There are options in that range. Would you prefer details here, or would you like to visit the project this weekend?" },
  { from: "lead", text: "Sunday." },
  { from: "awoken", text: "Morning or afternoon works better?" },
]

import { getSupabase, ASSESSMENT_TABLE } from "./supabase"
import type { AssessmentAnswers, ReportResult } from "@/data/assessment"

export interface SavedAssessment {
  id: string
  assessmentId: string
  permalink: string
}

export function generateAssessmentId(): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `AWD-${stamp}${rand}`
}

export async function saveAssessment(answers: AssessmentAnswers, report: ReportResult): Promise<SavedAssessment> {
  const response = await fetch('/api/assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers, report })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to save assessment');
  }

  const data = await response.json();
  return {
    id: data.id,
    assessmentId: data.assessmentId,
    permalink: data.permalink,
  };
}

export async function sendPreviewEmail(assessmentId: string): Promise<void> {
  await getSupabase().functions.invoke("assessment-notify", {
    body: { assessmentId, action: "email-preview" },
  })
}

function notifyInternal(assessmentId: string) {
  getSupabase()
    .functions.invoke("assessment-notify", {
      body: { assessmentId, action: "notify" },
    })
    .catch(() => {
      /* notification is best-effort */
    })
}

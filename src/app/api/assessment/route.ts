import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { ASSESSMENT_TABLE } from '@/lib/supabase';

// In-memory rate limiting map (Temporary solution, replace with Redis/Upstash)
const rateLimit = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const payloadSchema = z.object({
  answers: z.object({
    businessName: z.string().min(1).max(255),
    industry: z.string().max(255).optional(),
    employees: z.string().max(255).optional(),
    revenue: z.string().max(255).optional(),
    monthlyLeads: z.string().max(255).optional(),
    locations: z.string().max(255).optional(),
    businessModel: z.string().max(255).optional(),
    primaryGoal: z.string().max(255).optional(),
    leadChannels: z.array(z.string().max(255)).optional(),
    leadsPerMonth: z.string().max(255).optional(),
    responseTime: z.string().max(255).optional(),
    responder: z.string().max(255).optional(),
    pipelineStages: z.string().max(255).optional(),
    stuckStage: z.string().max(255).optional(),
    operationalPains: z.array(z.string().max(255)).optional(),
    tools: z.array(z.string().max(255)).optional(),
    visibilityScores: z.record(z.string(), z.number()).optional(),
    rankedGoals: z.array(z.string().max(255)).optional(),
    contactName: z.string().min(1).max(255),
    contactEmail: z.string().email().max(255),
    contactPhone: z.string().max(255).optional(),
    companyWebsite: z.string().max(255).optional(),
    linkedin: z.string().max(255).optional(),
    consent: z.boolean(),
  }),
  report: z.object({
    healthScore: z.number(),
    maturityScore: z.number(),
    aiReadiness: z.number(),
    riskLevel: z.string().max(50),
    opportunityLevel: z.string().max(50),
    categories: z.array(z.object({
      key: z.string().max(100),
      score: z.number()
    })),
    bottlenecks: z.array(z.string().max(500)).optional(),
    quickWins: z.array(z.string().max(500)).optional(),
    benchmarks: z.record(z.string(), z.number()).optional(),
    opportunityEstimate: z.number().optional(),
    leadScore: z.number().optional(),
    estimatedDeal: z.number().optional()
  })
});

export async function POST(req: Request) {
  try {
    // 1. Temporary Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const limit = rateLimit.get(ip) ?? { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + RATE_LIMIT_WINDOW;
    } else {
      limit.count++;
    }
    
    rateLimit.set(ip, limit);

    if (limit.count > MAX_REQUESTS) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2. Strict Input Validation
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const parseResult = payloadSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid data format', details: parseResult.error.format() }, { status: 400 });
    }

    const { answers, report } = parseResult.data;

    // 3. Generate ID on Server
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
    const assessmentId = `AWD-${stamp}${rand}`;

    const byKey = (key: string) => report.categories.find((c) => c.key === key);

    // 4. Server-Side Insert using Service Role
    // Since we have dropped anon INSERT policies, we must use the service role key to insert securely from the server.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    
    const { data, error } = await supabase
      .from(ASSESSMENT_TABLE)
      .insert({
        assessment_id: assessmentId,
        status: "new",
        business_name: answers.businessName,
        industry: answers.industry,
        employees: answers.employees,
        revenue: answers.revenue,
        monthly_leads: answers.monthlyLeads,
        locations: answers.locations,
        business_model: answers.businessModel,
        primary_goal: answers.primaryGoal,
        lead_channels: answers.leadChannels,
        leads_per_month: answers.leadsPerMonth,
        response_time: answers.responseTime,
        responder: answers.responder,
        pipeline_stages: answers.pipelineStages,
        stuck_stage: answers.stuckStage,
        operational_pains: answers.operationalPains,
        tools: answers.tools,
        visibility_scores: answers.visibilityScores,
        ranked_goals: answers.rankedGoals,
        contact_name: answers.contactName,
        contact_email: answers.contactEmail,
        contact_phone: answers.contactPhone,
        company_website: answers.companyWebsite,
        linkedin: answers.linkedin,
        consent: answers.consent,
        health_score: report.healthScore,
        maturity_score: report.maturityScore,
        ai_readiness: report.aiReadiness,
        risk_level: report.riskLevel,
        opportunity_level: report.opportunityLevel,
        lead_management: byKey("leadManagement")?.score ?? 0,
        sales_operations: byKey("salesOperations")?.score ?? 0,
        reporting: byKey("reporting")?.score ?? 0,
        automation: byKey("automation")?.score ?? 0,
        visibility: byKey("visibility")?.score ?? 0,
        customer_journey: byKey("customerJourney")?.score ?? 0,
        findings: report.bottlenecks,
        scores: report.categories,
        quick_wins: report.quickWins,
        benchmarks: report.benchmarks,
        opportunity_estimate: report.opportunityEstimate,
        lead_score: report.leadScore,
        estimated_deal: report.estimatedDeal,
        completed_at: new Date().toISOString(),
      })
      .select("id, assessment_id")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 });
    }

    // Best-effort internal notification
    supabase.functions.invoke("assessment-notify", {
      body: { assessmentId, action: "notify" },
    }).catch(console.error);

    return NextResponse.json({
      id: data.id,
      assessmentId: data.assessment_id,
      permalink: `https://www.awoken.in/assessment/${data.assessment_id}`,
    });

  } catch (error) {
    console.error("Assessment API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

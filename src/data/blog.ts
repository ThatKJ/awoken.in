export interface Author {
  name: string
  role: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: Author
  publishedAt: string
  readingTime: string
  category: string
  tags: string[]
  featured: boolean
  popular: boolean
}

const AUTHORS: Record<string, Author> = {
  kirtan: { name: "Kirtan", role: "Founder & AI Consultant" },
}

export const BLOG_CATEGORIES = [
  "All",
  "AI",
  "Business Intelligence",
  "Automation",
  "Operations",
  "Growth",
  "Case Studies",
  "Product",
  "Company Updates",
] as const

export const BLOG_TOPICS = [
  { label: "Artificial Intelligence", icon: "Bot" },
  { label: "Business Intelligence", icon: "BarChart3" },
  { label: "Revenue Recovery", icon: "TrendingUp" },
  { label: "Operations", icon: "Settings" },
  { label: "CRM", icon: "Users" },
  { label: "Automation", icon: "Zap" },
  { label: "Customer Experience", icon: "Heart" },
  { label: "Productivity", icon: "Rocket" },
  { label: "Digital Transformation", icon: "RefreshCw" },
  { label: "Growth Strategy", icon: "TrendingUp" },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "business-intelligence-audit-what-to-expect",
    title: "What to Expect from a Business Intelligence Audit",
    description:
      "A clear walkthrough of the Business Intelligence Audit process — what we analyze, how we identify bottlenecks, and what you receive at the end. No fluff. No sales pitch.",
    content: `
      <p class="lead">Every engagement at Awoken starts the same way: with a Business Intelligence Audit. Not because it is a convenient sales tactic, but because we refuse to recommend solutions before we understand the problem.</p>

      <p>Too many AI consulting engagements begin with a pitch deck. A vendor walks in, presents a pre-packaged solution, and spends the rest of the engagement retrofitting it to fit the client's reality. That is not how meaningful transformation happens.</p>

      <p>We start differently. We start by listening.</p>

      <h2>What Is a Business Intelligence Audit?</h2>

      <p>A Business Intelligence Audit is a structured 30–45 minute strategy session where we analyze your business operations, identify bottlenecks, uncover revenue opportunities, and assess your readiness for AI-powered improvements.</p>

      <p>Think of it as a diagnostic for your business operations. Just as a doctor would not prescribe treatment without running tests, we will not recommend AI solutions without first understanding how your business actually works.</p>

      <h2>What Happens During the Audit</h2>

      <p>The audit follows a structured format designed to surface the most important information quickly:</p>

      <h3>1. Current State Assessment</h3>
      <p>We review your current systems, team structure, workflows, and growth goals. We ask detailed questions about how leads move through your pipeline, how tasks are assigned and tracked, and where manual effort is concentrated.</p>

      <h3>2. Bottleneck Identification</h3>
      <p>We identify where time and revenue are being lost. Common bottlenecks include slow lead response times, manual data entry, fragmented systems that do not communicate, and repetitive tasks that consume disproportionate team hours.</p>

      <h3>3. Opportunity Mapping</h3>
      <p>We evaluate your tech stack and pinpoint the highest-impact opportunities for AI and automation. Not every problem needs an AI solution — we are honest about what does and what does not benefit from automation.</p>

      <h3>4. Recommendations</h3>
      <p>You receive a detailed report outlining findings, opportunities, and recommended next steps. If there is a clear path forward, we include a transparent proposal. If not, we share actionable insights you can implement independently.</p>

      <h2>What You Receive After the Audit</h2>

      <p>Within a few business days, you receive a comprehensive report that includes:</p>

      <ul>
        <li>Bottleneck analysis with specific examples from your operations</li>
        <li>Revenue opportunity assessment</li>
        <li>AI readiness evaluation</li>
        <li>Prioritized recommendations</li>
        <li>Clear next steps — with or without Awoken</li>
      </ul>

      <h2>Why the Audit Is Free</h2>

      <p>We offer the Business Intelligence Audit at no cost because we believe in earning the right to work with you. If we identify a clear opportunity to create value, we will present a proposal. If we do not, we will tell you that too. No obligation. No pressure. No hidden agenda.</p>

      <p>This approach has served us well. It ensures every engagement starts with trust, transparency, and a shared understanding of what success looks like.</p>

      <h2>Ready to Start?</h2>

      <p>Book a free Business Intelligence Audit and discover where AI can create the biggest impact in your business.</p>
    `,
    author: AUTHORS.kirtan,
    publishedAt: "2026-07-18",
    readingTime: "5 min read",
    category: "Business Intelligence",
    tags: ["Business Intelligence", "Audit", "Getting Started"],
    featured: true,
    popular: true,
  },
  {
    slug: "ai-automation-vs-human-touch",
    title: "AI Automation vs. Human Touch: Finding the Right Balance",
    description:
      "The best AI implementations do not replace people — they empower them. Here is how we think about deciding what to automate and what to leave to humans.",
    content: `
      <p class="lead">One of the most common questions we hear from business owners is: "Will AI replace my team?" It is a fair question. Every week brings another headline about automation displacing jobs or AI performing tasks that once required human judgment.</p>

      <p>But in practice, the question misses the point. The real question is not whether AI can replace humans. It is which tasks should be automated, and which should remain human-led. The most successful implementations we have seen are not the ones that eliminate people — they are the ones that eliminate toil.</p>

      <h2>What to Automate</h2>

      <p>We look for three characteristics when evaluating a task for automation:</p>

      <h3>Repetitive and Rules-Based</h3>
      <p>If a task follows the same pattern every time — data entry, lead assignment, invoice generation, status updates — it is a strong candidate for automation. These tasks consume hours of team time without requiring human judgment.</p>

      <h3>High Volume, Low Complexity</h3>
      <p>Tasks that happen dozens or hundreds of times per day with minimal variation are ideal for automation. The return on investment compounds with volume.</p>

      <h3>Prone to Human Error</h3>
      <p>Manual data entry and repetitive verification tasks are inherently error-prone. Automation reduces mistakes and frees your team to focus on work that requires attention and care.</p>

      <h2>What to Keep Human</h2>

      <p>Equally important is knowing what not to automate:</p>

      <h3>Relationship Building</h3>
      <p>Trust, empathy, and rapport cannot be automated. Initial consultations, difficult conversations, and strategic negotiations benefit from human judgment and emotional intelligence.</p>

      <h3>Creative Problem Solving</h3>
      <p>AI can analyze data and suggest solutions, but creative strategy — understanding nuance, reading between the lines, connecting disparate ideas — remains a human strength.</p>

      <h3>Complex Decisions</h3>
      <p>High-stakes decisions with multiple variables and ethical implications should remain human-led. AI can inform, but humans should decide.</p>

      <h2>The Hybrid Approach</h2>

      <p>The businesses that win with AI are the ones that find the right balance. They automate the tedious, repetitive work that drains energy. They free their teams to focus on high-value activities that require human judgment, creativity, and empathy.</p>

      <p>When we design AI systems for clients, we start by mapping every workflow end-to-end. Then we ask a simple question for each step: "Does this need a human, or does it need consistency?" The answer determines what we build.</p>

      <h2>The Bottom Line</h2>

      <p>AI is not coming for your team. It is coming for the boring, repetitive parts of their day. The businesses that understand this distinction will build stronger teams, not smaller ones.</p>
    `,
    author: AUTHORS.kirtan,
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    category: "AI",
    tags: ["AI", "Automation", "Strategy"],
    featured: false,
    popular: true,
  },
  {
    slug: "operational-bottlenecks-hurting-revenue",
    title: "3 Operational Bottlenecks Quietly Hurting Your Revenue",
    description:
      "Most businesses are losing revenue in plain sight. Here are three common operational bottlenecks we see during audits and how to fix them.",
    content: `
      <p class="lead">In every Business Intelligence Audit we conduct, we see the same patterns emerge. Business owners know something is wrong — leads are slipping through the cracks, teams are overwhelmed, revenue is plateauing — but they cannot pinpoint exactly where the breakdown occurs.</p>

      <p>The answer is almost always operational bottlenecks. Here are three we see most frequently.</p>

      <h2>1. Slow Lead Response Time</h2>

      <p>The data is clear: businesses that respond to leads within 5 minutes are 100x more likely to convert than those that wait 30 minutes. Yet most businesses take hours — sometimes days — to follow up.</p>

      <p>The bottleneck is usually not laziness. It is process. Leads arrive through multiple channels (website forms, phone calls, email, social media, referrals) and there is no centralized system to capture, qualify, and route them in real time.</p>

      <p><strong>The fix:</strong> Implement a lead management system that captures every inbound lead, qualifies it automatically, and routes it to the right team member instantly. AI-powered lead scoring can prioritize high-intent leads so your team knows exactly who to call first.</p>

      <h2>2. Fragmented Systems That Do Not Communicate</h2>

      <p>Most businesses use 5-10 different tools to run their operations: a CRM, an email platform, a calendar tool, a project management system, an invoicing tool, and so on. When these systems do not communicate, your team becomes the integration layer — manually copying data from one system to another.</p>

      <p>This creates errors, delays, and frustration. It also consumes hundreds of hours per month that could be spent on revenue-generating activities.</p>

      <p><strong>The fix:</strong> Audit your tech stack and identify where data needs to flow between systems. Modern API-based integrations and AI middleware can connect your tools without requiring a full system replacement.</p>

      <h2>3. Manual Lead Qualification</h2>

      <p>When every lead gets the same treatment, your best leads get lost in the noise. Your team spends equal time on tire-kickers and ready-to-buy prospects simply because there is no automated qualification process.</p>

      <p>This bottleneck is particularly expensive because it compounds over time. Every hour spent nurturing a low-quality lead is an hour not spent closing a high-quality one.</p>

      <p><strong>The fix:</strong> Deploy an AI-powered lead qualification system that scores and segments leads based on behavior, demographics, and engagement patterns. Your team focuses on the leads most likely to convert while automated nurturing keeps the rest warm.</p>

      <h2>Moving Forward</h2>

      <p>These three bottlenecks account for a significant portion of revenue leakage we see across industries. The good news is that each one has a clear, achievable fix — and the ROI of addressing them is almost always substantial.</p>

      <p>Not sure which bottlenecks are hurting your business? A Business Intelligence Audit can identify them in under an hour.</p>
    `,
    author: AUTHORS.kirtan,
    publishedAt: "2026-07-10",
    readingTime: "4 min read",
    category: "Operations",
    tags: ["Operations", "Revenue Recovery", "Bottlenecks"],
    featured: false,
    popular: false,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((post) => post.featured)
}

export function getPopularPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.popular)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts
  return blogPosts.filter((post) => post.category === category)
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags.some((t) => post.tags.includes(t)) || p.category === post.category)
    .slice(0, limit)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const index = blogPosts.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? blogPosts[index - 1] : null,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  }
}

import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Play, Headphones, Mic, MessageSquare } from "lucide-react"
import Link from "next/link"
import { BOOKING_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Demo — See Our Systems in Action",
  description: "See how we build operational systems that solve real business problems.",
}

export default function DemoPage() {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                See Our Systems in Action
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
                See how the systems we build handle real business operations. Every solution is designed around specific operational bottlenecks, not generic automation.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Answers instantly, 24/7",
                  "Qualifies leads automatically",
                  "Books appointments into your calendar",
                  "Sends WhatsApp and email follow-ups",
                  "Integrates with your CRM",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href={BOOKING_URL}>
                  <Button variant="primary" size="lg">
                    Book a Live Demo
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[320px]">
              <div className="relative rounded-[32px] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />
                <div className="pt-8 pb-4 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Headphones className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">AI Receptionist</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs text-muted-foreground">Active</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">02:34</div>
                  </div>
                  <div className="rounded-xl bg-surface p-4 mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Mic className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">AI</p>
                        <p className="text-sm text-muted-foreground">Thank you for calling. I can help you schedule an appointment. What time works best for you?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Caller</p>
                        <p className="text-sm text-muted-foreground">I&apos;d like to book a consultation for next Tuesday.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-0.5 bg-accent/30 rounded-full" style={{ height: `${Math.random() * 20 + 4}px` }} />
                    ))}
                  </div>
                  <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium">CRM Sync</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

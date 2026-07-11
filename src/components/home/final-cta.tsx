import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Stop Losing Revenue?
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl lg:max-w-[650px] mx-auto">
            Book a free strategy call and discover where AI can create the biggest impact in your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Your Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="xl">
                See Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

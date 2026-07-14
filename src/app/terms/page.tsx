import { Container } from "@/components/shared/container"
export default function TermsPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: July 2026</p>

            <div className="prose prose-gray max-w-none space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-3">1. Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Awoken provides business intelligence consulting and implementation services. The specific scope
                  of each engagement is defined in a separate proposal or agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">2. Engagement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By booking a consultation or engaging our services, you agree to these terms. Each engagement
                  is governed by the specific agreement signed by both parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Upon full payment, you own all deliverables created specifically for your business. Awoken
                  retains the right to use generalized methodologies and frameworks developed during the engagement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">4. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We treat all business information shared during the engagement as confidential. We will not
                  disclose your proprietary information to third parties without your consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are provided on an as-is basis. We make no guarantees about specific business
                  outcomes. Our liability is limited to the fees paid for the specific engagement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, email contact@awoken.in.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

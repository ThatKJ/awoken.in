import type { Metadata } from "next"
import { Container } from "@/components/shared/container"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Awoken's privacy policy. Learn how we collect, use, and protect your personal information when you book a consultation or use our services.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Awoken",
    description:
      "Awoken's privacy policy. Learn how we collect, use, and protect your personal information.",
    url: "https://awoken.in/privacy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Awoken",
    description:
      "Awoken's privacy policy. Learn how we collect, use, and protect your personal information.",
    images: ["/og-image.png"],
  },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: July 2026</p>

            <div className="prose prose-gray max-w-none space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide when booking a consultation, contacting us, or using our services.
                  This includes your name, email address, phone number, company name, and any details you share about
                  your business operations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use your information to understand your business needs, deliver our consulting services,
                  communicate with you about our engagement, and improve our offerings. We do not sell your
                  personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your information. All data is stored
                  securely and accessed only by authorized team members.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use third-party services for scheduling (Cal.com), analytics, and communication. These services
                  have their own privacy policies governing data handling.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal information. Contact us at
                  contact@awoken.in to exercise these rights.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about this policy, email contact@awoken.in.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

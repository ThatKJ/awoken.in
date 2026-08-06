"use client"

import Link from "next/link"
import { LegalPage } from "@/components/shared/legal-page"
import type { LegalSection } from "@/components/shared/legal-page"

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p>
          Awoken (<strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>, or <strong>&ldquo;our&rdquo;</strong>) is a Business Intelligence and AI consulting firm operating at{" "}
          <strong>awoken.in</strong>. We help businesses identify operational bottlenecks, improve efficiency, recover lost revenue, and implement custom AI-powered systems.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. Please read this policy carefully. By using our website or services, you acknowledge the practices described in this policy.
        </p>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p>
          We collect information in several ways — when you provide it directly, when you use our website, and when third-party services share it with us as part of our engagement. Below is a breakdown of the categories of information we collect.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Personal Information</h3>
        <p>
          When you book a discovery call, submit a contact form, subscribe to our newsletter, or request a proposal, we collect:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name and title</li>
          <li>Any information you voluntarily share during consultations</li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Business Information</h3>
        <p>
          During the course of our engagement, you may share detailed business information including operational workflows, system access details, customer data, financial metrics, and strategic plans. This information is treated with strict confidentiality and is only used to deliver our services.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Technical Information</h3>
        <p>
          When you visit our website, we automatically collect certain technical information, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Referring URL and pages visited</li>
          <li>Time and date of visits</li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Analytics Information</h3>
        <p>
          We use analytics tools to understand how our website is used. This includes aggregated data about page views, session duration, user flows, and interaction patterns. This information is anonymized where possible and used to improve our website and services.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <div className="space-y-4">
        <p>
          Our website uses cookies and similar tracking technologies. Cookies are small text files stored on your device that help us understand how you use our site and improve your experience. For detailed information about the cookies we use, please see our{" "}
          <Link href="/cookie-policy" className="text-accent hover:underline">Cookie Policy</Link>.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: (
      <div className="space-y-4">
        <p>We use the information we collect for the following purposes:</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Communication</h3>
        <p>To respond to your inquiries, schedule consultations, send proposals, and provide updates about our engagement.</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Service Delivery</h3>
        <p>To conduct Business Intelligence Audits, design AI solutions, implement systems, and deliver the specific services outlined in your engagement agreement.</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Business Improvement</h3>
        <p>To analyze engagement patterns and outcomes, improve our methodologies, and develop better solutions for future clients. All data used for this purpose is anonymized and aggregated.</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Marketing</h3>
        <p>With your consent, we may send you relevant content, industry insights, and information about our services. You can opt out at any time. We do not sell your information to third parties for marketing purposes.</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Analytics</h3>
        <p>To understand how our website is used, identify areas for improvement, and measure the effectiveness of our content. This data is collected in aggregate and does not personally identify you.</p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Legal Obligations</h3>
        <p>To comply with applicable laws, regulations, legal processes, and enforceable governmental requests. We will only disclose information when we believe in good faith that disclosure is necessary to protect our rights or comply with legal obligations.</p>
      </div>
    ),
  },
  {
    id: "legal-basis-processing",
    title: "Legal Basis for Processing (GDPR)",
    content: (
      <div className="space-y-4">
        <p>
          If you are located in the European Economic Area (EEA), we process your personal information based on the following legal grounds:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Consent:</strong> You have given clear consent for us to process your information for a specific purpose (e.g., subscribing to our newsletter).</li>
          <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you (e.g., delivering consulting services you have engaged us for).</li>
          <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate business interests, such as improving our services and website functionality, provided your rights do not override those interests.</li>
          <li><strong>Legal obligation:</strong> Processing is necessary to comply with a legal obligation to which we are subject.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content: (
      <div className="space-y-4">
        <p>
          We do not sell your personal information. We may share your information with trusted third-party service providers who help us operate our website and deliver our services. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Third-Party Services We Use</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Google Analytics</strong> — anonymized website analytics. Data is processed in accordance with Google&apos;s privacy policy.</li>
          <li><strong>Microsoft Clarity</strong> — user behavior analytics to understand how visitors interact with our website.</li>
          <li><strong>Cloudflare</strong> — content delivery network (CDN) and security services.</li>
          <li><strong>Vercel</strong> — website hosting and deployment platform.</li>
          <li><strong>Cal.com</strong> — scheduling and calendar booking for consultation calls.</li>
          <li><strong>Email Providers</strong> — communication and newsletter distribution.</li>
          <li><strong>CRM Platforms</strong> — managing client relationships and engagement workflows.</li>
        </ul>
        <p>
          Each of these services has its own privacy policy governing how they handle data. We encourage you to review their policies for complete transparency.
        </p>
      </div>
    ),
  },
  {
    id: "data-storage",
    title: "How Long Data Is Stored",
    content: (
      <div className="space-y-4">
        <p>
          We retain your personal information only as long as necessary to fulfill the purposes described in this policy, or as required by applicable law.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Contact and communication data:</strong> Retained for the duration of our engagement plus 24 months, or until you request deletion.</li>
          <li><strong>Analytics data:</strong> Retained in aggregated form for up to 26 months.</li>
          <li><strong>Business information shared during engagements:</strong> Retained for the duration of the engagement and deleted or returned upon completion, per your instructions.</li>
        </ul>
        <p>
          When data is no longer needed, it is securely deleted or anonymized.
        </p>
      </div>
    ),
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    content: (
      <div className="space-y-4">
        <p>
          Awoken is based in India. Your information may be transferred to and processed in countries other than your own, including India and the United States (where our hosting and service providers are located). When we transfer data across borders, we ensure appropriate safeguards are in place, including Standard Contractual Clauses where applicable.
        </p>
        <p>
          By using our website and services, you consent to the transfer of your information to countries that may have different data protection laws than your jurisdiction.
        </p>
      </div>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>
          Depending on your jurisdiction, you may have the following rights regarding your personal information:
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">GDPR Rights (EEA Residents)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Right to access:</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete information.</li>
          <li><strong>Right to erasure:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
          <li><strong>Right to restrict processing:</strong> Request that we limit how we use your information.</li>
          <li><strong>Right to data portability:</strong> Request transfer of your information to another service provider.</li>
          <li><strong>Right to object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
          <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">CCPA Rights (California Residents)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Right to know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
          <li><strong>Right to delete:</strong> Request deletion of personal information we have collected from you.</li>
          <li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
        </ul>

        <p className="mt-4">
          To exercise any of these rights, please contact us at <strong>contact@awoken.in</strong>. We will respond to your request within the timeframe required by applicable law.
        </p>
      </div>
    ),
  },
  {
    id: "children-privacy",
    title: "Children&apos;s Privacy",
    content: (
      <div className="space-y-4">
        <p>
          Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete that information promptly. If you believe a child has provided us with personal information, please contact us immediately.
        </p>
      </div>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <div className="space-y-4">
        <p>
          We implement industry-standard security measures to protect your information, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Encryption of data in transit (TLS/SSL) and at rest</li>
          <li>Access controls limiting data access to authorized team members only</li>
          <li>Secure infrastructure through our hosting providers</li>
          <li>Regular security reviews and updates</li>
        </ul>
        <p>
          While we take reasonable precautions, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security, but we are committed to promptly addressing any security concerns that arise.
        </p>
      </div>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <div className="space-y-4">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. If we make material changes, we will notify you through our website or via email where appropriate.
        </p>
        <p>
          We encourage you to review this policy periodically to stay informed about how we are protecting your information.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <div className="space-y-4">
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:contact@awoken.in" className="text-accent hover:underline">contact@awoken.in</a>
        </p>
        <p>
          We are committed to addressing your concerns promptly and transparently. If you are unsatisfied with our response, you may have the right to lodge a complaint with your local data protection authority.
        </p>
      </div>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 2026"
      sections={sections}
      tocLabel="Privacy"
    />
  )
}

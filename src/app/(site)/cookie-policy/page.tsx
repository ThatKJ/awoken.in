"use client"

import Link from "next/link"
import { LegalPage } from "@/components/shared/legal-page"
import type { LegalSection } from "@/components/shared/legal-page"

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies",
    content: (
      <div className="space-y-4">
        <p>
          Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners.
        </p>
        <p>
          Cookies can be &ldquo;persistent&rdquo; (they remain on your device for a set period) or &ldquo;session&rdquo; (they are deleted when you close your browser). They serve various functions, from remembering your preferences to helping us understand how you interact with our site.
        </p>
      </div>
    ),
  },
  {
    id: "why-we-use-cookies",
    title: "Why We Use Cookies",
    content: (
      <div className="space-y-4">
        <p>
          We use cookies for several purposes, all aimed at improving your experience on our website and helping us deliver better service:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To ensure our website functions correctly and securely</li>
          <li>To understand how visitors use our site so we can improve it</li>
          <li>To remember your preferences during and between visits</li>
          <li>To measure the effectiveness of our content and marketing efforts</li>
          <li>To diagnose technical issues and maintain security</li>
        </ul>
      </div>
    ),
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    content: (
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Essential Cookies</h3>
        <p>
          These cookies are necessary for our website to function properly. They enable basic functions like page navigation, secure access, and maintaining session state. Our website cannot function properly without these cookies.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Analytics Cookies</h3>
        <p>
          Analytics cookies help us understand how visitors interact with our website. They collect information about which pages are visited most often, how users navigate between pages, and where they leave the site. This data helps us improve our website and content.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Performance Cookies</h3>
        <p>
          These cookies collect information about how you use our website, such as which pages you visit and whether you encounter any errors. They are used to improve the performance and reliability of our site.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Preference Cookies</h3>
        <p>
          Preference cookies allow our website to remember choices you make (such as your preferred language or region) and provide enhanced, personalized features.
        </p>
      </div>
    ),
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    content: (
      <div className="space-y-4">
        <p>
          Some cookies are placed by third-party services we use to operate and improve our website. These third parties have their own privacy and cookie policies governing how they handle data.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Google Analytics</h3>
        <p>
          We use Google Analytics to understand how visitors use our website. Google Analytics uses cookies to collect information about page visits, time spent on site, and user interactions. This data is processed anonymously where possible. For more information, see{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google&apos;s Privacy Policy</a>.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Microsoft Clarity</h3>
        <p>
          We use Microsoft Clarity to understand user behavior on our website through heatmaps, session recordings, and interaction analytics. Clarity uses cookies and other tracking technologies. For more information, see{" "}
          <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft&apos;s Privacy Statement</a>.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Cloudflare</h3>
        <p>
          Cloudflare provides content delivery and security services for our website. Cloudflare may set cookies for security purposes, to optimize network performance, and to serve cached content. For more information, see{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Cloudflare&apos;s Privacy Policy</a>.
        </p>
      </div>
    ),
  },
  {
    id: "managing-cookies",
    title: "How to Manage Cookies",
    content: (
      <div className="space-y-4">
        <p>
          You have control over which cookies are stored on your device. Here is how you can manage cookies:
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Browser Settings</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can typically:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>View which cookies are stored on your device</li>
          <li>Delete individual or all cookies</li>
          <li>Block cookies from specific websites</li>
          <li>Block all third-party cookies</li>
          <li>Set preferences for future cookie storage</li>
        </ul>
        <p>
          The method for managing cookies varies by browser. Here are links to instructions for common browsers:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-158be205-94d7-46be-9e9a-3e2c60e0e871" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Cookie Consent</h3>
        <p>
          When you first visit our website, you will see a cookie consent notice. You can accept or decline non-essential cookies through this notice. Your preference will be stored for future visits.
        </p>
        <p>
          Please note that disabling certain cookies may affect the functionality of our website and your user experience.
        </p>
      </div>
    ),
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    content: (
      <div className="space-y-4">
        <p>
          We may update this Cookie Policy from time to time to reflect changes in the cookies we use, legal requirements, or operational needs. When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
        </p>
        <p>
          We encourage you to review this policy periodically to stay informed about how we use cookies and similar technologies.
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
          If you have questions about this Cookie Policy or how we use cookies, please contact us:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:contact@awoken.in" className="text-accent hover:underline">contact@awoken.in</a>
        </p>
        <p>
          For more information about how we handle your personal data, please see our{" "}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    ),
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="July 2026"
      sections={sections}
      tocLabel="Cookies"
    />
  )
}

import { chromium } from "playwright"

const BASE_URL = "http://localhost:3000"

const VIEWPORTS = [
  { w: 320, label: "320" },
  { w: 375, label: "375" },
  { w: 390, label: "390" },
  { w: 430, label: "430" },
  { w: 640, label: "640" },
  { w: 768, label: "768" },
  { w: 820, label: "820" },
  { w: 1024, label: "1024" },
  { w: 1280, label: "1280" },
  { w: 1366, label: "1366" },
  { w: 1440, label: "1440" },
  { w: 1536, label: "1536" },
  { w: 1728, label: "1728" },
  { w: 1920, label: "1920" },
  { w: 2560, label: "2560" },
]

const PAGES = [
  "/", "/about", "/services", "/solutions", "/how-we-work",
  "/industries", "/integrations", "/resources", "/contact",
  "/demo", "/engagement", "/book", "/privacy", "/terms", "/thank-you",
]

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 1 })
const page = await context.newPage()

const allIssues = []

for (const vp of VIEWPORTS) {
  for (const path of PAGES) {
    await page.setViewportSize({ width: vp.w, height: 900 })
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "load", timeout: 15000 })
      await page.waitForTimeout(1500)
    } catch { /* ok */ }

    const issues = await page.evaluate((width) => {
      const found = []

      // 1. NAV: check if nav items are visible or hidden
      const nav = document.querySelector("nav, header")
      if (nav) {
        const links = nav.querySelectorAll("a")
        // Check if any nav item has 0 dimensions (hidden/overlapped)
        for (const link of links) {
          const rect = link.getBoundingClientRect()
          if (rect.width > 0 && rect.height < 10) {
            found.push({ type: "nav-collapsed", detail: `Link "${link.textContent.slice(0, 30)}" height=${rect.height.toFixed(0)}px`, severity: "medium" })
          }
        }
      }

      // 2. Check for very wide cards in grid layouts
      const cards = document.querySelectorAll('[class*="rounded-xl"], [class*="rounded-2xl"]')
      let cardCount = 0
      for (const card of cards) {
        const rect = card.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 50) {
          cardCount++
          // Check if cards are too narrow (< 200px on desktop) or too wide (> 800px)
          if (width >= 1024 && rect.width < 200 && rect.width > 50) {
            found.push({ type: "card-too-narrow", detail: `${rect.width.toFixed(0)}px wide card`, severity: "low" })
          }
          if (rect.width > width * 0.95 && rect.width < width) {
            // Card is nearly full viewport width — might be single-column on desktop
            if (width >= 1024) {
              found.push({ type: "card-fullwidth", detail: `${rect.width.toFixed(0)}px card at ${width}px viewport`, severity: "info" })
            }
          }
        }
      }

      // 3. Check section spacing — consecutive sections should have consistent gap
      const sections = [...document.querySelectorAll("section")]
        .filter(s => s.getBoundingClientRect().height > 50)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)

      if (sections.length >= 2) {
        for (let i = 1; i < sections.length; i++) {
          const prev = sections[i - 1].getBoundingClientRect()
          const curr = sections[i].getBoundingClientRect()
          const gap = curr.top - prev.bottom
          if (gap < 0) {
            found.push({ type: "section-overlap", detail: `sections ${i - 1} and ${i} overlap by ${Math.abs(gap).toFixed(0)}px`, severity: "high" })
          }
          // Very large gaps between sections might indicate excessive whitespace
          if (gap > 200 && prev.bottom > 0) {
            found.push({ type: "large-section-gap", detail: `${gap.toFixed(0)}px between sections ${i - 1} and ${i}`, severity: "info" })
          }
        }
      }

      // 4. Check for text overflow in two-line headings
      const headings = document.querySelectorAll("h1, h2, h3, h4")
      for (const h of headings) {
        const rect = h.getBoundingClientRect()
        const style = window.getComputedStyle(h)
        const lineHeight = parseFloat(style.lineHeight) || 1.3 * parseFloat(style.fontSize)
        const lines = Math.round(rect.height / lineHeight)
        if (lines > 4 && rect.width > 0) {
          found.push({ type: "heading-too-many-lines", detail: `<${h.tagName}> "${h.textContent.slice(0, 50)}" ${lines} lines`, severity: "low" })
        }
      }

      // 5. Check for content that's pushed very far (page too long)
      const bodyH = document.body.scrollHeight
      if (bodyH > 20000) {
        found.push({ type: "page-very-long", detail: `${(bodyH / 1000).toFixed(0)}k px tall`, severity: "info" })
      }

      // 6. Check CTA buttons in hero sections — they should be visible and tappable
      const heroCtas = document.querySelectorAll('[class*="hero"] a, [class*="hero"] button, section:first-of-type a, section:first-of-type button')
      let ctaCount = 0
      for (const cta of heroCtas) {
        const rect = cta.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 30) {
          ctaCount++
        }
      }

      return found
    }, vp.w)

    for (const issue of issues) {
      allIssues.push(`[${vp.label}px] ${issue.severity.toUpperCase()} ${path} — ${issue.type}: ${issue.detail}`)
    }
  }
}

await browser.close()

// Deduplicate
const unique = [...new Set(allIssues)]
console.log(unique.join("\n"))
console.log(`\nTotal quality issues: ${unique.length}`)

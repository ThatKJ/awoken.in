import { chromium } from "playwright"
import { writeFileSync } from "fs"

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

const results = []

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 1 })
const page = await context.newPage()

for (const vp of VIEWPORTS) {
  for (const path of PAGES) {
    await page.setViewportSize({ width: vp.w, height: 900 })
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "load", timeout: 15000 })
      await page.waitForTimeout(1500)
    } catch {
      // timeout ok
    }

    const issues = await page.evaluate((width) => {
      const found = []

      // 1. Horizontal overflow
      const docWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
      )
      if (docWidth > width + 2) {
        found.push({ type: "overflow", detail: `docWidth=${docWidth} > viewport=${width}`, severity: "high" })
      }

      // 2. Elements overflowing their containers
      const all = document.querySelectorAll("*")
      for (const el of all) {
        if (el.children.length === 0) continue // skip text nodes
        const rect = el.getBoundingClientRect()
        if (rect.width === 0) continue
        const parent = el.parentElement
        if (!parent) continue
        const pRect = parent.getBoundingClientRect()
        // Check if child is wider than parent
        if (rect.width > pRect.width + 2 && pRect.width > 0) {
          // Only report if significant
          const tag = el.tagName.toLowerCase()
          if (!["svg", "path", "use", "iframe", "img", "video"].includes(tag)) {
            found.push({
              type: "child-overflow",
              detail: `<${tag}> ${(rect.width - pRect.width).toFixed(0)}px wider than parent`,
              severity: "medium",
            })
          }
        }
      }

      // 3. Check for any ugly text wrapping in headings
      const headings = document.querySelectorAll("h1, h2, h3")
      for (const h of headings) {
        const rect = h.getBoundingClientRect()
        const style = window.getComputedStyle(h)
        if (rect.width > 0) {
          // Rough check: if line-height * estimated lines exceeds natural height by a lot
          const lh = parseFloat(style.lineHeight) || 1.2 * parseFloat(style.fontSize)
          const estimatedLines = Math.ceil(h.textContent.length * parseFloat(style.fontSize) * 0.6 / rect.width)
          const actualLines = Math.round(rect.height / lh)
          if (estimatedLines > 1 && actualLines > estimatedLines * 1.5) {
            found.push({
              type: "heading-wrap",
              detail: `<${h.tagName.toLowerCase()}> "${h.textContent.slice(0, 50)}" est=${estimatedLines} act=${actualLines}`,
              severity: "low",
            })
          }
        }
      }

      // 4. Check for zero-height sections (potential collapse)
      const sections = document.querySelectorAll("section")
      for (const s of sections) {
        const rect = s.getBoundingClientRect()
        if (rect.height < 10 && rect.width > 0) {
          found.push({ type: "collapsed-section", detail: `section near y=${rect.top.toFixed(0)}`, severity: "high" })
        }
      }

      // 5. Check section padding consistency
      // Look at gap between consecutive sections
      const sorted = [...sections].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1].getBoundingClientRect()
        const curr = sorted[i].getBoundingClientRect()
        const gap = curr.top - prev.bottom
        if (gap > 0 && gap < 20 && prev.bottom > 0) {
          found.push({
            type: "tight-gap",
            detail: `gap=${gap.toFixed(0)}px between sections ${i - 1} and ${i}`,
            severity: "low",
          })
        }
      }

      // 6. Footer check
      const footer = document.querySelector("footer")
      if (footer) {
        const fRect = footer.getBoundingClientRect()
        if (fRect.width > width + 2) {
          found.push({ type: "footer-overflow", detail: `footer ${fRect.width}px vs viewport ${width}px`, severity: "high" })
        }
      }

      // 7. Nav bar check
      const nav = document.querySelector("nav, header")
      if (nav) {
        const nRect = nav.getBoundingClientRect()
        if (nRect.width > width + 2) {
          found.push({ type: "nav-overflow", detail: `nav ${nRect.width}px vs viewport ${width}px`, severity: "high" })
        }
      }

      return found
    }, vp.w)

    for (const issue of issues) {
      results.push({ viewport: vp.label, path, ...issue })
    }
  }
}

await browser.close()

// Deduplicate
const unique = []
const seen = new Set()
for (const r of results) {
  const key = `${r.viewport}|${r.path}|${r.type}|${r.severity}`
  if (!seen.has(key)) {
    seen.add(key)
    unique.push(r)
  }
}

const report = unique.map(r => `${r.severity.toUpperCase()} [${r.viewport}px] ${r.path} — ${r.type}: ${r.detail}`).join("\n")
console.log(report)
writeFileSync("screenshots/responsive-audit/issues-report.txt", report)
console.log(`\nTotal unique issues: ${unique.length}`)

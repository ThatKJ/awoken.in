import { chromium } from "playwright"

const BASE_URL = "http://localhost:3000"

const VIEWPORTS = [
  { w: 320, label: "320" },
  { w: 430, label: "430" },
  { w: 640, label: "640" },
  { w: 768, label: "768" },
  { w: 1024, label: "1024" },
  { w: 1280, label: "1280" },
  { w: 1440, label: "1440" },
  { w: 1920, label: "1920" },
  { w: 2560, label: "2560" },
]

const browser = await chromium.launch()
const page = await browser.newPage()
const results = []

for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.w, height: 900 })
  await page.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 15000 })
  await page.waitForTimeout(2000)

  const data = await page.evaluate((width) => {
    const r = []

    // 1. NAV — check if the "Let's Talk" CTA button is visible
    const nav = document.querySelector("header") || document.querySelector("nav")
    if (nav) {
      const links = [...nav.querySelectorAll("a")].filter(a => a.getBoundingClientRect().height > 10)
      r.push({ check: "nav-links-visible", value: links.length })
      const cta = links.find(a => a.textContent.includes("Talk"))
      if (cta) {
        const rect = cta.getBoundingClientRect()
        r.push({ check: "nav-cta-visible", value: `${rect.width.toFixed(0)}x${rect.height.toFixed(0)} at x=${rect.left.toFixed(0)}` })
      }
      // Check if nav has a hamburger at narrow widths (or if all links are visible)
      const mobileNav = nav.querySelector('[class*="md:hidden"], [class*="lg:hidden"]')
      r.push({ check: "mobile-nav-toggle", value: mobileNav ? "present" : "absent" })
    }

    // 2. Check card equal height within grid parents
    const gridParents = document.querySelectorAll('[class*="grid"]')
    for (const g of gridParents) {
      const children = [...g.children].filter(c => {
        const r = c.getBoundingClientRect()
        return r.width > 50 && r.height > 50
      })
      if (children.length >= 2) {
        const heights = children.map(c => c.getBoundingClientRect().height)
        const max = Math.max(...heights)
        const min = Math.min(...heights)
        if (max - min > 50) {
          r.push({
            check: "unequal-card-heights",
            value: `grid "${g.className.slice(0, 40)}": min=${min.toFixed(0)} max=${max.toFixed(0)} diff=${(max - min).toFixed(0)}px`,
          })
        }
      }
    }

    // 3. Content width at ultrawide (2560px)
    if (width >= 2560) {
      const main = document.querySelector("main") || document.body
      const content = [...document.querySelectorAll('[class*="max-w-7xl"], [class*="max-w-5xl"], [class*="max-w-3xl"], [class*="max-w-2xl"]')]
      for (const c of content) {
        const rect = c.getBoundingClientRect()
        if (rect.width > 50 && rect.width < rect.width + 2) {
          r.push({ check: "content-max-width", value: `${c.className.slice(0, 50)}: ${rect.width.toFixed(0)}px` })
        }
      }
    }

    // 4. Check images for distortion
    const imgs = document.querySelectorAll("img")
    for (const img of imgs) {
      const rect = img.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        // Check if natural aspect ratio is preserved
        const displayRatio = rect.width / rect.height
        const naturalRatio = img.naturalWidth / img.naturalHeight
        if (naturalRatio > 0 && Math.abs(displayRatio / naturalRatio - 1) > 0.1) {
          r.push({ check: "img-distortion", value: `${img.src.slice(-30)} display=${displayRatio.toFixed(2)} natural=${naturalRatio.toFixed(2)}` })
        }
      }
    }

    // 5. Check footer layout
    const footer = document.querySelector("footer")
    if (footer) {
      const fRect = footer.getBoundingClientRect()
      r.push({ check: "footer-height", value: `${fRect.height.toFixed(0)}px` })
      // Check footer content is visible
      const fLinks = footer.querySelectorAll("a")
      const visibleLinks = [...fLinks].filter(a => a.getBoundingClientRect().height > 10)
      r.push({ check: "footer-links-visible", value: visibleLinks.length })
    }

    // 6. Check for any text smaller than 10px on mobile
    if (width <= 430) {
      const all = document.querySelectorAll("*")
      for (const el of all) {
        const style = window.getComputedStyle(el)
        const fs = parseFloat(style.fontSize)
        if (fs > 0 && fs < 10 && el.children.length === 0) {
          const text = el.textContent.trim()
          if (text.length > 0) {
            r.push({ check: "tiny-text", value: `${fs}px — "${text.slice(0, 40)}"` })
          }
        }
      }
    }

    return r
  }, vp.w)

  for (const d of data) {
    results.push(`[${vp.label}px] ${d.check}: ${d.value}`)
  }
}

await browser.close()

const unique = [...new Set(results)]
console.log(unique.join("\n"))
console.log(`\nTotal structural checks: ${unique.length}`)

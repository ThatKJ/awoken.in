import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

// Check home at 320px
await page.setViewportSize({ width: 320, height: 900 })
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 15000 })
await page.waitForTimeout(2000)

const info = await page.evaluate(() => {
  const results = []
  const els = document.querySelectorAll("h1, h2, h3")
  for (const h of els) {
    const text = h.textContent.slice(0, 80)
    const rect = h.getBoundingClientRect()
    const style = window.getComputedStyle(h)
    const fs = parseFloat(style.fontSize)
    const lh = parseFloat(style.lineHeight) || fs * 1.3
    const lines = Math.round(rect.height / lh)
    if (rect.width > 0 && lines >= 3) {
      results.push({
        text,
        lines,
        width: rect.width.toFixed(0),
        height: rect.height.toFixed(0),
        fs: fs.toFixed(0),
        lh: lh.toFixed(0),
        y: rect.top.toFixed(0),
      })
    }
  }
  return results
})

console.log("=== Home 320px - Multi-line headings ===")
for (const i of info) {
  console.log(`  "${i.text}" — ${i.lines} lines, fs=${i.fs}px, w=${i.width}px, h=${i.height}px, y=${i.y}`)
}

// Also check which component each heading belongs to
const sections = await page.evaluate(() => {
  const results = []
  const sectionEls = document.querySelectorAll("section")
  for (const s of sectionEls) {
    const h2 = s.querySelector("h2")
    if (h2) {
      results.push({
        heading: h2.textContent.slice(0, 80),
        y: s.getBoundingClientRect().top.toFixed(0),
        h2y: h2.getBoundingClientRect().top.toFixed(0),
      })
    }
  }
  return results
})

console.log("\n=== Section headings by position ===")
for (const s of sections) {
  console.log(`  y=${s.y} h2@y=${s.h2y} "${s.heading}"`)
}

await browser.close()

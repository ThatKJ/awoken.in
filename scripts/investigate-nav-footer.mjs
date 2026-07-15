import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

// Check nav at 768px (tablet)
await page.setViewportSize({ width: 768, height: 900 })
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 15000 })
await page.waitForTimeout(2000)

const navInfo = await page.evaluate(() => {
  const results = []
  const header = document.querySelector("header") || document.querySelector("nav")
  if (!header) return ["NO HEADER FOUND"]

  // Get all visible links
  const allLinks = header.querySelectorAll("a")
  for (const link of allLinks) {
    const rect = link.getBoundingClientRect()
    const style = window.getComputedStyle(link)
    const visible = rect.width > 10 && rect.height > 10 && style.display !== "none" && style.visibility !== "hidden"
    results.push({
      text: link.textContent.trim().slice(0, 30),
      visible,
      width: rect.width.toFixed(0),
      height: rect.height.toFixed(0),
      display: style.display,
      y: rect.top.toFixed(0),
    })
  }

  // Check hamburger
  const hamburger = header.querySelector('button[aria-label="Open menu"], button[aria-label="Close menu"]')
  if (hamburger) {
    const rect = hamburger.getBoundingClientRect()
    const style = window.getComputedStyle(hamburger)
    results.push({
      text: "HAMBURGER",
      visible: rect.width > 10,
      width: rect.width.toFixed(0),
      height: rect.height.toFixed(0),
      display: style.display,
      y: rect.top.toFixed(0),
    })
  }

  // Check tablet CTA
  const tabletCtas = [...header.querySelectorAll('[class*="md:flex"]')]
  for (const cta of tabletCtas) {
    const rect = cta.getBoundingClientRect()
    const style = window.getComputedStyle(cta)
    results.push({
      text: `TABLET_CTA: ${cta.textContent.trim().slice(0, 30)}`,
      visible: rect.width > 10 && style.display !== "none",
      width: rect.width.toFixed(0),
      height: rect.height.toFixed(0),
      display: style.display,
      y: rect.top.toFixed(0),
    })
  }

  return results
})

console.log("=== Nav at 768px ===")
for (const n of navInfo) {
  console.log(`  ${n.visible ? "VISIBLE" : "HIDDEN"} ${n.text} ${n.width}x${n.height} disp=${n.display} y=${n.y}`)
}

// Check footer on mobile (320px)
await page.setViewportSize({ width: 320, height: 900 })
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 15000 })
await page.waitForTimeout(2000)

const footerInfo = await page.evaluate(() => {
  const footer = document.querySelector("footer")
  if (!footer) return ["NO FOOTER"]

  const results = [`Footer height: ${footer.getBoundingClientRect().height.toFixed(0)}px`]

  // Check how many columns the footer has on mobile
  const grids = footer.querySelectorAll('[class*="grid"]')
  for (const g of grids) {
    const rect = g.getBoundingClientRect()
    const style = window.getComputedStyle(g)
    results.push(`  Grid: ${g.className.slice(0, 60)} w=${rect.width.toFixed(0)} cols=${style.gridTemplateColumns || "auto"}`)
  }

  const allLinks = footer.querySelectorAll("a")
  results.push(`  Total links: ${allLinks.length}`)

  return results
})

console.log("\n=== Footer at 320px ===")
for (const f of footerInfo) console.log(f)

await browser.close()

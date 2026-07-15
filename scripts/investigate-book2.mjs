import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

await page.setViewportSize({ width: 320, height: 900 })
await page.goto("http://localhost:3000/book", { waitUntil: "load", timeout: 15000 })
await page.waitForTimeout(2000)

// Find elements that extend past viewport
const info = await page.evaluate(() => {
  const results = []
  const all = document.querySelectorAll("*")
  for (const el of all) {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) continue
    if (rect.right > 322 || rect.left < -2) {
      const tag = el.tagName.toLowerCase()
      const id = el.id ? `#${el.id}` : ""
      const cls = (el.className || "").toString().slice(0, 60)
      results.push({
        tag, id, cls,
        left: rect.left.toFixed(0),
        right: rect.right.toFixed(0),
        width: rect.width.toFixed(0),
        y: rect.top.toFixed(0),
        text: (el.textContent || "").slice(0, 60),
      })
    }
  }
  return results
})

console.log("=== Book 320px - Elements extending past viewport ===")
// Group by position to find the root cause
for (const o of info) {
  console.log(`  <${o.tag}> ${o.id} "${o.text}" L=${o.left} R=${o.right} W=${o.width} y=${o.y}`)
}

console.log(`\nTotal elements extending past viewport: ${info.length}`)

await browser.close()

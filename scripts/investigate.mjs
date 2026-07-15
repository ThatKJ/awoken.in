import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

await page.setViewportSize({ width: 320, height: 900 })
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 15000 })
await page.waitForTimeout(2000)

const overflowInfo = await page.evaluate(() => {
  const results = []
  const all = document.querySelectorAll("*")
  for (const el of all) {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) continue
    const parent = el.parentElement
    if (!parent) continue
    const pRect = parent.getBoundingClientRect()
    if (rect.width > pRect.width + 2 && pRect.width > 0) {
      const tag = el.tagName.toLowerCase()
      const id = el.id ? `#${el.id}` : ""
      const cls = (el.className || "").toString().slice(0, 80)
      const text = (el.textContent || "").slice(0, 100)
      results.push({
        tag, id, cls, text,
        elW: rect.width.toFixed(0),
        parentW: pRect.width.toFixed(0),
        diff: (rect.width - pRect.width).toFixed(0),
        y: rect.top.toFixed(0),
      })
    }
  }
  return results
})

console.log("=== Home 320px - Overflowing elements ===")
for (const o of overflowInfo) {
  console.log(`  <${o.tag}> ${o.id} cls="${o.cls}" "${o.text}" — ${o.diff}px wider (${o.elW} vs ${o.parentW}) y=${o.y}`)
}

// Also check doc scroll
const scrollInfo = await page.evaluate(() => ({
  scrollW: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
  clientW: document.documentElement.clientWidth,
  bodyW: document.body.scrollWidth,
}))
console.log(`\nDocument: scroll=${scrollInfo.scrollW} client=${scrollInfo.clientW} body=${scrollInfo.bodyW}`)

// Find the widest element on the page
const widest = await page.evaluate(() => {
  let max = { el: null, w: 0 }
  const all = document.querySelectorAll("*")
  for (const el of all) {
    const r = el.getBoundingClientRect()
    if (r.width > max.w) { max = { el: el.tagName + "#" + (el.id || "") + "." + ((el.className || "").toString().slice(0, 40)), w: r.width } }
  }
  return max
})
console.log(`Widest element: <${widest.el}> at ${widest.w}px`)

await browser.close()

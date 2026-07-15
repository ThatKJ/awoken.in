import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

for (const width of [640]) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto("http://localhost:3000/thank-you", { waitUntil: "load", timeout: 15000 })
  await page.waitForTimeout(2000)

  const info = await page.evaluate((w) => {
    const results = []
    const all = document.querySelectorAll("*")
    for (const el of all) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right > w + 2 || rect.left < -2) {
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
  }, width)

  const scroll = await page.evaluate(() => document.documentElement.scrollWidth)
  console.log(`Thank-you ${width}px: scroll=${scroll} issues=${info.length}`)
  for (const i of info) {
    console.log(`  <${i.tag}> ${i.id} "${i.text}" L=${i.left} R=${i.right} W=${i.width} y=${i.y}`)
  }
}

await browser.close()

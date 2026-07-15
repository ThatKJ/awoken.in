import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

for (const width of [375, 390, 430]) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto("http://localhost:3000/book", { waitUntil: "load", timeout: 15000 })
  await page.waitForTimeout(2000)

  const info = await page.evaluate((w) => {
    const results = []
    const all = document.querySelectorAll("*")
    for (const el of all) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right > w + 2 || rect.left < -2) {
        const tag = el.tagName.toLowerCase()
        results.push({ tag, right: rect.right.toFixed(0), w })
      }
    }
    return results
  }, width)

  const scroll = await page.evaluate(() => document.documentElement.scrollWidth)
  console.log(`Book ${width}px: scroll=${scroll} issues=${info.length}`)
  if (info.length > 0) {
    for (const i of info.slice(0, 3)) {
      console.log(`  <${i.tag}> right=${i.right}`)
    }
  }
}

await browser.close()

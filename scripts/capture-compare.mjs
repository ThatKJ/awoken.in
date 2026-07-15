import { chromium } from "playwright"
import { mkdirSync } from "fs"

const BASE_URL = "http://localhost:3000"
const VIEWPORTS = [
  { w: 1440, label: "1440" },
  { w: 1728, label: "1728" },
  { w: 1920, label: "1920" },
  { w: 2560, label: "2560" },
]
const PAGES = ["/", "/services", "/how-we-work", "/engagement"]

const dir = "screenshots/container-compare"
mkdirSync(`${dir}/before`, { recursive: true })
mkdirSync(`${dir}/after`, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 1 })

async function capture(label) {
  const page = await context.newPage()
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.w, height: 900 })
    for (const path of PAGES) {
      try {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: "load", timeout: 15000 })
        await page.waitForTimeout(2000)
      } catch {}
      const slug = path === "/" ? "home" : path.slice(1)
      await page.screenshot({
        path: `${dir}/${label}/${slug}_${vp.label}px.png`,
        fullPage: true,
      })
      console.log(`  ${slug}_${vp.label}px.png`)
    }
  }
  await page.close()
}

console.log("Capturing AFTER (current state with fixes)...")
await capture("after")

await browser.close()

import { chromium } from "playwright"
import { mkdirSync } from "fs"

const BASE_URL = "http://localhost:3000"
const OUTPUT = "screenshots/responsive-audit"

const VIEWPORTS = [
  320, 375, 390, 430, 640, 768, 820, 1024, 1280, 1366, 1440, 1536, 1728, 1920, 2560,
]

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/services", name: "services" },
  { path: "/solutions", name: "solutions" },
  { path: "/how-we-work", name: "how-we-work" },
  { path: "/industries", name: "industries" },
  { path: "/integrations", name: "integrations" },
  { path: "/resources", name: "resources" },
  { path: "/contact", name: "contact" },
  { path: "/demo", name: "demo" },
  { path: "/engagement", name: "engagement" },
  { path: "/book", name: "book" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/thank-you", name: "thank-you" },
]

mkdirSync(OUTPUT, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 1 })
const page = await context.newPage()

for (const { path, name } of PAGES) {
  console.log(`\n=== ${name} ===`)

  for (const width of VIEWPORTS) {
    await page.setViewportSize({ width, height: 900 })
    try {
      await page.goto(`${BASE_URL}${path}`, {
        waitUntil: "load",
        timeout: 15000,
      })
      // Wait for fonts and layout settle (but not for networkidle — cal.com iframe keeps loading)
      await page.waitForTimeout(1500)
    } catch (e) {
      console.log(`  ${width}px → TIMEOUT (taking screenshot anyway)`)
    }

    const filename = `${OUTPUT}/${name}_${width}px.png`
    await page.screenshot({ path: filename, fullPage: true })
    console.log(`  ${width}px → ${filename}`)
  }
}

await browser.close()
console.log("\nDone!")

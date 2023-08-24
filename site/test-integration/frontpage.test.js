jest.setTimeout(15 * 1000)

const { port } = require("../jest-puppeteer.config").server

const siteRoot = `http://localhost:${port}`

describe("main site", () => {
  beforeAll(async () => {
    await page.goto(siteRoot)
  })

  it("should have an checklist heading on it somewhere", async () => {
    await expect(
        page.waitForXPath(`//*[text()="Checklist"]`)
    ).resolves.toBeTruthy()
  })
})

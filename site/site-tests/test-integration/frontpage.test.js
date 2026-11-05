jest.setTimeout(15 * 1000)

const {port} = require("../jest-puppeteer.config").server

const siteRoot = `http://localhost:${port}`

describe("main site", () => {
    beforeAll(async () => {
        await page.goto(siteRoot)
    })

    it("should have an release heading on it somewhere", async () => {
        await expect(
            page.waitForSelector(`xpath///*[text()="Release"]`)
        ).resolves.toBeTruthy()
    })
})

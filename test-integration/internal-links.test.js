jest.setTimeout(10 * 60 * 1000)

const link = require("linkinator")

const config = require("../gatsby-config.js")
const { port } = require("../jest-puppeteer.config").server
const pathPrefix = process.env.PATH_PREFIX || ""

describe("site links", () => {
  const deadInternalLinks = []

  beforeAll(async () => {
    const path = `http://localhost:${port}/${pathPrefix}`

    // create a new `LinkChecker` that we'll use to run the scan.
    const checker = new link.LinkChecker()

    // After a page is scanned, check out the results!
    checker.on("link", async result => {
      if (result.state === "BROKEN") {

        const errorText =
          result.failureDetails[0].statusText || result.failureDetails[0].code
        const description = `${result.url} => ${result.status} (${errorText}) on ${result.parent}`

        if (!deadInternalLinks.includes(description)) {
          deadInternalLinks.push(description)
        }

      }
    })

    // This should almost always be empty, except for the blanket exclude of non-internal links; we would not want to allow-list dead internal links
    const linksToSkip = [`^(?!${config.siteUrl})`, `^(?!http://localhost:9000)`]

    // Go ahead and start the scan! As events occur, we will see them above.
    return await checker.check({
      path,
      recurse: true,
      linksToSkip,
      urlRewriteExpressions: [
        {
          pattern: config.siteUrl,
          replacement: "http://localhost:9000",
        },
      ],
      concurrency: 50,
      timeout: 30 * 1000,
      retry: true, // Retry on 429
      retryErrors: true, // Retry on 5xx
      retryErrorsCount: 6,
    })
  })

  it("internal links should all resolve", async () => {
    expect(deadInternalLinks).toEqual([])
  })

})


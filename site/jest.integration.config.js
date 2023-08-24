module.exports = {
  preset: "jest-puppeteer",
  testPathIgnorePatterns: [".cache"],
  setupFilesAfterEnv: ["expect-puppeteer"],
}

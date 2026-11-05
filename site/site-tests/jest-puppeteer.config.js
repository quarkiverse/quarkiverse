// Load a token from `.env` when testing locally.
// This is not used when running in CI.
// See below for the ".env" contents.
require("dotenv").config({quiet: true})

module.exports = {
  server: {
    command: "node serve-roq.js 9000",
    // The protocol, host and port are used to check when your application
    // is ready to accept requests. Your tests will start running as soon as
    // the port on that host and protocol are available.
    protocol: "http",
    host: "localhost",
    port: 9000,
    // When the port at that host and protocol does not respond within the
    // specified time, the tests will fail. Increase this time (in ms) in case
    // your application requires more time to boot.
    launchTimeout: 45000,
    debug: true,
  },
  launch: {
    // GitHub's runners block the unprivileged user namespaces Chrome's sandbox needs; the runner is disposable anyway
    args: process.env.CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  },
}

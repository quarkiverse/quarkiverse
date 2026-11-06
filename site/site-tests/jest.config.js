module.exports = {
    testEnvironment: "node",
    // Serves ../target/roq/ for the tests, so build the site first
    globalSetup: "./serve-setup.js",
    globalTeardown: "./serve-teardown.js",
    // linkinator is an ES module, so Babel has to transform it for Jest
    transformIgnorePatterns: [`<rootDir>/node_modules/(?!(linkinator|srcset)/)`],
}

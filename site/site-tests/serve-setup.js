const {setup} = require("jest-dev-server")
const {port} = require("./site.config")

module.exports = async () => {
    globalThis.servers = await setup({command: `node serve-roq.js ${port}`, port, launchTimeout: 45000})
}

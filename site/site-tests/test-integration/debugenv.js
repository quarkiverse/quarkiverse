const JestPuppeteerEnvironment =
  require("jest-environment-puppeteer").TestEnvironment

class DebugEnv extends JestPuppeteerEnvironment {
  async handleTestEvent(event) {
    const ignoredEvents = [
      "setup",
      "add_hook",
      "start_describe_definition",
      "add_test",
      "finish_describe_definition",
      "run_start",
      "run_describe_start",
      "test_start",
      "test_started",
      "hook_start",
      "hook_success",
      "test_fn_start",
      "test_fn_success",
      "test_fn_failure", // We care about test failures, but the normal logging is usually sufficient
      "test_done",
      "run_describe_finish",
      "run_finish",
      "teardown",
    ]
    if (!ignoredEvents.includes(event.name)) {
      console.log(" Unhandled event(" + event.name + "): ", event)
    }
  }
}

module.exports = DebugEnv

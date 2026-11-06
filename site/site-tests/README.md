# Site tests

Link checks that run against the generated site, which `serve-roq.js` serves from `../target/roq/` on port 9000.
The checks of the pages themselves are Java tests, in `../src/test/java`.

To run them, build the site, then run them from this directory:

```
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests
cd site-tests
npm ci
npm run test:int
npm run test:links
```

`test:int` checks the internal links, and `test:links` the external ones; CI opens an issue for dead external links
rather than failing the build.

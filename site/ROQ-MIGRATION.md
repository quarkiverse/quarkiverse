# Finishing the migration to Roq

The migration from Gatsby left these for you to do by hand.
Tick them off as you go, and delete this file when you are done.

## config

- [ ] Reproduce the local Gatsby plugin site/plugins/gatsby-frontmatter-defaults/ (see its gatsby-node.js); it has no Roq equivalent

## templates

- [ ] Set pageName in the front matter of content/index.html, for templates/layouts/main.html: site/src/pages/index.jsx gave it to the layout from a value that Roq has no equivalent for

## check

- [ ] Convert the tests in site-tests/ to Java tests (@RoqAndRoll with Playwright), then delete site-tests/; until then they run with npm, see site-tests/README.md
- [ ] The 5 Jest unit tests of the React components go with them; write Roq tests (@RoqAndRoll) for what they covered
- [ ] Update .github/workflows/build_and_publish.yml: it builds the Gatsby site in site/; the site is now built with Maven (QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run) and generated in target/roq/
- [ ] Update .github/workflows/build_and_publish.yml: run 'npm run test:int' from site-tests/, after building the site with Maven
- [ ] Update .github/workflows/build_and_publish.yml: run 'npm run test:links' from site-tests/, after building the site with Maven
- [ ] Update .github/workflows/build_and_publish.yml: it uses docs/, which moved unchanged to content/; point it at content/
- [ ] Update .github/workflows/wikisync.yml: it uses docs/, which moved unchanged to content/; point it at content/

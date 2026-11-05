# Welcome to Quarkiverse Hub!

The Quarkiverse GitHub organization provides repository hosting (including build, CI and release publishing setup) for Quarkus extension projects contributed by the community.

This repository serves several functions:

- Host documentation for extension authors who wish to take advantage of the Quarkiverse Hub infrastructure. The docs are available on [this repository's wiki](https://github.com/quarkiverse/quarkiverse/wiki) and at [hub.quarkiverse.io](https://hub.quarkiverse.io).  
- Host [issues](https://github.com/quarkiverse/quarkiverse/issues?q=is%3Aopen+is%3Aissue+label%3Atriage%2Fci-quarkiverse%2Ctriage%2Fci-quarkiverse-3) created by the [ecosystem CI](https://github.com/quarkusio/quarkus-ecosystem-ci#what-its-all-about)

## Onboarding an extension 

Looking to onboard an extension? Here's the [quick link](https://github.com/quarkiverse/quarkiverse/wiki#getting-an-extension-onboarded). 

## Updating the docs 

The content for the Quarkiverse Hub site lives in [the site/content folder](https://github.com/quarkiverse/quarkiverse/tree/main/site/content). 
It is [mirrored](https://github.com/quarkiverse/quarkiverse/blob/main/.github/workflows/wikisync.yml) to [the GitHub wiki](https://github.com/quarkiverse/quarkiverse/wiki), and also [published externally](https://hub.quarkiverse.io) as a [Roq](https://github.com/quarkiverse/quarkus-roq) site. This allows the content to be indexed by search engines, and also enables richer formatting and styling.

### Run project locally

To stand up the Roq site locally, work in the `site` directory. You need a JDK (21 or later) and Maven. To start development:

```
mvn quarkus:dev
```

Roq will start a live-reloading development environment at [localhost:8080](http://localhost:8080).

To generate the static site, as the build does, into `site/target/roq`:

```
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests
```

### Tests

The site is checked with browser-based link and page tests, which need Node.js. See [site-tests/README.md](site/site-tests/README.md) for how to run them.

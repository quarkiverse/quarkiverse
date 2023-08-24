# Welcome to Quarkiverse Hub!

The Quarkiverse GitHub organization provides repository hosting (including build, CI and release publishing setup) for Quarkus extension projects contributed by the community.

This repository serves several functions:

- Host documentation for extension authors who wish to take advantage of the Quarkiverse Hub infrastructure. The docs are available on [this repository's wiki](https://github.com/quarkiverse/quarkiverse/wiki) and at [hub.quarkiverse.io](https://hub.quarkiverse.io).  
- Host [issues](https://github.com/quarkiverse/quarkiverse/issues?q=is%3Aopen+is%3Aissue+label%3Atriage%2Fci-quarkiverse%2Ctriage%2Fci-quarkiverse-3) created by the [ecosystem CI](https://github.com/quarkusio/quarkus-ecosystem-ci#what-its-all-about)

## Onboarding an extension 

Looking to onboard an extension? Here's the [quick link](https://github.com/quarkiverse/quarkiverse/wiki#getting-an-extension-onboarded). 

## Updating the docs 

The content for the Quarkiverse Hub site lives in [the docs folder](https://github.com/quarkiverse/quarkiverse/tree/main/docs). 
It is [mirrored](https://github.com/quarkiverse/quarkiverse/blob/main/.github/workflows/wikisync.yml) to [the GitHub wiki](https://github.com/quarkiverse/quarkiverse/wiki), and also [published externally](https://hub.quarkiverse.io) as a Gatsby site. This allows the content to be indexed by search engines, and also enables richer formatting and styling.

### Run project locally

To stand up the Gatsby site locally, work in the `site` directory. First, install the required dependencies:

```
npm install
```

Then, to start development:

```
npm run develop
```
Gatsby will start a hot-reloading development environment at [localhost:8000](http://localhost:8000)

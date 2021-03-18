# New Quarkiverse Project Steps

> :warning: **These are the steps to be followed by Quarkiverse owners when onboarding a new project. Those instructions are meant for the Quarkiverse team when there is a new Quarkiverse extension project request by contributors/maintainers.**
> **We also provide instructions to get an [extension onboarded](https://github.com/quarkiverse/quarkiverse/wiki#getting-an-extension-onboarded) in the Quarkiverse for contributors/maintainers.**

Considering the following extension to create:
```yaml
artifact-id: quarkus-the-ext
group-id: io.quarkiverse.theext
name: Quarkus - The Ext
```

1. Generate the Quarkiverse extension project using the Quarkus Maven plugin (the prefixes and names are automatically computed following the Quarkiverse conventions):
```shell
mvn io.quarkus:quarkus-maven-plugin:create-extension -U \
-DgroupId=io.quarkiverse.theext -DextensionId=the-ext
```
1. Create a repository named `quarkus-the-ext` and push the new code
2. Create a `quarkus-the-ext` team and invite the maintainers. Add to the project with **Write** permissions
3. Create an issue in the repository to trigger the all-contributors bot and automatically update the README.md by commenting on the issue (eg. https://github.com/quarkiverse/quarkus-freemarker/issues/9)
4. Give the link the the extension maintainer(s) in the issue and provide instructions on the next steps: 
    - Enable in the [Quarkus Ecosystem-CI](https://github.com/quarkusio/quarkus-ecosystem-ci)
    - When the extension is ready, announce on [quarkus-dev mailing list](https://groups.google.com/g/quarkus-dev) with the repo location, maintainer(s) and a description/context.

# Welcome to Quarkiverse!

**NOTE** this content is still a draft - feedback welcome!

Quarkus is a Kubernetes Native Java stack tailored for the OpenJDK HotSpot and GraalVM, crafted from the best of breed Java libraries and standards, as well as an ever growing ecosystem of its extensions. At the beginning we were accepting all the contributed extensions in the core Quarkus repository. Eventually though it grew too large and lead to a maintenance overhead. In addition to that, in some cases it's simply not always sensible to include an extension into the main Quarkus repository.

Some have since then created their own repositories external to Quarkus, but others just never happened because not everyone wants the overhead of maintaining a build setup. Even the Quarkus core developers sometimes had ideas for an extension but not solid enough to be included in the main Quarkus repository.

Quarkiverse is our proposed solution to create a "home" for such extensions/projects.

# What is Quarkiverse

This Quarkiverse GitHub organization provides repository hosting (including build, CI and release publishing setup) for Quarkus extension projects contributed by the community.

Quarkus extensions hosted in the Quarkiverse organization will eventually by default be included into the Quarkus extensions catalog available on [code.quarkus.io](http://code.quarkus.io) and the Quarkus command line tools (such as `mvn quarkus:list-extensions`, `gradle listExtensions`). To stay listed, the only requirement is that the extension keeps functioning, stays up-to-date and cause no harm.

Note: the inclusion in tools are an ongoing development. Estimated to happen after April/May 2021.

# Why Quarkiverse

In the early days and actually up until recently, Quarkus extensions contributed by the community members (including the core Quarkus team) have been welcomed in the main Quarkus repository at https://github.com/quarkusio/quarkus. Today the main repository has grown a lot and it's evident that it simply becomes troublesome to work with it for its contributors. That and other maintenance and infrastructure related issues inspired the creation of a separate organization called Quarkiverse to host Quarkus extension projects contributed by the community (including the Quarkus core team members themselves).

The advantages to join Quarkiverse are:

- Automated and secured publishing of your maven releases to Maven Central.
- Automated Cross-testing of your extension with Quarkus builds/releases (see https://github.com/quarkusio/quarkus-ecosystem-ci)
- Inclusion in registry used by Quarkus tooling to browse extensions (i.e. code.quarkus, command line and IDE tools).
- Consistent formatting and release of project
- Quarkus team members can in an emergency (i.e. maintainers are missing) help and fix issues.

Note: While the Quarkus project has the "keys" to publish under `io.quarkiverse`, each project in Quarkiverse is driven and maintained by 
the lead of that project. They decide what happens with the project - Quarkiverse will just expect releases to be compatible with Quarkus - if a project
for some reason cannot do a release we can in the best scenario help or in the worst scenario we'll temporarily exclude the project from the affected registry entries to avoid end-users to have a bad experience.
 
If you do not want to commit to the above guidelines then you are more than welcome to publish an extension outside of Quarkus or Quarkiverse; and then you can
still be listed in the registry - it is just not handled automatically. In this case we request you to use your own group ID to clearly identify those artifacts are from a third-party organization.

# Quarkiverse and Quarkus Platform

The word Quarkiverse, derived from "Quarkus" and "universe", is carrying the meaning of the universe of Quarkus extensions. In other words, it is intended to represent a part of the Quarkus ecosystem. However, at the same time, there is also a notion of a Quarkus platform. There is a significant difference between the two.

While the extensions under the Quarkiverse organization are generally independent projects lead by independent development teams, the fundamental promise of a Quarkus platform is any combination of the Quarkus extensions the platform consists of can be used in the same application without causing any conflict for each other. Quarkus platform implies coordination, cross testing and dependency version alignment across extensions that constitute the platform which is not generally applicable to the Quarkiverse extensions. It is, however, still possible for extensions hosted in the Quarkiverse to join a Quarkus platform assuming they satisfy the purpose and policies defined for that platform.

# Joining Quarkiverse

## Getting an extension onboarded:

1. The first step is to create or pick an **Extension Proposal** ticket in the [Quarkus issue tracker](https://github.com/quarkusio/quarkus/issues) and let us know if you are interested in leading the development of this extension by commenting on the issue. The Quarkus team will review and discuss with you and community if the proposal extension should belong to the main repository or live in the Quarkiverse Hub.
2. When decided, the Quarkiverse Team will initialize the repository in the Quarkiverse organization for you with skeleton code ready. Until then, if not already done, you can start implementing your extension from a skeleton with this command:
```shell
mvn io.quarkus:quarkus-maven-plugin:create-extension \
 -DgroupId=io.quarkiverse.[myext] -DextensionId=[my-ext] -U
```
3. Follow instructions in [Quarkus Ecosystem-CI](https://github.com/quarkusio/quarkus-ecosystem-ci) to enable the extension to take part in overall testing.
4. Announce on [quarkus-dev mailing list](https://groups.google.com/g/quarkus-dev) with the repo location, maintainer(s) and a description/context.

The Quarkiverse team will provide the repository ready for development, nevertheless, it is always good to know that we respect the following conventions and policies. 

### Identify Project Maintainer ##

Each project will have a GitHub team, and in here at least one must be listed and active as maintainer. This is the person that will be expected to lead and drive the project.

### Repository name

The repository name under the quarkiverse organization should have `quarkus-` prefix. This will help avoid potential conflicts when cloning and/or forking the repository.

### Project's Maven artifact `groupId`s

The Maven `groupId` of the project's artifacts should follow the following format: `io.quarkiverse.<project-name>`. In other words, the project’s `groupId` should start with the `io.quarkiverse.` prefix followed by the project-specific unique name (minus the `quarkus-` prefix) in which dots aren't allowed. Also, since your `groupId` should also be your root package name, if it contains characters that are not allowed in package names (such as `-`), you should concatenate all the parts of your project name to form a single, lowercased name. So if your repository is named `quarkus-foo-bar`, your `groupId` would become `io.quarkiverse.foobar`.

### Project's Maven artifact `artifactId`s

The project’s `artifactId` should start with the `quarkus-` prefix.

### Root package name

The root package name is expected to be the same as the project’s Maven artifact `groupId`, i.e. `io.quarkiverse.jberet`, if project name is `jberet`. See the [`groupId` section](#projects-maven-artifact-groupids) for more details. 

### Parent POM

All Quarkiverse projects are expected to use [io.quarkiverse:quarkiverse-parent](https://github.com/quarkiverse/quarkiverse-parent) as the parent POM.
This POM contains common project release and artifact publishing configuration.

### Provide mechanism to do cross-testing of named quarkus core and platform versions

All Quarkiverse projects should have a build and test suite that can be parameterized to use specific Quarkus and Platform versions to ensure we can get
early warning of issues of master builds; but also to verify compatibiltiy with maintanence branch/tags.

Mechanism is To be defined, but something like having a script that will take quarkus core and quarkus platform Group, Artifact and IDs.

## Documenting your extension

Consider adding documentation to the [Quarkiverse docs page](https://quarkiverse.github.io/quarkiverse-docs/index/index/index.html).
You can submit changes via [GitHub](https://github.com/quarkiverse/quarkiverse-docs).

## LICENSE

The project is expected to be licensed under ASL 2.0.

## Code format

Extensions generated with the `create-extension` goal of the Quarkus maven plugin expect code to be formatted according to the Quarkus conventions as documented in: https://github.com/quarkusio/quarkus/blob/master/CONTRIBUTING.md#ide-config-and-code-style. The default CI setup will validate the format and fail your build if the files don't conform.

## Discussions 

[GitHub Discussions](https://docs.github.com/discussions) are disabled by default in Quarkiverse extension repositories.

To avoid spreading information too much and make it hard to figure out where to post we have following default guidelines:

- Development questions should be addressed in the [Mailing List](https://groups.google.com/g/quarkus-dev)
- User questions in [Stack Overflow](https://stackoverflow.com/questions/tagged/quarkus) + the Quarkiverse project tag.

However we can enable it in the repository if the extension maintainer really wants it (open an issue requesting that and ping the `@quarkiverse/quarkiverse-owners` team in the issue). However be aware that Core developers will not follow or be aware of these discussions unless explicitly mentioned.


## Contributors

Make sure to add a list of Contributors to your README file. Follow these steps:

1. Open a new issue
2. After the issue is created, add a new comment in the following format:

```
@all-contributors add @your_github_id for code and maintenance
```
3. Close the issue

This will trigger the @all-contributors bot to provide a pull-request adding yourself as a contributor to the repository. See more details here: https://allcontributors.org/

# Quarkus Extension Development Guides and References

In case you need help creating a new Quarkus extension Maven project, please follow [Building My First Extension](https://quarkus.io/guides/building-my-first-extension) guide.

Other useful articles related to Quarkus extension development can be found under the [Writing Extensions](https://quarkus.io/guides/#writing-extensions) guide category on the [Quarkus.io](http://quarkus.io) website.

# Welcome to the Quarkiverse Hub!

Quarkus is a Kubernetes Native Java stack tailored for the OpenJDK HotSpot and GraalVM, crafted from the best of breed Java libraries and standards, as well as an ever growing ecosystem of its extensions. At the beginning we were accepting all the contributed extensions in the core Quarkus repository. Eventually though it grew too large and lead to a maintenance overhead. In addition to that, in some cases it's simply not always sensible to include an extension into the main Quarkus repository. For example, an extension might want to have a release cadence which is independent of the core repository's lifecycle.

Quarkiverse is our solution to create a "home" for such extensions.

# What is Quarkiverse

The [Quarkiverse GitHub organization](http://github.com/quarkiverse) provides repository hosting (including build, CI and release publishing setup) for Quarkus extension projects contributed by the community.

Quarkus extensions hosted in the Quarkiverse organization can easily be included into the Quarkus extensions catalog available on [code.quarkus.io](http://code.quarkus.io), [extensions.quarkus.io](http://extensions.quarkus.io), and the Quarkus command line tools (such as `mvn quarkus:list-extensions`, `gradle listExtensions`). To stay listed, the only requirement is that the extension keeps functioning, stays up-to-date and cause no harm.

# Why Quarkiverse

In the early days and actually up until recently, Quarkus extensions contributed by the community members (including the core Quarkus team) have been welcomed in the main Quarkus repository at https://github.com/quarkusio/quarkus. Today the main repository has grown a lot and it's evident that it simply becomes troublesome to work with it for its contributors. That and other maintenance and infrastructure related issues inspired the creation of a separate organization called Quarkiverse to host Quarkus extension projects contributed by the community (including the Quarkus core team members themselves).

The advantages of joining Quarkiverse are:

- Automated and secured publishing of your maven releases to Maven Central.
- Automated Cross-testing of your extension with Quarkus builds/releases (see https://github.com/quarkusio/quarkus-ecosystem-ci)
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

See [ChecklistForNewProjects](checklist-for-new-projects) for all the steps you'll need to start a new project in the Quarkiverse org.

The Quarkiverse team will provide the repository ready for development, nevertheless, it is always good to know that we respect the following conventions and policies. 

## Documenting your extension

All Quarkiverse extensions can include documentation on http://docs.quarkiverse.io. 
See the [documentation about the documentation](documentingyourextension) for details on how how to document your extension.

## Managing settings on the GitHub repository

Extension maintainers have full control over the repository settings, but be aware that the settings are infrastructure as code, managed with Terraform. 
To change any setting in the repository (give push permissions to anyone, enable a GitHub app, etc.), update the repository's `.tf` file. 
You may notice that, even as an extension maintainer, you have restricted permissions in the GitHub UI. 
This is to reduce the risk of accidents where maintainers make changes which then get overwritten by the next Terraform run.  

## Expectations for Quarkiverse projects 

Quarkiverse projects should follow some [naming conventions](namingconventions) for maven coordinates and package names. 

### Identify Project Maintainer ##

Each project will have a GitHub team, and in here at least one must be listed and active as maintainer. This is the person that will be expected to lead and drive the project.


### Provide mechanism to do cross-testing of named quarkus core and platform versions

All Quarkiverse projects should have a build and test suite that can be parameterized to use specific Quarkus and Platform versions to ensure we can get
early warning of issues of master builds; but also to verify compatibility with maintenance branch/tags.
This is handled by the [ecosystem CI](https://github.com/quarkusio/quarkus-ecosystem-ci).

### Parent POM

All Quarkiverse projects are expected to use [io.quarkiverse:quarkiverse-parent](https://github.com/quarkiverse/quarkiverse-parent) as the parent POM.
This POM contains common project release and artifact publishing configuration.


## LICENSE

The project is expected to be licensed under ASL 2.0.


## Discussions 

[GitHub Discussions](https://docs.github.com/discussions) are disabled by default in Quarkiverse extension repositories.

To avoid spreading information too much and make it hard to figure out where to post we have following default guidelines:

- Development questions should be addressed in the [Mailing List](https://groups.google.com/g/quarkus-dev)
- User questions in [Stack Overflow](https://stackoverflow.com/questions/tagged/quarkus) + the Quarkiverse project tag.

However we can enable it in the repository if the extension maintainer really wants it (open an issue requesting that and ping the `@quarkiverse/quarkiverse-owners` team in the issue). However be aware that Core developers will not follow or be aware of these discussions unless explicitly mentioned.


# Quarkus Extension Development Guides and References

In case you need help creating a new Quarkus extension Maven project, please follow [Building My First Extension](https://quarkus.io/guides/building-my-first-extension) guide.

Other useful articles related to Quarkus extension development can be found under the [Writing Extensions](https://quarkus.io/guides/#writing-extensions) guide category on the [Quarkus.io](http://quarkus.io) website.

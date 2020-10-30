# Welcome to Quarkiverse!

**NOTE** this content is still a draft - feedback welcome!

Quarkus is a Kubernetes Native Java stack tailored for OpenJDK HotSpot and GraalVM, crafted from the best of breed Java libraries and standards, and it is also a ecosystem of ever growing extensions. In the beginning we were adding all extensions to the core Quarkus repository but eventually it became to much of overhead or just not always sensible to include an extension into the core. 

Some have since then created their own repositories external to Quarks, but others just never happened because not everyone wants the overhead of maintaining a build setup while in other cases we actually had an idea for an extension but not solidified enough yet to be included in core.

Quarkiverse is our proposed solution to create a "home" for such extensions/projects.

#What is Quarkiverse

This Quarkiverse GitHub organization provides repository hosting (including build, CI and release publishing setup) for Quarkus extension projects contributed by the community.

Quarkus extensions hosted in the Quarkiverse organization will by default be included into the Quarkus extensions catalog displayed on [code.quarkus.io](http://code.quarkus.io) and the Quarkus command line tools (such as `mvn quarkus:list-extensions`, `gradle listExtensions`). To stay listed only requirement
is that the extension keeps functioning, stays up to date and cause no harm.

# Why Quarkiverse

In the early days and actually up until recently, Quarkus extensions contributed by the community members (including the core Quarkus team) have been welcome in the Quarkus core repository at https://github.com/quarkusio/quarkus. Today the core repository has grown a lot and it's evident that it simply becomes troublesome to work with it for its contributors. That and other maintenance and infrastructure related issues inspired the creation of a separate organization called Quarkiverse to host Quarkus extension projects contributed by the community (including the Quarkus core team members themselves).

The advantages to join Quarkiverse are:

  . Automated and secured publishing of your Maven releases to Maven Central.
  . Automated Cross-testing of your extension with Quarkus builds/releases (see https://github.com/quarkusio/quarkus-ecosystem-ci)
  . Inclusion in registry used by Quarkus tooling to browse extensions (i.e. code.quarkus, command line and IDE tools).
  . Consistent formatting and release of project
  . Quarkus team members can help and fix issues if project has build issues.
  
Note: While the Quarkus project has the "keys" to publish under `io.quarkiverse`, each project in Quarkiverse is driven and maintained by 
the lead of that project. They decide what happens with the project - Quarkiverse will just expect releases to be compatible with Quarkus - if a project
for some reason cannot do a release we can in the best scenario help or in the worst scenario we'll temporarily exclude the project from the registry to avoid
end-users to have a bad experience.
 
If you do not want to commit to the above guidelnes then you are more than welcome to publish an extension outside of Quarkus or Quarkiverse; and then you can
still be listed in the registry - it is just not handled automtically. In this case we do please request you use your own group id to clearly identify those artifacts are from a third-party.

# Joining Quarkiverse

Projects hosted in the Quarkiverse organization on github should respect the following conventions and policies.

## Identify Project Maintainer ##

Each project will have a github team, and in here at least one must be listed and active as maintainer. This is the person that will be expected to lead and drive the project.

## Repository name

The repository name under the quarkiverse organization should be `quarkiverse-<project-name>`. This will help avoid potential conflicts when cloning and/or forking the repository.

## Project's Maven artifact `groupId`s

The Maven `groupId` of the project's artifacts should follow the following format: `io.quarkiverse.<project-name>`. In other words, the project’s `groupId` should start with the `io.quarkiverse.` prefix followed by the project-specific unique name in which dots aren't allowed.

## Root package name

The root package name is expected to be the same as the project’s Maven artifact `groupId`, i.e. `io.quarkiverse.jberet`, if the project name is `jberet`.

## Parent POM

All Quarkiverse projects are expected to use [io.quarkiverse:quarkiverse-parent](https://github.com/quarkiverse/quarkiverse-parent) as the parent POM.
This POM contains common project release and artifact publishing configuration.

## Provide mechanism to do cross-testing of named quarkus core and platform versions

All Quarkiverse projects should have a build and test suite that can be parameterized to use specific Quarkus and Platform versions to ensure we can get
early warning of issues of master builds; but also to verify compatibiltiy with maintanence branch/tags.

Mechanism is To be defined, but something like having a script that will take quarkus core and quarkus platform Group, Artifact and IDs.

## LICENSE

The project is expected to be licensed under ASL 2.0.

## Contributors

Make sure to add a list of Contributors to your README file. Follow these steps:

1. Open a new issue
2. After the issue is created, add a new comment in the following format:

```
@all-contributors add @your_github_id for code and maintenance
```
3. Close the issue

This will trigger the @all-contributors bot to provide a pull-request adding yourself as a contributor to the repository. See more details here: https://allcontributors.org/
The project is expected to be licensed under ASL 2.0.

# Quarkus Extension Development Guides and References

In case you need help creating a new Quarkus extension Maven project, please follow [Building My First Extension](https://quarkus.io/guides/building-my-first-extension) guide.

Other useful articles related to Quarkus extension development can be found under the [Writing Extensions](https://quarkus.io/guides/#writing-extensions) guide category on the [Quarkus.io](http://quarkus.io) website.

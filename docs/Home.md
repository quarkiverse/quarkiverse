# Why Quarkiverse

In the early days and actually up until recently, Quarkus extensions contributed by the community members (including the core Quarkus team) have been welcome in the Quarkus core repository at https://github.com/quarkusio/quarkus. Today the core repository has grown a lot and it's evident that it simply becomes troublesome to work with it for its contributors. That and other maintenance and infrastructure related issues inspired the creation of a separate organization called Quarkiverse to host Quarkus extension projects contributed by the community (including the Quarkus core team members themselves).

# Joining Quarkiverse

**NOTE** this content is still a draft - feedback welcome!

Projects hosted in the Quarkiverse organization on github should respect the following conventions and policies.

## Repository name

The repository name under the quarkiverse organization should have `quarkiverse-` prefix. This will help avoid potential conflicts when cloning and/or forking the repository.

## Project's Maven artifact `groupId`s

The Maven `groupId` of the project's artifacts should follow the following format: `io.quarkiverse.<project-name>`. In other words, the project’s `groupId` should start with the `io.quarkiverse.` prefix followed by the project-specific unique name in which dots aren't allowed.

## Root package name

The root package name is expected to be the same as the project’s Maven artifact `groupId`.

## LICENSE

The project is expected to be licensed under ASL 2.0. (TO BE CONFIRMED)

# Quarkus Extension Development Guides and References

In case you need help creating a new Quarkus extension Maven project, please follow [Building My First Extension](https://quarkus.io/guides/building-my-first-extension) guide.

Other useful articles related to Quarkus extension development can be found under the [Writing Extensions](https://quarkus.io/guides/#writing-extensions) guide category on the [Quarkus.io](http://quarkus.io) website.
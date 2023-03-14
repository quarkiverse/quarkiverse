# What’s changing

[Quarkus 3 is on the way](https://quarkus.io/blog/road-to-quarkus-3/), and it has breaking changes. 
These changes will affect extensions, so extension maintainers should be prepared.

Don't worry, we have a script that automates most (if not all) of the migration that works for applications... and extensions.

# Here are the known breakers:

## Java EE to Jakarta [released now]
Quarkus is moving to use Jakarta APIs rather than Java EE ones. In most cases the functionality isn’t different, but package names are.

## Hibernate ORM 5 to 6 [released now]

Quarkus 3 ships with Hibernate ORM 6 instead of Hibernate ORM 5. This is a major release, and so there are some breaking changes, especially if your extension uses the Criteria API. We don’t expect that many extensions rely on these, but in case you do, the Hibernate team have published a [full migration guide](https://github.com/quarkusio/quarkus/wiki/Migration-Guide-3.0:-Hibernate-ORM-5-to-6-migration).

## Flow, instead of reactive streams [released now]

Quarkus 3 uses the JDK Flow API introduced since Java 9 instead of the legacy Reactive Streams API.
For a discussion of what changes were needed within Quarkus itself, see
- https://groups.google.com/g/quarkus-dev/c/RpeqFv1dr8k
- https://github.com/quarkusio/quarkus/issues/26675

If your extension needs to use a library that is still using the legacy Reactive Streams API then you should use the adapters from the Mutiny Zero project (see https://smallrye.io/smallrye-mutiny-zero).

# Are you affected?

Our analysis found that all but one or two extensions in the Quarkiverse are affected by these changes. If you want to check if changes are needed, you can either run the [migration script](#upgrade) and see what’s changed, or grep your codebase for the following
- `javax` (if you have code, you almost certainly have this)
- `org.reactivestreams`
- `hibernate`

Files like `persistence.xml` also need to be updated, but if you have those you almost certainly also have a `javax.*` dependency somewhere in the pom.xml or Java code.

# When should you act?

It’s worth thinking about how big an impact these changes will have on your extension. For some extensions, you can just run the upgrade script, but for other extensions the impact may be more complicated, particularly if you depend on libraries which have not yet made the move to Jakarta.

Now is a good time to work on the Quarkus 3.0-compatibility of your extensions.

# Implement the migration

## Make your new branch

In the main extension repo, set up a new branch for the legacy 2.x code stream. 

We recommend that `main` is used for the 3.0 stream. For most extensions, a 2.0 and a 3.0 version should co-exist, at least for a while. 

We don't enforce any branch name for your extension supporting the 2.x stream, but we recommend adopting a `V.x` pattern where `V` is the major version of your extension that builds against the 2.x stream (for example, if `1.2.3` is the last version of your extension built against Quarkus 2.x, create a `1.x` branch).

## Set up GitHub actions on the new branch

### Workflow updates

You will need to update the GitHub actions workflows to support releases from feature branches. The following PR illustrates the changes needed: https://github.com/quarkusio/quarkus/pull/28974

For newer repositories, it may work to apply the following patch (if it fails to apply, that’s fine, just update by hand):

```
curl https://patch-diff.githubusercontent.com/raw/quarkiverse/quarkus-pact/pull/19.patch > ../19.patch
git am ../19.patch
```

## Update documentation

In order to render the documentation from the `docs/` folder, you also need to update the `docs/antora.yml` to match the branch name (or something nicer). See an example [here](https://github.com/quarkiverse/quarkus-renarde/commit/8ba4566ce09b6f8314856f66bf86b2b1df68806e). 

Then update the [Antora Playbook](https://github.com/quarkiverse/quarkiverse-docs/blob/main/antora-playbook.yml) in the `quarkiverse/quarkiverse-docs` repository to include your new branch. See an example [here](https://github.com/quarkiverse/quarkiverse-docs/commit/11bdff4fd8c954da0729593a355c2b35b0c6aa97).

# Upgrade

## Step 1: Upgrade your parent pom to the latest version of the `quarkiverse-parent` pom.

Make sure you depend on the [latest version of the Quarkiverse parent](https://central.sonatype.com/artifact/io.quarkiverse/quarkiverse-parent/12/versions) (at least `12`), as this ensures you will pick up any Quarkus-3-related support, such as enforcer changes and import ordering fixes.

## Step 2: Run the upgrade script and enjoy!

To make updating reliable and simple, the team has written a JBang script that takes care of most of the upgrade (it updates the dependencies, the Java or Kotlin files, the codestarts, the documentation...).
You can run it via jbang (and curl).

For Linux:

```
curl -Ls https://sh.jbang.dev | bash -s - --fresh upgrade-to-quarkus3@quarkusio
```

For Windows:

```
iex "& { $(iwr https://ps.jbang.dev) } --fresh upgrade-to-quarkus3@quarkusio"
```

Note: if you have problems with the automated process and it doesn't look solvable (but please report the issue in [the Quarkus tracker](https://github.com/quarkusio/quarkus/issues)!), have a look at the manual process described [here](https://github.com/quarkiverse/quarkiverse/wiki/Migrating-to-Quarkus-3.x:-Manual-upgrade).

## Declare your compatibilities

This is optional, in most cases, you don't need to do anything.

If your extension has some non-standard compatibilities, follow the [compatibility documentation instructions](https://github.com/quarkusio/quarkus-extension-catalog#compatibility-with-older-quarkus-core-versions) to update the extensions catalog with information about your new versions, and what versions of Quarkus they work with.

## Testing

This is a good time to think about testing. Does your project have integration tests? Are they running as part of the CI? If you don’t have a codestart, consider making one, because codestarts are great.

To be extra cautious, consider making a project which is based on Quarkus 3 to check the extension is working well. (If this fails and your CI is passing, it’s an indication that more automated integration tests might be needed.)

# Release your extension

On your first release, bump your major version number to the next major in `.github/project.yml`.
For instance, if your last Quarkus 2.x compatible release was `1.2.3`, make the Quarkus 3.x compatible release `2.0.0.Alpha1`.

As long as you rely on an Alpha of Quarkus 3.0, please keep the AlphaX suffix and release `2.0.0` when your extension is upgraded to Quarkus `3.0.0.Final`.

For example,

```
release:
  current-version: 2.0.0.Alpha1
  next-version: 999-SNAPSHOT
```
You may want to choose different snapshot versions for 2.x and 3.x, to avoid confusing behavior in your local maven repo.

(Don't forget that merging a change to `project.yml` will trigger a release, so do not merge until you're ready to release.)

# It’s all gone wrong! Help!

This is a big change, and we’re expecting some rough bumps. If you hit issues, we’d love to hear about them, so we can either fix them, or figure out a workaround to share with other extensions.

There are a few ways you can communicate with us:

- Zulip. There is a [topic Quarkus 3 readiness for extensions](https://quarkusio.zulipchat.com/#narrow/stream/187038-dev/topic/Quarkus.203)
- [Quarkus-dev mailing list](https://groups.google.com/g/quarkus-dev)

Issues on the main Quarkus repo. Please @mention @maxandersen and @holly-cummins

We’d also like to hear from you if things go well. We’ll be tracking the “all clears” so we can decide when it makes sense to move from 3.0.0 Alpha to a final release.
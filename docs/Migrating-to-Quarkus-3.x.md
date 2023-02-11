# What’s changing
[Quarkus 3 is on the way](https://quarkus.io/blog/road-to-quarkus-3/), and it has breaking changes. 
These changes will affect extensions, so extension maintainers should be prepared. 

# Here are the known breakers:

## Java EE to Jakarta [released now]
Quarkus is moving to use Jakarta APIs rather than Java EE ones. In most cases the functionality isn’t different, but package names are.

## Hibernate ORM 5 to 6 [coming soon]

Quarkus 3 will ship with Hibernate ORM 6 instead of Hibernate ORM 5. This is major release, and so there are some breaking changes, especially if your extension uses the Criteria API. We don’t expect that many extensions rely on these, but in case you do, the Hibernate team have published a full migration guide.

## Flow, instead of reactive streams [coming soon]
Quarkus 3 uses the JDK Flow API introduced since Java 9 instead of the legacy Reactive Streams API.
For a discussion of what changes were needed within Quarkus itself, see
- https://groups.google.com/g/quarkus-dev/c/RpeqFv1dr8k
- https://github.com/quarkusio/quarkus/issues/26675

If your extension needs to use a library that is still using the legacy Reactive Streams API then you should use the adapters from the Mutiny Zero project (see https://smallrye.io/smallrye-mutiny-zero).

Note that the Jakarta changes are available in the Quarkus 3.0.0.Alpha1 release, but the Hibernate ORM and Flow changes are still under development.

# Are you affected?

Our analysis found that all but one or two extensions in the Quarkiverse are affected by these changes. If you want to check if changes are needed, you can either run the [migration scripts](#upgrade) and see what’s changed, or grep your codebase for the following
- `javax` (if you have code, you almost certainly have this)
- `org.reactivestreams`
- `hibernate`

Files like `persistence.xml` also need to be updated, but if you have those you almost certainly also have a `javax.*` dependency somewhere in the pom.xml or Java code.

# When should you act?

It’s worth thinking about how big an impact these changes will have on your extension. For some extensions it’s a trivial search and replace, but for other extensions the impact may be more complicated, particularly if you depend on libraries which have not yet made the move to Jakarta.

We recommend starting to prepare now if getting to Quarkus 3 is complex. If the move is straightforward, you may wish to wait a while, so that you don’t need to maintain two branches for several months.

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

To make updating reliable and simple, the team has written an Open Rewrite script. You can run it via jbang (and curl).

For Linux:

```
curl -Ls https://sh.jbang.dev | bash -s - --fresh upgrade-to-quarkus3@quarkusio
```

For Windows:

```
iex "& { $(iwr https://ps.jbang.dev) } --fresh upgrade-to-quarkus3@quarkusio"
```

Alternatively, you can [download the recipe](https://github.com/quarkusio/quarkus/blob/main/jakarta/quarkus3.yml) and then run

```
mvn org.openrewrite.maven:rewrite-maven-plugin:4.36.0:run \
-Drewrite.configLocation=[SOME_PATH]/quarkus3.yml \
-DactiveRecipes=io.quarkus.openrewrite.Quarkus3
```

Don’t forget to migrate your codestart if you have one.

## Alternate process: manual upgrade

If you’re not able to use the automation or some step is missed, you can manually move to the latest dependencies and patch up the code manually.

### Manual process, step 1: Upgrade your parent pom to the latest version of the quarkiverse-parent pom.

Make sure you depend on the [latest version of the Quarkiverse parent](https://search.maven.org/search?q=a:quarkiverse-parent) (at least 11), as this ensures you will pick up any Quarkus-3-related support, such as enforcer changes and import ordering fixes.

### Manual process, step 2: Update the Quarkus version

Update the Quarkus dependencies in your pom.xml to depend on the latest 3.x  Quarkus. You can either

- use the nightly snapshot, following the [instructions for using snapshots](https://github.com/quarkusio/quarkus/tree/main/jakarta#using-snapshots) 
- depend on the latest release, 3.0.0.Alpha1

Using the release is recommended unless you need something in the snapshots.

To update the Quarkus version, update the property:

```
<quarkus.version>3.0.0.Alpha1</quarkus.version>
```

In the exceptional case that you are not using the platform BOM, the dependency would look like:

```
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-[your-dependency-here]</artifactId>
  <version>3.0.0.Alpha3</version>
</dependency>
```

In Gradle, it would be:

```
implementation 'io.quarkus:quarkus-[your-dependency-here]:3.0.0.Alpha3'
```

### Manual process, step 3: Get everything working

At this point, if you build, you should see a lot of failures. 
Resolving them will involve upgrading other dependencies to bring in versions which use Jakarta, and searching for `javax.*` references in the codebase. 

Be aware that not all `javax` packages have been moved to Jakarta. (That's why using a tool is recommended.) 
The Jakarta Eclipse Transformer (which only changes the source code, not the POM) is an alternative to the OpenRewrite recipe.

## Declare your compatibilities

If your extension has some non-standard compatibilities, follow the [compatibility documentation instructions](https://github.com/quarkusio/quarkus-extension-catalog#compatibility-with-older-quarkus-core-versions)  to update the extensions catalog with information about your new versions, and what versions of Quarkus they work with.

## Testing

This is a good time to think about testing. Does your project have integration tests? Are they running as part of the CI? If you don’t have a codestart, consider making one, because codestarts are great.

To be extra cautious, consider making a project which is based on Quarkus 3 to check the extension is working well. (If this fails and your CI is passing, it’s an indication that more automated integration tests might be needed.)


# Version updates

On your first release, bump your major version number in the 3.0 stream `.github/project.yml`.

For example,

```
release:
  current-version: 3.0.0.Alpha3
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

# What’s Quarkus itself doing?

https://github.com/quarkusio/quarkus/tree/main/jakarta has useful information on how the Quarkus core is working through the migration effort. 
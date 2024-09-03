This guide is intended for Quarkiverse extension owners who wish to test against early versions of Quarkus 3.0, before its release.
For normal extension migration, see the Quarkus migration guides.

:warning: First have a look at the automated process described [here](https://github.com/quarkiverse/quarkiverse/wiki/Infrastructure-Quarkus-3.x), using the manual upgrade should be last resort.

If you’re not able to use the automation or some step is missed, you can manually move to the latest dependencies and patch up the code manually.
But please take the time to report the issues you experienced to the Quarkus team so that they can improve the upgrade script appropriately.

## Manual process, step 2: Update the Quarkus version

Update the Quarkus dependencies in your pom.xml to depend on the latest 3.x  Quarkus. You can either

- use the nightly snapshot, following the [instructions for using snapshots](https://github.com/quarkusio/quarkus/blob/main/CONTRIBUTING.md#using-snapshots) 
- depend on the latest release 3.0.x release

Using the release is recommended unless you need something in the snapshots.

To update the Quarkus version, update the property:

```
<quarkus.version>3.0.0.X</quarkus.version>
```

In the exceptional case that you are not using the platform BOM, the dependency would look like:

```
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-[your-dependency-here]</artifactId>
  <version>3.0.0.X</version>
</dependency>
```

In Gradle, it would be:

```
implementation 'io.quarkus:quarkus-[your-dependency-here]:3.0.0.X'
```

## Manual process, step 2: Get everything working

At this point, if you build, you should see a lot of failures. 
Resolving them will involve upgrading other dependencies to bring in versions which use Jakarta, and searching for `javax.*` references in the codebase. 

Be aware that not all `javax` packages have been moved to Jakarta. (That's why using a tool is recommended.) 
The Jakarta Eclipse Transformer (which only changes the source code, not the POM) is an alternative to the OpenRewrite recipe. 

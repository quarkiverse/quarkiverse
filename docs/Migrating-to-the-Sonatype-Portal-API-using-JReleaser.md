Sonatype announced the [End-of-Life Sunset Date for OSSRH](https://central.sonatype.org/news/20250326_ossrh_sunset/). TLDR; https://s01.oss.sonatype.org/ will still be available after the EOL date but will eventually die.

# Steps to migrate to the Sonatype Portal API 

These steps are using JReleaser (which is what Quarkiverse uses for releasing artifacts). If you are using a different release mechanism, consult the [Publish Portal Guide](https://central.sonatype.org/publish/publish-portal-guide/).

## Generate user token

Go to https://central.sonatype.com/account and click on `Generate User Token`. Store the user and token generated somewhere, you'll use that to publish artifacts

## Create the GitHub secrets

Create the `SONATYPE_USERNAME` and `SONATYPE_PASSWORD` secrets from the previous step

## Adjust your release workflow 

The `jreleaser.yml` should be similar to what's below:   

```yaml
project:
  description: Quarkiverse Deployment
  copyright: Copyright(C) 2024 - Red Hat
  languages:
    java:
      groupId: io.quarkiverse

signing:
  active: ALWAYS
  armored: true
  verify: true

deploy:
  maven:
    pomchecker:
      failOnWarning: false
      strict: false
    mavenCentral:
      sonatype:
        active: RELEASE
        url: https://central.sonatype.com/api/v1/publisher
        retryDelay: 20
        maxRetries: 100
        stagingRepositories:
          - ./repository
    nexus2:
      maven-central:
        active: SNAPSHOT
        url: https://central.sonatype.com/repository/maven-snapshots/
        snapshotUrl: https://central.sonatype.com/repository/maven-snapshots/
        transitionDelay: 20
        transitionMaxRetries: 100
        stagingRepositories:
          - ./repository

```

> Note that there are two deployers. This is because SNAPSHOTS are deployed differently and still use the Nexus 2 deployer.


Make sure you have the environment variables set in your release workflow:


```yaml
JRELEASER_MAVENCENTRAL_USERNAME: ${{ secrets.SONATYPE_USERNAME }}
JRELEASER_MAVENCENTRAL_PASSWORD: ${{ secrets.SONATYPE_PASSWORD }}
JRELEASER_NEXUS2_USERNAME: ${{ secrets.SONATYPE_USERNAME }}
JRELEASER_NEXUS2_TOKEN: ${{ secrets.SONATYPE_PASSWORD }}
```

## Migrate the namespace 

IMPORTANT:: Once you migrate the namespace, you can't deploy in `s01.oss.sonatype.org` anymore, so make sure your release scripts are updated before proceeding.

Now you are ready to migrate the namespace. Go to https://central.sonatype.com/publishing/namespaces and click `Migrate this namespace` for your group ID. It should show you a popup asking for confirmation and then it will be migrated. 

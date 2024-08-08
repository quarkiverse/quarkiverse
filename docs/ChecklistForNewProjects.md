Here is a checklist with the tasks to be performed on any new Quarkiverse extension repository: 

# Requesting a new repository

## [Create an `Extension Proposal` issue](https://github.com/quarkusio/quarkus/issues/new?assignees=&labels=kind%2Fextension-proposal&template=extension_proposal.yml) in the Quarkus repository 

The core team can then decide if the extension should belong to core or as a Quarkiverse extension. Please indicate the lead maintainers for the extension, and preferably a URL with more information about the technology the extension should enable. 

Once the lead maintainers are identified (their GitHub accounts), a pull-request is created in the [Quarkiverse DevOps repository](https://github.com/quarkiverse/quarkiverse-devops) with the data provided in a [`.tf` file](https://github.com/quarkiverse/quarkiverse-devops#workflow-for-new-repositories) (because the pull-request needs to be created from a branch in the same repository, existing Quarkiverse members can do this without waiting for any Quarkiverse org owner).

| :exclamation:  IMPORTANT   |
|----------------------------|
If you need to change any setting in the repository (give push permissions to anyone, enable a GitHub app, etc.), make sure you perform these changes in the repository's `.tf` file. Changes performed in the GitHub UI directly can be discarded at any time without notice.   

# Start coding 

When decided, the Quarkiverse Team will initialize the repository in the Quarkiverse organization for you with skeleton code ready. If you'd like to get started before then, you can start implementing your extension from a skeleton with this command:
```shell
mvn io.quarkus.platform:quarkus-maven-plugin:create-extension \
 -DgroupId=io.quarkiverse.[myext] -DextensionId=[my-ext] -U
```

It's best not to create a Git repository, since migration of an existing repository into the Quarkiverse org can be complex. 

## Set up your IDE's code format 

## Code format

Extensions generated with the `create-extension` goal of the Quarkus maven plugin expect code to be formatted according to the Quarkus conventions as documented in: https://github.com/quarkusio/quarkus/blob/master/CONTRIBUTING.md#ide-config-and-code-style. The default CI setup will validate the format and fail your build if the files don't conform.

# After the repository is created

## [Integrate with the Quarkus Ecosystem CI](https://github.com/quarkusio/quarkus-ecosystem-ci#what-its-all-about)

If you wish to have your extension tested against the latest snapshot in Quarkus core, you need to register your extension in the Quarkus Ecosystem CI

1. Create an [Ecosystem CI issue](https://github.com/quarkiverse/quarkiverse/issues/new/choose) and assign to the extension lead 
2. In the [Ecosystem CI repository](https://github.com/quarkusio/quarkus-ecosystem-ci), create a `info.yaml` file in a `quarkiverse-<YOUR_EXTENSION>` directory with the following contents:

```yaml
url: https://github.com/quarkiverse/quarkus-<YOUR_EXTENSION>
issues:
  repo: quarkiverse/quarkiverse
  latestCommit: <the issue number you created in the previous step>
``` 

## [Register the extension documentation in the quarkiverse-docs](https://github.com/quarkiverse/quarkiverse-docs)

In order to have your [extension documentation](https://github.com/quarkiverse/quarkiverse/wiki#documenting-your-extension) listed in the [Quarkiverse Documentation website](https://quarkiverse.github.io/quarkiverse-docs/), open a PR including it in the [antora-playbook.yml](https://github.com/quarkiverse/quarkiverse-docs/blob/main/antora-playbook.yml)

## [Make your extension available in the tooling](https://github.com/quarkusio/quarkus-extension-catalog#extensions)

Create a `YAML` file with your extension's `group-id` and `artifact-id` in the [quarkus-extension-catalog repository](https://github.com/quarkusio/quarkus-extension-catalog/tree/main/extensions)  

## [Allow your company to be named as a sponsor or contributor (optional)](https://github.com/quarkusio/quarkus-extension-catalog#extensions)

If you would like your company to be listed as a contributor or sponsor of the extension, register an opt in in the 
 opt-in file in the [quarkus-extension-catalog repository](https://github.com/quarkusio/quarkus-extension-catalog/blob/main/named-contributing-orgs-opt-in.yml).  

# When your extension is ready

## [Release your extension](/Release) 

When all tests pass, and you're pretty confident that your extension is ready, it's time to [release your extension](/Release) to Maven central
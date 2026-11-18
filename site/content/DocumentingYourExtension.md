## Using Antora 

The Quarkiverse extension template includes skeleton documentation. 
These docs use [Asciidoctor](https://asciidoctor.org/) for content, and [Antora](https://antora.org/) for navigation.

To get started creating your documentation, update the `docs/modules/ROOT/pages/index.adoc` in your project.
If your extension grows more complex and you need multiple pages, add them to `docs/modules/ROOT/nav.adoc`.

## Preview documentation using asciidoc

By default you can run `mvn package` and docs will be rendered using asciidoc into `target/generated-docs/index.html`

You will get similar in most IDE's like visual studio code or Intellij IDEA.

## Samples 

Code samples can be put in the `docs/modules/ROOT/examples` folder, and imported into the main documentation with [an `::include` directive](https://docs.asciidoctor.org/asciidoc/latest/directives/include/).
Properties in `docs/templates/includes/attributes.adoc` will be resolved and copied into `docs/modules/ROOT/pages/includes/attributes.adoc` by the Maven resources plugin each build.

## Quarkiverse docs hosting 

Consider adding documentation to the [Quarkiverse docs page](https://docs.quarkiverse.io/). 
The Quarkiverse Hub uses [Antora](https://antora.org/) to aggregate each extension's documentation in the Quarkiverse docs website. 
To register your extension's documentation, open a PR including it in the [antora-playbook.yml](https://github.com/quarkiverse/quarkiverse-docs/blob/main/antora-playbook.yml)

### Publish documentation from multiple branches

To publish documentation for both the default branch and a maintenance branch, update your extension's entry in [antora-playbook.yml](https://github.com/quarkiverse/quarkiverse-docs/blob/main/antora-playbook.yml):

```yaml
- url: https://github.com/quarkiverse/quarkus-your-extension
  branches: [HEAD, '0.8.x']
  version:
    main: dev
  start_path: docs
```

In this example, `HEAD` selects the default branch, `main`. In your extension's repository, remove the `version` key from `docs/antora.yml` on every included branch to let the playbook assign `dev` to `main` and use the branch name for other branches, such as `0.8.x`.

If you keep `version` in `docs/antora.yml`, set a different value on each branch because it [takes precedence over the playbook](https://docs.antora.org/antora/latest/playbook/content-source-version/). If two branches of the same extension use `version: dev`, Antora combines their docs into one component version and can fail if both branches provide the same navigation file.

If your maintenance branches follow a naming convention, use an [Antora branch pattern](https://docs.antora.org/antora/latest/playbook/content-branches/) to include new branches automatically.
For example, the following pattern includes branches such as `3.x` and `3.15.x`:

```yaml
branches: [HEAD, '{1..9}*({0..9})?(.+({0..9})).x']
```

To publish the documentation as it was at a specific release, add [Git tags](https://docs.antora.org/antora/latest/playbook/content-tags/) to the same playbook entry, for example `tags: ['0.8.2']`. Keep `branches` to publish from both, or set `branches: ~` to publish only from tags. Check that each selected tag has `docs/antora.yml` and resolves to a distinct Antora version, just like each selected branch.

After the docs are published, check that the expected versions appear in the version selector.

## Quarkus Antora for "live edit"

To generate locally the documentation of an extension as a site, you can add the quarkus-antora extension: https://github.com/quarkiverse/quarkus-antora to your project using the following steps: 

- Add the extension to the pom.xml file of the `docs` module
- Start `mvn package quarkus:dev`
- When DevServices is launched, type `w` within the terminal and the generated site will appear within your browser
- As a  bonus, since `Live Reload` is supported, you can change the text of the documentation under `modules/ROOT` and hit `F5`.


## Sync readme for extension

If you would like to sync the README page content of the GitHub repository of the extension, here are the steps to follow
to merge the content:

- Convert the root README.md to a README.adoc file manually or using an online tool like: https://github.com/dohliam/markdoctor
- Replace within the README.adoc file the root `#` level to `##` to avoid the `booctype` asciidoctor error. This step is optional as asciidoctor proposes such the following option to downgrade the levels if needed - https://docs.asciidoctor.org/asciidoc/latest/directives/include-with-leveloffset/#manipulate-heading-levels-with-leveloffset
- Add to the `maven-resources-plugin` of the docs project a new resource to be copied

    ```
    <resource>
        <directory>${project.basedir}/../</directory>
        <include>README.adoc</include>
        <filtering>false</filtering>
    </resource>
    ```

- Define a new section part of the `index.Adoc` file to include the README.adoc file
```
include::./includes/README.adoc[]
```


## Migration to Quarkus 3.14

Before 3.14 the config documentation used to be generated in the root directory of your project.
This is not the case anymore.
Therefore, if you upgrade the Quarkus used in your Quarkiverse extension from a version older than 3.14, you need to set up the `quarkus-config-doc-maven-plugin` in your project.
A typical diff is described in the [Migration Guide 3.14](https://github.com/quarkusio/quarkus/wiki/Migration-Guide-3.14#publishing-the-config-documentation).

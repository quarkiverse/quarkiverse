### Repository name

The repository name under the quarkiverse organization should have `quarkus-` prefix. This will help avoid potential conflicts when cloning and/or forking the repository.

### Project's Maven artifact `groupId`s

The Maven `groupId` of the project's artifacts should follow the following format: `io.quarkiverse.<project-name>`. In other words, the project’s `groupId` should start with the `io.quarkiverse.` prefix followed by the project-specific unique name (minus the `quarkus-` prefix) in which dots aren't allowed. Also, since your `groupId` should also be your root package name, if it contains characters that are not allowed in package names (such as `-`), you should concatenate all the parts of your project name to form a single, lowercased name. So if your repository is named `quarkus-foo-bar`, your `groupId` would become `io.quarkiverse.foobar`.

### Project's Maven artifact `artifactId`s

The project’s `artifactId` should start with the `quarkus-` prefix.

### Root package name

The root package name is expected to be the same as the project’s Maven artifact `groupId`, i.e. `io.quarkiverse.jberet`, if project name is `jberet`. See the [`groupId` section](#projects-maven-artifact-groupids) for more details. 
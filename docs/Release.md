The release is performed through GitHub Actions. The necessary credentials to tag in GitHub and to push to Maven Central (Sonatype)
already exists as secrets in the `quarkiverse` organization. 

## Perform the release 

To perform a release, one must provide a Pull-request changing the `current-version` and `next-version` properties in the `.github/project.yml` file.

Example: 
```yaml
release:
  current-version: "2"
  next-version: "999-SNAPSHOT"    
```

* current-version: The released version
* next-version: The next development version

Once the pull-request is merged, the `release.yml` workflow is triggered, which will push the generated tags once the process is complete and deploy the released version to Sonatype Nexus. 

### IMPORTANT
**The Pull Request needs to come from a branch in the origin repository.** Right now, for security reasons, secrets are not propagated to forks, even for Pull Requests opened to the original repository (https://github.community/t5/GitHub-Actions/Github-Workflow-not-running-from-pull-request-from-forked/m-p/33547/highlight/true#M1555)

After the release is performed, [create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release), so projects using your extension may know what have been changed when dependabot kicks in.

## FAQ

### Release fails while deploying the integration tests and docs

Docs and Integration tests are not supposed to be released. They should be versioned when preparing a release, but should never be deployed to the Sonatype OSSRH Nexus.
There is a small trick you can do if you have an `integration-tests` or `docs` module in your project. In your parent POM add the following profile: 

```xml
<profiles>
    <profile>
        <id>docs</id>
        <activation>
            <property>
                <name>performRelease</name>
                <value>!true</value>
            </property>
        </activation>
        <modules>
            <module>docs</module>
        </modules>
    </profile>
    <profile>
        <id>it</id>
        <activation>
            <property>
                <name>performRelease</name>
                <value>!true</value>
            </property>
        </activation>
        <modules>
            <module>integration-tests</module>
        </modules>
    </profile>
</profiles>
```

This will ensure that when the Release is triggered (with the `-DperformRelease` flag set) the `integration-tests` and the `docs` module are skipped.


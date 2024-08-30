/*
 * Copyright 2020 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//usr/bin/env jbang "$0" "$@" ; exit $?

//JAVA 17+

//DEPS org.kohsuke:github-api:1.324
//DEPS info.picocli:picocli:4.2.0

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kohsuke.github.GHIssue;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.kohsuke.github.PagedIterator;
import org.kohsuke.github.PagedSearchIterable;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Collections;

@Command(name = "report", mixinStandardHelpOptions = true,
        description = "Raises and closes issues depending on the results of dead link checking")
class Report implements Runnable {

    // We need a marker to search for, but double quotes are not honoured, and hyphenated terms
    // are split.
    // We can't use a label because we may not have the right privileges in the repo we're
    // raising an issue in
    private static final String EYECATCHER = "QuarkusExtensionsDeadLinkHelper";
    public static final String OUTPUT_PATH = "site/dead-link-check-results.json";
    @Option(names = "token", description = "Github token to use when calling the Github API")
    private String token;

    @Option(names = "siteUrl", description = "Base url of the external site ")
    private String siteUrl;

    @Option(names = "issueRepo", description = "The repository where issues should be raised if " +
            "we cannot identify an owning repository (i.e. quarkusio/quarkus)")
    private String issueRepo;

    @Option(names = "dryRun", description = "Whether to go through with making changes to the " +
            "live repo")
    private boolean dryRun;

    @Option(names = "runId", description = "The ID of the Github Action run")
    private String runId;

    @Override
    public void run() {
        try {
            final GitHub github = new GitHubBuilder().withAppInstallationToken(token)
                    .build();

            List<DeadLink> links = readTestOutputFile();
            System.out.println("Processing " + links.size() + " dead links.");

            links.forEach(link -> processDeadLink(github, link));

            // Close any issues that don't relate to these
            closeResolvedIssues(github, links);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private void closeResolvedIssues(GitHub github, List<DeadLink> links) throws IOException {
        String term = String.format("is:issue is:open %s in:body", EYECATCHER);
        PagedSearchIterable<GHIssue> answer = github.searchIssues()
                .q(term)
                .list();

        PagedIterator<GHIssue> iterator = answer.iterator();

        while (iterator.hasNext()) {
            GHIssue issue = iterator.next();
            // Look through our dead links to see if one matches
            String title = issue.getTitle();

            DeadLink matchingLink = links.stream()
                    .filter(link -> title.contains(link.url()))
                    .findAny()
                    .orElse(null);


            if (matchingLink == null) {
                // close issue with a comment
                final String comment = String.format(
                        "Build fixed:\n* Link to latest CI run: https://github" +
                                ".com/%s/actions/runs/%s", issueRepo, runId);

                if (!dryRun) {
                    issue.comment(comment);
                    issue.close();
                } else {
                    System.out.println(
                            String.format("Dry run: would close issue %s", issue.getHtmlUrl()
                                    .toString()));
                    System.out.println("Comment would be: " + comment);
                }
            } else {
                // Do nothing
                System.out.println(
                        String.format("Keeping %s open as it is still broken in tests. The dead link flagged by tests is %s",
                                issue.getHtmlUrl()
                                        .toString(), matchingLink.url()));

            }


        }
    }


    private void processDeadLink(GitHub github, DeadLink link) {
        try {

            System.out.println(String.format("Found a dead link: %s", link.url));

            final GHRepository repository = github.getRepository(issueRepo);

            //Be aware that double quotes are not honoured and terms are generally split and AND-ed.
            // Don't require our eyecatcher, count any existing issue about this url as good enough
            String term = String.format("is:issue is:open \"%s\" in:title repo:%s", link.url(), issueRepo);
            PagedSearchIterable<GHIssue> answer = github.searchIssues()
                    .q(term)
                    .list();

            // If there's no matching defect ...
            if (answer.getTotalCount() == 0) {
                String title = String.format("Dead link: %s", link.url);
                // Eventually, we would like to customise the message depending on the exact nature of the broken link.
                // For now, just do something generic.
                String body = String.format("""
                        Dead link: %s
                                            
                        The problem link was found on %s
                                            
                        This issue was auto-created by the dead link helper. 
                                        
                         --- %s --- Do not remove this line or the dead link helper will not be able to manage this issue
                         """, link.url, getOwningPage(link), EYECATCHER);

                if (!dryRun) {
                    GHIssue issue = repository.createIssue(title)
                            .body(body)
                            .create();
                    System.out.println(String.format("Created issue: %s", issue.getHtmlUrl()));
                } else {
                    System.out.println(
                            String.format("Dry run: NOT creating issue:\n %s\n%s", title, body));

                }
            } else {
                // Do nothing
                GHIssue issue = answer.iterator()
                        .next();
                System.out.println(
                        String.format("Found an issue already covering this dead link: %s: %s",
                                issue.getNumber(), issue.getTitle()));
            }

        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String getOwningPage(DeadLink link) {
        return link.owningPage.replace("http://localhost:9000/quarkiverse", siteUrl);
    }

    private List<DeadLink> readTestOutputFile() throws IOException {
        Path filePath = FileSystems.getDefault()
                .getPath(OUTPUT_PATH);
        if (Files.exists(filePath)) {
            return Files.lines(filePath)
                    .map(line -> {
                        try {
                            return new ObjectMapper().readValue(line, DeadLink.class);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .toList();
        } else {
            return Collections.emptyList();
        }
    }

    public static void main(String... args) {
        int exitCode = new CommandLine(new Report()).execute(args);
        System.exit(exitCode);
    }

    record DeadLink(
            String url,
            String owningPage) {
    }
}
package io.quarkiverse.hub;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import io.quarkiverse.roq.testing.RoqAndRoll;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;

/**
 * Checks the static site as it is published, for what the served pages in {@link SiteTest} can't show. Only one test
 * class can use {@link RoqAndRoll}, so keep these here.
 */
@QuarkusTest
@RoqAndRoll
public class GeneratedSiteTest {

    static final Path GENERATED = Path.of("target/roq");

    // Linked from quarkiverse.io and the extension docs, so these must not move
    @ParameterizedTest
    @ValueSource(strings = { "/", "/home/", "/checklistfornewprojects/" })
    public void linkedUrlsArePublished(String path) {
        RestAssured.when().get(path).then().statusCode(200);
    }

    // _Footer.md and the like are for the GitHub wiki, so neither their own page nor any other should show them
    @Test
    public void underscoredContentFilesAreNotPublished() throws IOException {
        List<Path> generated;
        try (Stream<Path> files = Files.walk(GENERATED)) {
            generated = files.filter(path -> path.toString().endsWith(".html")).toList();
        }
        assertFalse(generated.isEmpty());
        try (Stream<Path> files = Files.list(SiteTest.CONTENT)) {
            for (Path file : files.filter(path -> path.getFileName().toString().startsWith("_")).toList()) {
                String firstLine = Files.readAllLines(file).stream().filter(line -> !line.isBlank()).findFirst()
                        .orElseThrow().replaceFirst("^#+\\s*", "").strip();
                for (Path html : generated) {
                    assertFalse(Files.readString(html).contains(firstLine), file.getFileName() + " is shown in " + html);
                }
            }
        }
    }

    @Test
    public void notFoundPageIsPublishedWithoutAnEditLink() {
        RestAssured.when().get("/404.html").then().statusCode(200)
                .body(not(containsString(SiteTest.EDIT_LINK_PREFIX)));
    }
}

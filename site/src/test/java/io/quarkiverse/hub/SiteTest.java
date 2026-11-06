package io.quarkiverse.hub;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;

/**
 * Checks the pages made from the markdown files in content/, without assuming which files there are. These replace
 * the Jest unit tests of the Gatsby components and of the plugin which defaulted slugs and titles from file names.
 * What needs the generated site, such as the urls other sites link to, is checked in {@link GeneratedSiteTest}.
 */
@QuarkusTest
public class SiteTest {

    static final Path CONTENT = Path.of("content");
    static final String EDIT_LINK_PREFIX = "https://github.com/quarkiverse/quarkiverse/edit/main/site/content/";

    /**
     * The pages in the navigation, by the content file their edit link points at.
     */
    Map<String, Document> pagesByFile;

    @BeforeEach
    void crawlNavigation() {
        pagesByFile = new LinkedHashMap<>();
        for (Element link : get("/").select("nav a[href]")) {
            Document page = get(link.attr("href"));
            pagesByFile.put(editedFile(page), page);
        }
    }

    @Test
    public void navigationHasAPageForEveryContentFileExceptHomeAndUnderscoredOnes() throws IOException {
        Set<String> expected = markdownFiles()
                .filter(name -> !name.startsWith("_") && !name.equals("Home.md"))
                .collect(Collectors.toSet());
        assertEquals(expected, pagesByFile.keySet());
    }

    @Test
    public void everyPageHasTheLayoutATitleAndContent() {
        pagesByFile.forEach((file, page) -> {
            assertNotNull(page.selectFirst("header a[href=/]"), file + " has no link to the home page");
            assertFalse(page.select("nav a").isEmpty(), file + " has no navigation");
            assertFalse(page.select(".page-title").text().isBlank(), file + " has no title");
            assertFalse(page.select("main > :not(.page-title)").text().isBlank(), file + " has no content");
        });
    }

    @Test
    public void titleDefaultsToTheFileNameWithHyphensAsSpaces() {
        pagesByFile.forEach((file, page) -> {
            if (!hasFrontMatter(file)) {
                assertEquals(file.replaceFirst("\\.md$", "").replace('-', ' '), page.select(".page-title").text());
            }
        });
    }

    @Test
    public void homePageShowsTheContentOfHome() {
        Document homeFile = get("/home/");
        homeFile.select(".page-title").remove();
        assertEquals(homeFile.select("main").text(), get("/").select("main").text());
        assertEquals("Home.md", editedFile(get("/")));
    }

    static Document get(String path) {
        return Jsoup.parse(RestAssured.get(path).then().statusCode(200).extract().asString());
    }

    static String editedFile(Document page) {
        Element edit = page.selectFirst("a[href^=" + EDIT_LINK_PREFIX + "]");
        assertNotNull(edit, "no edit link on " + page.title());
        return edit.attr("href").substring(EDIT_LINK_PREFIX.length());
    }

    static Stream<String> markdownFiles() throws IOException {
        return Files.list(CONTENT).map(path -> path.getFileName().toString()).filter(name -> name.endsWith(".md"));
    }

    static boolean hasFrontMatter(String file) {
        try {
            return Files.readString(CONTENT.resolve(file)).startsWith("---");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

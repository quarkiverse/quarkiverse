const {onCreateNode} = require("./gatsby-node");

const defaultName = "Some-Kebab-Case-String.a-dot"
const defaultParent = {name: defaultName};


const createNodeField = jest.fn(({node, name, value}) => {
    node.fields[name] = value;
});

const getNode = jest.fn(() => {
    return defaultParent;
});

const actions = {createNodeField};

describe("the frontmatter defaulter", () => {
    describe("for a node with an existing slug", () => {
        const slug = "Someone and Their Friend";

        const fields = {};
        const frontmatter = {
            slug
        };

        const node = {
            fields,
            frontmatter,
            internal: {type: "MarkdownRemark"}
        };

        beforeAll(async () => {
            await onCreateNode({node, getNode, actions});
        });

        afterAll(() => {
        });

        it("leaves the original", async () => {
            expect(frontmatter.slug).toEqual(slug);
        });

        it("copies the slug to the fields", async () => {
            expect(fields.slug).toEqual(slug);
        });
    });

    describe("for a node with an existing slug", () => {
        const slug = "Someone and Their Friend";

        const fields = {};
        const frontmatter = {
            slug
        };

        const node = {
            fields,
            frontmatter,
            internal: {type: "MarkdownRemark"}
        };

        beforeAll(async () => {
            await onCreateNode({node, getNode, actions});
        });

        afterAll(() => {
        });

        it("leaves the original", async () => {
            expect(frontmatter.slug).toEqual(slug);
        });

        it("copies the slug to the fields", async () => {
            expect(fields.slug).toEqual(slug);
        });
    });

    describe("for a node with no slug", () => {
        const fields = {};
        const frontmatter = {};

        const node = {
            fields,
            frontmatter,
            internal: {type: "MarkdownRemark"}
        };

        beforeAll(async () => {
            await onCreateNode({node, getNode, actions});
        });

        afterAll(() => {
        });

        it("does not change the frontmatter", async () => {
            expect(frontmatter).toEqual({});
        });

        it("turns the page name into a slug", async () => {
            expect(fields.slug).toEqual("some-kebab-case-string-a-dot");
        });
    });

    describe("for a node with an existing title", () => {
        const title = "Someone and Their Friend";

        const fields = {};
        const frontmatter = {
            title
        };

        const node = {
            fields,
            frontmatter,
            internal: {type: "MarkdownRemark"}
        };

        beforeAll(async () => {
            await onCreateNode({node, getNode, actions});
        });

        afterAll(() => {
        });

        it("leaves the original", async () => {
            expect(frontmatter.title).toEqual(title);
        });

        it("copies the title to the fields", async () => {
            expect(fields.title).toEqual(title);
        });
    });

    describe("for a node with no title", () => {
        const fields = {};
        const frontmatter = {};

        const node = {
            fields,
            frontmatter,
            internal: {type: "MarkdownRemark"}
        };

        beforeAll(async () => {
            await onCreateNode({node, getNode, actions});
        });

        afterAll(() => {
        });

        it("does not change the frontmatter", async () => {
            expect(frontmatter).toEqual({});
        });

        it("copies the a human readable site title to the fields", async () => {
            expect(fields.title).toEqual("Some Kebab Case String.a dot");
        });
    });
});

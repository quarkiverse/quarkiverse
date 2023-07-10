/**
 * We don't want to force markdown content to have frontmatter, since that's annoying.
 * Instead, infer some sensible defaults.
 */

const slugify = require("slugify");
const defaultOptions = {
    nodeType: "MarkdownRemark"
};

exports.onCreateNode = ({node, getNode, actions}, pluginOptions) => {
    const {createNodeField} = actions;

    const options = {
        ...defaultOptions,
        ...pluginOptions
    };

    if (node.internal.type !== options.nodeType) {
        return;
    }

    const {frontmatter, parent} = node;
    const expandedParent = getNode(parent);
    const {name} = expandedParent;

    const {title, slug} = frontmatter;

    const fallbackSlug = slugify(name.replace(/\./g, '-'), {lower: true, remove: /:/});
    const fallbackTitle = name?.replace(/-/g, " ");

    const nonNullSlug = slug ? slug : fallbackSlug;
    const nonNullTitle = title ? title : fallbackTitle;

    createNodeField({
        node,
        name: "slug",
        value: nonNullSlug
    });

    createNodeField({
        node,
        name: "title",
        value: nonNullTitle
    });
};

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const util = require("util")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/blog/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                templateKey
                slug
                id
                title
                url: slug
                date
                tags
                description
                headerImage
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  // Collect all tags
  const tagSet = new Set()

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const tags = post.node.frontmatter.tags

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })

    // get tags of one post
    if (tags) {
      tags.forEach(tag => tagSet.add(tag))
    }
  })

  // Create tag-group pages
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${tag.toLowerCase().replace(/\s/g, "")}`,
      component: path.resolve("src/templates/tag-group.tsx"),
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  let source
  if (getNode(node.parent)) {
    source = getNode(node.parent).sourceInstanceName
  }

  if (node.internal.type === `MarkdownRemark` && source === "blog") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
			type MarkdownRemark implements Node {
					frontmatter: Frontmatter
			}
			type Frontmatter {
					images: [String!]!
			}
	`
  createTypes(typeDefs)
}

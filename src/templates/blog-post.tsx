import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled, { css } from "styled-components"
import { MDXProvider } from "@mdx-js/react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { markdownHtml } from "../styles/common-css"

const Article = styled.article`
  ${markdownHtml}
`

interface PageContext {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface Props {
  markdownRemark: any
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const BlogPostTemplate: React.FC<PageProps<Props>> = ({
  data,
  location,
  pageContext,
}) => {
  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata.title
  const {
    previous,
    next,
  }: { previous?: PageContext; next?: PageContext } = pageContext

  return (
    <Layout
      templateKey={post.frontmatter.templateKey}
      post={post.frontmatter}
      location={location}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Article>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "YY.MM.DD")
        subject
        title
        description
        tags
        headerImage
        templateKey
      }
    }
  }
`

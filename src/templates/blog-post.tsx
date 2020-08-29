import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled, { css } from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const Article = styled.article`
  margin: 0 auto;
  padding: 36px 56px;
  width: 100%;
  max-width: 1140px;
  color: #484848;
  overflow: hidden;
  @media (max-width: 1140px) {
    padding: 0 30px 30px 30px;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
      "Microsoft JhengHei", sans-serif;
  }
  h2 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 1.25;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eee;
  }
  h3 {
    font-size: 1.25em;
    margin: 24px 0 16px 0;
    font-weight: 700;
    line-height: 1.25;
  }
  h4 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.025em;
  }
  p {
    margin-bottom: 28px;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.025em;
    display: block;
    unicode-bidi: embed;
    white-space: pre-wrap;
    code {
      background-color: rgba(0, 0, 0, 0.04);
      font-family: inherit;
      color: inherit;
    }
  }
  ol {
    padding-left: 2em;
    @media (max-width: 576px) {
      padding-left: 0;
    }
  }
  blockquote {
    font-size: 16px;
    font-style: normal;
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd;
    margin: 0 0 16px 0;
    code[class*="language-"] {
      color: inherit;
    }
  }
  .gatsby-highlight {
    margin-bottom: 28px;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 3px;
    background-color: #f0ebe5;
    pre {
      background-color: #f0ebe5;
      padding-left: 24px;
      * {
        font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono",
          monospace;
      }
    }
    code {
      font-size: 16px;
      .token.punctuation {
        padding: 0.1em;
      }
      .token.operator {
        background: none;
      }
    }
  }
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
        <footer></footer>
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

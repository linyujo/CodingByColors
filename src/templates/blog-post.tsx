import React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
// import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import "../styles/prism.css"
import { markdownHtml } from "../styles/common-css"
import PreNextNav from "../components/BlogPostFooterNav"

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
      <PreNextNav previous={previous} next={next} />
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

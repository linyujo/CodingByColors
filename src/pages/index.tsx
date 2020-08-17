import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled from "styled-components"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Headerline from "../components/Headline"

import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Homepage = styled.div`
  background: #fffaf4;
`

interface Props {
  allMarkdownRemark: any
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const BlogIndex: React.FC<PageProps<Props>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const latestPost = posts[0]

  // console.log("posts", posts)

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        {/* <Bio /> */}
        <div className="row">
          <Headerline
            post={latestPost.node.frontmatter}
            url={latestPost.node.fields.slug}
          />
          <Homepage>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article key={node.fields.slug}>
                  <header>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                </article>
              )
            })}
          </Homepage>
        </div>
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YY.MM.DD")
            title
            description
            tags
            headerImage
          }
        }
      }
    }
  }
`

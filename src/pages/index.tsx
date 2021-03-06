import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Headerline from "../components/Headline"
import PostGrid from "../components/PostGrid"
import HomeImage from "../components/HomeImage"

import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Home = styled.div`
  padding: 0 0 64px 0;
  .custom-row {
    margin-right: 0;
    margin-left: 0;
  }
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
  // const siteTitle = data.site.siteMetadata.title

  // console.log("data", data)

  const posts = data.allMarkdownRemark.edges

  // console.log("posts", posts)

  const latestPost = posts[0]

  return (
    <Layout location={location}>
      <SEO title="All posts" />
      <Home>
        <HomeImage />
        <div className="container">
          <div className="row custom-row">
            <Headerline
              post={latestPost.node.frontmatter}
              url={latestPost.node.fields.slug}
            />
          </div>
          <div className="row custom-row">
            {posts.slice(1).map(({ node }, index) => {
              return (
                <PostGrid
                  post={node.frontmatter}
                  url={node.fields.slug}
                  index={index}
                  key={node.fields.slug}
                />
              )
            })}
          </div>
        </div>
      </Home>
    </Layout>
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YY.MM.DD")
            subject
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

import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"
import PageTitle from "../components/PageTitle"
import TagsCloud from "../components/Tag/TagsCloud"
import PostGridHoriz from "../components/PostGridHoriz"

import { pageWrapper, mainWrapper } from "../styles/common-css"
import { getTagsOfPosts } from "../utils/markdownTagsMapping"

const TagGroupW = styled.div`
  ${pageWrapper}
  main {
    ${mainWrapper}
    section {
      flex: 1;
    }
    .tags-cloud {
      width: 300px;
      padding-left: 32px;
    }
  }
  @media (max-width: 1199px) {
    main {
      flex-direction: column-reverse;
      .tags-cloud {
        width: 100%;
        padding-left: 0;
        margin-bottom: 32px;
        .tags {
          .tag-link {
            display: inline-block;
            margin-right: 16px;
          }
        }
      }
    }
  }
`

type MarkdownResultType = {
  edges: {
    node: {
      frontmatter: {
        date: string
        title: string
        description: string
        headerImage: string
        tags: string[]
      }
      fields: {
        slug: string
      }
    }
  }[]
}

interface Props {
  relevantPosts: MarkdownResultType
  allPosts: MarkdownResultType
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const TagGroupTemplate: React.FC<PageProps<Props>> = ({
  data,
  location,
  pageContext,
}) => {
  const relevantPosts = data.relevantPosts.edges
  const allPosts = data.allPosts.edges

  const { tags, tagsMapping } = getTagsOfPosts(allPosts)

  return (
    <Layout location={location}>
      <SEO title="tags" />
      <TagGroupW>
        <PageTitle title={pageContext.tag} pathname={location.pathname} />
        <main className="container">
          <section className="articles">
            {relevantPosts.map(({ node }, index) => (
              <PostGridHoriz
                post={node.frontmatter}
                url={node.fields.slug}
                index={index}
                key={node.fields.slug}
              />
            ))}
          </section>
          <aside className="tags-cloud">
            <TagsCloud
              tags={tags}
              tagsMapping={tagsMapping}
              title="Article Tags"
            />
          </aside>
        </main>
      </TagGroupW>
    </Layout>
  )
}

export default TagGroupTemplate

export const pageQuery = graphql`
  query tagQuery($tag: [String!]) {
    relevantPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: $tag } } }
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

    allPosts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
            headerImage
          }
        }
      }
    }
  }
`

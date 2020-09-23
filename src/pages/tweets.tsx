import React from "react"
import { graphql, PageProps, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTitle from "../components/PageTitle"
import Tweet from "../components/Tweet"
import TagsCloud from "../components/Tag/TagsCloud"
// import { pageWrapper } from "../styles/common-css"

const TweetPageW = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 64px auto 0 auto;
  display: flex;
  .articles {
    flex: 1;
    article {
      margin: 0 auto 60px;
    }
  }
  .tags-cloud {
    width: 280px;
    padding-left: 32px;
  }
  @media (max-width: 992px) {
    .tags-cloud {
      display: none;
    }
  }
`

interface Props {
  tags: string[]
  tagsMapping: {}
}

const TweetsPage: React.FC<PageProps<Props>> = ({ data, location }) => {
  const tweets = data.allMarkdownRemark.edges

  // console.log("tweets", tweets)

  const mapping = {}

  tweets.forEach(({ node }) => {
    const { tags } = node.frontmatter
    for (let tag of tags) {
      mapping[tag] = mapping[tag] + 1 || 1
    }
  })

  const mappingKeys = Object.keys(mapping)
  const tags = mappingKeys.sort(
    (bTag, aTag) => mapping[aTag].count - mapping[bTag].count
  )

  return (
    <Layout location={location}>
      <SEO title="tags" />
      <PageTitle title="Tweets" pathname={location.pathname} />
      <TweetPageW>
        <section className="articles">
          {tweets.map(({ node }) => (
            <Tweet
              key={node.frontmatter.date}
              info={node.frontmatter}
              content={node.html}
            />
          ))}
        </section>
        <aside className="tags-cloud">
          <TagsCloud tags={tags} tagsMapping={mapping} title="Tweet Tags" />
        </aside>
      </TweetPageW>
    </Layout>
  )
}

export default TweetsPage

export const pageQuery = graphql`
  query getAllTweets {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tweets/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            date(formatString: "YY.MM.DD")
            tags
            images
            templateKey
          }
        }
      }
    }
  }
`

import React, { useState } from "react"
import { graphql, PageProps, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTitle from "../components/PageTitle"
import Tweet from "../components/Tweet"
import { TagsCloud, TagSpan } from "../components/Tag/TagsCloud"
import Breadcrumb from "../components/Breadcrumb"
// import { pageWrapper } from "../styles/common-css"

const TweetPageW = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 64px auto 0 auto;
  display: flex;
  .articleGroup {
    flex: 1;
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    margin: 0 auto 60px;
  }
  .articles {
    width: 100%;
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
  @media (max-width: 600px) {
    margin: 32px auto 0 auto;
    .articles {
      margin: 0 auto 16px;
      article {
        margin: 0 auto 16px;
      }
    }
  }
`

interface Props {
  tags: string[]
  tagsMapping: {}
}

const TweetsPage: React.FC<PageProps<Props>> = ({ data, location }) => {
  const [tagFilter, setTagFilter] = useState("")

  const filter = (tag: string): void => {
    setTagFilter(tag)
  }

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

  const renderTweets = tagFilter
    ? tweets.filter(({ node }) => node.frontmatter.tags.includes(tagFilter))
    : tweets

  return (
    <Layout location={location}>
      <SEO title="tags" />
      <PageTitle title="Tweets" pathname={location.pathname} />
      <TweetPageW>
        <div className="articleGroup">
          <Breadcrumb filterStr={tagFilter} setFilter={filter} />
          <section className="articles">
            {renderTweets.map(({ node }) => (
              <Tweet
                key={node.frontmatter.date}
                info={node.frontmatter}
                setFilter={filter}
                content={node.html}
              />
            ))}
          </section>
        </div>
        <aside className="tags-cloud">
          <TagsCloud title="Tweet Tags" tags={tags} tagsMapping={mapping}>
            {tagProps =>
              tags
                .sort((strA, strB) =>
                  strA.toLowerCase().localeCompare(strB.toLowerCase())
                )
                .map(tagName => (
                  <TagSpan
                    {...tagProps}
                    name={tagName}
                    setFilter={filter}
                    key={tagName}
                  />
                ))
            }
          </TagsCloud>
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

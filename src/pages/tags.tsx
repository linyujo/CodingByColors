import React, { useContext } from "react"
import { graphql, PageProps, Link } from "gatsby"
import TagCloud from "react-tag-cloud"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Tag, TagImageGrid } from "../components/Tag"
import { randomColor } from "../utils/colorUtils"

import { getBrowserWidth } from "../utils/browserUtils"

interface TagsCloudProps {
  tags: string[]
  tagsMapping: {}
}

const TagsCloud: React.FC<TagsCloudProps> = ({ tags, tagsMapping }) => {
  const biggestTag = tags[0]
  const maxCount = tagsMapping[biggestTag]
  const tagFontSize = function (count: number): number {
    const min = 18
    const max = 40
    const fontSize = (count / maxCount) * (max - min) + min
    return fontSize
  }
  return (
    <TagCloud
      id="tagCloud"
      style={{
        fontFamily: "Helvetica",
        fontSize: 30,
        fontWeight: "bold",
        color: () => randomColor(),
        padding: 5,
        width: "100%",
        height: "100%",
      }}
    >
      {tags.map(tagName => (
        <Link
          to={`/tags/${tagName.trim()}`}
          style={{
            fontSize: tagFontSize(tagsMapping[tagName]),
          }}
          key={tagName}
        >
          {tagName}
        </Link>
      ))}
    </TagCloud>
  )
}

const MobileTags = styled.div`
  margin-left: 4px;
  /* border-left: 4px solid #a27e7e;
  padding-left: 16px; */
  .title {
    font-size: 24px;
    color: #a27e7e;
    margin-bottom: 20px;
  }
  .aTag {
    margin-bottom: 8px;
    a {
      font-size: 16px;
      padding: 4px 12px;
    }
    &:last-child {
      a {
        margin-bottom: 0;
      }
    }
  }
`

interface TagListProps {
  tags: string[]
  tagsMapping: {}
}

const TagList: React.FC<TagListProps> = ({ tags, tagsMapping }) => {
  return (
    <MobileTags>
      <div className="title">Tags</div>
      {tags.map(tagName => (
        <div className="aTag" key={tagName}>
          <Tag name={`${tagName} ${tagsMapping[tagName].count}`} />
        </div>
      ))}
    </MobileTags>
  )
}

const ImageTags = styled.div`
  .col {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (max-width: 768px) {
    .col {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
  .title-row {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    .box {
      width: 40px;
      height: 100px;
      background: #a27e7e;
      margin-right: 32px;
    }
    h1 {
      font-size: 40px;
      font-family: "Kameron", serif;
      color: #a27e7e;
    }
  }
`

const TagsWithImage: React.FC<TagListProps> = ({ tags, tagsMapping }) => (
  <ImageTags>
    <div className="title-row">
      <span className="box"></span>
      <h1>Tags</h1>
    </div>
    <div className="row">
      {tags.map((tagName, index) => {
        const randomImage =
          tagsMapping[tagName].images[
            Math.floor(Math.random() * tagsMapping[tagName].images.length)
          ]
        return (
          <div key={tagName} className="col">
            <TagImageGrid
              index={index}
              name={tagName}
              count={tagsMapping[tagName].count}
              image={randomImage}
            />
          </div>
        )
      })}
    </div>
  </ImageTags>
)

const Wrapper = styled.div`
  padding-top: 64px;
  min-height: calc(100vh - 64px);
  .tagWrapper {
    &.mobile {
      width: 100%;
      height: auto;
      a {
      }
    }
  }
  @media (max-width: 768px) {
    padding-top: 48px;
    min-height: calc(100vh - 54px);
  }
`

interface Props {
  allMarkdownRemark: any
}

const TagsPage: React.FC<PageProps<Props>> = ({ data, location }) => {
  const { allMarkdownRemark } = data

  const mapping = {}

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { tags, headerImage } = node.frontmatter
    for (let tag of tags) {
      // mapping[tag] = mapping[tag] + 1 || 1
      if (mapping[tag]) {
        mapping[tag] = {
          count: mapping[tag].count + 1,
          images: [...mapping[tag].images, headerImage],
        }
      } else {
        mapping[tag] = {
          count: 1,
          images: [headerImage],
        }
      }
    }
  })

  const mappingKeys = Object.keys(mapping)
  const tags = mappingKeys.sort(
    (bTag, aTag) => mapping[aTag].count - mapping[bTag].count
  )

  const browserWidth = getBrowserWidth()

  let component
  let isMobile = browserWidth < 768 ? "mobile" : ""

  if (browserWidth > 576) {
    component = <TagsWithImage tags={tags} tagsMapping={mapping} />
  } else {
    component = <TagList tags={tags} tagsMapping={mapping} />
  }

  return (
    <Layout location={location}>
      <SEO title="tags" />
      <Wrapper>
        <div className="container">
          <div className={`tagWrapper ${isMobile}`}>{component}</div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query getAllTags {
    allMarkdownRemark {
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

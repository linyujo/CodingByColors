import React from "react"
import { graphql, PageProps, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTitle from "../components/PageTitle"
import TagsCloud from "../components/Tag/TagsCloud"
import MobileTagList from "../components/Tag/MobileTagList"
import TagsPuzzle from "../components/Tag/TagsPuzzle"

import { getBrowserWidth } from "../utils/browserUtils"
import { getTagsOfPosts } from "../utils/markdownTagsMapping"

import {
  pageWrapper,
  mainWrapper,
  customRow,
  customCol,
} from "../styles/common-css"

interface DesktopProps {
  tags: string[]
  tagsMapping: {}
  pathname: string
}

const DesktopContentW = styled.div`
  .content-wrapper {
    ${mainWrapper}
  }
  .tags-image {
    flex: 1;
  }
  .tags-cloud {
    width: 300px;
    padding-left: 32px;
  }
  .custom-row {
    ${customRow}
  }
  .custom-col {
    ${customCol}
  }
  @media (max-width: 992px) {
    .tags-image {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .tags-cloud {
      display: none;
    }
  }
`

const DesktopContent: React.FC<DesktopProps> = ({
  tags,
  tagsMapping,
  pathname,
}) => {
  return (
    <DesktopContentW>
      <PageTitle title="Tags" pathname={pathname} />
      <main className="content-wrapper container">
        <section className="tags-image">
          <div className="row custom-row">
            {tags.map((tagName, index) => {
              const randomImage =
                tagsMapping[tagName].images[
                  Math.floor(Math.random() * tagsMapping[tagName].images.length)
                ]
              return (
                <div key={tagName} className="col-sm-6 col-md-4 custom-col">
                  <TagsPuzzle
                    index={index}
                    name={tagName}
                    count={tagsMapping[tagName].count}
                    image={randomImage}
                  />
                </div>
              )
            })}
          </div>
        </section>
        <aside className="tags-cloud">
          <TagsCloud
            tags={tags}
            tagsMapping={tagsMapping}
            title="Article Tags"
          />
        </aside>
      </main>
    </DesktopContentW>
  )
}

const Wrapper = styled.div`
  ${pageWrapper}
`

interface Props {
  allMarkdownRemark: any
}

const TagsPage: React.FC<PageProps<Props>> = ({ data, location }) => {
  const { allMarkdownRemark } = data

  const { tags, tagsMapping } = getTagsOfPosts(allMarkdownRemark.edges)

  const browserWidth = getBrowserWidth()

  let component

  if (browserWidth > 576) {
    component = (
      <DesktopContent
        tags={tags}
        tagsMapping={tagsMapping}
        pathname={location.pathname}
      />
    )
  } else {
    component = <MobileTagList tags={tags} tagsMapping={tagsMapping} />
  }

  return (
    <Layout location={location}>
      <SEO title="tags" />
      <Wrapper>{component}</Wrapper>
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

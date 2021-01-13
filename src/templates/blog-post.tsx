import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import styled, { css } from "styled-components"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { markdownHtml } from "../styles/common-css"
import Icon from "../components/Icon"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const Article = styled.article`
  ${markdownHtml}
`

const PreNextNav = styled.nav`
  margin: 0 auto;
	padding: 24px 56px;
	width: 100%;
	max-width: 1140px;
	li{
		line-height: 32px;
	}
`

const hoverLine = css`
	height: 2px;
	width: 0;
	background: #6b6b6b;
	position: absolute;
	bottom: 0;
	left: 50%;
	transition: 0.3s all;
`

const UnordLists = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	list-style: none;
	padding: 0;
	li {
		.fa-layers{
			font-size: 16px;
		}
		&:nth-child(1){
			padding: 0 8px 0 0;
			&::before{
				content: "";
				${hoverLine}
			}
		}
		&:nth-child(2){
			padding: 0 0 0 8px;
			&::before{
				content: "";
				${hoverLine}
			}
		}
		&:hover{
			color: #6b6b6b;
			a {
				color: inherit;
			}
			&:nth-child(1){
				&::before{
					width: 100%;
					transform: translateX(-50%);
				}
			}
			&:nth-child(2){
				&::before{
					width: 100%;
					transform: translateX(-50%);
				}
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
      </Article>
      <PreNextNav>
        <UnordLists>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <Icon icon={faChevronLeft} /> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} <Icon icon={faChevronRight} />
              </Link>
            )}
          </li>
        </UnordLists>
      </PreNextNav>
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

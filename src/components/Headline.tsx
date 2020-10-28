import React, { memo } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Tag from "./Tag/Tag"
import { image, postGridInfo } from "../styles/common-css"

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  background: #f0ebe5;
  &:hover {
    .headline-cover {
      .image {
        transform: scale(1.02);
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    background: none;
  }
`

const Info = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .date {
    ${postGridInfo.date}
  }
  .title {
    ${postGridInfo.title}
  }
  .description {
    ${postGridInfo.description}
  }
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 576px) {
    padding: 20px;
  }
`

const Cover = styled.div`
  ${image.wrapper}
  width: 56.33333%;
  a {
    display: block;
  }
  .inner {
    ${image.inner}
    padding-top: 75%;
  }
  .image {
    ${image.itself}
    &::after {
      ${image.grayLayer}
    }
  }
  @media (max-width: 1200px) {
    .inner {
      padding-top: 88%;
    }
  }
  @media (max-width: 992px) {
    .inner {
      padding-top: 100%;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`

const imageStyle = headerImage => ({
  backgroundImage: ` url(${headerImage})`,
})

interface Props {
  post: {
    date: string
    title: string
    description: string
    tags: Array<string>
    headerImage: string
  }
  url: string
}

const preventUpdateMemo = (prevProps, nextProps) => {
  if (prevProps.url === nextProps.url) {
    return true
  }
  return false
}

const Headerline: React.FC<Props> = memo(({ post, url }) => {
  return (
    <Wrapper>
      <Info>
        <div className="date">{post.date}</div>
        <Link to={url}>
          <h3 className="title">{post.title}</h3>
        </Link>
        <p className="description">{post.description}</p>
        <div className="tags">
          {post.tags.map(name => (
            <Tag
              name={name}
              link={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}
              key={name}
            />
          ))}
        </div>
      </Info>
      <Cover className="headline-cover">
        <Link to={url} className="inner">
          <div className="image" style={imageStyle(post.headerImage)} />
        </Link>
      </Cover>
    </Wrapper>
  )
}, preventUpdateMemo)

export default Headerline

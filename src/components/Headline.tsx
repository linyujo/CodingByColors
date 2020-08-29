import React, { memo } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Tag from "./Tag"

const Wrapper = styled.div`
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
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .date {
    color: #b7b1a5;
    margin-bottom: 16px;
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
    color: #484848;
    font-size: 22px;
    font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
      "Microsoft JhengHei", sans-serif;
  }
  .description {
    margin-top: 16px;
    margin-bottom: 16px;
    line-height: 1.4;
    font-size: 16px;
    color: #656565;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 576px) {
    margin: 20px;
    .title {
      font-size: 18px;
    }
  }
`

const Cover = styled.div`
  width: 56.33333%;
  overflow: hidden;
  a {
    display: block;
  }
  .inner {
    width: 100%;
    padding-top: 75%;
  }
  .image {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    transition: 0.3s all;
    &::after {
      content: "";
      background: rgba(101, 101, 101, 0.2);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
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
    <div className="col-sm-12">
      <Wrapper>
        <Info>
          <div className="date">{post.date}</div>
          <Link to={url}>
            <h3 className="title">{post.title}</h3>
          </Link>
          <p className="description">{post.description}</p>
          <div className="tags">
            {post.tags.map(name => (
              <Tag name={name} key={name} />
            ))}
          </div>
        </Info>
        <Cover className="headline-cover">
          <Link to={url} className="inner">
            <div className="image" style={imageStyle(post.headerImage)} />
          </Link>
        </Cover>
      </Wrapper>
    </div>
  )
}, preventUpdateMemo)

export default Headerline

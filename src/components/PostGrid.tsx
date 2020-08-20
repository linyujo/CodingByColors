import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import SquareImage from "./SquareImage"
import Tag from "./Tag"

const pseudoTriangle = css`
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  @media (max-width: 768px) {
    content: none;
  }
`

const Wrapper = styled.div`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
  display: flex;
  flex-direction: column;
  .info {
    &:before {
      ${pseudoTriangle};
      border-width: 0 20px 20px 20px;
      border-color: transparent transparent #f6f2f1 transparent;
      top: -20px;
    }
  }
  &.reversed {
    flex-direction: column-reverse;
    .info {
      &:before {
        ${pseudoTriangle};
        content: none;
      }
      &:after {
        ${pseudoTriangle};
        border-width: 20px 20px 0 20px;
        border-color: #f6f2f1 transparent transparent transparent;
      }
    }
  }
  .cover-link {
    width: 100%;
    display: block;
    &:after {
      content: "";
      background: rgba(101, 101, 101, 0.3);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
    }
    &:hover {
      .image {
        transform: scale(1.02);
      }
    }
  }
  @media (max-width: 1200px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 40px;
    &.reversed {
      flex-direction: column;
    }
  }
`

const Info = styled.div`
  width: 100%;
  .info-wrapper {
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  }
  .info-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }
  .date {
    color: #bbb4b5;
    margin-bottom: 16px;
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
    color: #484848;
    font-size: 22px;
    font-family: "Helvetica", "Arial", "黑體-繁", "微軟正黑體",
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
    .info-wrapper {
      padding-top: 0;
      background: #f0ebe6;
    }
    .info-content {
      position: relative;
      padding: 40px;
    }
  }
  @media (max-width: 576px) {
    .info-content {
      padding: 20px;
    }
    .title {
      font-size: 18px;
    }
  }
`

interface Props {
  post: {
    date: string
    title: string
    description: string
    tags: Array<string>
    headerImage: string
  }
  url: string
  index: number
}

const PostGrid: React.FC<Props> = ({ post, url, index }) => {
  const isReversed = index % 3 !== 1 ? "" : "reversed"
  return (
    <Wrapper className={`${isReversed}`}>
      {post.headerImage && (
        <Link to={url} className="cover-link">
          <SquareImage image={post.headerImage} />
        </Link>
      )}
      <Info className="info">
        <div className="info-wrapper">
          <div className="info-content">
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
          </div>
        </div>
      </Info>
    </Wrapper>
  )
}

export default PostGrid

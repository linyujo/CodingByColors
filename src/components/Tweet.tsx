import React from "react"
import styled, { css } from "styled-components"

import SquareImage from "./SquareImage"
import Carousel from "./Carousel"
// import Tag from "./Tag/Tag"
import TagButton from "./Tag/TagButton"

const Article = styled.article`
  /* width: 100%;
  max-width: 600px;
  overflow: hidden; */
  /* background: #fffdfa; */
  border: 1px solid #d2d2d2a8;
  border-radius: 4px;
  header {
    padding: 16px;
    border-width: 1px 1px 0 1px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
  .content-wrapper {
    padding: 16px;
    border-width: 0 1px 1px 1px;
    padding-top: 24px;
  }
  .tags {
    margin-bottom: 12px;
  }
  .date {
    padding: 0 16px 16px 16px;
    font-size: 14px;
    color: #ccc;
  }
  .content {
    p {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 20px;
    }
  }
  @media (max-width: 600px) {
    background: none;
    border: none;
    .tags {
      margin-bottom: 4px;
    }
  }
`

interface Props {
  info: {
    title
    date
    tags
    images
    templateKey
  }
  content: string
  setFilter: Function
}

const Tweet: React.FC<Props> = ({ info, content, setFilter }) => {
  const { images, title, date, tags } = info

  return (
    <Article>
      <header>{title}</header>

      {images.length > 1 ? (
        <Carousel images={images} />
      ) : (
        <SquareImage image={images} />
      )}

      <div className="content-wrapper">
        <div className="tags">
          {tags.map(name => (
            <TagButton name={name} handleClick={setFilter} key={name} />
          ))}
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: content }}
          className="content"
        />
      </div>
      <div className="date">{date}</div>
    </Article>
  )
}

export default Tweet

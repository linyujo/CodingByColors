import React from "react"
import styled, { css } from "styled-components"

import SquareImage from "./SquareImage"
import Carousel from "./Carousel"
import Tag from "./Tag/Tag"

const Article = styled.article`
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  background: #fffdfa;
  border: 1px solid #d2d2d2a8;
  header {
    padding: 16px;
    border-radius: 4px;
    border-width: 1px 1px 0 1px;
    line-height: 24px;
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
    font-size: 14px;
    color: #ccc;
  }
  @media (max-width: 600px) {
    background: none;
    border: none;
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
}

const Tweet: React.FC<Props> = ({ info, content }) => {
  const { images, title, date, tags } = info
  return (
    <Article>
      <header>
        {title}
        <div className="date">{date}</div>
      </header>

      {images.length > 1 ? (
        <Carousel images={images} />
      ) : (
        <SquareImage image={images} />
      )}

      <div className="content-wrapper">
        <div className="tags">
          {tags.map(name => (
            <Tag name={name} key={name} />
          ))}
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: content }}
          className="content"
        />
      </div>
    </Article>
  )
}

export default Tweet

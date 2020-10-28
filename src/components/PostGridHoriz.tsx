import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Tag from "./Tag/Tag"
import { image, postGridInfo } from "../styles/common-css"

const PostGridW = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  &.reverse {
    flex-direction: row-reverse;
  }
  .info {
    flex: 1;
    /* padding: 24px; */
    background: #fefefe82;
    .info-inner {
      ${image.inner}
      .info-content {
        ${image.itself}
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px;
      }
    }
    .date {
      ${postGridInfo.date}
      color: #bbb4b5;
    }
    .title {
      ${postGridInfo.title}
    }
    .description {
      ${postGridInfo.description}
    }
  }
  .cover {
    ${image.wrapper}
    width: 50%;
    .inner {
      ${image.inner}
      display: block;
    }
    .image {
      ${image.itself}
    }
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    background: none;
    &.reverse {
      flex-direction: column-reverse;
    }
    .cover {
      width: 100%;
    }
    .info {
      background: none;
      .info-inner {
        padding-top: 0;
        height: auto;
        .info-content {
          position: relative;
          padding: 40px;
          text-align: center;
        }
      }
    }
  }
  @media (max-width: 576px) {
    .info {
      .info-inner {
        .info-content {
          padding: 20px;
        }
      }
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

const PostGridHoriz: React.FC<Props> = ({ post, url, index }) => {
  const { headerImage, date, title, description, tags } = post
  const isReverse = index % 2 === 1 ? "reverse" : ""
  return (
    <PostGridW className={isReverse}>
      <div className="info">
        <div className="info-inner">
          <div className="info-content">
            <div className="date">{date}</div>
            <Link to={url}>
              <h3 className="title">{title}</h3>
            </Link>
            <p className="description">{description}</p>
            <div className="tags">
              {tags.map(name => (
                <Tag
                  name={name}
                  link={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}
                  key={name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cover">
        <Link to={url} className="inner">
          <div
            className="image"
            style={{ backgroundImage: ` url(${headerImage})` }}
          />
        </Link>
      </div>
    </PostGridW>
  )
}

export default PostGridHoriz

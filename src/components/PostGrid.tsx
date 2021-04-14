import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import SquareImage from "./SquareImage"
import Tag from "./Tag/Tag"
import { image, postGridInfo } from "../styles/common-css"
import useWindowWidth from "../hooks/useWindowWidth"

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

const puzzlePieceTop = css`
  content: "";
  background: #f6f2f1;
  width: 2em;
  height: 2em;
  position: absolute;
  top: -1.5em;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4em;
`

const puzzlePieceBottom = css`
  content: "";
  background: #f6f2f1;
  width: 2em;
  height: 2em;
  position: absolute;
  bottom: -1.5em;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4em;
`

const Wrapper = styled.div`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
  display: flex;
  flex-direction: column;
  .info {
    &:before {
      ${puzzlePieceTop};
    }
  }
  &.reversed {
    flex-direction: column-reverse;
    .info {
      &:before {
        ${puzzlePieceTop};
        content: none;
      }
      &:after {
        ${puzzlePieceBottom};
      }
    }
  }
  .cover-link {
    width: 100%;
    display: block;
    &:after {
      ${image.grayLayer}
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
      .info {
        &:after {
          content: none;
        }
      }
    }
    .info {
      &:before {
        content: none;
      }
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
    ${postGridInfo.date}
    color: #bbb4b5;
  }
  .title {
    ${postGridInfo.title}
  }
  .description {
    ${postGridInfo.description}
  }
  @media (max-width: 768px) {
    .info-wrapper {
      padding-top: 0;
    }
    .info-content {
      position: relative;
      padding: 40px;
      text-align: center;
    }
  }
  @media (max-width: 576px) {
    .info-content {
      padding: 20px;
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
	const clientWidth = useWindowWidth();
  const isReversed = (): string => {
		let classN = "";
		if (clientWidth > 1200) {
			classN = index % 3 !== 1 ? "" : "reversed"
		} else {
			classN = index % 2 !== 1 ? "" : "reversed"
		}
		return classN;
	}
	
  return (
    <Wrapper className={`${isReversed()}`}>
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
                <Tag
                  name={name}
                  link={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}
                  key={name}
                />
              ))}
            </div>
          </div>
        </div>
      </Info>
    </Wrapper>
  )
}

export default PostGrid

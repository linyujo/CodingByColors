import React from "react"
import styled from "styled-components"

import FoldedCorner from "./FoldedCorner"

const Anchor = styled.a`
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #fdf9ee;
  background: #e0cdcf;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 8px;
  transition: all 0.2s;
  &:hover {
    /* color: #b8aa8d; */
    color: #afb0b2;
  }
  @media (max-width: 576px) {
    letter-spacing: 0;
  }
`

interface Props {
  name: string
}

const Tag: React.FC<Props> = ({ name }) => (
  <Anchor href={`/tag/${name}`}>#{name}</Anchor>
)

const GridAnchor = styled.a`
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  cursor: pointer;
  &:hover {
    .image-wrapper {
      .image {
        transform: scale(1.02);
      }
    }
  }
  &.position_0 {
    background: #e0cdcf;
  }
  &.position_1 {
    background: #d3cdd5;
  }
  &.position_2 {
    background: #eaddde;
    flex-direction: row-reverse;
    .info {
      .count {
        position: absolute;
        top: 10%;
        left: auto;
        right: 10%;
        transform: translate(-10%, -10%);
      }
    }
  }
  &.position_3 {
    background: #e2cdd7;
    flex-direction: row-reverse;
    .info {
      .count {
        position: absolute;
        top: 10%;
        left: auto;
        right: 10%;
        transform: translate(-10%, -10%);
      }
    }
  }
  .info {
    width: 50%;
    .name {
      letter-spacing: 1px;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .count {
      font-size: 56px;
      font-family: "Kameron", serif;
      font-weight: 700;
      position: absolute;
      top: 10%;
      left: 10%;
      transform: translate(-10%, -10%);
    }
  }
  .image-wrapper {
    width: 50%;
    overflow: hidden;
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
  }
  .inner {
    width: 100%;
    padding-top: 100%;
  }
  @media (max-width: 992px) {
    .info {
      .count {
        font-size: 32px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 850px) {
    .info {
      .name {
        font-size: 16px;
      }
    }
  }
`

interface TagImageGridProps {
  name: string
  image: string
  count: number
  index: number
}
const TagImageGrid: React.FC<TagImageGridProps> = ({
  index,
  name,
  count,
  image,
}) => {
  const position = `position_${index % 4}`
  const foldedCorderPosition =
    position === "position_0" || position === "position_1"
      ? "top-left"
      : "top-right"
  return (
    <GridAnchor className={position}>
      <FoldedCorner
        position={foldedCorderPosition}
        bgColor="#f6f2f1"
        foldColor="#e6dbd9"
      />
      <div className="info">
        <div className="inner">
          <div className="name">{name}</div>
          <div className="count">{count}</div>
        </div>
      </div>
      <div className="image-wrapper">
        <div className="inner">
          <div
            className="image"
            style={{ backgroundImage: ` url(${image})` }}
          ></div>
        </div>
      </div>
    </GridAnchor>
  )
}
export { Tag, TagImageGrid }

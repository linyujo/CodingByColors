import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

const puzzlePieceTop = css`
  content: "";
  background: inherit;
  width: 2em;
  height: 2em;
  position: absolute;
  top: -1.5em;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4em;
  z-index: 1;
`

const puzzlePieceBottom = css`
  content: "";
  background: inherit;
  width: 2em;
  height: 2em;
  position: absolute;
  bottom: -1.5em;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4em;
  z-index: 1;
`

const cornerFold = css`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-style: solid;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  width: 0;
  border-width: 0px;
  border-color: #f6f2f1 rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.3)
    #f6f2f1;
  border-radius: 0 0 5px 0;
  transition: border-width 0.2s;
  z-index: 1;
`

const GridAnchor = styled.div`
  a {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .info::after {
      ${puzzlePieceBottom};
    }
    &::before {
      ${cornerFold};
    }
    &:hover {
      transition-delay: 0.1s;
      &:before {
        border-width: 12px;
      }
      .image-wrapper {
        .image {
          transform: scale(1.02);
        }
      }
    }
    &.reverse {
      flex-direction: column-reverse;
      &::before {
        ${cornerFold};
        top: auto;
        left: auto;
        right: 0;
        bottom: 0;
        border-color: rgba(255, 255, 255, 0.3) #f6f2f1 #f6f2f1
          rgba(255, 255, 255, 0.3);
        border-radius: 0 0 5px 0;
      }
      &:hover {
        &:before {
          border-width: 12px;
        }
      }
      .info::after {
        content: none;
      }
      .info::before {
        ${puzzlePieceTop};
      }
    }
    &.background_0 {
      /* background: rgba(224, 205, 207, 1); */
      background: url("/images/vintage_concrete.png");
      background-repeat: repeat;
    }
    &.background_1 {
      /* background: rgba(211, 205, 213, 1); */
      background: url("/images/ep_naturalwhite.png");
      background-repeat: repeat;
    }
    &.background_2 {
      /* background: rgba(234, 221, 222, 1); */
      background: url("/images/ricepaper_v3.png");
      background-repeat: repeat;
    }
    &.background_3 {
      /* background: rgba(226, 205, 215, 1); */
      background: url("/images/paper_1.png");
      background-repeat: repeat;
    }
  }
  .info {
    background: inherit;
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

interface Props {
  name: string
  image: string
  count: number
  index: number
}

const TagsPuzzle: React.FC<Props> = ({ index, name, count, image }) => {
  const isReverse = index % 3 !== 1 ? "" : "reverse"
  const backgroundIndex = `background_${index % 4}`
  return (
    <GridAnchor>
      <Link
        to={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}
        className={`${isReverse} ${backgroundIndex}`}
      >
        <div className="info">
          <div className="inner">
            <div className="name">{`#${name}`}</div>
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
      </Link>
    </GridAnchor>
  )
}
export default TagsPuzzle

import React from "react"
import styled from "styled-components"

import { urlBackground } from "../../config.json"

const PuzzleTitleW = styled.div`
  width: 100%;
  z-index: 10;
  .title-height {
    width: 100%;
    padding-top: 100%;
  }
  span {
    background: ${props => props.background};
  }
  .abolute-positioning {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .puzzle-piece {
    width: 100%;
    height: 100%;
    background: ${props => props.background};
    border-radius: 25px 25px 25px 0;
  }
  .left {
    width: 2em;
    height: 2em;
    position: absolute;
    top: 50%;
    left: -1.5em;
    transform: translateY(-50%);
    border-radius: 4em;
  }
  .bottom {
    width: 2em;
    height: 2em;
    position: absolute;
    bottom: -1.5em;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4em;
  }
  .top {
    width: 2em;
    height: 2em;
    position: absolute;
    top: -1.5em;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4em;
  }
  .right {
    width: 1.8em;
    height: 1.8em;
    position: absolute;
    top: 50%;
    right: -0.4em;
    transform: translateY(-50%);
    border-radius: 4em;
    background: #f6f2f1;
  }
  .line {
    width: 110%;
    height: 4px;
    background: #a29988;
    &.line-1 {
      position: absolute;
      bottom: 8%;
    }
    &.line-2 {
      position: absolute;
      transform: rotate(-90deg);
      transform-origin: 0 100%;
      bottom: 0;
      left: 10%;
    }
  }
  .square {
    background: #f0ebe6;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 70%;
    left: 60%;
    transform: translate(-60%, -70%);
    h1 {
      font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
        "Microsoft JhengHei", sans-serif;
      /* font-size: 88px; */
      color: #a27e7e;
    }
  }
  @media (max-width: 992px) {
    .square {
      /* h1 {
        font-size: 72px;
      } */
    }
  }
`

interface PuzzleTitleP {
  background: string
  title: string
  subTitle?: string
}

const PuzzleTitle: React.FC<PuzzleTitleP> = ({
  background,
  title,
  subTitle,
}) => {
  return (
    <PuzzleTitleW background={background}>
      <div className="title-height">
        <div className="abolute-positioning">
          <div className="puzzle-piece">
            <span className="top"></span>
            <span className="left"></span>
            <span className="right"></span>
            <span className="bottom"></span>
          </div>
          <div className="square">
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
          </div>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
        </div>
      </div>
    </PuzzleTitleW>
  )
}

const WallpaperTItleW = styled.div`
  width: 100%;
  overflow: hidden;
  .bg-wrapper {
    width: inherit;
    padding-top: 600px;
    overflow: hidden;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 50%;
    &:after {
      content: "";
      background: #8e8e8e70;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .title-content_block {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .title-content {
      padding: 32px 0;
      /* background: #f6f2f1; */
      color: white;
    }
    h1 {
      font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
        "Microsoft JhengHei", sans-serif;
      font-size: 80px;
    }
  }
  @media (max-width: 1024px) {
    .bg-wrapper {
      padding-top: 500px;
    }
  }
  @media (max-width: 992px) {
    .title-content_block {
      h1 {
        font-size: 72px;
      }
    }
  }
  @media (max-width: 576px) {
    .title-content_block {
      h1 {
        font-size: 56px;
      }
    }
  }
`

const WallpaperTItle: React.FC<Props> = ({ title, subTitle, pathname }) => (
  <WallpaperTItleW>
    <div className="bg-wrapper">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${
            urlBackground[pathname] || urlBackground.default
          })`,
        }}
      ></div>
    </div>
    <div className="title-content_block">
      <div className="title-content">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  </WallpaperTItleW>
)

interface Props {
  title: string
  subTitle?: string
  pathname: string
}

const PageTitle: React.FC<Props> = ({ title, subTitle, pathname }) => {
  return <WallpaperTItle title={title} pathname={pathname} />
}

export default PageTitle

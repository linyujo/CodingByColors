import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import SquareImage from "./SquareImage"
import Icon from "./Icon"

const CarouselW = styled.div`
  width: 100%;
  .image-ul {
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  }
  .c-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
    transition-timing-function: linear;
    transition: all 0.4s;
  }
  .c-btn {
    width: 48px;
    height: 64px;
    font-size: 8px;
    opacity: 1;
    transition: all 0.2s;
    &.hide {
      opacity: 0;
      visibility: hidden;
    }
    span {
      width: 24px;
      height: 24px;
      background: hsla(0, 0%, 100%, 0.2);
      border-radius: 50%;
      color: hsla(0, 0%, 0%, 0.5);
    }
    &.prev {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &.next {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .anchor-row {
    position: absolute;
    bottom: -20px;
    width: 100%;
    text-align: center;
    .anchor {
      display: inline-block;
      background: #939391;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0;
      margin-right: 4px;
      &.active {
        background: #965454;
      }
    }
  }
`

interface Props {
  images: string[]
}

const Carousel: React.FC<Props> = ({ images }) => {
  const firstImg = images[0]
  const lastIndex = images.length - 1
  const lastImg = images[lastIndex]

  const [middle, setMiddle] = useState(0)

  const handleClickNext = () => {
    setMiddle(middle + 1)
  }
  const handleClickPrev = () => {
    setMiddle(middle - 1)
  }
  const slide = [middle - 1, middle, middle + 1]

  const isPrevHide = images[middle] === firstImg ? "hide" : ""
  const isNextHide = images[middle] === lastImg ? "hide" : ""

  return (
    <CarouselW>
      <ul className="image-ul">
        {images.map((url, index) => {
          return (
            <li
              key={url}
              className="c-item"
              style={{
                transform: `translateX(${(index - middle) * 100}%)`,
              }}
            >
              <SquareImage image={url || ""} />
            </li>
          )
        })}
      </ul>
      <button onClick={handleClickPrev} className={`c-btn prev ${isPrevHide}`}>
        <Icon icon={faChevronLeft} />
      </button>
      <button onClick={handleClickNext} className={`c-btn next ${isNextHide}`}>
        <Icon icon={faChevronRight} />
      </button>
      <div className="anchor-row">
        <ul>
          {images.map((item, index) => (
            <li
              className={`anchor ${index === middle ? "active" : ""}`}
              key={item}
            ></li>
          ))}
        </ul>
      </div>
    </CarouselW>
  )
}

export default Carousel

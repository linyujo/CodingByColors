import React from "react"
import styled from "styled-components"
import Icon, { css } from "./Icon"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

const Left = styled.span`
  .fa-layers {
    width: 10px;
  }
  &.active {
    .fa-layers {
      animation-name: bounceAlpha;
      animation-duration: 1.4s;
      animation-delay: 0.2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  @keyframes bounceAlpha {
    0% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    25% {
      opacity: 0;
      transform: translateX(-10px) scale(0.9);
    }
    26% {
      opacity: 0;
      transform: translateX(16px) scale(0.9);
    }
    55% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
`

interface ArrowLeftProps {
  isHover?: Boolean
}
const ArrowLeft: React.FC<ArrowLeftProps> = ({ isHover }) => {
  const isActive = isHover ? "active" : ""
  return (
    <Left className={isActive}>
      <Icon icon={faChevronLeft} />
    </Left>
  )
}

export { ArrowLeft }

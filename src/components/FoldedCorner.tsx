import React from "react"
import styled from "styled-components"

const Corner = styled.span`
  position: absolute;
  border-style: solid;
  z-index: 10;
  &.top-left {
    top: 0;
    left: 0;
    border-width: 24px 24px 0 0;
    border-color: ${props =>
      `${props.bgColor} ${props.foldColor} ${props.bgColor} ${props.bgColor}`};
  }
  &.top-right {
    top: 0;
    right: 0;
    border-width: 0 24px 24px 0;
    border-color: ${props =>
      `${props.bgColor} ${props.bgColor} ${props.foldColor} ${props.bgColor}`};
  }
  &.bottom-left {
    bottom: 0;
    left: 0;
    border-width: 0 24px 24px 0;
    border-color: $bg-color $fold-color $bg-color $bg-color;
  }
  &.bottom-right {
    bottom: 0;
    right: 0;
    border-width: 24px 24px 0 0;
    border-color: $fold-color $bg-color $bg-color $bg-color;
  }
  @media (max-width: 992px) {
    &.top-left {
      border-width: 12px 12px 0 0;
    }
    &.top-right {
      border-width: 0 12px 12px 0;
    }
    &.bottom-left {
      border-width: 0 12px 12px 0;
    }
    &.bottom-right {
      border-width: 12px 12px 0 0;
    }
  }
`

interface Props {
  position: string
  bgColor: string
  foldColor: string
}

const FoldedCorner: React.FC<Props> = ({ position, bgColor, foldColor }) => {
  return <Corner className={position} bgColor={bgColor} foldColor={foldColor} />
}

export default FoldedCorner

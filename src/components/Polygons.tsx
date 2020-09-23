import React from "react"
import styled, { css } from "styled-components"

const TagStyleSpan = styled.span`
  padding: 6px 16px;
  background: ${props => props.color};
  color: #fefefe;
  &.right {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: -14px;
      width: 0;
      height: 0;
      border-top: 16px solid transparent;
      border-bottom: 14px solid transparent;
      border-left: 14px solid ${props => props.color};
    }
    &:after {
      content: "";
      position: absolute;
      top: 13px;
      right: 0;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: #fff;
    }
  }
`

interface Props {
  arrowDirection: string
  color: string
}

const TagStyle: React.FC<Props> = ({ children, arrowDirection, color }) => (
  <TagStyleSpan className={arrowDirection} color={color}>
    {children}
  </TagStyleSpan>
)

export { TagStyle }

import React, { FC, useState } from "react"
import styled from "styled-components"

// const Hamburger = styled.a`
//   z-index: 100;
//   span {
//     display: block;
//     width: 32px;
//     height: 2px;
//     margin-bottom: 8px;
//     background-color: #007acc;
//     transition: all 0.3s;
//     &:nth-child(3) {
//       margin-bottom: 0;
//     }
//   }
// `

// const Cross = styled.a`
//   display: block;
//   width: 32px;
//   height: 34px;
//   span {
//     width: 32px;
//     height: 2px;
//     background-color: #007acc;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     &:nth-child(1) {
//       transform: translate(-50%, -50%) rotate(45deg);
//     }
//     &:nth-child(2) {
//       transform: translate(-50%, -50%) rotate(-45deg);
//     }
//   }
// `

const Hamburger = styled.a`
  z-index: 1000;
  width: 32px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #484848;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;
    &:nth-child(1) {
      top: 0px;
    }
    &:nth-child(2) {
      top: 10px;
    }
    &:nth-child(3) {
      top: 10px;
    }
    &:nth-child(4) {
      top: 20px;
    }
  }
  &.cross {
    span {
      &:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
      &:nth-child(2) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
      &:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
    }
  }
`

interface Props {
  handleClick: Function
}

const HamburgerButton: FC<Props> = ({ handleClick }) => {
  const [isDefault, toggleButton] = useState(true)
  const handleToggle = () => {
    toggleButton(!isDefault)
    handleClick()
  }

  const toggleClass = isDefault ? "" : "cross"

  return (
    <Hamburger onClick={handleToggle} className={`Hamburger ${toggleClass}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Hamburger>
  )
}

export default HamburgerButton

import React, { FC, useState, useContext } from "react"
import styled from "styled-components"

import FadeInOut from "../FadeInOut"
import { SpaceBetween } from "../flexStyles"
import { LogoLink } from "./LeftGroup"
import RightGroup from "./RightGroup"
import { Nav } from "./MiddleGroup"

import scrollContext from "../../contexts/scrollContext"

const Wrapper = styled.div`
  box-shadow: 0 3px 0px -2px #cece4fb8;
  margin: 0 -2px;
  background: #f6f2f1;
  height: 64px;
  overflow: hidden;
  .container {
    height: 100%;
  }
  @media (max-width: 768px) {
    height: 54px;
  }
`

const headerTransitionStyles = {
  entering: { transform: "translateY(-101%)" },
  entered: { transform: "translateY(0)" }, // Transition to component being visible and having its position reset.
  exiting: { transform: "translateY(0)" }, // Fade element out and slide it back up on exit.
  exited: { transform: "translateY(-101%)" },
}

const headerDefaultStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 500,
  display: "block",
  transform: headerTransitionStyles.entering,
  transition: "all 0.2s ease",
}

interface Props {
  templateKey: string
  post?: {
    title: string
    date: string
    tags: Array<string>
  }
}

const FloatHeader: FC<Props> = () => {
  const [isHidePopupNav, togglePopupNav] = useState(true)
  const { isScrollDown, scrollTop } = useContext(scrollContext)
  const handlePopupMenu = () => {
    togglePopupNav(!isHidePopupNav)
  }

  let showCondition = false
  if (!isHidePopupNav) {
    // 小螢幕有出現popupNav
    showCondition = true
  }
  if (!isScrollDown && scrollTop > 900) {
    // 向上滑 && 滑行距離 > 100
    showCondition = true
  }

  return (
    <FadeInOut
      toggle={showCondition}
      transitionStyles={headerTransitionStyles}
      defaultStyles={headerDefaultStyles}
    >
      <Wrapper>
        <div className="container">
          <SpaceBetween>
            <LogoLink />
            <Nav />
            <RightGroup
              isHidePopupNav={isHidePopupNav}
              togglePopupNav={handlePopupMenu}
            />
          </SpaceBetween>
        </div>
      </Wrapper>
    </FadeInOut>
  )
}

export default FloatHeader

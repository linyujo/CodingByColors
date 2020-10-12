import React, { FC, useState } from "react"
import styled from "styled-components"

import FadeInOut from "../FadeInOut"
import { SpaceBetween } from "../flexStyles"
import { LogoLink } from "./LeftGroup"
import RightGroup from "./RightGroup"
import { Nav } from "./MiddleGroup"

const Wrapper = styled.div`
  box-shadow: 0 3px 0px -2px #cece4fb8;
  margin: 0 -2px;
  background: #f6f2f1;
  height: 64px;
  overflow: hidden;
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
  isScrollDown: Boolean
  scrollPosition: number
  pathname: string
  templateKey: string
  post?: {
    title: string
    date: string
    tags: Array<string>
  }
}

const FloatHeader: FC<Props> = ({ isScrollDown, scrollPosition, pathname }) => {
  const [isHidePopupNav, togglePopupNav] = useState(true)
  const handlePopupMenu = () => {
    togglePopupNav(!isHidePopupNav)
  }

  let showCondition = false
  if (!isHidePopupNav) {
    // 小螢幕有出現popupNav
    showCondition = true
  }
  console.log("isScrollDown", isScrollDown)
  console.log("scrollPosition", scrollPosition)
  if (!isScrollDown && scrollPosition > 900) {
    // 向上滑 && 滑行距離 > 100
    showCondition = true
  }

  return (
    <FadeInOut
      toggle={showCondition}
      transitionStyles={headerTransitionStyles}
      defaultStyles={headerDefaultStyles}
    >
      <div className="container">
        <Wrapper>
          <SpaceBetween>
            <LogoLink />
            <Nav pathname={pathname} />
            <RightGroup
              isHidePopupNav={isHidePopupNav}
              togglePopupNav={handlePopupMenu}
            />
          </SpaceBetween>
        </Wrapper>
      </div>
    </FadeInOut>
  )
}

export default FloatHeader

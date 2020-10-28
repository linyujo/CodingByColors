import React, { FC, useState, memo, useContext } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled, { css } from "styled-components"

import { SpaceBetween } from "../flexStyles"
import BlogPostHeader from "./BlogPostHeader"
import { LogoLink } from "./LeftGroup"
import RightGroup from "./RightGroup"
import { Nav } from "./MiddleGroup"

const Wrapper = styled.header`
  box-shadow: 0 3px 0px -2px #cece4fb8;
  margin: 0 -2px;
  background: #f6f2f1;
  height: 64px;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 54px;
  }
`

const DefaultHeader: FC<{}> = () => {
  const [isHidePopupNav, togglePopupNav] = useState(true)

  const handlePopupMenu = () => {
    togglePopupNav(!isHidePopupNav)
  }

  return (
    <div className="container">
      <Wrapper>
        <SpaceBetween>
          <LogoLink />
          <Nav />
          <RightGroup
            isHidePopupNav={isHidePopupNav}
            togglePopupNav={handlePopupMenu}
          />
        </SpaceBetween>
      </Wrapper>
    </div>
  )
}

interface HeaderProps {
  templateKey: string
  post?: {
    title: string
    subject: string
    date: string
    tags: Array<string>
  }
}

const preventUpdateMemo = (prevProps, nextProps) => {
  if (prevProps.pathname === nextProps.pathname) {
    return true
  }
  return false
}

const Header: FC<HeaderProps> = memo(({ templateKey, post }) => {
  let header
  if (templateKey !== "blog-post") {
    header = <DefaultHeader />
  } else {
    header = <BlogPostHeader post={post} />
  }
  return header
}, preventUpdateMemo)

export default Header

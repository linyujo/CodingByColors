import React, { useState, useContext, memo } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import LayoutContext from "../../contexts/layoutContext"

/**
 * Nav
 */

const NavWrapper = styled.nav`
  position: absolute;
  left: 248px;
  height: 100%;
  a {
    height: 100%;
    padding: 10px;
    margin-right: 16px;
    letter-spacing: 1px;
    line-height: 42px;
    color: #656565;
    transition: all 0.2s;
    &:hover {
      /* transform: scale(1.04); */
      color: #d2b100;
    }
    &.active {
      /* transform: scale(1.04); */
      color: #d2b100;
      background: #fefefe;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const preventUpdateMemo = (prevProps, nextProps) => {
  if (prevProps.pathname === nextProps.pathname) {
    return true
  }
  return false
}

const Nav: React.FC<{}> = memo(() => {
  const { location } = useContext(LayoutContext)
  return (
    <NavWrapper>
      <Link
        to="/tweets"
        onClick={() => {
          ReactGA.event({
            category: "User",
            action: "Click navbar logo",
          })
        }}
        className={location.pathname.includes("/tweets") ? "active" : ""}
      >
        Working Tweets
      </Link>
      <Link
        to="/tags"
        onClick={() => {
          ReactGA.event({
            category: "User",
            action: "Click navbar logo",
          })
        }}
        className={location.pathname.includes("/tags") ? "active" : ""}
      >
        Tags
      </Link>
    </NavWrapper>
  )
}, preventUpdateMemo)

/**
 * MiddleGroup
 */

interface Props {}

const MiddleGroup: React.FC<Props> = () => {
  return <div></div>
}

export { Nav, MiddleGroup as default }

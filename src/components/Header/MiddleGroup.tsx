import React, { useState, useContext, memo } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

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
      transform: scale(1.04);
      color: #484848;
    }
    &.active {
      transform: scale(1.04);
      color: #484848;
      background: #fefefe;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

interface NavProps {
  pathname: string
}

const preventUpdateMemo = (prevProps, nextProps) => {
  if (prevProps.pathname === nextProps.pathname) {
    return true
  }
  return false
}

const Nav: React.FC<NavProps> = memo(
  ({ pathname }) => (
    <NavWrapper>
      <Link
        to="/tweets"
        onClick={() => {
          ReactGA.event({
            category: "User",
            action: "Click navbar logo",
          })
        }}
        className={pathname.includes("/tweets") ? "active" : ""}
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
        className={pathname.includes("/tags") ? "active" : ""}
      >
        Tags
      </Link>
    </NavWrapper>
  ),
  preventUpdateMemo
)

/**
 * MiddleGroup
 */

interface Props {}

const MiddleGroup: React.FC<Props> = () => {
  return <div></div>
}

export { Nav, MiddleGroup as default }

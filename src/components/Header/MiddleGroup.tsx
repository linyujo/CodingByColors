import React, { useState, useContext } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

/**
 * Nav
 */

const NavWrapper = styled.nav`
  position: absolute;
  left: 248px;
  top: 50%;
  transform: translateY(-50%);
  a {
    padding: 10px;
    margin-right: 16px;
    letter-spacing: 1px;
    color: #656565;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.04);
      color: #484848;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

interface NavProps {}

const Nav: React.FC<NavProps> = () => (
  <NavWrapper>
    <Link
      to="/develop_tweet"
      onClick={() => {
        ReactGA.event({
          category: "User",
          action: "Click navbar logo",
        })
      }}
    >
      Develop tweet
    </Link>
    <Link
      to="/tags"
      onClick={() => {
        ReactGA.event({
          category: "User",
          action: "Click navbar logo",
        })
      }}
    >
      Tags
    </Link>
  </NavWrapper>
)

/**
 * MiddleGroup
 */

interface Props {}

const MiddleGroup: React.FC<Props> = () => {
  return <div></div>
}

export { Nav, MiddleGroup as default }

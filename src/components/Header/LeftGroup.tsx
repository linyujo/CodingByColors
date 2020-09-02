import React, { memo } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import { Centre } from "../flexStyles"

const LogoText: React.FC<{}> = () => (
  <Title>
    Coding By
    <span style={{ color: "#f98686e6" }}>C</span>
    <span style={{ color: "#f3b157de" }}>O</span>
    <span style={{ color: "#faead3" }}>L</span>
    <span style={{ color: "#5fbf5fe8" }}>O</span>
    <span style={{ color: "#7272f7e6" }}>R</span>
    <span style={{ color: "#f97af9e6" }}>S</span>
  </Title>
)

const Title = styled.h1`
  font-family: "Architects Daughter", cursive;
  font-size: 20px;
  color: $black;
  span {
    font-family: "Architects Daughter", cursive;
    &:first-child {
      margin-left: 6px;
    }
  }
`

interface LogoLinkProps {}

const preventUpdateMemo = () => true

const LogoLink: React.FC<LogoLinkProps> = memo(
  () => (
    <Centre>
      <Link
        to="/"
        onClick={() => {
          ReactGA.event({
            category: "User",
            action: "Click navbar logo",
          })
        }}
      >
        <LogoText />
      </Link>
    </Centre>
  ),
  preventUpdateMemo
)

export { LogoLink, LogoText }

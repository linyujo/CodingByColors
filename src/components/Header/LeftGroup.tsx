import React from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import { Centre } from "../flexStyles"

const Title = styled.div`
  font-family: "Architects Daughter", cursive;
  font-size: 20px;
  color: $black;
  span {
    font-family: "Architects Daughter", cursive;
  }
`

interface LogoLinkProps {}

const LogoLink: React.FC<LogoLinkProps> = () => (
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
      <Title>
        Coding By
        <span style={{ color: "#f98686e6" }}> C</span>
        <span style={{ color: "#f3b157de" }}>O</span>
        <span style={{ color: "#faead3" }}>L</span>
        <span style={{ color: "#5fbf5fe8" }}>O</span>
        <span style={{ color: "#7272f7e6" }}>R</span>
        <span style={{ color: "#f97af9e6" }}>S</span>
      </Title>
    </Link>
  </Centre>
)

// interface Props {
//   location: Location
// }

// const GroupLeft: React.FC<Props> = ({ location }) => {
//   const { browserWidth } = useContext(LayoutContext)

//   let component

//   if (browserWidth > 768) {
// 		component = <LogoLink />
//   }

//   if (browserWidth <= 768 && location.pathname === "/") {
// 		component = <LogoLink />
//   } else {
//   }

//   return component
// }

export { LogoLink }

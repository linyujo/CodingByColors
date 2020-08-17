import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Head from "./Head"
import Header from "../components/Header"

import { rhythm, scale } from "../utils/typography"

const Main = styled.main`
  padding: 112px 0;
  @media (max-width: 768px) {
    padding: 88px 0;
  }
`

interface Props {
  location: Location
  title: string
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }

  const [isScrollDown, toggleScrollDown] = React.useState(false)

  return (
    // <div
    //   style={{
    //     marginLeft: `auto`,
    //     marginRight: `auto`,
    //     maxWidth: rhythm(24),
    //     padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    //   }}
    // >
    <div className="LLLLL">
      <Head />
      <Header isScrollDown={isScrollDown} />
      <Main>
        <div className="container">{children}</div>
      </Main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

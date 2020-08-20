import React, { useState, FC } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Head from "./Head"
import Header from "../components/Header"
import ScrollWrapper from "./ScrollWrapper"

import { rhythm, scale } from "../utils/typography"

const Root = styled.div`
  background: #f6f2f1;
`

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

const Layout: FC<Props> = ({ location, title, children }) => {
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

  return (
    <Root className="root">
      <Head />
      <ScrollWrapper>
        {({ isScrollDown }) => (
          <>
            <Header isScrollDown={isScrollDown} />
            <Main>
              <div className="container">{children}</div>
            </Main>
          </>
        )}
      </ScrollWrapper>
    </Root>
  )
}

export default Layout

import React, { useState, FC, createContext, useReducer } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Head from "./Head"
import Header from "../components/Header"
import FloatHeader from "./Header/FloatHeader"
import ScrollWrapper from "./ScrollWrapper"

import { rhythm, scale } from "../utils/typography"
import { getBrowserWidth } from "../utils/browserUtils"

import "../styles/_basic.scss"

const Root = styled.div`
  background: #f6f2f1;
`

const Main = styled.main``

const LayoutContext = createContext({
  browserWidth: 0,
})

interface Props {
  location: Location
  templateKey?: string
  post?: {
    title: string
    date: string
    tags: Array<string>
  }
}

const Layout: FC<Props> = ({ location, templateKey, post, children }) => {
  // console.log("location", location)
  const rootPath = `${__PATH_PREFIX__}/`

  let header

  // if (post) {
  //   header = (
  //     <h1
  //       style={{
  //         ...scale(1.5),
  //         marginBottom: rhythm(1.5),
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <h3
  //       style={{
  //         fontFamily: `Montserrat, sans-serif`,
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h3>
  //   )
  // }

  return (
    <Root className="root">
      <Head />
      <LayoutContext.Provider value={{ browserWidth: getBrowserWidth() }}>
        <ScrollWrapper>
          {({ isScrollDown, currentY }) => (
            <>
              <Header templateKey={templateKey} post={post} />
              <FloatHeader
                isScrollDown={isScrollDown}
                scrollPosition={currentY}
                templateKey={templateKey}
                post={post}
              />
              <Main>{children}</Main>
            </>
          )}
        </ScrollWrapper>
      </LayoutContext.Provider>
    </Root>
  )
}

export { Layout as default, LayoutContext }

import React, { FC } from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

import Head from "./Head"
import Header from "../components/Header"
import FloatHeader from "./Header/FloatHeader"
import ScrollWrapper from "./ScrollWrapper"

import LayoutContext from "../contexts/layoutContext"
import useUserState from "../hooks/useUserState"
import useWindowWidth from "../hooks/useWindowWidth"

// import { rhythm, scale } from "../utils/typography"

import "../styles/_basic.scss"

const Root = styled.div`
  background: #f6f2f1;
`

const Main = styled.main``

interface Props {
  location: Location
  templateKey?: string
  post?: {
    title: string
    subject: string
    date: string
    tags: Array<string>
  }
}

const Layout: FC<Props> = ({ location, templateKey, post, children }) => {
  const { isIdle } = useUserState()
  const windowWidth = useWindowWidth()

  // const rootPath = `${__PATH_PREFIX__}/`

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
      <LayoutContext.Provider
        value={{
          browserWidth: windowWidth,
          isUserIdle: isIdle,
          location: location,
        }}
      >
        <ScrollWrapper>
          <Header templateKey={templateKey} post={post} />
          <FloatHeader templateKey={templateKey} post={post} />
          <Main>{children}</Main>
        </ScrollWrapper>
      </LayoutContext.Provider>
    </Root>
  )
}

export { Layout as default, LayoutContext }

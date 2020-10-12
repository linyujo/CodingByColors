import React, {
  useState,
  FC,
  createContext,
  useReducer,
  useEffect,
} from "react"
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
  isUserIdle: false,
})

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
  const [isIdle, setIdle] = useState(false)
  let counter = 0
  let localCounter = 0
  let sharedCounter = 0

  const timeoutPeriod = 1000 * 60 * 1 // 1 minutes

  let lastCall = null

  const checkIfUserIdle = function (): void {
    if (isIdle) {
      // doSomething if it's idle
      counter = 0
      localCounter = 0
      sharedCounter = 0
    }
  }
  const handleIdleTimedOut = function (): void {
    sharedCounter = counter
    if (localCounter === sharedCounter) {
      setIdle(true)
    }
  }
  const resetTimer = function (): void {
    /**
     * save counter in current window object,and after timeout period you can match it.
     * If by chance multiple tabs were opened,the counter will be different,
     * popup won't be shown in current window at incorrect time.
     */
    localCounter = counter
    if (lastCall) {
      clearTimeout(lastCall)
    }
    lastCall = setTimeout(handleIdleTimedOut, timeoutPeriod)
  }
  const resetUserIdle = function (): void {
    // call this function whenever we detect user activity
    setIdle(false)
    resetTimer()
  }
  const increaseTimer = function (): void {
    checkIfUserIdle()
    counter++
    resetTimer()
  }

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
  useEffect(() => {
    increaseTimer()
    window.addEventListener("scroll", resetUserIdle)
    window.addEventListener("mousemove", resetUserIdle)
    window.addEventListener("focus", increaseTimer)
    return () => {
      window.removeEventListener("scroll", resetUserIdle)
      window.removeEventListener("mousemove", resetUserIdle)
      window.removeEventListener("focus", increaseTimer)
    }
  }, [])

  return (
    <Root className="root">
      <Head />
      <LayoutContext.Provider
        value={{ browserWidth: getBrowserWidth(), isUserIdle: isIdle }}
      >
        <ScrollWrapper>
          {({ isScrollDown, currentY }) => (
            <>
              <Header
                pathname={location.pathname}
                templateKey={templateKey}
                post={post}
              />
              <FloatHeader
                isScrollDown={isScrollDown}
                scrollPosition={currentY}
                pathname={location.pathname}
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

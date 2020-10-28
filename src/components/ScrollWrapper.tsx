import React, { useState, useEffect, FC, useRef, ReactNode } from "react"
import ScrollContext from "../contexts/scrollContext"

// interface Props {
//   children: (props: InjectedCounterProps) => ReactNode
// }

const ScrollWrapper: FC<{}> = ({ children }) => {
  const [isScrollDown, toggleScrollDown] = useState(false)
  const [lastScrollY, saveLastScrollY] = useState(0) // keep the last Y position
  let mounted = false

  useEffect(() => {
    const thresholdPixels = 50
    let isLock = false
    mounted = true

    saveLastScrollY(window.pageYOffset)

    const updateScroll = () => {
      if (!mounted) return

      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
        // We haven't exceeded the threshold
        isLock = false
        return
      }

      toggleScrollDown(scrollY > lastScrollY ? true : false)
      saveLastScrollY(scrollY > 0 ? scrollY : 0)
      isLock = false
    }

    const onScroll = () => {
      if (!isLock) {
        window.requestAnimationFrame(updateScroll)
        isLock = true
      }
    }

    window.addEventListener("scroll", onScroll)
    // returned function will be called on component unmount
    return () => {
      mounted = false
      window.removeEventListener("scroll", onScroll)
    }
  }, [lastScrollY])

  return (
    <ScrollContext.Provider
      value={{ isScrollDown: isScrollDown, scrollTop: lastScrollY }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollWrapper

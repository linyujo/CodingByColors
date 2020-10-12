import React, { useState, useEffect, FC, useRef, ReactNode } from "react"

interface Props {
  children: (props: InjectedCounterProps) => ReactNode
}

const ScrollWrapper: FC<Props> = ({ children }) => {
  const [isScrollDown, toggleScrollDown] = useState(true)
  let isLocked = false
  let lastY = 0
  let currentY = 0
  // const [isLocked, toggleLocked] = useState(false)
  // const [lastY, saveLastY] = useState(0) // keep the lastest Y position
  // const [currentY, saveCurrentY] = useState(0) // keep the current Y position

  let lastCall = null

  const handleScrollDown = bool => {
    toggleScrollDown(bool)
  }

  const wrapperElement = useRef(null) // get the DOM element

  const scrolling = () => {
    if (isLocked) {
      return
    }
    isLocked = true
    // toggleLocked(true)

    const wrapper: HTMLElement | null = wrapperElement.current

    if (lastCall) {
      // clear the last setTimeout before starting a new one
      clearTimeout(lastCall)
    }
    lastCall = setTimeout(() => {
      // get the current Y position

      // let currentY = Math.abs(wrapper.offsetTop - window.scrollY)
      // saveCurrentY(Math.abs(wrapper.offsetTop - window.scrollY))
      currentY = Math.abs(wrapper.offsetTop - window.scrollY)

      if (handleScrollDown) {
        // "The current Y position > 0" && "The latest Y position < the current Y position
        if (currentY > 0 && lastY <= currentY) {
          // "Scrolling DOWN"
          toggleScrollDown(true)
        } else {
          // "Scrolling UP"
          toggleScrollDown(false)
        }
        // if (currentY > 0 && lastY <= currentY) {
        //   toggleScrollDown(true)
        // }
        // if (currentY > 0 && lastY - currentY > 50) {
        //   toggleScrollDown(false)
        // }
        lastY = currentY
        // saveLastY(currentY)
      }
    }, 150)

    isLocked = false
    // toggleLocked(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrolling)
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("scroll", scrolling)
    }
  }, [])

  return (
    <div className="scroll-wrapper" ref={wrapperElement}>
      {children({ isScrollDown, currentY })}
    </div>
  )
}

export default ScrollWrapper

import React, { useState, useEffect, FC, useRef, ReactNode } from "react"

interface Props {
  children: (props: InjectedCounterProps) => ReactNode
}

const ScrollWrapper: FC<Props> = ({ children }) => {
  const [isScrollDown, toggleScrollDown] = useState(false)
  const [isLocked, toggleLocked] = useState(false)
  const [lastY, saveLastY] = useState(0) // keep the lastest Y position

  let lastCall = null

  const handleScrollDown = bool => {
    toggleScrollDown(bool)
  }

  const wrapperElement = useRef(null) // get the DOM element

  const scrolling = () => {
    if (isLocked) {
      return
    }
    toggleLocked(true)

    const wrapper: HTMLElement | null = wrapperElement.current

    if (lastCall) {
      // clear the last setTimeout before starting a new one
      clearTimeout(lastCall)
    }
    lastCall = setTimeout(() => {
      // get the current Y position
      let currentY = Math.abs(wrapper.offsetTop - window.scrollY)

      if (handleScrollDown) {
        // "The current Y position > 0" && "The latest Y position < the current Y position
        if (currentY > 0 && lastY <= currentY) {
          // "Scrolling DOWN"
          toggleScrollDown(true)
        } else {
          // "Scrolling UP"
          toggleScrollDown(false)
        }
        saveLastY(currentY)
      }
    }, 200)

    toggleLocked(false)
  }
  useEffect(() => {
    window.addEventListener("scroll", scrolling)
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("scroll", scrolling)
    }
  })

  return (
    <div className="scroll-wrapper" ref={wrapperElement}>
      {children({ isScrollDown })}
    </div>
  )
}

export default ScrollWrapper

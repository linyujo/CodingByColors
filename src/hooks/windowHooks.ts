import React, { useEffect, useState } from "react"

// Call this method when any window onloads,this helps to check if multiple
const useUserState = function (): Boolean {
  const [isIdle, setIdle] = useState(false)
  const [counter, setCounter] = useState(0)
  let localCounter = 0
  let sharedCounter = 0
  const timeoutPeriod = 1000 * 60 * 5 // 5 minutes
  const checkIfUserIdle = function (): void {
    if (isIdle) {
      // doSomething if it's idle
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
    const timeout = setTimeout(handleIdleTimedOut, timeoutPeriod)
    clearTimeout(timeout)
  }
  const resetUserIdle = function (): void {
    // call this function whenever we detect user activity
    resetTimer()
  }
  const increaseTimer = function (): void {
    checkIfUserIdle()
    setCounter(counter + 1)
    resetTimer()
  }
  useEffect(() => {
    window.onload = increaseTimer
    window.onscroll = resetUserIdle
    window.onmousemove = resetUserIdle
    window.ondblclick = resetUserIdle
    window.oncontextmenu = resetUserIdle
    window.onclick = resetUserIdle
    window.onkeypress = resetUserIdle
    window.onpageshow = resetUserIdle
    window.onresize = resetUserIdle
    window.onfocus = increaseTimer
  }, [])
  return isIdle
}

const useWindowWidth = function (): number[] {
  const [size, setSize] = useState([0])

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth])
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

export { useWindowWidth }

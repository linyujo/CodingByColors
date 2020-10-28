import React, { useEffect, useState } from "react"

type userState = {
  isIdle: boolean
}

const useUserState = function (): userState {
  const [isIdle, setIdle] = useState(false)
  let counter = 0
  let localCounter = 0
  let sharedCounter = 0
  let mounted = false

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
    if (!mounted) return
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
    if (!mounted) return
    // call this function whenever we detect user activity
    setIdle(false)
    resetTimer()
  }

  const increaseTimer = function (): void {
    checkIfUserIdle()
    counter++
    resetTimer()
  }

  useEffect(() => {
    mounted = true
    increaseTimer()
    window.addEventListener("scroll", resetUserIdle)
    window.addEventListener("mousemove", resetUserIdle)
    window.addEventListener("focus", increaseTimer)
    return () => {
      mounted = false
      window.removeEventListener("scroll", resetUserIdle)
      window.removeEventListener("mousemove", resetUserIdle)
      window.removeEventListener("focus", increaseTimer)
    }
  }, [])

  return {
    isIdle: isIdle,
  }
}

export default useUserState

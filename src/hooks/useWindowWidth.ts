import React, { useEffect, useState } from "react"

const useWindowWidth = function (): number {
  const [size, setSize] = useState(0)
  let mounted = false

  useEffect(() => {
    mounted = true
    function updateSize() {
      if (mounted) {
        setSize(window.innerWidth)
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => {
      mounted = false
      window.removeEventListener("resize", updateSize)
    }
  }, [])
  return size
}

export default useWindowWidth

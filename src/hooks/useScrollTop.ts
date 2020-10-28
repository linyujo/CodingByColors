import React, { useEffect, useState } from "react"

const useScrollTop = function (): number[] {
  const [distance, setDistance] = useState([0])

  useEffect(() => {
    function updateDistance() {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              // document.body.parentNode ||
              document.body
            ).scrollTop
      setDistance([scrollTop])
    }

    updateDistance()
    window.addEventListener("scroll", updateDistance)
    return () => window.removeEventListener("scroll", updateDistance)
  }, [])

  return distance
}

export default useScrollTop

import React, { createContext } from "react"

const scrollContext = createContext({
  isScrollDown: false,
  scrollTop: 0,
})

export default scrollContext

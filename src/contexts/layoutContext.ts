import React, { createContext } from "react"

// type layoutCtx = {
// 	browserWidth: number
// 	isUserIdle: boolean
// 	location: Location
// };

const layoutContext = createContext({
  browserWidth: 0,
  isUserIdle: false,
  location: {
    pathname: "/",
  },
})

export default layoutContext

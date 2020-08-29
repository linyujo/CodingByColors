import React, { useState } from "react"
import { Link } from "gatsby"

interface Props {
  href: string
  children: (props: InjectedCounterProps) => ReactNode
}

const EventLink: React.FC<Props> = ({ href, children }) => {
  const [isHover, toggleHover] = useState(false)
  function handleHover() {
    toggleHover(!isHover)
  }
  return (
    <Link to={href} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      {children({ isHover })}
    </Link>
  )
}

export default EventLink

import React from "react"
import { Transition } from "react-transition-group"

interface Props {
  toggle: boolean
  transitionStyles: {
    entering: {
      transform: string
    }
    entered: {
      transform: string
    }
    exiting: {
      transform: string
    }
  }
  defaultStyles: {
    position?: string
    top?: number
    left?: number
    right?: number
    bottom?: number
    zIndex?: number
    display?: string
    transform?: {
      transform: string
    }
    transition: string
  }
}

const FadeInOut: React.FC<Props> = ({
  toggle,
  transitionStyles,
  defaultStyles,
  children,
}) => {
  return (
    <Transition in={toggle} timeout={{ enter: 0, exit: 0 }}>
      {status => (
        <div
          style={{
            ...defaultStyles,
            ...transitionStyles[status],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

export default FadeInOut

import React from "react"
import { Transition } from "react-transition-group"

const defaultStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 500,
  display: "block",
  transform: "translateY(-100%)",
  transition: "all 0.3s ease",
}

const transitionStyles = {
  entering: { transform: "translateY(-100%)" },
  entered: { transform: "translateY(0)" }, // Transition to component being visible and having its position reset.
  exiting: { transform: "translateY(-100%)" }, // Fade element out and slide it back up on exit.
}

interface Props {
  inCondition: Boolean
}

const FadeInOut: React.FC<Props> = ({ inCondition, children }) => (
  <Transition in={inCondition} timeout={{ enter: 0, exit: 0 }}>
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

export default FadeInOut

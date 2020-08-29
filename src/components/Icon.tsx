import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"
import styled from "styled-components"

interface Props {
  icon?: any
}

const Icon: React.FC<Props> = ({ icon }) => (
  <span className="fa-layers fa-fw fa-2x">
    <FontAwesomeIcon icon={icon} />
  </span>
)
export default Icon

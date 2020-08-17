import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"
import styled from "styled-components"

const Anchor = styled.a`
  color: black;
`

interface Props {
  href: string
  icon: any
}

const Icon: React.FC<Props> = ({ href, icon }) => (
  <Anchor
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </Anchor>
)

export default Icon

import React from "react"
import styled from "styled-components"

const Anchor = styled.a`
  line-height: 20px;
  letter-spacing: 2px;
  color: #87a4c7;
  @media (max-width: 576px) {
    letter-spacing: 0;
  }
`

interface Props {
  name: string
}

const Tag: React.FC<Props> = ({ name }) => (
  <Anchor href={`/tag/${name}`}>
    #{name}
    &nbsp;
  </Anchor>
)

export default Tag

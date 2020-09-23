import React from "react"
import styled from "styled-components"

const Anchor = styled.a`
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #fdf9ee;
  background: #e0cdcf;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 8px;
  transition: all 0.2s;
  &:hover {
    color: #afb0b2;
  }
  @media (max-width: 576px) {
    letter-spacing: 0;
  }
`

interface Props {
  name: string
}

const Tag: React.FC<Props> = ({ name }) => (
  <Anchor href={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}>
    #{name}
  </Anchor>
)

export default Tag

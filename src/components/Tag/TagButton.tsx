import React from "react"
import styled from "styled-components"

const Button = styled.button`
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #ffffff;
  background: #c1cbd7;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 8px;
  transition: all 0.2s;
  &:hover {
    color: #484848;
  }
  @media (max-width: 576px) {
    letter-spacing: 0;
  }
`

interface Props {
  name: string
  handleClick: Function
}

const TagButton: React.FC<Props> = ({ name, handleClick }) => {
  const clickHandler = (): void => {
    handleClick(name)
  }
  return <Button onClick={clickHandler}>#{name}</Button>
}

export default TagButton

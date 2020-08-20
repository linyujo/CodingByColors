import React, { FC } from "react"
import styled from "styled-components"

const Image = styled.img`
  margin-bottom: 0;
  border-radius: 50%;
  transition: transform 0.5s;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  &:hover {
    transform: scale(1.2);
  }
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

interface Props {
  src: string
  alt: string
  height: number
  width: number
}

const Avatar: FC<Props> = ({ src, alt, height, width }) => (
  <Image src={src} alt={alt} height={height} width={width} />
)

export default Avatar

import React from "react"
import styled from "styled-components"

import { image } from "../styles/common-css"

const Wrapper = styled.div`
  ${image.wrapper}
  .inner {
    ${image.inner}
  }
  .image {
    ${image.itself}
  }
`

interface Props {
  image: string
}

const SquareImage: React.FC<Props> = ({ image }) => (
  <Wrapper>
    <div className="inner">
      <div
        className="image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </div>
  </Wrapper>
)

export default SquareImage

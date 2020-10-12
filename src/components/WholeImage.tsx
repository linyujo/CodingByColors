import React from "react"
import styled from "styled-components"

import { image } from "../styles/common-css"

const WholeImageW = styled.div`
  ${image.wrapper}
  .inner {
    ${image.inner}
  }
  .image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }
`

const WholeImage: React.FC<Props> = ({ image }) => (
  <WholeImageW>
    <div className="inner">
      <img src={image} alt="" className="image" />
    </div>
  </WholeImageW>
)

export default WholeImage

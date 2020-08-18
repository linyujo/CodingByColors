import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  .inner {
    width: 100%;
    padding-top: 100%;
  }
  .image {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.3s;
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

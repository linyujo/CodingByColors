import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 64px;
  .image-wrapper {
    max-width: 840px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    .image {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: cover;
    }
  }
  .image-ratio {
    width: 100%;
    padding-top: 75%;
  }
  * {
    font-family: "Architects Daughter", cursive;
  }
  .heading-wrapper {
    position: absolute;
    top: 50%;
    right: 6%;
    transform: translate(-6%, -50%);
    text-align: center;
    h1 {
      font-size: 80px;
    }
  }
  @media (max-width: 768px) {
    .image-ratio {
      padding-top: 100%;
    }
    .image-wrapper {
      .image {
        background-position: center center;
      }
    }
  }
  @media (max-width: 576px) {
    .heading-wrapper {
      h1 {
        font-size: 60px;
      }
    }
  }
  @media (max-width: 400px) {
    .heading-wrapper {
      h1 {
        font-size: 48px;
      }
    }
  }
`

interface Props {}

const HomeImage: React.FC<Props> = () => (
  <Wrapper>
    <div className="container">
      <div className="image-wrapper">
        <div className="image-ratio">
          <div
            className="image"
            style={{ backgroundImage: ` url(/images/crayon.jpg)` }}
          ></div>
          <div className="heading-wrapper">
            <h1 className="firstLine">Coding By</h1>
            <h1 className="secondLine">
              <span style={{ color: "#f98686e6" }}>C</span>
              <span style={{ color: "#f3b157de" }}>O</span>
              <span style={{ color: "#faead3" }}>L</span>
              <span style={{ color: "#5fbf5fe8" }}>O</span>
              <span style={{ color: "#7272f7e6" }}>R</span>
              <span style={{ color: "#f97af9e6" }}>S</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
)

export default HomeImage

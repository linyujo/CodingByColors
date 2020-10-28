import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import WaterWave from "react-water-wave"

import Clock from "./Clock"

import useWindowWidth from "../hooks/useWindowWidth"
import LayoutContext from "../contexts/layoutContext"
import { image } from "../styles/common-css"
import config from "../../config.json"

const background_day: string = config.urlBackground.home.day
const background_night: string = config.urlBackground.home.night

const getDayNightShift = function (): string {
  let dayOrNight: string

  const currentdate = new Date()
  const hours = currentdate.getHours()
  if (hours >= 6 && hours <= 16) {
    // day
    dayOrNight = "DAY"
  } else {
    dayOrNight = "NIGHT"
  }

  return dayOrNight
}

const LargeWindow: React.FC<{}> = () => {
  const { isUserIdle } = useContext(LayoutContext)
  const dayOrNight = getDayNightShift()
  return (
    <WaterWave
      style={{
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
      }}
      imageUrl={dayOrNight === "DAY" ? background_day : background_night}
      perturbance={0.01}
    >
      {({ drop, pause, play }) => {
        isUserIdle ? pause() : play()
        return (
          <Clock
            width={360}
            height={360}
            drop={drop}
            className="clock"
            isPause={isUserIdle}
          />
        )
      }}
    </WaterWave>
  )
}

const SmallWindow: React.FC<{
  clientWidth: number
}> = ({ clientWidth }) => {
  const { isUserIdle } = useContext(LayoutContext)
  const clockW = clientWidth > 576 ? 360 : 240
  return (
    <Clock
      width={clockW}
      height={clockW}
      className="clock"
      isPause={isUserIdle}
    />
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #2a2a2a;
  /* background-image: linear-gradient(135deg, #fefefe 0%, #00a4e4 74%); */
  margin-bottom: 64px;
  .waterHolder {
    width: 100%;
    height: 100%;
  }
  .clock {
    top: 50%;
    right: 20%;
    transform: translate(14%, -50%);
  }
  * {
    font-family: "Architects Daughter", cursive;
  }
  .heading-wrapper {
    /* width: 100%; */
    position: absolute;
    /* top: 50%; */
    /* right: 6%; */
    top: 50%;
    left: 25%;
    transform: translate(-25%, -50%);
    text-align: center;
    h1 {
      font-size: 80px;
      line-height: 120px;
      color: #fefefed9;
    }
  }
  @media (max-width: 992px) {
    .clock {
      right: 10%;
      transform: translate(10%, -50%);
    }
    .heading-wrapper {
      left: 20%;
      transform: translate(-20%, -50%);
      h1 {
        font-size: 72px;
        line-height: 88px;
      }
    }
  }
  @media (max-width: 800px) {
    height: 70vh;
    background-image: ${props =>
      props.dayOrNight === "DAY"
        ? `url(${background_day})`
        : `url(${background_night})`};
    background-size: cover;
    &::after {
      ${image.grayLayer}
    }
    .clock {
      top: 50px;
      right: 50%;
      transform: translateX(50%);
    }
    .heading-wrapper {
      top: 95%;
      left: 50%;
      transform: translate(-50%, -95%);
      width: 100%;
      h1 {
        font-size: 72px;
        line-height: 88px;
      }
    }
  }
  @media (max-width: 576px) {
    height: 60vh;
    .clock {
      top: 24px;
    }
    .heading-wrapper {
      h1 {
        font-size: 48px;
        line-height: 56px;
        margin: 0;
      }
    }
  }
  @media (max-width: 400px) {
  }
`

interface Props {}

const HomeImage: React.FC<Props> = () => {
  const clientWidth = useWindowWidth()
  const dayOrNight = getDayNightShift()

  return (
    <Wrapper dayOrNight={dayOrNight}>
      {clientWidth > 800 ? (
        <LargeWindow />
      ) : (
        <SmallWindow clientWidth={clientWidth} />
      )}
      <div className="heading-wrapper">
        <h1 className="firstLine">
          Coding By
          <br />
          <span style={{ color: "#f98686e6" }}>C</span>
          <span style={{ color: "#f3b157de" }}>O</span>
          <span style={{ color: "#faead3" }}>L</span>
          <span style={{ color: "#5fbf5fe8" }}>O</span>
          <span style={{ color: "#7272f7e6" }}>R</span>
          <span style={{ color: "#f97af9e6" }}>S</span>
        </h1>
      </div>
    </Wrapper>
  )
}

export default HomeImage

import React, { useRef, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { getRandomInt } from "../utils/numberUtils"
import { getBrowserWidth } from "../utils/browserUtils"
import { vrt_horiz_center } from "../styles/common-css"

import { images } from "../../config.json"

const pointerTransition = css`
  transition: 0.3s ease background;
`

const backgroundColors = {
  dark: css`
    background: #091921;
  `,
  white: css`
    background: #fefefe;
  `,
}

const rotateAreaStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const ClockW = styled.div`
  background: url(${images.clock});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0px -15px 15px rgba(255, 255, 255, 0.05),
    inset 0px -15px 15px rgba(255, 255, 255, 0.05),
    0px 15px 15px rgba(0, 0, 0, 0.05), inset 0px 15px 15px rgba(0, 0, 0, 0.05);
  position: absolute;
  ${vrt_horiz_center}
  .clock-hours,
  .clock-minutes,
  .clock-seconds {
    position: absolute;
  }
  .clock-hours {
    width: 33.33333%;
    height: 33.33333%;
    .clock-hours_rotate {
      ${rotateAreaStyle}
    }
    .clock-hours_pointer {
      width: 6px;
      height: 50%;
      border-radius: 6px 6px 0px 0px;
      ${backgroundColors.dark}
      ${pointerTransition}
    }
  }
  .clock-minutes {
    width: 55.55555%;
    height: 55.55555%;
    .clock-minutes_rotate {
      ${rotateAreaStyle}
    }
    .clock-minutes_pointer {
      width: 4px;
      height: 50%;
      border-radius: 4px 4px 0px 0px;
      ${backgroundColors.dark}
      ${pointerTransition}
    }
  }
  .clock-seconds {
    width: 66.66666%;
    height: 66.66666%;
    .clock-seconds_rotate {
      ${rotateAreaStyle}
      transition: 0.99s linear;
    }
    .clock-seconds_pointer {
      width: 2px;
      height: 70%;
      border-radius: 2px 2px 0px 0px;
      ${backgroundColors.white}
      ${pointerTransition}
    }
  }
`

function animateWaterDrop(
  Xleft: number,
  YTop: number,
  width: number,
  drop: Function
) {
  const clientWidth = getBrowserWidth()
  const headerHeight = clientWidth > 768 ? 64 : 54
  const center = {
    x: Xleft + Math.round(width / 2),
    y: YTop + Math.round(width / 2) - headerHeight,
  }

  const radius = 30
  const strength = 0.04 + Math.random() * 0.04
  drop({
    x: center.x,
    y: center.y,
    radius: radius,
    strength: strength,
  })
}

interface Props {
  width: number
  height: number
  className: string
  drop?: Function
  isPause: boolean
}

const Clock: React.FC<Props> = ({
  width,
  height,
  className,
  drop,
  isPause,
}) => {
  const [hoursRotate, setHoursRotate] = useState("")
  const [minutesRotate, setMinutesRotate] = useState("")
  const [secondsRotate, setSecondsRotate] = useState("")

  const clockElement = useRef(null)

  useEffect(() => {
    if (isPause) {
      return
    }

    const day = new Date()
    let hours = day.getHours()
    let minutes = day.getMinutes()
    let seconds = day.getSeconds()
    const dropInterval = 3000

    function updateTime() {
      const deg = 6

      seconds++
      if (seconds % 60 === 0) {
        minutes++
      }
      if (seconds % 60 === 0 && minutes % 60 === 0) {
        hours++
      }

      setHoursRotate(`rotateZ(${hours * 30 + (minutes * deg) / 12}deg)`)
      setMinutesRotate(`rotateZ(${minutes * deg}deg)`)
      setSecondsRotate(`rotateZ(${seconds * deg}deg)`)
    }

    updateTime()
    let updateCall = null
    updateCall = setInterval(updateTime, 1000)

    let updateDrop = null

    if (clockElement.current && window.innerWidth > 800) {
      const Xleft = Math.round(
        clockElement.current.getBoundingClientRect().left
      )
      const YTop = Math.round(clockElement.current.getBoundingClientRect().top)
      updateDrop = setInterval(
        animateWaterDrop,
        dropInterval,
        Xleft,
        YTop,
        width,
        drop
      )
    }

    // returned function will be called on component unmount
    return () => {
      clearInterval(updateCall)
      clearInterval(updateDrop)
    }
  }, [window.innerWidth, isPause])
  return (
    <ClockW
      style={{
        width: width,
        height: height,
      }}
      ref={clockElement}
      className={className}
    >
      <div className="clock-hours">
        <div
          className="clock-hours_rotate"
          style={{
            transform: hoursRotate,
          }}
        >
          <span className="clock-hours_pointer"></span>
        </div>
      </div>
      <div className="clock-minutes">
        <div
          className="clock-minutes_rotate"
          style={{
            transform: minutesRotate,
          }}
        >
          <span className="clock-minutes_pointer"></span>
        </div>
      </div>
      <div className="clock-seconds">
        <div
          className="clock-seconds_rotate"
          style={{
            transform: secondsRotate,
          }}
        >
          <span className="clock-seconds_pointer"></span>
        </div>
      </div>
    </ClockW>
  )
}

export default Clock

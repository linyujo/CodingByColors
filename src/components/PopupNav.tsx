import React, { FC, useContext } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import FadeInOut from "./FadeInOut"
import Icon from "./Icon"
import Avatar from "./Avatar"

import LayoutContext from "../contexts/layoutContext"

const Wrapper = styled.nav`
  width: 50vw;
  height: 100vh;
  background: #f6f2f1;
  ul {
    padding-top: 68px;
    text-align: left;
  }
  li {
    padding: 20px 10px;
    transition: all 0.2s;
    a {
      display: block;
      margin-left: 44px;
    }
    &.active {
      background: #fefefe;
      a {
        color: #d2b100;
      }
    }
  }
  @media (max-width: 500px) {
    width: 60vw;
    li {
      a {
        margin-left: 20px;
      }
    }
  }
`

const popupNavTransitionStyles = {
  entering: { transform: "translateX(0%)" },
  entered: { transform: "translateX(100%)" },
  exiting: { transform: "translateX(100%)" },
  exited: { transform: "translateX(0%)" },
}

const popupNavDefaultStyles = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 500,
  display: "block",
  transform: popupNavTransitionStyles.entered,
  transition: "all 0.3s ease",
}

interface Props {
  isHide: boolean
}

const PopupNav: FC<Props> = ({ isHide }) => {
  const { location } = useContext(LayoutContext)
  return (
    <FadeInOut
      toggle={isHide}
      defaultStyles={popupNavDefaultStyles}
      transitionStyles={popupNavTransitionStyles}
    >
      <Wrapper>
        <ul>
          <li className={location.pathname.includes("/tweets") ? "active" : ""}>
            <Link
              to="/tweets"
              onClick={() => {
                ReactGA.event({
                  category: "User",
                  action: "Click navbar logo",
                })
              }}
            >
              Working Tweets
            </Link>
          </li>
          <li className={location.pathname.includes("/tags") ? "active" : ""}>
            <Link
              to="/tags"
              onClick={() => {
                ReactGA.event({
                  category: "User",
                  action: "Click navbar logo",
                })
              }}
            >
              Tags
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/linyujo"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon icon={["fab", "github"]} />
            </a>
          </li>
          <li>
            <Link to="/">
              <Avatar
                src="/images/avatar.jpg"
                alt="Raine"
                width={40}
                height={40}
              />
            </Link>
          </li>
        </ul>
      </Wrapper>
    </FadeInOut>
  )
}

export default PopupNav

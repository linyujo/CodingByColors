import React, { FC } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import FadeInOut from "./FadeInOut"
import Icon from "./Icon"
import Avatar from "./Avatar"
import {
  initialState as popupNavInitialState,
  reducer as popupNavReducer,
} from "../reducers/popupNav"

const Wrapper = styled.nav`
  width: 50vw;
  height: 100vh;
  background: #f6f2f1;
  ul {
    padding-top: 68px;
    padding-left: 64px;
    text-align: left;
    li {
      padding: 20px 10px;
      a {
        display: block;
      }
    }
  }
  @media (max-width: 500px) {
    width: 60vw;
    ul {
      padding-left: 24px;
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
  isHide: Boolean
}

const PopupNav: FC<Props> = ({ isHide }) => {
  return (
    <FadeInOut
      toggle={isHide}
      defaultStyles={popupNavDefaultStyles}
      transitionStyles={popupNavTransitionStyles}
    >
      <Wrapper>
        <ul>
          <li>
            <Link
              to="/develop_tweet"
              onClick={() => {
                ReactGA.event({
                  category: "User",
                  action: "Click navbar logo",
                })
              }}
            >
              Develop tweet
            </Link>
          </li>
          <li>
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

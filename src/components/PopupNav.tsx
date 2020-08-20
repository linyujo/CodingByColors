import React, { FC } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import Icon from "./Icon"
import Avatar from "./Avatar"

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

interface Props {}

const PopupNav: FC<Props> = () => (
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
        <Icon href={`https://github.com/linyujo`} icon={["fab", "github"]} />
      </li>
      <li>
        <Link to="/">
          <Avatar src="/images/avatar.jpg" alt="Raine" width={40} height={40} />
        </Link>
      </li>
    </ul>
  </Wrapper>
)

export default PopupNav

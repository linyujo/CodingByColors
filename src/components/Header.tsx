import React from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import FadeInOut from "./FadeInOut"
import Icon from "./Icon"
import { SpaceBetween } from "./flexStyles"

const Wrapper = styled.div`
  box-shadow: 0 3px 0px -2px #cece4fb8;
  margin: 0 -2px;
`

const Title = styled.div`
  font-family: "Architects Daughter", cursive;
  font-size: 20px;
  color: $black;
  span {
    font-family: "Architects Daughter", cursive;
  }
`

const IconGroup = styled.div`
  a {
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.2);
    }
  }
`

const Avatar = styled.img`
  margin: 1rem;
  margin-right: 0;
  border-radius: 50%;
  height: 40px;
  width: 40px;
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

const GroupLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupRight = styled.div``

const GroupRight_Large = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`

const GroupRight_Small = styled.div`
  display: block;
  padding: 12px;
  padding-top: 20px;
  padding-right: 2px;
  cursor: pointer;
  span {
    display: block;
    width: 32px;
    height: 2px;
    background-color: #007acc;
    margin-bottom: 8px;
    transition: all 0.3s;
  }
  &:hover {
    span:nth-child(1) {
      transform: translateX(20%);
    }
    span:nth-child(3) {
      transform: translateX(-20%);
    }
  }
  @media (min-width: 769px) {
    display: none;
  }
`

interface Props {
  // location: Location
  isScrollDown: Boolean
}

function isEqual() {
  console.log("isEqual")
  return true
}

const Header: React.FC<Props> = ({ isScrollDown }) => (
  <FadeInOut inCondition={!isScrollDown}>
    <div className="container">
      <Wrapper>
        <SpaceBetween>
          <GroupLeft>
            <Link
              to="/"
              onClick={() => {
                ReactGA.event({
                  category: "User",
                  action: "Click navbar logo",
                })
              }}
            >
              <Title>
                Coding By
                <span style={{ color: "#f98686e6" }}> C</span>
                <span style={{ color: "#f3b157de" }}>O</span>
                <span style={{ color: "#faead3" }}>L</span>
                <span style={{ color: "#5fbf5fe8" }}>O</span>
                <span style={{ color: "#7272f7e6" }}>R</span>
                <span style={{ color: "#f97af9e6" }}>S</span>
              </Title>
            </Link>
          </GroupLeft>
          <GroupRight>
            <GroupRight_Large>
              <IconGroup>
                <Icon
                  href={`https://github.com/linyujo`}
                  icon={["fab", "github"]}
                />
              </IconGroup>
              <div>
                <Link to="/">
                  <Avatar src="/images/avatar.jpg" alt="Raine" />
                </Link>
              </div>
            </GroupRight_Large>
            <GroupRight_Small>
              <span></span>
              <span></span>
              <span></span>
            </GroupRight_Small>
          </GroupRight>
        </SpaceBetween>
      </Wrapper>
    </div>
  </FadeInOut>
)

export default Header

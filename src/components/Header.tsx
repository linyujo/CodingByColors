import React, { FC, useState } from "react"
import { Link } from "gatsby"
import ReactGA from "react-ga"
import styled from "styled-components"

import FadeInOut from "./FadeInOut"
import Icon from "./Icon"
import { SpaceBetween } from "./flexStyles"
import Avatar from "./Avatar"
import HamburgerButton from "./HamburgerButton"
import PopupNav from "./PopupNav"

const Wrapper = styled.div`
  box-shadow: 0 3px 0px -2px #cece4fb8;
  margin: 0 -2px;
  background: #f6f2f1;
  height: 60px;
  @media (max-width: 768px) {
    height: 50px;
  }
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

const AvatarWrapper = styled.div`
  a {
    margin-left: 10px;
  }
`

const GroupLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupRight_Large = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`

const GroupRight_Small = styled.div`
  cursor: pointer;
  @media (min-width: 769px) {
    display: none;
  }
`

const Nav = styled.nav`
  position: absolute;
  left: 248px;
  top: 50%;
  transform: translateY(-50%);
  a {
    padding: 10px;
    margin-right: 16px;
    letter-spacing: 1px;
    color: #656565;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.04);
      color: #484848;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const headerTransitionStyles = {
  entering: { transform: "translateY(-100%)" },
  entered: { transform: "translateY(0)" }, // Transition to component being visible and having its position reset.
  exiting: { transform: "translateY(-100%)" }, // Fade element out and slide it back up on exit.
}

const headerDefaultStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 500,
  display: "block",
  transform: headerTransitionStyles.entered,
  transition: "all 0.3s ease",
}

const popupNavTransitionStyles = {
  entering: { transform: "translateX(0%)" },
  entered: { transform: "translateX(100%)" },
  exiting: { transform: "translateX(0%)" },
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
  // location: Location
  isScrollDown: Boolean
}

const Header: FC<Props> = ({ isScrollDown }) => {
  const [isHidePopupNav, togglePopupNav] = useState(true)
  const handlePopupMenu = () => {
    togglePopupNav(!isHidePopupNav)
  }
  const locked = true
  return (
    <FadeInOut
      toggle={isHidePopupNav ? !isScrollDown : locked}
      transitionStyles={headerTransitionStyles}
      defaultStyles={headerDefaultStyles}
    >
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
            <Nav>
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
            </Nav>
            <GroupRight>
              <GroupRight_Large>
                <IconGroup>
                  <Icon
                    href={`https://github.com/linyujo`}
                    icon={["fab", "github"]}
                  />
                </IconGroup>
                <AvatarWrapper>
                  <Link to="/">
                    <Avatar
                      src="/images/avatar.jpg"
                      alt="Raine"
                      width={40}
                      height={40}
                    />
                  </Link>
                </AvatarWrapper>
              </GroupRight_Large>
              <GroupRight_Small>
                <HamburgerButton handleClick={handlePopupMenu} />
                <FadeInOut
                  toggle={isHidePopupNav}
                  defaultStyles={popupNavDefaultStyles}
                  transitionStyles={popupNavTransitionStyles}
                >
                  <PopupNav />
                </FadeInOut>
              </GroupRight_Small>
            </GroupRight>
          </SpaceBetween>
        </Wrapper>
      </div>
    </FadeInOut>
  )
}

export default Header

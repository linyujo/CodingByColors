import React, { useContext, memo } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { Centre } from "../flexStyles"
import Icon from "../Icon"
import Avatar from "../Avatar"
import HamburgerButton from "../HamburgerButton"
import PopupNav from "../PopupNav"

import { LayoutContext } from "../layout"

/**
 * Icons
 */

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

interface IconProps {}

const Icons: React.FC<IconProps> = () => (
  <Centre>
    <IconGroup>
      <a
        href="https://github.com/linyujo"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Icon icon={["fab", "github"]} />
      </a>
    </IconGroup>
    <AvatarWrapper>
      <Link to="/">
        <Avatar src="/images/avatar.jpg" alt="Raine" width={40} height={40} />
      </Link>
    </AvatarWrapper>
  </Centre>
)

/**
 * Hamburger
 */

const HamburgerWrapper = styled.div`
  cursor: pointer;
`

interface HamburgerProps {
  togglePopupNav: Function
  isHidePopupNav: Boolean
}

const Hamburger: React.FC<HamburgerProps> = ({
  togglePopupNav,
  isHidePopupNav,
}) => (
  <HamburgerWrapper>
    <HamburgerButton handleClick={togglePopupNav} />
    <PopupNav isHide={isHidePopupNav} />
  </HamburgerWrapper>
)

/**
 * RightGroup
 */

interface Props {
  togglePopupNav: Function
  isHidePopupNav: Boolean
}

const preventUpdateMemo = (prevProps, nextProps) => {
  if (prevProps.isHidePopupNav === nextProps.isHidePopupNav) {
    return true
  }
  return false
}

const RightGroup: React.FC<Props> = memo(
  ({ togglePopupNav, isHidePopupNav }) => {
    const { browserWidth } = useContext(LayoutContext)
    let component
    if (browserWidth > 768) {
      component = <Icons />
    } else {
      component = (
        <Hamburger
          isHidePopupNav={isHidePopupNav}
          togglePopupNav={togglePopupNav}
        />
      )
    }
    return <Centre>{component}</Centre>
  },
  preventUpdateMemo
)

export { Icons, Hamburger, RightGroup as default }

import React from "react"
import styled, { css } from "styled-components"

import { triangleShape } from "../styles/common-css"

const BreadcrumbW = styled.nav`
  width: 100%;
  /* border: 1px solid #b5b5b53b; */
  box-shadow: 1px 8px 20px -6px rgba(143, 143, 143, 0.2);
  margin-bottom: 20px;
  .breadcrumbs {
    width: 100%;
    display: flex;
    font-size: 14px;
    color: #717171;
    font-weight: bold;
    .block-one {
      width: 25%;
      /* background: #e6ded0; */
      cursor: pointer;
      background: none;
      transition: background 0.3s;
      span {
        width: 100%;
        padding-left: 40px;
        line-height: 44px;
      }
      &:after {
        content: "";
        ${triangleShape.left}
        right: 0;
        border-top: 23px solid #e5decf;
        border-bottom: 21px solid #e5decf;
        border-right: 22px solid #f6f2f1;
        opacity: 0;
      }
      &.active {
        background: linear-gradient(
          90deg,
          rgba(144, 116, 97, 1) 0%,
          rgba(190, 166, 145, 1) 24%,
          rgba(230, 222, 208, 1) 82%
        );
        &:after {
          opacity: 1;
        }
      }
    }
    .block-two {
      flex: 1;
      background: none;
      transition: background 0.3s;
      span {
        width: 100%;
        padding-left: 22px;
        line-height: 44px;
      }
      &:before {
        content: "";
        ${triangleShape.left}
        left: -22px;
        border-top: 23px solid #f6f2f1;
        border-bottom: 21px solid #f6f2f1;
        border-right: 22px solid #907461;
        opacity: 0;
      }
      &.active {
        background: linear-gradient(
          90deg,
          rgba(144, 116, 97, 1) 0%,
          rgba(190, 166, 145, 1) 24%,
          rgba(230, 222, 208, 1) 82%
        );
        &:before {
          opacity: 1;
        }
      }
    }
  }
  @media (max-width: 576px) {
    .breadcrumbs {
      .block-one {
        width: 30%;
        span {
          padding-left: 16px;
        }
      }
      /* .block-two {
        span {
          padding-left: 20px;
        }
      } */
    }
  }
`

interface Props {
  filterStr: string
  setFilter: Function
}

const Breadcrumb: React.FC<Props> = ({ filterStr, setFilter }) => {
  const handleClick = (): void => {
    setFilter("")
  }
  return (
    <BreadcrumbW>
      <ul className="breadcrumbs">
        <li
          className={`block block-one ${filterStr.length ? "" : "active"}`}
          onClick={handleClick}
        >
          <span>Timeline</span>
        </li>
        <li className={`block block-two ${filterStr.length ? "active" : ""}`}>
          <span>{filterStr}</span>
        </li>
      </ul>
    </BreadcrumbW>
  )
}

export default Breadcrumb

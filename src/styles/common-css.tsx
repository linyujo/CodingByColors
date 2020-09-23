import { css } from "styled-components"

const pageWrapper = css`
  min-height: calc(100vh - 64px);
  @media (max-width: 768px) {
    min-height: calc(100vh - 54px);
  }
`

const mainWrapper = css`
  margin-top: 64px;
  display: flex;
`

const customRow = css`
  margin-left: 0;
  margin-right: 0;
`

const customCol = css`
  padding-right: 0;
  padding-left: 0;
`

const image = {
  wrapper: css`
    width: 100%;
    overflow: hidden;
  `,
  inner: css`
    width: 100%;
    padding-top: 100%;
  `,
  itself: css`
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.3s;
  `,
  grayLayer: css`
    content: "";
    background: rgba(101, 101, 101, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
  `,
}

const postGridInfo = {
  date: css`
    color: #b7b1a5;
    margin-bottom: 16px;
  `,
  title: css`
    margin-top: 0;
    margin-bottom: 0;
    color: #484848;
    font-size: 22px;
    font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
      "Microsoft JhengHei", sans-serif;
    @media (max-width: 576px) {
      font-size: 18px;
    }
  `,
  description: css`
    margin-top: 16px;
    margin-bottom: 16px;
    line-height: 1.4;
    font-size: 16px;
    color: #656565;
  `,
}

export { pageWrapper, mainWrapper, customRow, customCol, image, postGridInfo }

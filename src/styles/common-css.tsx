import { css } from "styled-components"

const vrt_horiz_center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    height: 0;
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

const markdownHtml = css`
  margin: 0 auto;
  padding: 36px 56px;
  width: 100%;
  max-width: 1140px;
  color: #484848;
  overflow: hidden;
  @media (max-width: 1140px) {
    padding: 0 30px 30px 30px;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
      "Microsoft JhengHei", sans-serif;
  }
  h2 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 1.25;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eee;
  }
  h3 {
    font-size: 1.25em;
    margin: 24px 0 16px 0;
    font-weight: 700;
    line-height: 1.25;
  }
  h4 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.025em;
  }
  p {
    margin-bottom: 28px;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 0.025em;
    display: block;
    unicode-bidi: embed;
    white-space: pre-wrap;
    code {
      background-color: rgba(0, 0, 0, 0.04);
      font-family: inherit;
      color: inherit;
    }
  }
  ol {
    padding-left: 2em;
    /* @media (max-width: 576px) {
      padding-left: 0;
    } */
  }
  blockquote {
    font-size: 16px;
    font-style: normal;
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd;
    margin: 0 0 16px 0;
    code[class*="language-"] {
      color: inherit;
    }
  }
  .gatsby-highlight {
    margin-bottom: 28px;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 3px;
    background-color: #f0ebe5;
    pre {
      background-color: #f0ebe5;
      padding-left: 24px;
      * {
        font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono",
          monospace;
      }
    }
    code[class*="language-"] {
      font-size: 16px;
      tab-size: 2;
      .token.punctuation {
        padding: 0.1em;
      }
      .token.operator {
        background: none;
      }
      span {
        display: initial;
      }
    }
  }
`

export {
  vrt_horiz_center,
  pageWrapper,
  mainWrapper,
  customRow,
  customCol,
  image,
  postGridInfo,
  markdownHtml,
}

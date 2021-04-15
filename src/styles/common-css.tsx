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
    margin-top: 1.5em;
    margin-bottom: 1em;
    font-weight: 700;
    font-size: 1.8em;
    line-height: 1.25;
    padding-bottom: 0.2em;
    border-bottom: 2px solid #b1aaa0;
  }
  h3 {
    font-size: 1.5em;
		margin-top: 1.5em;
		margin-bottom: 1em;
    font-weight: 700;
    line-height: 1.25;
  }
  h4 {
		font-size: 1.2em;
    margin-top: 1.5em;
    margin-bottom: 16px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.025em;
		text-transform: none;
  }
	h5 {
		font-size: 1.125em;
    margin-top: 1.2em;
    margin-bottom: 16px;
		line-height: 1.25;
    letter-spacing: 0.025em;
		text-transform: none;
	}
  p {
    margin-bottom: 1em;
    font-size: 1.125em;
    line-height: 1.5;
    letter-spacing: 0.025em;
    display: block;
    unicode-bidi: embed;
    white-space: pre-wrap;
  }
  ol {
    padding-left: 2em;
		letter-spacing: 0.025em;
    /* @media (max-width: 576px) {
      padding-left: 0;
    } */
  }
	ul {
		margin-bottom: 1em;
		padding-left: 2em;
		letter-spacing: 0.025em;
		list-style-type: disc;
		li {
			list-style: disc;
			line-height: 1.5;
		}
	}
	a {
		color: #007acc;
	}
	.alert{
		padding: 16px;
		margin-bottom: 20px;
		border: 1px solid transparent;
		border-radius: 4px;
		&.alert-info{
			color: #31708f;
			background: #d8edf7;
			border-color: #bce8f1;
		}
	}
	.jump-link{
		color: #007acc;
		margin-left: 0.5rem
	}
  blockquote {
    font-size: 16px;
    font-style: normal;
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd;
    margin: 0 0 16px 0;
		p {
			background: #f1f1f1;
		}
  }
	code[class*="language-"] {
		margin: 6px;
		background-color: rgba(0, 0, 0, 0.05);
		font-family: inherit;
		color: inherit;
	}
  .gatsby-highlight {
		/*
		 * Add back the container background-color, border-radius, padding, margin
		 * and overflow that we removed from <pre>.
		 */
		background-color: #2d2d2d;
		border-radius: 0.3em;
		margin: 0 0 1.5em 0;
		padding: 1em;
		overflow: auto;
    pre[class*="language-"] {
      padding-left: 24px;
      * {
        font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono",
          monospace;
				font-size: 16px;
				text-shadow: none;
				tab-size: 2;
      }
			.token{
				&.punctuation {
					padding: 0.1em;
				}
				&.operator {
					background: none;
				}
			}
			span[class*="token"] {
				display: initial; /* 蓋過 _basic.css 的inline-block */
			}
			/*
			 * Remove the default PrismJS theme background-color, border-radius, margin,
			 * padding and overflow.
			 * 1. Make the element just wide enough to fit its content.
			 * 2. Always fill the visible space in .gatsby-highlight.
			 */
			background-color: transparent;
			margin: 0;
			padding: 0;
			overflow: initial;
			float: left; /* 1 */
			min-width: 100%; /* 2 */
    }
  }
	.gatsby-highlight-code-line {
  	background-color: #275982;
		display: block;
		margin-right: -1em;
		margin-left: -1em;
		padding-right: 1em;
		padding-left: 0.75em;
		border-left: 0.25em solid #ffa7c4;
	}
`

const triangleShape = {
  left: css`
    position: absolute;
    top: 0;
    right: -14px;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 14px solid transparent;
    border-right: 14px solid white;
  `,
}

export {
  vrt_horiz_center,
  pageWrapper,
  mainWrapper,
  customRow,
  customCol,
  image,
  postGridInfo,
  markdownHtml,
  triangleShape,
}

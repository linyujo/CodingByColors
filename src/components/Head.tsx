import React from "react"
import { Helmet } from "react-helmet"

const title = "Coding By Colors"
const description = "每日挖坑填不滿 瓢蟲已堆萬重山"
const keyword = "raine blog coding"
const theme_color = "#9ca8b8"
const favicon = "https://imgur.com/TcBvUgY.png"

const Head: React.FC = () => (
  <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="keyword" content={keyword} />
    <meta name="theme-color" content={theme_color} />
    <meta name="msapplication-navbutton-color" content={theme_color} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content={theme_color} />
    <link rel="shortcut icon" href={favicon} />
    <link
      rel="alternate"
      type="application/atom+xml"
      title={title}
      href="/atom.xml"
    />
  </Helmet>
)

export default Head

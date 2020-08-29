import React, { useEffect, useState } from "react"
import styled from "styled-components"

import EventLink from "../EventLink"
import { ArrowLeft } from "../AnimateIcons"

import Tag from "../Tag"

const PostHeader = styled.header`
  width: 100vw;
  height: 640px;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;

  h1,
  h2 {
    font-family: "Helvetica", "Arial", "Noto Sans TC", "黑體-繁", "微軟正黑體",
      "Microsoft JhengHei", sans-serif;
  }
  h2 {
    margin: 1rem 0;
  }
  .content-wrapper {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .header-content {
    z-index: 1;
    background-color: #f6f2f1;
    padding: 32px 56px;
    max-width: 100%;
    width: 1140px;
    @media (max-width: 1140px) {
      padding: 16px 30px;
    }
    h1 {
      font-size: 40px;
    }
    .date {
      margin-bottom: 16px;
      color: #bbb4b5;
    }
    .back-link {
      a {
        text-shadow: 4px 4px 2px rgba(150, 150, 150, 0.54);
      }
      .fa-layers {
        font-size: 16px;
      }
    }
  }

  .header-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 50%;
    /* &:after {
      content: "";
      background: #fdffff24;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    } */
  }
  @media (max-width: 1024px) {
    height: 500px;
    .header-content {
      h1 {
        font-size: 32px;
      }
    }
  }
`

const backgroundList = [
  "https://i.imgur.com/PLIpgXO.jpg",
  "https://i.imgur.com/AUUtslc.jpg",
  "https://i.imgur.com/1m1gDtx.jpg",
]

interface Props {
  post: {
    title: string
    subject: string
    date: string
    tags: Array<string>
  }
}

const BlogPostHeader: React.FC<Props> = React.memo(
  ({ post }) => {
    const [randomBackgroundURL, setRandomBackgroundURL] = useState("")
    useEffect(() => {
      setRandomBackgroundURL(
        backgroundList[Math.floor(Math.random() * backgroundList.length)]
      )
    })
    return (
      <PostHeader>
        <div className="content-wrapper">
          <div
            className="header-bg"
            style={{ backgroundImage: `url(${randomBackgroundURL})` }}
          ></div>
          <div className="header-content">
            <h1>
              {post.subject}: {post.title}
            </h1>
            <p className="date">{post.date}</p>
            <div className="tags">
              {post.tags.map(name => (
                <Tag name={name} key={name} />
              ))}
            </div>
          </div>
        </div>
      </PostHeader>
    )
  },
  () => true
)

export default BlogPostHeader

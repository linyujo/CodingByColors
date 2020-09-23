import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Tag from "./Tag"

const MobileTags = styled.div`
  width: 100%;
  padding-left: 4px;
  padding-top: 48px;
  .title {
    font-size: 24px;
    color: #a27e7e;
    margin-bottom: 20px;
  }
  .aTag {
    margin-bottom: 8px;
    a {
      font-size: 16px;
      padding: 4px 12px;
    }
    &:last-child {
      a {
        margin-bottom: 0;
      }
    }
  }
`

interface Props {
  tags: string[]
  tagsMapping: {}
}

const MobileTagList: React.FC<Props> = ({ tags, tagsMapping }) => {
  return (
    <MobileTags>
      <div className="container">
        <div className="title">Tags</div>
        {tags
          .sort((strA, strB) =>
            strA.toLowerCase().localeCompare(strB.toLowerCase())
          )
          .map(tagName => (
            <div className="aTag" key={tagName}>
              <Tag name={`${tagName}`} />
            </div>
          ))}
      </div>
    </MobileTags>
  )
}

export default MobileTagList

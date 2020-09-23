import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { TagStyle } from "../Polygons"
import { randomColor } from "../../utils/colorUtils"

const TagsCloudW = styled.div`
  width: 100%;
  .title {
    margin-bottom: 16px;
  }
  .tag-link {
    display: block;
    margin-bottom: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
`

interface Props {
  tags: string[]
  tagsMapping: {}
  title: string
}

const TagsCloud: React.FC<Props> = ({ tags, tagsMapping, title }) => {
  const biggestTag = tags[0]
  const maxCount = tagsMapping[biggestTag].count || tagsMapping[biggestTag]

  const tagFontSize = function (count: number): number {
    const min = 14
    const max = 24
    const fontSize = (count / maxCount) * (max - min) + min
    return fontSize
  }
  return (
    <TagsCloudW>
      <div className="title">
        <TagStyle arrowDirection="right" color="#e0cdcf">
          {title}
        </TagStyle>
      </div>
      <div className="tags">
        {tags
          .sort((strA, strB) =>
            strA.toLowerCase().localeCompare(strB.toLowerCase())
          )
          .map(tagName => (
            <Link
              to={`/tags/${tagName.toLowerCase().replace(/\s/g, "")}`}
              style={{
                fontSize: tagFontSize(
                  tagsMapping[tagName].count || tagsMapping[tagName]
                ),
                color: randomColor(),
              }}
              className="tag-link"
              key={tagName}
            >
              {tagName}
            </Link>
          ))}
      </div>
    </TagsCloudW>
  )
}

export default TagsCloud

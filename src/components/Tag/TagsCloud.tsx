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
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

interface TagItemProps {
  name: string
  tagsMapping: {}
  tagFontSize: Function
}

const TagLink: React.FC<TagItemProps> = ({
  name,
  tagsMapping,
  tagFontSize,
}) => (
  <Link
    to={`/tags/${name.toLowerCase().replace(/\s/g, "")}`}
    style={{
      fontSize: tagFontSize(tagsMapping[name].count || tagsMapping[name]),
      color: randomColor(),
    }}
    className="tag-link"
  >
    {name}
  </Link>
)

const TagSpan: React.FC<
  TagItemProps & {
    setFilter: Function
  }
> = ({ name, tagsMapping, tagFontSize, setFilter }) => {
  const handleClick = (): void => {
    setFilter(name)
  }
  return (
    <span
      style={{
        fontSize: tagFontSize(tagsMapping[name].count || tagsMapping[name]),
        color: randomColor(),
      }}
      className="tag-link"
      key={name}
      onClick={handleClick}
    >
      {name}
    </span>
  )
}

interface Props {
  title: string
  tags: string[]
  tagsMapping: {}
  children: any
}

const TagsCloud: React.FC<Props> = ({ title, tags, tagsMapping, children }) => {
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
        {children({
          tagFontSize: tagFontSize,
          tagsMapping: tagsMapping,
        })}
      </div>
    </TagsCloudW>
  )
}

export { TagsCloud, TagLink, TagSpan }

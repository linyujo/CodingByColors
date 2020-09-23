function getTagsOfPosts(edges: any[]) {
  const mapping = {}

  edges.forEach(({ node }) => {
    const { tags, headerImage } = node.frontmatter
    for (let tag of tags) {
      // mapping[tag] = mapping[tag] + 1 || 1
      if (mapping[tag]) {
        mapping[tag] = {
          count: mapping[tag].count + 1,
          images: [...mapping[tag].images, headerImage],
        }
      } else {
        mapping[tag] = {
          count: 1,
          images: [headerImage],
        }
      }
    }
  })

  const mappingKeys = Object.keys(mapping)
  const tags = mappingKeys.sort(
    (bTag, aTag) => mapping[aTag].count - mapping[bTag].count
  )

  return {
    tags: tags,
    tagsMapping: mapping,
  }
}

export { getTagsOfPosts }

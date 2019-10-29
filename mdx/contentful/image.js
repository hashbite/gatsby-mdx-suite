import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { useMDXDataState } from '@gatsby-mdx-suite/contexts/mdx-data'
import Image from '@gatsby-mdx-suite/mdx-basic/gatsby-image'

/* @todo move this to helpers */
const parseCSSSize = (size) => (isNaN(size) ? size : `${size}px`)

const ContentfulImageWrapper = styled.div`
  max-width: ${({ maxWidth }) => parseCSSSize(maxWidth)};
  width: 100%;

  img,
  svg {
    width: 100%;
    height: auto;
  }
`

export default function ContentfulImage({
  id,
  maxWidth = '100%',
  contextKey = 'contentfulAssets',
  ...props
}) {
  const mdxData = useMDXDataState()
  if (!mdxData[contextKey]) {
    return null
  }
  const imageData = mdxData[contextKey].find(
    (asset) => asset.contentful_id === id
  )

  if (!imageData) {
    console.error(
      new Error(`Unable to locate image data for ${id} in ${contextKey}`)
    )
    return null
  }

  if (imageData.sqip) {
    imageData.fluid = { ...imageData.fluid, base64: imageData.sqip.dataURI }
  }

  return (
    <ContentfulImageWrapper maxWidth={maxWidth}>
      <Image {...props} {...imageData} />
    </ContentfulImageWrapper>
  )
}

ContentfulImage.displayName = 'ContentfulImage'

ContentfulImage.propTypes = {
  id: propTypes.string.isRequired,
  contextKey: propTypes.string,
  maxWidth: propTypes.string,
}

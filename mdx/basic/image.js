import React, { useContext } from 'react'
import propTypes from 'prop-types'
import Img from 'gatsby-image'

import MdxDataContext from '@gatsby-mdx-suite/contexts/mdx-data'

export default function Image({
  id,
  contextKey,
  src,
  alt,
  width,
  height,
  svg,
  fluid,
  previewDataURI,
  file,
}) {
  // Fetch data from context when an id was passen
  const mdxData = useContext(MdxDataContext)
  if (!mdxData[contextKey]) {
    return null
  }

  let imageData = {}

  if (id) {
    imageData = mdxData[contextKey].find(
      (asset) => asset.imageId === id
    )

    if (!imageData) {
      console.error(
        new Error(`Unable to locate image data for ${id} in ${contextKey}`)
      )
      return null
    }

    svg = svg || imageData.svg
    fluid = fluid || imageData.fluid
    previewDataURI = previewDataURI || imageData.previewDataURI
    file = file || imageData.file
  }

  // Enhance data
  if (previewDataURI) {
    fluid = { ...fluid, base64: previewDataURI }
  }

  // Image propery construction
  const imgProps = {}
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.role = 'presentation'
  }

  const dimensionProps = {}
  if (width) {
    dimensionProps.width = width
  }
  if (height) {
    dimensionProps.height = height
  }

  // Render actual image
  if (src) {
    return <img {...imgProps} {...dimensionProps} src={src} />
  }

  if (file.contentType === 'image/svg+xml') {
    if (svg) {
      // Inlined SVGs
      return (
        <div
          {...dimensionProps}
          dangerouslySetInnerHTML={{ __html: svg.content }}
        />
      )
    }

    // SVGs that can/should not be inlined
    return <img {...imgProps} {...dimensionProps} src={file.url} />
  }

  // Non SVG images
  return <Img {...imgProps} {...dimensionProps} fluid={fluid} />
}

Image.propTypes = {
  // Author related
  id: propTypes.string,
  src: propTypes.string,
  alt: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
  // Developer related
  contextKey: propTypes.string,
  /**
   * SVG file content
   *
   * Can be generated via:
   * https://www.gatsbyjs.org/packages/gatsby-transformer-inline-svg/
  */
  svg: propTypes.object,
  /**
   * Data to render the image via Gatsby Image as fluid/responsive image.
   * Usually generated via a gatsby-transformer-sharp fragment.
   *
   * See:
   * * https://www.gatsbyjs.org/docs/gatsby-image/#images-that-stretch-across-a-fluid-container
   * * https://www.gatsbyjs.org/docs/gatsby-image/#common-fragments-with-gatsby-transformer-sharp
   */
  fluid: propTypes.object,
  /**
   * Overwrite the embedded image preview with your own value.
   *
   * For example via https://www.gatsbyjs.org/packages/gatsby-transformer-sqip/
   */
  previewDataURI: propTypes.object,
  file: propTypes.object,
}

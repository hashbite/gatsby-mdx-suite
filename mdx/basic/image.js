import React, { useContext } from 'react'
import propTypes from 'prop-types'
import GatsbyImage from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MdxDataContext from '@gatsby-mdx-suite/contexts/mdx-data'

const parseCssValue = (v) => (isNaN(v) ? v : `${v}px`)

const ImageWrapper = styled.div(
  ({ width, height }) => css`
    ${width &&
      css`
        width: ${parseCssValue(width)};
      `}
    ${height &&
      css`
        width: ${parseCssValue(width)};
      `}
  `
)

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
  // Fetch data from context when an id was passed
  let imageData = {}

  if (id) {
    const mdxData = useContext(MdxDataContext)

    if (!mdxData[contextKey]) {
      console.error(
        new Error(
          `Unable to locate images in mdx data context in ${contextKey}`
        )
      )
      return null
    }

    imageData = mdxData[contextKey].find((asset) => asset.imageId === id)

    if (!imageData) {
      console.error(
        new Error(
          `Unable to locate image data for the following image:\n\n${JSON.stringify(
            arguments[0],
            null,
            2
          )}`
        )
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
    return (
      <ImageWrapper {...dimensionProps}>
        <img {...imgProps} {...dimensionProps} src={src} />
      </ImageWrapper>
    )
  }

  if (file.contentType === 'image/svg+xml') {
    if (svg) {
      // Inlined SVGs
      return (
        <ImageWrapper
          {...dimensionProps}
          dangerouslySetInnerHTML={{ __html: svg.content }}
        />
      )
    }

    // SVGs that can/should not be inlined
    return (
      <ImageWrapper {...dimensionProps}>
        <img {...imgProps} {...dimensionProps} src={file.url} />
      </ImageWrapper>
    )
  }

  // Non SVG images
  return (
    <ImageWrapper {...dimensionProps}>
      <GatsbyImage {...imgProps} {...dimensionProps} fluid={fluid} />
    </ImageWrapper>
  )
}

Image.defaultProps = {
  contextKey: 'images',
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

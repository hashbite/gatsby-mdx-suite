import React, { useContext } from 'react'
import propTypes from 'prop-types'
import GatsbyImage from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const parseCssValue = (v) => (isNaN(v) ? v : `${v}px`)

export const ImageWrapper = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) &&
    ![
      'id',
      'src',
      'alt',
      'width',
      'height',
      'fluid',
      'file',
      'fit',
      'position',
    ].includes(prop),
})(
  ({ width, height, fitsParent }) => css`
    ${fitsParent
      ? css`
          display: block;
        `
      : css`
          display: inline-block;
          position: relative;
        `}

    img {
      display: block;
    }

    ${width &&
      css`
        width: ${parseCssValue(width)};
      `}
    ${height &&
      css`
        height: ${parseCssValue(height)};
      `}
  `
)

const StyledImage = styled.img(
  ({ fit, position }) =>
    fit &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: ${fit};
      object-position: ${position};
    `
)

/**
 * Renders an image from an internal or external source.
 *
 * @example
 * # An internal image
 *
 * <Image id="randomImageId" width="300" />
 *
 * # An external image
 *
 * <Image src="https://source.unsplash.com/random" width="300" />
 */
export default function Image({
  id,
  contextKey,
  width,
  height,
  fit,
  position,
  src,
  alt,
  previewDataURI,
  file,
  fluid,
  ...restProps
}) {
  const { data } = useContext(MdxSuiteContext)

  // Locate image data from context if id is passed
  if (id) {
    const images = data[contextKey]
    if (!images) {
      console.error(new Error(`No images available in context "${contextKey}"`))
      return null
    }

    // Fetch data from context when an id was passed
    const imageData = data[contextKey].find((asset) => asset.assetId === id)

    if (!imageData) {
      console.error(
        new Error(
          `No data located for image:\n\n${JSON.stringify(
            arguments[0],
            null,
            2
          )}`
        )
      )
      return null
    }

    // Use located data if no overwrites are passed
    fluid = fluid || imageData.fluid
    previewDataURI =
      previewDataURI ||
      // Support string & object structure to simplify GraphQL queries
      (imageData.previewDataURI &&
        (typeof imageData.previewDataURI === 'string'
          ? imageData.previewDataURI
          : imageData.previewDataURI.dataURI))
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

  const fitsParent = fit || fit === 'none'

  // Images with fluid data from gatsby-transformer-sharp
  if (fluid) {
    return (
      <ImageWrapper fitsParent={fitsParent} {...dimensionProps} {...restProps}>
        <GatsbyImage
          fluid={fluid}
          style={{ position: fitsParent ? 'static' : 'relative' }}
          {...imgProps}
          {...dimensionProps}
          objectFit={fit}
          objectPosition={position}
        />
      </ImageWrapper>
    )
  }

  const imageSrc = src || (file && file.url)

  if (!imageSrc) {
    console.error(
      new Error(
        `Unable to locate src image:\n\n${JSON.stringify(
          arguments[0],
          null,
          2
        )}`
      )
    )
    return null
  }

  // Images without fluid data
  return (
    <ImageWrapper fitsParent={fitsParent} {...dimensionProps} {...restProps}>
      <StyledImage
        src={imageSrc}
        {...imgProps}
        {...dimensionProps}
        fit={fit}
        position={position}
        loading="lazy"
      />
    </ImageWrapper>
  )
}

Image.displayName = 'Image'

Image.defaultProps = {
  contextKey: 'images',
  width: '100%',
  fit: null,
  position: 'center center',
}

Image.propTypes = {
  /**
   * Id of the internal image
   */
  id: propTypes.string,
  /**
   * URI of the external image
   */
  src: propTypes.string,
  /**
   * Set the width of the image.
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/width
   */
  alt: propTypes.string,
  /**
   * Set the width of the image.
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/width
   */
  width: propTypes.string,
  /**
   * Set the height of the image.
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/height
   */
  height: propTypes.string,
  /**
   * Set how the image should be fit into the container.
   *
   * Possible options:
   *
   * * fill
   * * contain
   * * cover
   * * none
   * * scale-down
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  fit: propTypes.string,
  /**
   * Set how the image should be positioned within its container.
   *
   * Takes two values, one for the horizontal and one for the vertical axis.
   *
   * Example values:
   *
   * * center bottom
   * * 2rem center
   * * top right
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   */
  position: propTypes.string,
  /**
   * Defines which image variant / context is used to locate the image data.
   */
  contextKey: propTypes.string,
  /**
   * Overwrite the embedded image preview with your own value.
   *
   * Will overwrite the value in fluid.base64
   *
   * For example via https://www.gatsbyjs.org/packages/gatsby-transformer-sqip/
   */
  previewDataURI: propTypes.object,
  /**
   * Used to render this component without context data.
   */
  file: propTypes.object,
  /**
   * Data to render the image via Gatsby Image as fluid/responsive image.
   * Usually generated via a gatsby-transformer-sharp fragment.
   *
   * Requires file property to be set.
   *
   * See:
   * * https://www.gatsbyjs.org/docs/gatsby-image/#images-that-stretch-across-a-fluid-container
   * * https://www.gatsbyjs.org/docs/gatsby-image/#common-fragments-with-gatsby-transformer-sharp
   */
  fluid: propTypes.object,
}

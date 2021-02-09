import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
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
  ({ width, height, fitsParent, fit, position, ...props }) => css`
    ${fitsParent
      ? css`
          display: block;
        `
      : css`
          display: inline-block;
          position: relative;
        `}

    ${width &&
    css`
      max-width: ${parseCssValue(width)};
      width: 100%;
    `}
    ${height &&
    css`
      max-height: ${parseCssValue(height)};
      height: 100%;
    `}

    img {
      display: block;
      width: 100%;

      ${fit &&
      css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: ${fit} !important;
        object-position: ${position} !important;
      `}
    }
  `
)

// eslint-disable-next-line jsx-a11y/alt-text
const StaticImage = (props) => <img {...props} loading="lazy" />

/**
 * Renders an image from an internal or external source.
 *
 * @example
 * # An internal image
 *
 * <Image id="randomImageId" width="300" />
 * @example
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
  // @todo
  ...restProps
}) {
  const {
    data,
    pageContext: { locale: activeLocale },
    themeConfig: { defaultLocale },
  } = useContext(MdxSuiteContext)

  if (!id && !src) {
    throw new Error(`Images need at least the id or src property.`)
  }

  // Image propery construction
  const imgProps = {}

  // Either trim alt or render empty for decorative images. See: https://www.w3.org/WAI/tutorials/images/decorative/
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.alt = ''
  }

  if (width) {
    imgProps.width = width
  }
  if (height) {
    imgProps.height = height
  }

  if (!id) {
    return <StaticImage {...imgProps} src={src} />
  }

  // Locate image data from context if id is passed
  if (!data[contextKey]) {
    console.error(
      new Error(
        `The media context "${contextKey}" does not exist or does not contain any data.`
      )
    )
    return null
  }

  const images = data[contextKey].filter(Boolean)
  if (!images) {
    console.error(new Error(`No images available in context "${contextKey}"`))
    return null
  }

  // Get all available image data in all locales
  const matches = images.filter((asset) => asset.assetId === id)

  // Get data from active locale
  let imageData = matches.find(({ locale }) => locale === activeLocale)

  // Fall back to data with default locale
  if (!imageData) {
    imageData = matches.find(({ locale }) => locale === defaultLocale)
  }

  // Fall back to first available data from any locale
  if (!imageData && matches.length) {
    imageData = matches[0]
  }

  if (!imageData) {
    throw new Error(
      `Unable to locate image rendering data for ${id}`
    )
  }

  if (!imageData.gatsbyImageData) {
    if (!imageData.file.url) {
      throw new Error(`Invalid image rendering data found for ${id}`)
    }
    return <StaticImage {...imgProps} src={imageData.file.url} />
  }

  // const fitsParent = fit || fit === 'none'

  console.log('rendering:', {imgProps, imageData})

  return (
    // <ImageWrapper
    //   fit={fit}
    //   position={position}
    //   fitsParent={fitsParent}
    //   {...restProps}
    // >
    <GatsbyImage
      // fluid={fluid}
      // style={{ position: fitsParent ? 'static' : 'relative' }}
      {...imgProps}
      image={imageData.gatsbyImageData}
      // objectFit={fit}
      // objectPosition={position}
    />
    // </ImageWrapper>
  )
}

Image.displayName = 'Image'

Image.defaultProps = {
  contextKey: 'full',
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
}

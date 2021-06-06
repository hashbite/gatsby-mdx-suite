import React from 'react'
import propTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'

import useImageDataFromContext from '../hooks/use-image-data-from-context'

// eslint-disable-next-line jsx-a11y/alt-text
const StaticImage = (props) => <img {...props} />

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
  imageData,
  loading,
  ...restProps
}) {
  const contextData = useImageDataFromContext({ id, contextKey })

  if (!id && !src && !imageData) {
    throw new Error(
      `Images need at least the id, src or imageData property to render.`
    )
  }

  // Image propery construction
  const imgProps = { loading, ...restProps }
  const imgStyle = {}

  // Either trim alt or render empty for decorative images. See: https://www.w3.org/WAI/tutorials/images/decorative/
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.alt = ''
  }

  if (width) {
    imgStyle.width = width
  }
  if (height) {
    imgStyle.height = height
  }

  if (src) {
    return <StaticImage {...imgProps} style={imgStyle} src={src} />
  }

  const renderData = imageData || contextData

  // Show pandas to devs if images not found
  if (!renderData) {
    return (
      <StaticImage
        {...imgProps}
        style={imgStyle}
        src={'https://source.unsplash.com/featured/?panda'}
      />
    )
  }

  // optional SQIP support
  if (renderData?.sqip?.dataURI) {
    if (!renderData?.gatsbyImageData?.placeholder) {
      renderData.gatsbyImageData.placeholder = {}
    }
    renderData.gatsbyImageData.placeholder.fallback = renderData.sqip.dataURI
  }

  if (!renderData?.gatsbyImageData) {
    if (!renderData.file.url) {
      throw new Error(`Invalid image rendering data found for ${id}`)
    }
    return (
      <StaticImage {...imgProps} style={imgStyle} src={renderData.file.url} />
    )
  }

  return (
    <GatsbyImage
      {...imgProps}
      style={imgStyle}
      image={renderData.gatsbyImageData}
      objectFit={fit}
      objectPosition={position}
    />
  )
}

Image.displayName = 'Image'

Image.defaultProps = {
  contextKey: 'full',
  width: '100%',
  position: 'center center',
  loading: 'lazy',
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
  loading: propTypes.oneOf(['eager', 'lazy']),
}

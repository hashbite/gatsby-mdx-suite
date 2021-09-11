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
  inline,
  ...restProps
}) {
  const contextData = useImageDataFromContext({ id, contextKey })

  if (!id && !src && !imageData) {
    return 'image unavailable'
  }

  // Image propery construction
  const imgProps = { loading, ...restProps }
  const imgStyle = { display: inline ? 'inline-block' : 'block' }

  // Either trim alt or render empty for decorative images. See: https://www.w3.org/WAI/tutorials/images/decorative/
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.alt = ''
  }

  const renderWidth = width || contextData?.file?.details?.image?.width
  const renderHeight = height || contextData?.file?.details?.image?.height

  if (renderWidth) {
    imgStyle.width = renderWidth
  }
  if (renderHeight) {
    imgStyle.height = renderHeight
  }

  if (src) {
    return <StaticImage {...imgProps} style={imgStyle} src={src} />
  }

  const renderData = imageData || contextData

  // The alt test should describe whats in the image: https://moz.com/learn/seo/alt-text
  imgProps.alt = renderData.description || renderData.title || imgProps.alt

  // The title is used as tooltip.
  // Will probably be removed as it comes with accessability problems:
  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#image_titles
  if (renderData.title) {
    imgProps.title = renderData.title
  }

  // custom placeholder support
  if (renderData.placeholder?.dataURI) {
    if (!renderData.gatsbyImageData?.placeholder) {
      renderData.gatsbyImageData.placeholder = {}
    }
    renderData.gatsbyImageData.placeholder.fallback =
      renderData.placeholder.dataURI
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
  fit: 'contain',
  inline: false,
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
   * Should the image be rendered inline?
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/display
   */
  inline: propTypes.bool,
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

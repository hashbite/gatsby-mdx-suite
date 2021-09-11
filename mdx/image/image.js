import React from 'react'
import propTypes from 'prop-types'

import ImageRenderer from 'gatsby-theme-mdx-suite-core/src/components/image'

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
export default function MdxImage(props) {
  return <ImageRenderer {...props} />
}

MdxImage.displayName = 'Image'

MdxImage.defaultProps = {
  contextKey: 'full',
  width: '100%',
  fit: 'contain',
  position: 'center center',
  inline: true,
}

MdxImage.propTypes = {
  /**
   * Id of the internal image
   */
  id: propTypes.string,
  /**
   * URI of the external image
   */
  src: propTypes.string,
  /**
   * Set an alternative alt description of the image.
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/alt
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
}

import React from 'react'
import propTypes from 'prop-types'

import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

/**
 * Renders an icon. The available icons can be found in the <Link to="/docs/theme#icons">theme documentation for icons</Link>
 *
 * @example
 * <Icon icon="star" />
 * <Icon icon="instagram" />
 * <Icon icon="facebook" color="#4267B2" />
 * <Icon icon="youtube" color="red" />
 */
const MdxIcon = (props) => <Icon {...props} />

MdxIcon.defaultProps = {
  verticalAlign: 'middle',
}

MdxIcon.propTypes = {
  /** Name of the icon to render. The available icons can be found in the <Link to="/docs/theme#icons">theme documentation for icons</Link> */
  icon: propTypes.string.isRequired,
  /** Color of the icon. Will use current text color by default.*/
  color: propTypes.string,
  /** Adjust the vertical align of the icon. Useful values: top, bottom, middle, baseline, text-top, text-bottom */
  verticalAlign: propTypes.string,
  svgProps: propTypes.object,
}

export default MdxIcon

import React from 'react'
import propTypes from 'prop-types'

import ThemeHeader from '../header/header'

/**
 * Renders the header including menu and hero element of the page.
 *
 * Can have a background image.
 *
 * @example
 * <Header colorSet="blue">
 *
 * # Some catching text
 *
 * </Header>
 * <Header backgroundImageId="randomImageId">
 *
 * # Some catching text
 *
 * </Header>
 * <Header backgroundVideoId="randomVideoId">
 *
 * # Some catching text
 *
 * </Header>
 */
const Header = (props) => <ThemeHeader {...props} />

Header.defaultProps = {
  colorSet: 'primary',
  transparent: false,
}

Header.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
  backgroundVideoId: propTypes.string,
  colorSet: propTypes.string,
  colors: propTypes.object,
  transparent: propTypes.bool,
}

export default Header

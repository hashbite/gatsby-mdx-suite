import React from 'react'
import propTypes from 'prop-types'

import NavigationBar from '../navigation/bar'

/**
 * Renders the navigation bar with menu.
 *
 *
 * @example
 * <Navbar />
 *
 * @example
 * <Section backgroundImageId="randomImageId">
 * <Navbar transparent />
 * </Section>
 *
 * @example
 * <Navbar sticky={false} />
 */
const NavBar = (props) => <NavigationBar {...props} />

NavBar.defaultProps = {
  sticky: false,
  transparent: false,
}

NavBar.propTypes = {
  transparent: propTypes.bool,
  sticky: propTypes.bool,
}

export default NavBar

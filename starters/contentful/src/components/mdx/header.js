import React from 'react'
import propTypes from 'prop-types'

const Header = ({ children }) => {
  return <header>{children}</header>
}

Header.propTypes = {
  children: propTypes.node,
}

export default Header

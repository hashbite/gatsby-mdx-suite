import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

const HeaderWrapper = tw.div`bg-red-600 h-12`

const Header = ({ children }) => {
  return <HeaderWrapper>{children}</HeaderWrapper>
}

Header.propTypes = {
  children: propTypes.node,
}

export default Header

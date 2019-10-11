import React from 'react'

import propTypes from 'prop-types'
import { Styled } from 'theme-ui'

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <main>{children}</main>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

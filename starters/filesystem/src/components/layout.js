import React from 'react'

import PropTypes from 'prop-types'
import { Styled } from 'theme-ui'

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <main>{children}</main>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

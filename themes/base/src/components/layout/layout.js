import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import Footer from './footer'
import Seo from './seo'

const Wrapper = styled.div``

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <Wrapper>
        <main>{children}</main>
        <Footer />
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

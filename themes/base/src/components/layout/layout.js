import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import Footer from './footer'
import Seo from './seo'

const Wrapper = styled.div``

const Layout = ({ children, uri }) => {
  const isDocs = uri.indexOf('/docs') === 0
  return (
    <>
      <Seo />
      <Wrapper>
        <main>{children}</main>
        {!isDocs && <Footer />}
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

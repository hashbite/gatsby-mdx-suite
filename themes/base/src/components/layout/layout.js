import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useLocation } from '@reach/router'

import Footer from './footer'

const Wrapper = styled.div``

const Layout = ({ children }) => {
  const location = useLocation()
  const isDocs = location.pathname.indexOf('/docs') === 0

  return (
    <>
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

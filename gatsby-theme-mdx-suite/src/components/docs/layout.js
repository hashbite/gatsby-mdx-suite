import React from 'react'

import propTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'

const Layout = ({ children }) => (
  <Styled.root>
    <Global
      styles={(theme) => css`
        body {
          margin: 0;
          overflow-x: hidden;
        }
        a {
          color: inherit;
          text-decoration: none;

          :visited {
            color: inherit;
          }

          &.active {
            font-weight: bold;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul,
        ol,
        li {
          &:last-child {
            margin-bottom: 0;
          }
        }
      `}
    />
    {children}
  </Styled.root>
)

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

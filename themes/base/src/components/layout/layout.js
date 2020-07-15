import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import { Location } from '@reach/router'

import Footer from './footer'
import Seo from './seo'

const Wrapper = styled.div``

const Layout = ({ children }) => {
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <Styled.root>
      <Global
        styles={() => css`
          a {
            color: inherit;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
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
              padding-bottom: 0;
            }
          }
        `}
      />
      <Location>
        {({ location }) => (
          <Seo
            title="SQ ONE"
            meta={[
              // {
              // property: 'og:url',
              // @todo set via theme config or query from graphql site metadtaa!!!
              // content: `https://xxxxx/${location.pathname}`,
              // },
              {
                name: 'apple-mobile-web-app-capable',
                content: 'yes',
              },
              {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black-translucent',
              },
              {
                name: 'format-detection',
                content: 'telephone=no',
              },
            ]}
          />
        )}
      </Location>
      <Wrapper>
        <main>{children}</main>
        <Footer />
      </Wrapper>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

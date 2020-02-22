import React from 'react'
import { Link } from 'gatsby'
import propTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

const DocsHeader = tw.div`
  fixed left-0 top-0 right-0 z-50
  h-16 px-4 flex justify-between items-center
  bg-gray-800 text-white shadow-lg
`

const DocsTitle = tw.h1`m-0`

const DocsWrapper = tw.div`pt-24`

const MenuLink = tw(Link)`px-4`

const Menu = tw.nav`flex content-center`

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

        ul,
        ol {
          margin-left: 0;
        }
      `}
    />
    <DocsHeader>
      <DocsTitle>
        <Link to="/docs">Docs</Link>
      </DocsTitle>
      <Menu>
        <MenuLink to="/docs/kitchen-sink">Kitchen Sink</MenuLink>
        <MenuLink to="/docs/theme">theme</MenuLink>
        <MenuLink to="/">Back to the page</MenuLink>
      </Menu>
    </DocsHeader>
    <DocsWrapper>{children}</DocsWrapper>
  </Styled.root>
)

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout

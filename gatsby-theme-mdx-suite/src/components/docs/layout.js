import React from 'react'
import { Link } from 'gatsby'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

const DocsHeader = styled.div`
  ${tw`fixed left-0 top-0 right-0 z-50`}
  ${tw`h-16 px-4 flex justify-between items-center`}
  ${tw`bg-gray-800 text-white shadow-lg`}
`

const DocsTitle = styled.h1`
  ${tw`m-0`}
`

const DocsWrapper = styled.div`
  ${tw`pt-32`}
`

const MenuLink = styled(Link)`
  ${tw`px-4`}
`

const Menu = styled.nav`
  ${tw`flex content-center`}
`

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

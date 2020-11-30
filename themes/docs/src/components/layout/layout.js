import React from 'react'
import Link from 'gatsby-link'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

const DocsWrapper = styled.div`
  ${tw`grid h-screen w-screen`}
  grid-template-areas:  "head head head"
                        "nav  main side";
  grid-template-rows: minmax(60px, auto) 1fr;
  grid-template-columns: min-content 1fr min-content;
`

const LayoutHeader = styled.div`
  ${tw`
    p-4 flex justify-between items-center flex-nowrap
    shadow-lg
  `}
  grid-area: head;
`

const DocsTitle = tw.h1`mb-0! text-2xl`

const MenuLink = tw(Link)`px-2 lg:px-4`

const Menu = styled.nav(
  () => css`
    ${tw`
    flex-auto
    flex flex-row content-center
    flex-initial
    text-sm lg:text-base
  `}
  `
)

const BackIcon = tw(Icon)`cursor-pointer w-6 align-middle pb-1`

const Layout = ({ children, title }) => {
  return (
    <DocsWrapper>
      <LayoutHeader>
        <DocsTitle>
          <MenuLink to="/">
            <BackIcon icon="previous" />
          </MenuLink>
          <MenuLink to="/docs">Docs{title && ` - ${title}`}</MenuLink>
        </DocsTitle>
        <Menu>
          <MenuLink to="/docs">Start</MenuLink>
          <MenuLink to="/docs/playground">Playground</MenuLink>
          <MenuLink to="/docs/components">Components</MenuLink>
          <MenuLink to="/docs/theme">Theme</MenuLink>
        </Menu>
      </LayoutHeader>
      {children}
    </DocsWrapper>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
}

export default Layout

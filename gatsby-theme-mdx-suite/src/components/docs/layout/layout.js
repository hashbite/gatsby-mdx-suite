import React, { useState } from 'react'
import Link from 'gatsby-link'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

import { EntypoMenu } from 'react-entypo-icons'

const DocsWrapper = styled.div`
  ${tw`grid h-screen w-screen`}
  grid-template-areas:  "head head head"
                        "nav  main side";
  grid-template-rows: 60px 1fr;
  grid-template-columns: min-content 1fr min-content;
`

const LayoutHeader = styled.div`
  ${tw`
    fixed left-0 right-0
    md:static
    p-4 flex justify-between items-center flex-wrap
    md:py-0 md:flex-no-wrap
    bg-gray-200 shadow-lg
  `}
  grid-area: head;
`

const DocsTitle = tw(Styled.h1)`m-0 text-2xl`

const MenuLink = tw(Link)`my-2 md:my-0 md:px-2 lg:px-4`

const Menu = styled.nav(
  ({ menuOpen }) => css`
    ${tw`
    py-1 w-full flex-grow
    md:py-0 md:w-auto md:flex-auto
    flex flex-col content-center
    md:flex-initial md:flex-row
    md:text-sm lg:text-base
  `}
    ${!menuOpen && tw`hidden md:flex md:justify-end`}
  `
)

const MenuToggleWrapper = tw.div`p-1 md:hidden`
const MenuToggle = tw(EntypoMenu)`cursor-pointer`

const Layout = ({ children, title }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggleClick = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <Styled.root>
      <DocsWrapper>
        <LayoutHeader>
          <DocsTitle>
            <Link to="/docs">Docs</Link>
            {title && ` - ${title}`}
          </DocsTitle>
          <MenuToggleWrapper>
            <MenuToggle
              onClick={handleMenuToggleClick}
              style={{ verticalAlign: 'middle' }}
            />
          </MenuToggleWrapper>
          <Menu menuOpen={menuOpen}>
            <MenuLink to="/docs/editing-basics">Editing Basics</MenuLink>
            <MenuLink to="/docs/playground">Playground</MenuLink>
            <MenuLink to="/docs/kitchen-sink">Kitchen Sink</MenuLink>
            <MenuLink to="/docs/theme">Theme</MenuLink>
            <MenuLink to="/">Back to the page</MenuLink>
          </Menu>
        </LayoutHeader>
        {children}
      </DocsWrapper>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
}

export default Layout

import React, { useState } from 'react'
import Link from 'gatsby-link'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import MenuIcon from 'heroicons/outline/menu.svg'
import ChevronLeftIcon from 'heroicons/outline/chevron-left.svg'

const DocsWrapper = styled.div`
  ${tw`grid h-screen w-screen`}
  grid-template-areas:  "head head head"
                        "nav  main side";
  grid-template-rows: minmax(60px, auto) 1fr;
  grid-template-columns: min-content 1fr min-content;
`

const LayoutHeader = styled.div`
  ${tw`
    p-4 flex justify-between items-center flex-wrap
    md:py-0 md:flex-no-wrap
    shadow-lg
  `}
  grid-area: head;
`

const DocsTitle = tw.h1`m-0 text-2xl`

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
const MenuToggleIcon = tw(MenuIcon)`cursor-pointer w-8`
const BackIcon = tw(
  ChevronLeftIcon
)`cursor-pointer w-6 inline align-middle pb-1`

const Layout = ({ children, title }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggleClick = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <DocsWrapper>
      <LayoutHeader>
        <DocsTitle>
          <MenuLink to="/">
            <BackIcon />
          </MenuLink>
          <MenuLink to="/docs">Docs</MenuLink>
        </DocsTitle>
        <MenuToggleWrapper>
          <MenuToggleIcon onClick={handleMenuToggleClick} />
        </MenuToggleWrapper>
        <Menu menuOpen={menuOpen}>
          <MenuLink to="/docs">Home</MenuLink>
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

import React from 'react'
import Link from 'gatsby-link'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'
import 'tailwindcss/dist/base.css'

const DocsWrapper = styled.div`
  ${tw`grid h-screen w-screen`}
  grid-template-areas:  "head head head"
                        "nav  main side";
  grid-template-rows: 60px 1fr;
  grid-template-columns: min-content 1fr min-content;
`

const LayoutHeader = styled.div`
  ${tw`
    px-4 flex justify-between items-center
    bg-gray-200 shadow-lg
  `}
  grid-area: head;
`

const DocsTitle = tw(Styled.h1)`m-0 text-2xl`

const MenuLink = tw(Link)`px-4`

const Menu = tw.nav`flex content-center`

const Layout = ({ children, title }) => {
  return (
    <Styled.root>
      <DocsWrapper>
        <LayoutHeader>
          <DocsTitle>
            <Link to="/docs">Docs</Link>
            {title && ` - ${title}`}
          </DocsTitle>
          <Menu>
            <MenuLink to="/docs/kitchen-sink">Kitchen Sink</MenuLink>
            <MenuLink to="/docs/theme">theme</MenuLink>
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

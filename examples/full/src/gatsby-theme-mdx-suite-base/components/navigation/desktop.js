import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

import LanguageSwitch from 'gatsby-theme-mdx-suite-base/src/components/i18n/language-switch'
import MenuLevel from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-level'
import Logo from 'gatsby-theme-mdx-suite-base/src/components/logo'

import Social from './social'

const NavigationDesktopWrapper = tw.div`hidden md:block`
const NavigationDesktopContent = styled.div`
  ${centerToContentColumn}
  ${tw`flex justify-between py-2 items-center`}
`
const LogoLink = styled(Link)`
  ${tw`block`}

  width: 160px;

  & svg {
    width: 100%;
  }
`

const NavigationDesktopControls = tw.div`flex items-center`

const NavigationDesktop = ({ rootMenuItemId }) => {
  const result = useStaticQuery(graphql`
    query CustomNavigationDesktopQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <NavigationDesktopWrapper>
      <NavigationDesktopContent>
        <LogoLink to="/" title={result.site.siteMetadata.title}>
          <Logo />
        </LogoLink>
        <MenuLevel rootMenuItemId={rootMenuItemId} />
        <NavigationDesktopControls>
          <LanguageSwitch />
          <Social />
        </NavigationDesktopControls>
      </NavigationDesktopContent>
    </NavigationDesktopWrapper>
  )
}

NavigationDesktop.defaultProps = {
  rootMenuItemId: 'menuRootHeader',
  isNavigationTransparent: false,
}

NavigationDesktop.propTypes = {
  rootMenuItemId: propTypes.string,
  isNavigationTransparent: propTypes.bool,
}

export default NavigationDesktop

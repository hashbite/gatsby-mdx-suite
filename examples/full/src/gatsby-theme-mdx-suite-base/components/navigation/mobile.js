import { useStaticQuery, graphql, Link } from 'gatsby'

import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import ScrollLock from 'react-scrolllock'
import { t } from '@lingui/macro'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

import Logo from 'gatsby-theme-mdx-suite-base/src/components/logo'
import LanguageSwitch from 'gatsby-theme-mdx-suite-base/src/components/i18n/language-switch'
import MenuRecursive from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-recursive'
import MenuTitle from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-title'
import MenuLink from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-link'
import MenuLi from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-li'
import MenuUl from 'gatsby-theme-mdx-suite-base/src/components/menu/menu-ul'

import Social from './social'

const NavigationMobileWrapper = styled.div(
  ({ menuOpen }) => css`
    ${tw`flex flex-col md:hidden`}
    ${menuOpen && tw`h-screen bg-root-background`}
  `
)
const NavigationMobileBar = styled.div``
const NavigationMobileFlyout = styled.div(
  ({ menuOpen }) => css`
    ${tw`relative overflow-hidden hidden text-text`}

    &:after {
      content: '';
      ${tw`absolute top-0 left-0 right-0 bg-gray-300 h-px`}
    }

    ${menuOpen && tw`block flex-auto overflow-y-scroll`}
  `
)

const NavigationMobileBarContent = styled.div`
  ${tw`flex justify-between items-center flex-wrap`}
  ${centerToContentColumn}
`
const NavigationMobileFlyoutContent = styled.div`
  ${centerToContentColumn}

  ${tw`pb-8`}

  ${MenuUl} {
    ${tw`flex flex-col`}

    ${MenuLi} {
      ${tw`px-0`}
    }

    ${MenuLink} {
    }

    &.depth-0 {
      > ${MenuLi} {
        ${tw`
          py-2
          border-0 border-b border-gray-300
          `}

        &:last-child {
          ${tw`border-b-0`}
        }
        > ${MenuTitle} {
          ${tw`
            font-bold text-sm text-gray-800
          `}

          > ${MenuLink} {
            &.active,
            &:focus,
            &:hover {
              ${tw`text-primary`}
            }
          }
        }
      }
    }

    &.depth-1 {
      ${tw`py-2`}

      ${MenuLi} {
        ${tw`
          px-0
          text-gray-600
        `}
      }
      ${MenuLink} {
        ${tw`
          relative
          block
          px-4
        `}

        &:after {
          content: '';
          ${tw`absolute left-0`}
          top: 50%;
          bottom: 50%;
          width: 4px;
          transition: 0.3s all ease;
        }

        &.active,
        &:focus,
        &:hover {
          ${tw`outline-none no-underline`}

          &:after {
            ${tw`bg-gray-300`}
            top: 0;
            bottom: 0;
          }
        }

        &.active {
          ${tw`bg-gray-100`}
          &:after {
            ${tw`bg-primary`}
          }
        }
      }
    }

    ${MenuTitle} {
      ${tw`block`}
    }
  }
`

const LogoLink = styled(Link)`
  ${tw`block mx-auto`}

  width: 120px;

  & svg {
    width: 100%;
  }
`

const HeaderMenuToggle = tw.button`
  text-3xl hover:text-primary focus:outline-none focus:text-primary
  border-none bg-transparent`

const StyledSocial = styled(Social)`
  ${tw`block text-center mt-content-gap text-4xl`}
`

const NavigationMobile = ({ rootMenuItemId }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const result = useStaticQuery(graphql`
    query CustomNavigationMobileQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const handleClickMenuToggle = () => setMenuOpen(!menuOpen)

  return (
    <NavigationMobileWrapper menuOpen={menuOpen}>
      <NavigationMobileBar>
        <NavigationMobileBarContent>
          <LanguageSwitch />
          <LogoLink to="/" title={result.site.siteMetadata.title}>
            <Logo />
          </LogoLink>
          <HeaderMenuToggle onClick={handleClickMenuToggle}>
            <Icon icon="menu" title={t('menu')} />
          </HeaderMenuToggle>
        </NavigationMobileBarContent>
      </NavigationMobileBar>
      <ScrollLock isActive={menuOpen}>
        <NavigationMobileFlyout menuOpen={menuOpen}>
          <NavigationMobileFlyoutContent>
            <MenuRecursive rootMenuItemId={rootMenuItemId} />
            <StyledSocial />
          </NavigationMobileFlyoutContent>
        </NavigationMobileFlyout>
      </ScrollLock>
    </NavigationMobileWrapper>
  )
}

NavigationMobile.defaultProps = {
  rootMenuItemId: 'menuRootHeader',
}

NavigationMobile.propTypes = {
  rootMenuItemId: propTypes.string.isRequired,
}

export default NavigationMobile

import { useStaticQuery, graphql, Link } from 'gatsby'

import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import ScrollLock from 'react-scrolllock'
import { useTranslation } from 'react-i18next'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

import Logo from '../logo'
import LanguageSwitch from '../i18n/language-switch'
import MenuRecursive from '../menu/menu-recursive'
import MenuTitle from '../menu/menu-title'
import MenuLink from '../menu/menu-link'
import MenuLi from '../menu/menu-li'
import MenuUl from '../menu/menu-ul'

const NavigationMobileWrapper = styled.div(
  ({ menuOpen }) => css`
    ${tw`flex flex-col md:hidden text-text`}
    ${menuOpen && tw`h-screen bg-root-background`}
  `
)
const NavigationMobileTop = styled.div``
const NavigationMobileBottom = styled.div(
  ({ menuOpen }) => css`
    ${tw`relative overflow-hidden hidden`}

    &:after {
      content: '';
      ${tw`absolute top-0 left-0 right-0 bg-gray-300 h-px`}
    }

    ${menuOpen && tw`block flex-auto overflow-y-scroll`}
  `
)

const NavigationMobileTopContent = styled.div`
  ${tw`flex justify-between items-center flex-wrap`}
  ${centerToContentColumn}
`
const NavigationMobileBottomContent = styled.div`
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

const HeaderLogoWrapper = styled.h1`
  ${tw`py-0 mb-0!`}

  width: 32vw;
  max-width: 220px;

  & svg {
    width: 100%;
  }
`

const HeaderControls = tw.div`flex items-center`

const HeaderMenuToggle = tw.button`
  xl:hidden
  text-3xl text-primary
  border-none bg-transparent`

const NavigationMobile = ({ rootMenuItemId }) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const result = useStaticQuery(graphql`
    query NavigationMobileQuery {
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
      <NavigationMobileTop>
        <NavigationMobileTopContent>
          <HeaderLogoWrapper>
            <Link to="/" title={result.site.siteMetadata.title}>
              <Logo />
            </Link>
          </HeaderLogoWrapper>
          <HeaderControls>
            <LanguageSwitch />
            <HeaderMenuToggle
              onClick={handleClickMenuToggle}
              aria-label={t('menu')}
            >
              <Icon icon="menu" />
            </HeaderMenuToggle>
          </HeaderControls>
        </NavigationMobileTopContent>
      </NavigationMobileTop>
      <ScrollLock isActive={menuOpen}>
        <NavigationMobileBottom menuOpen={menuOpen}>
          <NavigationMobileBottomContent>
            <MenuRecursive rootMenuItemId={rootMenuItemId} />
          </NavigationMobileBottomContent>
        </NavigationMobileBottom>
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

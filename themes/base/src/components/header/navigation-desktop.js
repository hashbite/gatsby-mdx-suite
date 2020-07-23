import { useStaticQuery, graphql, Link } from 'gatsby'

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import tw from 'twin.macro'
import { Styled } from 'theme-ui'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

import Logo from './logo'
import LanguageSwitch from '../i18n/language-switch'
import MenuLevel from '../menu/menu-level'
import MenuLink from '../menu/menu-link'
import MenuTitle from '../menu/menu-title'
import MenuLi from '../menu/menu-li'

const NavigationDesktopWrapper = tw.div`hidden md:block`
const NavigationDesktopTop = styled.div``
const NavigationDesktopBottom = styled.div`
  ${tw`relative overflow-hidden`}

  &:after {
    content: '';
    ${tw`absolute top-0 left-0 right-0 bg-gray-300 h-px`}
  }
`

const NavigationDesktopTopContentWrapper = styled.div`
  ${centerToContentColumn}
`
const NavigationDesktopTopContent = styled.div(
  ({ transparent }) =>
    css`
      ${tw`flex justify-between items-center flex-wrap relative`}
      ${transparent &&
      css`
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -10vw;
          right: -10vw;
          height: 1px;
          background: white;
        }
      `}
    `
)
const NavigationDesktopBottomContent = styled.div`
  ${centerToContentColumn}
`

const HeaderLogoWrapper = styled(Styled.h1)`
  ${tw`mb-0 w-48 lg:w-64`}

  & svg {
    width: 100%;
  }
`

const MenuLinkLevel0ActiveAnimation = keyframes`
  from {}

  to {
    ${tw`left-0 right-0 `}
  }
`

const HeaderMenuLevel0 = styled.div(
  ({ theme }) => css`
    ${tw`flex items-center`}

    ${MenuLi} {
      ${tw`px-0`}
      line-height: 5.75rem;
    }

    ${MenuTitle}, ${MenuLink} {
      ${tw`
      relative
      block px-4
    `}
    }

    ${MenuLink} {
      &:after {
        content: '';
        ${tw`absolute bottom-0`}
        left: 50%;
        right: 50%;
        height: 4px;
        transition: 0.3s all ease;
      }

      &:focus,
      &:hover {
        ${tw`outline-none no-underline`}

        &:after {
          ${tw`bg-gray-300`}
          left: 1.5em;
          right: 1.5em;
        }
      }

      &.active {
        ${tw`font-normal`}
        &:after {
          left: 1.5em;
          right: 1.5em;
          animation: 1s ${MenuLinkLevel0ActiveAnimation} ease;
          animation-fill-mode: both;
          animation-delay: 0.3s;
          background-color: ${theme.colors.primary};
        }
      }
    }
  `
)

const HeaderMenuLevel1 = styled.div`
  ${tw`
    flex justify-center
    `}

  ${MenuLi} {
    ${tw``}

    line-height: 4rem;
  }

  ${MenuLink} {
    &.active {
      ${tw`font-bold`}
    }
  }
`

const NavigationDesktop = ({ rootMenuItemId, isNavigationTransparent }) => {
  const result = useStaticQuery(graphql`
    query NavigationDesktopQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <NavigationDesktopWrapper>
      <NavigationDesktopTop>
        <NavigationDesktopTopContentWrapper>
          <NavigationDesktopTopContent transparent={isNavigationTransparent}>
            <HeaderLogoWrapper>
              <Link to="/" title={result.site.siteMetadata.title}>
                <Logo />
              </Link>
            </HeaderLogoWrapper>
            <HeaderMenuLevel0>
              <MenuLevel rootMenuItemId={rootMenuItemId} />
              <LanguageSwitch />
            </HeaderMenuLevel0>
          </NavigationDesktopTopContent>
        </NavigationDesktopTopContentWrapper>
      </NavigationDesktopTop>
      <NavigationDesktopBottom>
        <NavigationDesktopBottomContent>
          <HeaderMenuLevel1>
            <MenuLevel rootMenuItemId={rootMenuItemId} level={2} />
          </HeaderMenuLevel1>
        </NavigationDesktopBottomContent>
      </NavigationDesktopBottom>
    </NavigationDesktopWrapper>
  )
}

NavigationDesktop.defaultProps = {
  rootMenuItemId: 'menuRootHeader',
  transparent: false,
}

NavigationDesktop.propTypes = {
  rootMenuItemId: propTypes.string,
  isNavigationTransparent: propTypes.bool,
}

export default NavigationDesktop

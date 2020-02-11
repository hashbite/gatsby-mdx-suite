import React from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'
import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import { centerToContentColumn, applyColorSet } from '@gatsby-mdx-suite/helpers'

import LogoSVG from '../../assets/logo.svg'
import ColorModeSwitch from '../color-mode-switch'

const HeaderWrapper = styled.div(
  ({ hasBackgroundImage, ...restProps }) => css`
    ${tw`relative`}

    ${hasBackgroundImage
      ? css`
          ${applyColorSet(restProps)}
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `
      : css`
          background: #f7fafc;
        `}
  `
)

const HeaderContainer = styled.div(
  ({ theme }) => css`
    ${tw`absolute z-10 inset-x-0 top-0 flex p-1 items-center`}

    & > * {
      ${tw`flex-none px-2`}

      &:not(:first-child):not(:last-child) {
        ${tw`flex-auto justify-center`}
      }
    }
  `
)

const HeaderTitle = styled.h1`
  ${tw`m-0`}

  & svg {
    ${tw`w-8`}
  }
`

const HeaderMenuControls = styled.div`
  ${tw`flex items-center`}

  & > * {
    ${tw`py-4`}
  }
`

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const HeaderBackgroundImageWrapper = styled.div`
  ${tw`absolute top-0 left-0 w-full h-full z-0`}

  & .gatsby-image-wrapper {
    ${tw`top-0 left-0 w-full h-full z-1`}
    position: absolute !important;
  }

  &:before {
    ${tw`block absolute left-0 top-0 w-full h-full z-2 bg-black`}
    content: '';
    opacity: 0.12;
  }
`

const HeaderContent = styled.div`
  ${tw`relative flex flex-col justify-center`}
  min-height: 42vh;
  ${centerToContentColumn}

  > *:first-child {
    padding-top: 4rem;
  }
`

const Header = ({ children, backgroundImageId }) => {
  const result = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <HeaderWrapper
      hasBackgroundImage={!!backgroundImageId}
      colorSet="transparent"
    >
      <HeaderContainer>
        <HeaderTitle>
          <Link to="/" title={result.site.siteMetadata.title}>
            <LogoSVG />
          </Link>
        </HeaderTitle>
        <MenuLevel rootMenuItemId="6Id378BoElgMsJJd81IyP3" />
        <HeaderMenuControls>
          <LanguageSwitch />
          <ColorModeSwitch />
        </HeaderMenuControls>
      </HeaderContainer>
      <HeaderContent>{children}</HeaderContent>
      {backgroundImageId && (
        <HeaderBackgroundImageWrapper>
          <BackgroundImage
            id={backgroundImageId}
            contextKey="background"
            fit="cover"
          />
        </HeaderBackgroundImageWrapper>
      )}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
}

export default Header

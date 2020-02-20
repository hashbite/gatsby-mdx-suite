import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'
import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import { centerToContentColumn, applyColorSet } from '@gatsby-mdx-suite/helpers'

import LogoSVG from '../../assets/logo.svg'
import ColorModeSwitch from '../color-mode-switch'
import { useStaticQuery, graphql, Link } from 'gatsby'

const HeaderWrapper = styled.div(
  ({ hasBackgroundImage, ...restProps }) => css`
    ${tw`relative`}

    ${hasBackgroundImage
      ? css`
          ${applyColorSet(restProps)}
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `
      : css`
          ${tw`bg-gray-300`}
        `}
  `
)

const HeaderContainer = tw.div`absolute z-20 inset-x-0 flex p-4 items-center justify-between`

const HeaderTitle = styled.h1`
  ${tw`m-0`}

  & svg {
    width: 32px;
  }
`

const HeaderMenuControls = styled.div`
  ${tw`flex items-center`}

  & > * {
    ${tw`py-4`}
  }
`

const HeaderContent = styled.div`
  ${tw`relative z-10 py-8 flex flex-col justify-center`}
  min-height: 32vh;

  ${centerToContentColumn}
`

const BackgroundImage = tw(Image)`absolute inset-0`

const HeaderBackgroundImageWrapper = styled.div`
  ${tw`absolute inset-0 z-0`}

  & .img {
    ${tw`z-10`}
  }

  &:before {
    ${tw`block absolute z-20 inset-0 bg-black`}
    content: '';
    opacity: 0.12;
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
            style={{ position: 'static' }}
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

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'
import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import { centerToContentColumn, applyColorSet } from '@gatsby-mdx-suite/helpers'

import LogoSVG from '../../assets/logo.svg'
import ColorModeSwitch from '../color-mode-switch'
import { useStaticQuery, graphql, Link } from 'gatsby'

const HeaderWrapper = styled.div(
  ({ hasBackgroundImage, ...restProps }) => css`
    position: relative;

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
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: ${theme.spacing.s1}px;
    align-items: center;

    & > * {
      flex: 0 0 auto;

      &:not(:first-child):not(:last-child) {
        flex: 1 1 auto;
        justify-content: center;
      }
    }
  `
)

const HeaderTitle = styled.h1`
  margin: 0;
  & svg {
    width: 32px;
  }
`

const HeaderMenuControls = styled.div`
  display: flex;
  align-items: center;

  & > * {
    padding: 0 1em;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;

  & .gatsby-image-wrapper {
    position: absolute !important;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.12;
  }
`

const HeaderContent = styled.div`
  position: relative;
  min-height: 16rem;
  height: 42vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

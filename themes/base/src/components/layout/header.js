import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import tw from 'twin.macro'
import Observer from '@researchgate/react-intersection-observer'
import { useWindowWidth } from '@react-hook/window-size/throttled'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import Video from '@gatsby-mdx-suite/mdx-video/video'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

import Logo from '../../../assets/logo.svg'

import NavigationDesktop from './navigation-desktop'
import NavigationMobile from './navigation-mobile'

const HeaderWrapper = styled.div(
  ({ theme }) => css`
  ${tw`relative flex flex-col`}
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`
)

const MenuShowAnimation = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const MenuHideAnimation = keyframes`
  from {
    ${tw`fixed top-0 left-0 right-0 bg-rootBackground`}
    transform: translate3d(0, 0, 0);
  }

  to {
    ${tw`fixed top-0 left-0 right-0 bg-rootBackground`}
    transform: translate3d(0, -100%, 0);
  }
`

const HeaderTop = styled.div(
  ({ headerPassed, headerVisibleAgain, transparent, menuOpen, theme }) => css`
    ${tw`
      flex-none
      relative z-50
      `}
    ${
      !transparent
        ? css`
            ${tw`shadow-xl bg-rootBackground text-text`}
          `
        : css`
            color: ${theme.colors.white};
          `
    };

    ${
      menuOpen &&
      css`
        ${tw`bg-rootBackground text-text`}
      `
    }

    ${
      headerPassed &&
      css`
      ${tw`fixed top-0 left-0 right-0 bg-rootBackground text-text shadow-xl`}
      animation: 0.45s ${MenuShowAnimation} ease-out;
      animation-fill-mode: both;
    `
    }

    ${
      headerVisibleAgain &&
      css`
        animation: 0.3s ${MenuHideAnimation} ease-in;
      `
    }
  `
)

const HeaderContentWrapper = styled.div(
  ({ transparent }) => css`
    ${tw`
    flex-auto
    flex flex-col justify-center`}

    ${transparent
      ? css`
          min-height: 62vh;
        `
      : css`
          position: relative;
          min-height: 42vh;
        `}
  `
)

const HeaderContent = styled.div`
  ${tw`
    relative z-20
    py-16
    flex flex-col
    `}
  ${centerToContentColumn}
`

const HeaderBackgroundMediaWrapper = styled.div`
  ${tw`absolute inset-0 z-0 overflow-hidden`}

  img, video {
    ${tw`absolute inset-0 z-10 object-cover object-center w-full h-full`}
  }

  video {
    opacity: 0.6;
  }

  &:before {
    ${tw`block absolute z-20 inset-0 bg-black`}
    content: '';
    opacity: 0.32;
  }
`

/**
 * Renders the header including menu and hero element of the page.
 *
 * Can have a background image.
 *
 * @example
 * <Header colorSet="blue">
 *
 * # Some catching text
 *
 * </Header>
 * <Header backgroundImageId="randomImageId">
 *
 * # Some catching text
 *
 * </Header>
 * <Header backgroundVideoId="randomVideoId">
 *
 * # Some catching text
 *
 * </Header>
 */
const Header = ({
  children,
  backgroundImageId,
  backgroundVideoId,
  transparent,
  colorSet,
  colors,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerPassed, setHeaderPassed] = useState(false)
  const [headerVisibleAgain, setHeaderVisibleAgain] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const [isNavigationTransparent, setIsNavigationTransparent] = useState(
    transparent
  )
  const headerTopRef = useRef(null)
  const windowWidth = useWindowWidth()

  const handleHeaderIntersection = async (event) => {
    setHeaderPassed(!event.isIntersecting)
    setHeaderVisibleAgain(headerPassed && event.isIntersecting)
  }

  useEffect(() => {
    if (headerTopRef.current && !menuOpen) {
      setHeaderHeight(headerTopRef.current.getBoundingClientRect().height)
    }
  }, [headerTopRef, windowWidth, menuOpen])

  // Visual transparency depends on user config, scroll position and menu open state
  useEffect(() => {
    setIsNavigationTransparent(transparent && !headerPassed && !menuOpen)
  }, [transparent, headerPassed, menuOpen])

  const hasBackgroundMedia = !!backgroundImageId || !!backgroundVideoId

  if (!colorSet && hasBackgroundMedia) {
    colorSet = 'backgroundImage'
  }

  const renderHeaderContentArea =
    !!children || !!backgroundImageId || !!backgroundVideoId

  return (
    <ColorSet name={colorSet} {...colors}>
      <Observer onChange={handleHeaderIntersection}>
        <HeaderWrapper hasBackgroundMedia={hasBackgroundMedia}>
          <div style={{ height: headerHeight }}>
            <HeaderTop
              transparent={transparent}
              headerPassed={headerPassed}
              headerVisibleAgain={headerVisibleAgain}
              menuOpen={menuOpen}
              ref={headerTopRef}
            >
              <NavigationDesktop
                logo={<Logo />}
                isNavigationTransparent={isNavigationTransparent}
              />
              <NavigationMobile
                logo={<Logo />}
                isNavigationTransparent={isNavigationTransparent}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </HeaderTop>
          </div>
          {renderHeaderContentArea && (
            <HeaderContentWrapper transparent={transparent}>
              <HeaderContent>{children}</HeaderContent>
              {backgroundImageId && (
                <HeaderBackgroundMediaWrapper>
                  {backgroundImageId && (
                    <Image
                      id={backgroundImageId}
                      contextKey="screen"
                      fit="cover"
                    />
                  )}
                  {backgroundVideoId && (
                    <Video
                      autoPlay
                      loop
                      muted
                      controls={false}
                      id={backgroundVideoId}
                    />
                  )}
                </HeaderBackgroundMediaWrapper>
              )}
            </HeaderContentWrapper>
          )}
        </HeaderWrapper>
      </Observer>
    </ColorSet>
  )
}

Header.defaultProps = {
  colorSet: 'primary',
}

Header.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
  backgroundVideoId: propTypes.string,
  colorSet: propTypes.string,
  colors: propTypes.object,
  transparent: propTypes.bool,
}

export default Header

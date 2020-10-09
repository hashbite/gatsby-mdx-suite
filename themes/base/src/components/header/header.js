import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import Observer from '@researchgate/react-intersection-observer'
import { useWindowWidth } from '@react-hook/window-size/throttled'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

import HeaderBar from './header-bar'
import Hero from './hero'

const HeaderWrapper = styled.div(
  ({ theme, hasBackgroundMedia, shouldRenderHero }) => css`
    ${tw`relative flex flex-col`}
    background: ${theme.colors.background};
    color: ${theme.colors.text};

    ${shouldRenderHero &&
    (hasBackgroundMedia
      ? css`
          height: 61.8vh;
        `
      : css`
          height: 38.2vh;
        `)}
  `
)

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
  const [headerBarHeight, setHeaderBarHeight] = useState(null)
  const [isNavigationTransparent, setIsNavigationTransparent] = useState(
    transparent
  )
  const headerBarRef = useRef(null)
  const windowWidth = useWindowWidth()

  // Fixed header logic with ghost element
  const handleHeaderIntersection = async (event) => {
    setHeaderPassed(!event.isIntersecting)
    setHeaderVisibleAgain(headerPassed && event.isIntersecting)
  }

  useEffect(() => {
    if (headerBarRef.current) {
      setHeaderBarHeight(headerBarRef.current.getBoundingClientRect().height)
    }
  }, [headerBarRef, windowWidth])

  // Visual transparency depends on user config, scroll position and menu open state
  useEffect(() => {
    setIsNavigationTransparent(transparent && !headerPassed && !menuOpen)
  }, [transparent, headerPassed, menuOpen])

  const hasBackgroundMedia = !!backgroundImageId || !!backgroundVideoId

  const shouldRenderHero =
    !!children || !!backgroundImageId || !!backgroundVideoId

  // Fallback color set
  if (!colorSet && hasBackgroundMedia && shouldRenderHero) {
    colorSet = 'backgroundImage'
  }

  const headerBarProps = {
    headerPassed,
    headerVisibleAgain,
    menuOpen,
    isNavigationTransparent,
    setMenuOpen,
  }
  const heroProps = {
    children,
    backgroundImageId,
    backgroundVideoId,
    isNavigationTransparent,
    headerBarHeight: `${headerBarHeight}px`,
  }

  return (
    <ColorSet name={colorSet} {...colors}>
      <Observer onChange={handleHeaderIntersection}>
        <HeaderWrapper
          hasBackgroundMedia={hasBackgroundMedia}
          shouldRenderHero={shouldRenderHero}
        >
          <div style={{ height: headerBarHeight }}>
            <HeaderBar {...headerBarProps} wrapperRef={headerBarRef} />
          </div>
          {shouldRenderHero && <Hero {...heroProps} />}
        </HeaderWrapper>
      </Observer>
    </ColorSet>
  )
}

Header.defaultProps = {
  colorSet: 'primary',
  transparent: false,
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

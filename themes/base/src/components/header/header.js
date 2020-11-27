import React, { useEffect, useRef, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowWidth } from '@react-hook/window-size/throttled'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

import HeaderBar from './header-bar'
import Hero from './hero'

gsap.registerPlugin(ScrollTrigger)

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
  const [headerBarHeight, setHeaderBarHeight] = useState('auto')
  const [isNavigationTransparent, setIsNavigationTransparent] = useState(
    transparent
  )
  const headerBarRef = useRef(null)
  const windowWidth = useWindowWidth()

  // Fixed header logic with ghost element
  useEffect(() => {
    if (headerBarRef.current) {
      setHeaderBarHeight(headerBarRef.current.getBoundingClientRect().height)
    }
  }, [headerBarRef, windowWidth])

  const handleHeaderBarIntersection = useCallback(
    (isActive) => {
      setHeaderPassed(!isActive)
      setHeaderVisibleAgain(headerPassed && isActive)
    },
    [setHeaderPassed, setHeaderVisibleAgain, headerPassed]
  )

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: node,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => handleHeaderBarIntersection(isActive),
      })

      return scrollTriggerInstance?.kill
    },
    [handleHeaderBarIntersection]
  )

  // Visual transparency depends on user config, scroll position and menu open state
  useEffect(() => {
    setIsNavigationTransparent(transparent && !headerPassed && !menuOpen)
  }, [transparent, headerPassed, menuOpen])

  const hasBackgroundMedia = !!backgroundImageId || !!backgroundVideoId

  const shouldRenderHero = !!children || hasBackgroundMedia

  // Fallback color set
  if (!colorSet && shouldRenderHero) {
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
  }

  return (
    <ColorSet name={colorSet} {...colors}>
      <HeaderWrapper
        hasBackgroundMedia={hasBackgroundMedia}
        shouldRenderHero={shouldRenderHero}
        ref={initScrollTrigger}
      >
        <div style={{ height: headerBarHeight }}>
          <HeaderBar {...headerBarProps} wrapperRef={headerBarRef} />
        </div>
        {shouldRenderHero && <Hero {...heroProps} />}
      </HeaderWrapper>
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

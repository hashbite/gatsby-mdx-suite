import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css, useTheme } from '@emotion/react'
import tw from 'twin.macro'
import { useIntersection, useWindowSize } from 'react-use'

import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

import NavigationDesktop from './desktop'
import NavigationMobile from './mobile'

const NavigationBarWrapper = styled.div(
  ({
    transparent,
    textColor,
    background,
    transparentTextColor,
    transparentBackground,
    isFloating,
  }) => css`
    ${tw`shadow-xl`}
    z-index: 100;

    ${transparent && !isFloating
      ? css`
          ${tw`absolute left-0 top-0 w-full`}
          ${tw`text-white`}
          color: ${transparentTextColor};
          background: ${transparentBackground};
        `
      : css`
          color: ${textColor};
          background: ${background};
        `};

    ${isFloating && tw`fixed left-0 top-0 right-0`}
  `
)

const NavigationBar = ({
  transparent,
  sticky,
  background,
  textColor,
  transparentTextColor,
  transparentBackground,
}) => {
  const theme = useTheme()
  const { width } = useWindowSize()

  const [headerHeight, setHeaderHeight] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [positionParentNodeRef, setPositionParentNodeRef] = useState({})
  const [nodeRef, setNodeRef] = useState(null)
  const spacerRef = useRef(null)

  const handleRef = useCallback(
    (node) => {
      if (!node) {
        return
      }
      setNodeRef({ current: node })
      setPositionParentNodeRef({
        current: transparent ? node.closest('section') : spacerRef.current,
      })
    },
    [transparent]
  )

  const intersection = useIntersection(positionParentNodeRef, {
    threshold: 0.1,
  })

  const isFloating = useMemo(() => {
    if (!intersection) {
      return
    }
    const shouldFloat =
      intersection &&
      intersection.intersectionRatio <= 0.1 &&
      intersection.boundingClientRect.top <= 0

    return shouldFloat
  }, [intersection])

  useEffect(() => {
    if (nodeRef && !isFloating) {
      setHeaderHeight(nodeRef.current.offsetHeight)
    }
  }, [isFloating, width, nodeRef])

  background = selectColor(theme.colors, background)
  textColor = selectColor(theme.colors, textColor)
  transparentTextColor = selectColor(theme.colors, transparentTextColor)
  transparentBackground = selectColor(theme.colors, transparentBackground)

  return (
    <div style={{ minHeight: !transparent && headerHeight }} ref={spacerRef}>
      <NavigationBarWrapper
        transparent={transparent}
        isFloating={isFloating}
        ref={handleRef}
        background={background}
        textColor={textColor}
        transparentTextColor={transparentTextColor}
        transparentBackground={transparentBackground}
      >
        <NavigationDesktop />
        <NavigationMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Global
          styles={css`
            :root {
              --floating-header-height: ${headerHeight}px;
            }
          `}
        />
      </NavigationBarWrapper>
    </div>
  )
}

NavigationBar.defaultProps = {
  transparent: false,
  sticky: false,
  background: 'root-background',
  textColor: 'root-text',
  transparentTextColor: 'white',
  transparentBackground: 'rgba(0,0,0,0.1);',
}

NavigationBar.propTypes = {
  transparent: propTypes.bool,
  sticky: propTypes.bool,
  background: propTypes.string,
  textColor: propTypes.string,
  transparentTextColor: propTypes.string,
  transparentBackground: propTypes.string,
}

export default NavigationBar

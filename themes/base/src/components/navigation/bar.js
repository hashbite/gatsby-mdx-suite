import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from 'emotion-theming'

import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

import NavigationDesktop from './desktop'
import NavigationMobile from './mobile'
import { useKillScrollTrigger } from '@gatsby-mdx-suite/helpers/styling/gsap'

gsap.registerPlugin(ScrollTrigger)

const NavigationBarWrapper = styled.div(
  ({
    transparent,
    textColor,
    background,
    transparentTextColor,
    transparentBackground,
  }) => css`
    ${tw`shadow-xl`}
    z-index: 100;

    ${transparent
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
  const [menuOpen, setMenuOpen] = useState(false)
  const theme = useTheme()
  const [
    scrollTriggerInstancePinning,
    setScrollTriggerInstancePinning,
  ] = useState(null)
  const [scrollTriggerInstanceFade, setScrollTriggerInstanceFade] = useState(
    null
  )

  useKillScrollTrigger(scrollTriggerInstancePinning)
  useKillScrollTrigger(scrollTriggerInstanceFade)

  background = selectColor(theme.colors, background)
  textColor = selectColor(theme.colors, textColor)
  transparentTextColor = selectColor(theme.colors, transparentTextColor)
  transparentBackground = selectColor(theme.colors, transparentBackground)

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const positionParent = node.closest('section,#___gatsby')

      if (sticky) {
        setScrollTriggerInstancePinning(
          ScrollTrigger.create({
            trigger: node,
            endTrigger: 'body',
            end: 'bottom bottom-=1',
            pin: true,
            pinSpacing: false,
            pinType: 'fixed',
            invalidateOnRefresh: true,
          })
        )

        // Switch back to non-transparent rendering as soon we leave the parent section
        if (transparent) {
          setScrollTriggerInstanceFade(
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: positionParent,
                  start: `bottom-=${node.clientHeight * 2} top`,
                  end: `bottom-=${node.clientHeight} top`,
                  scrub: true,
                  // toggleActions: 'play none reverse none',
                  invalidateOnRefresh: true,
                },
              })
              .to(node, {
                color: textColor,
                backgroundColor: background,
              })
          )
        }
      }
    },
    [sticky, transparent, background, textColor]
  )
  return (
    <NavigationBarWrapper
      transparent={transparent}
      ref={initScrollTrigger}
      background={background}
      textColor={textColor}
      transparentTextColor={transparentTextColor}
      transparentBackground={transparentBackground}
    >
      <NavigationDesktop />
      <NavigationMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </NavigationBarWrapper>
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

import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NavigationDesktop from './desktop'
import NavigationMobile from './mobile'

gsap.registerPlugin(ScrollTrigger)

const NavigationBarWrapper = styled.div(
  ({ transparent, positionAbsolute }) => css`
    ${tw`shadow-xl`}
    z-index: 9999;

    ${positionAbsolute &&
    css`
      ${tw`absolute left-0 top-0 w-full`}
    `}

    ${transparent
      ? css`
          ${tw`text-white`}
          background: rgba(0,0,0,0.1);
        `
      : css`
          ${tw`bg-root-background text-text`}
        `};
  `
)

const NavigationBar = ({ transparent, sticky }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [renderTransparent, setRenderTransparent] = useState(transparent)
  const positionAbsolute = transparent

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const positionParent = node.closest('section,#___gatsby')
      const instances = []

      if (sticky) {
        instances.push(
          ScrollTrigger.create({
            trigger: node,
            pin: true,
            pinSpacing: false,
            endTrigger: 'body',
            end: 'bottom bottom-=1',
            pinType: 'fixed',
          })
        )

        // Switch back to non-transparent rendering as soon we leave the parent section
        if (transparent) {
          instances.push(
            ScrollTrigger.create({
              onToggle: ({ isActive, progress }) => {
                setRenderTransparent(progress < 1)
              },
              trigger: positionParent,
            })
          )
        }
      }

      return () => {
        instances.forEach((t) => t.kill())
      }
    },
    [sticky, transparent]
  )
  return (
    <NavigationBarWrapper
      transparent={renderTransparent}
      ref={initScrollTrigger}
      positionAbsolute={positionAbsolute}
    >
      <NavigationDesktop />
      <NavigationMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </NavigationBarWrapper>
  )
}

NavigationBar.defaultProps = {
  transparent: false,
  sticky: true,
}

NavigationBar.propTypes = {
  transparent: propTypes.bool,
  sticky: propTypes.bool,
}

export default NavigationBar

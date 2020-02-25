import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useBreakpointIndex } from '@theme-ui/match-media'
import tw from 'twin.macro'
import 'tailwindcss/dist/base.css'

const StyledNav = styled.nav(
  ({ isOpen }) => css`
    ${tw`
      relative
      pb-8 px-4
      text-sm
      bg-gray-200 overflow-x-scroll
    `}

    grid-area: nav;

    ${isOpen ? tw`w-64` : tw`w-0`}
  `
)

const Trigger = styled.button(
  ({ isOpen }) => css`
    transform-origin: center center;
    position: absolute;

    ${isOpen
      ? css`
          top: 0.5rem;
          right: 1rem;
        `
      : css`
          top: 1rem;
          right: 50%;
          transform: translate(50%, 100%) rotate(-90deg);
          line-height: 1;
        `}
  `
)
const Content = styled.div(
  ({ isOpen }) => css`
    ${!isOpen && tw`hidden`}
  `
)

const Nav = ({ children }) => {
  const currentBreakpoint = useBreakpointIndex()
  const [lastBreakpoint, setLastBreakpoint] = useState(currentBreakpoint)
  const [isOpen, setIsOpen] = useState(currentBreakpoint > 1)

  // Automatically open & close menu when screen width changes
  useEffect(() => {
    if (currentBreakpoint !== lastBreakpoint) {
      const shouldCloseMenu =
        isOpen && currentBreakpoint <= 1 && lastBreakpoint > currentBreakpoint
      const shouldOpenMenu =
        !isOpen && currentBreakpoint > 1 && lastBreakpoint < currentBreakpoint
      if (shouldCloseMenu) {
        setIsOpen(false)
      }
      if (shouldOpenMenu) {
        setIsOpen(true)
      }
      setLastBreakpoint(currentBreakpoint)
    }
  }, [currentBreakpoint])

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <StyledNav isOpen={isOpen}>
      <Trigger onClick={handleTriggerClick} isOpen={isOpen}>
        {isOpen ? 'close' : 'open'}
      </Trigger>
      <Content isOpen={isOpen}>{children}</Content>
    </StyledNav>
  )
}

Nav.propTypes = {
  children: propTypes.node.isRequired,
}

export default Nav

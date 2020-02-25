import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useBreakpointIndex } from '@theme-ui/match-media'
import tw from 'twin.macro'
import 'tailwindcss/dist/base.css'

const StyledNav = styled.nav(
  ({ isOpen }) => css`
    grid-area: nav;

    ${tw`
      grid
      text-sm
      bg-gray-700 overflow-x-scroll
      text-white
    `}

    grid-template-columns: min-content 1fr;
  `
)

const Trigger = styled.button(
  ({ isOpen }) => css`
    ${tw`
      block relative
      w-6
      text-gray-300
      bg-gray-800 border-l border-color-gray-600
    `}

    &:focus {
      ${tw`outline-none`}
    }
  `
)

const TriggerLabel = styled.div`
  position: absolute;
  top: 1rem;
  right: 50%;
  transform-origin: center center;
  transform: translate(50%, 100%) rotate(-90deg);
  line-height: 1;
`
const Content = styled.div(
  ({ isOpen }) => css`
    ${isOpen ? tw`w-64` : tw`overflow-hidden w-0`}
    transition: width .15s ease;
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
      <Content isOpen={isOpen}>{children}</Content>
      <Trigger onClick={handleTriggerClick} isOpen={isOpen}>
        <TriggerLabel>{isOpen ? 'close' : 'open'}</TriggerLabel>
      </Trigger>
    </StyledNav>
  )
}

Nav.propTypes = {
  children: propTypes.node.isRequired,
}

export default Nav

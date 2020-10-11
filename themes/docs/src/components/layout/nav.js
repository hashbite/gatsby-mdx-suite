import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'

const MENU_TRIGGER_BREAKPOINT = 'md'

const StyledNav = styled.nav(
  ({ gridArea, inverted }) => css`
    grid-area: ${gridArea};

    ${tw`
      grid
      text-sm
      bg-gray-700 overflow-x-scroll
      text-white
    `}
    ${inverted
      ? css`
          grid-template-columns: 1fr min-content;

          ${Trigger} {
            grid-area: left;
          }
          ${Content} {
            grid-area: right;
          }
        `
      : css`
          grid-template-columns: min-content 1fr;

          ${Trigger} {
            grid-area: right;
          }
          ${Content} {
            grid-area: left;
          }
        `}
    grid-template-areas: "left right";
  `
)

const Trigger = styled.button`
  ${tw`
    block relative
    w-6
    text-gray-300
    bg-gray-800 border-l border-gray-600
  `}

  &:focus {
    ${tw`outline-none`}
  }
`

const TriggerLabel = styled.div`
  position: absolute;
  top: 2rem;
  right: 50%;
  transform-origin: center center;
  transform: translate(50%, 100%) rotate(-90deg);
  line-height: 1;
  white-space: nowrap;
`
const Content = styled.div(
  ({ isOpen }) => css`
    max-width: 0;
    ${isOpen &&
    css`
      max-width: 360px;
    `}
    width: 100vw;
    transition: max-width 0.15s ease;
  `
)

const Nav = ({ children, gridArea, inverted, title }) => {
  const breakpoints = useBreakpoint()
  const [isOpen, setIsOpen] = useState(breakpoints[MENU_TRIGGER_BREAKPOINT])

  const handleTriggerClick = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [])

  return (
    <StyledNav isOpen={isOpen} gridArea={gridArea} inverted={inverted}>
      <Content isOpen={isOpen}>{children}</Content>
      <Trigger onClick={handleTriggerClick} isOpen={isOpen}>
        <TriggerLabel>
          {title} &nbsp;{isOpen ? '↥' : '↧'}
        </TriggerLabel>
      </Trigger>
    </StyledNav>
  )
}

Nav.defaultProps = {
  gridArea: 'nav',
  inverted: false,
}

Nav.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
  gridArea: propTypes.string,
  inverted: propTypes.bool,
}

export default Nav

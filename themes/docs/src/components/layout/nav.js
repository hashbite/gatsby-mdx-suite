import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

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
const Content = styled.div(
  () => css`
    max-width: 360px;
    width: 100vw;
    transition: max-width 0.15s ease;
  `
)

const Nav = ({ children, gridArea, inverted }) => {
  return (
    <StyledNav gridArea={gridArea} inverted={inverted}>
      <Content>{children}</Content>
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

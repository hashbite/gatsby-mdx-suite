import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MenuTitle from './menu-title'

const MenuLi = styled.li(
  ({ theme, active, hiddenOnMobile }) => css`
    padding: 0 ${theme.spacing.s1}px;

    ${active &&
      css`
        ${MenuTitle} {
          font-weight: bold;
        }
      `}
    ${hiddenOnMobile &&
      css`
        ${MenuTitle} {
          display: none;
          @media (min-width: ${theme.breakpoints[2]}) {
            display: block;
          }
        }
      `}
  `
)

export default MenuLi

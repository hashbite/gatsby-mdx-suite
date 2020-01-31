import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MenuTitle from './menu-title'

const MenuLi = styled.li(
  ({ theme, active }) => css`
    padding: 0 ${theme.spacing.s1}px;

    ${active &&
      css`
        ${MenuTitle} {
          font-weight: bold;
        }
      `}
  `
)

export default MenuLi

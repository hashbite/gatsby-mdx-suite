import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import MenuTitle from './menu-title'

const MenuLi = styled.li(
  ({ active }) => css`
    ${tw`px-4`}

    ${active &&
      css`
        ${MenuTitle} {
          ${tw`font-bold`}
        }
      `}
  `
)

export default MenuLi

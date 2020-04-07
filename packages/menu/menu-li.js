import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const MenuLi = styled.li(
  ({ active }) => css`
    ${tw`px-4`}
  `
)

export default MenuLi

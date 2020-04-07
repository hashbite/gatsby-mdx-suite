import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Link from '@gatsby-mdx-suite/mdx-link/link'

const MenuLink = styled(Link)(
  ({ active }) =>
    css`
      ${active && tw`font-bold`}
    `
)

export default MenuLink

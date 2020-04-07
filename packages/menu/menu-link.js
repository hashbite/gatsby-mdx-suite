import styled from '@emotion/styled'
import tw from 'twin.macro'

import Link from '@gatsby-mdx-suite/mdx-link/link'

const MenuLink = styled(Link)`
  &.active {
    ${tw`font-bold`}
  }
  &:hover {
    ${tw`underline`}
  }
`

export default MenuLink

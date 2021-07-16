import { css } from '@emotion/react'
import tw from 'twin.macro'

export default css`
  &:not(:last-child) {
    ${tw`mb-content-gap`}
  }
`

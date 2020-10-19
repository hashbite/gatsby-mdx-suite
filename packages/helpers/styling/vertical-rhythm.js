import { css } from '@emotion/core'
import tw from 'twin.macro'

export default css`
  &:not(:last-child) {
    ${tw`mb-content-gap`}
  }
`

import { css } from '@emotion/core'
import tw from 'twin.macro'

export const focusStyle = tw`focus:outline-none focus:shadow focus:border-primary`

export const textFieldStyle = css`
  ${tw`
    appearance-none
    border border-gray-300
    w-full py-0 px-3
    text-gray-700
  `}
  min-height: 2rem;
  line-height: 2rem;
  ${focusStyle}

  &.placeholder, &::placeholder {
    ${tw`text-gray-500`}
  }
`

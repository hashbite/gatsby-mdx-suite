import { css } from '@emotion/core'

const applyContentGap = ({ theme }) => css`
  &:not(:first-child) {
    margin-top: ${theme.sizes.contentGap};
  }
  &:not(:last-child) {
    margin-bottom: ${theme.sizes.contentGap};
  }
`

export default applyContentGap

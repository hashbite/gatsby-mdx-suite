import { css } from '@emotion/core'

const applyContentGap = ({ theme }) => css`
  &:not(:first-child) {
    margin-top: ${theme.spacing['content-gap']};
  }
  &:not(:last-child) {
    margin-bottom: ${theme.spacing['content-gap']};
  }
`

export default applyContentGap

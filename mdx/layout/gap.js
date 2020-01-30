import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Gap = styled.div(
  ({ theme, gap = '2' }) => css`
    margin-top: ${theme.spacing[`s${gap}`]}px;
  `
)

export default Gap

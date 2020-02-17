import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Gap = styled.div(
  ({ theme, gap = '4' }) => css`
    height: ${theme.spacing[`s${gap}`]}px;
  `
)

export default Gap

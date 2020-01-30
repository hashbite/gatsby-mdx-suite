import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const Content = styled.div`
  ${({ theme: { breakpoints, sizes } }) => css`
    margin: 0 auto;
    max-width: ${sizes.maxContentWidth + sizes.gridGutter * 2}px;

    /* Gradually increase horizontal content padding based on viewport width */
    padding: 0 2vw;
    @media (min-width: ${breakpoints[0]}) {
      padding: 0 4vw;
    }
    @media (min-width: ${breakpoints[1]}) {
      padding: 0 8vw;
    }
    @media (min-width: ${breakpoints[2]}) {
      padding: 0 15vw;
    }
  `}
`

export default Content

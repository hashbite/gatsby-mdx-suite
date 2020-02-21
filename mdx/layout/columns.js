import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const StyledColumns = styled.div(
  ({ theme }) => css`
    ${tw`grid my-16 grid-cols-6`}
    grid-gap: ${theme.config.gridDefaultGap};

    > * {
      ${tw`col-span-6 sm:col-span-3 md:col-span-2`}
    }

    /* Ensure all images are responsive within the grid. */
    img,
    svg,
    video {
      ${tw`w-full h-auto`}
    }
  `
)

/**
 * Renders each children as a column.
 *
 * Will have 3 columns on big screens, 2 on medium screens and 1 on small screens.
 */
const Columns = (props) => <StyledColumns {...props} />

export default Columns

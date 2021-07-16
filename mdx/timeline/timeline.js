import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import verticalRhythm from '@gatsby-mdx-suite/helpers/styling/vertical-rhythm'

const StyledTimeline = styled.div(
  ({ theme }) => css`
    ${tw`flex flex-col w-full sm:grid`}
    ${verticalRhythm}

    @media (min-width: ${theme.screens.md}) {
      ${tw`grid gap-grid-gap`}
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  `
)

/**
 * Creates a timeline element
 *
 * @example
 * <Timeline>
 * <TimelineEntry>First</TimelineEntry>
 * <TimelineEntry>Second</TimelineEntry>
 * <TimelineEntry>Third</TimelineEntry>
 * </Timeline>
 */
const Timeline = (props) => <StyledTimeline {...props} />

export default Timeline

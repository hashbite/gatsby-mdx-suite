import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const StyledTimeline = styled.div(
  ({ theme }) => css`
    ${tw`flex flex-col w-full sm:grid my-content-gap`}

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

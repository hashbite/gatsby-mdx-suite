import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const TimelineEntryLabel = styled.div``

const TimelineEntryWrapper = styled.div(
  ({ theme, bubbleSize }) => css`
  ${tw`relative pr-4 py-4`}

  ${TimelineEntryLabel} {
    ${tw`absolute z-10 border border-gray-500 rounded-full`}
    ${tw`text-sm text-gray-500 text-center`}

    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: ${bubbleSize}px;
    height: ${bubbleSize}px;

    /* Ensure visually centered text */
    letter-spacing: -0.05em;
    line-height: ${bubbleSize - 4}px;
  }

  &:not(:first-of-type):before,
  &:not(:last-of-type):after {
    content: '';
    ${tw`absolute z-0 block h-auto bg-gray-500 opacity-25`}
    right: ${bubbleSize / 2 - 1}px;
    top: calc(50% + ${bubbleSize / 2 + 12}px);
    bottom: calc(50% + ${bubbleSize / 2 + 12}px);
    width: 2px;
  }

  &:not(:first-of-type):before {
    top: 0;
  }
  &:not(:last-of-type):after  {
    bottom: 0;
  }


  @media (min-width: ${theme.breakpoints[0]}) and (max-width: calc(${
    theme.breakpoints[1]
  } - 1px)) {
    ${tw`w-1/2 px-16 pb-8 text-right`}

    ${TimelineEntryLabel} {
      right: -${bubbleSize / 2}px;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      right: -1px;
    }

    &:nth-of-type(2n) {
      ${tw`text-left`}
      margin-left: 50%;

      ${TimelineEntryLabel} {
        left: -${bubbleSize / 2}px;
        right: auto;
      }

      &:before,
      &:after {
        left: -1px;
        right: auto;
      }
    }
  }

  @media (min-width: ${theme.breakpoints[1]}) {
    padding: calc(${bubbleSize}px + ${theme.sizes['8']}) ${theme.sizes['4']} ${
    theme.sizes['4']
  };
    ${tw`w-auto m-0`}

    ${TimelineEntryLabel} {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      top: ${bubbleSize / 2 - 1}px;
      left: calc(50% + ${bubbleSize / 2 + 12}px);
      right: calc(50% + ${bubbleSize / 2 + 12}px);
      height: 2px;
      width: auto;
    }

    &:not(:first-child):before {
      left: calc(${theme.sizes.gridGap});
    }
    &:not(:last-child):after  {
      right: calc(${theme.sizes.gridGap});
    }
  }

  /* ensure bullet points are next to the text*/
  & ul,
  & ol {
    ${tw`inline-block text-left`}
  }
`
)
/**
 * Creates an entry for a `<Timeline/>` component.
 *
 * @example
 * <Timeline>
 * <TimelineEntry label="1">First</TimelineEntry>
 * <TimelineEntry label="2">Second</TimelineEntry>
 * <TimelineEntry label="3">Third</TimelineEntry>
 * </Timeline>
 * @example
 * <Timeline>
 * <TimelineEntry bubbleSize="112" label="First">First</TimelineEntry>
 * <TimelineEntry bubbleSize="112" label="Second">Second</TimelineEntry>
 * <TimelineEntry bubbleSize="112" label="Third">Third</TimelineEntry>
 * </Timeline>
 */
export function TimelineEntry({ label, bubbleSize, children }) {
  return (
    <TimelineEntryWrapper bubbleSize={bubbleSize}>
      <TimelineEntryLabel>{label}</TimelineEntryLabel>
      {children}
    </TimelineEntryWrapper>
  )
}

TimelineEntry.defaultProps = {
  label: '★',
  bubbleSize: 56,
}

TimelineEntry.propTypes = {
  label: propTypes.string,
  children: propTypes.node.isRequired,
  bubbleSize: propTypes.number,
}

export default TimelineEntry

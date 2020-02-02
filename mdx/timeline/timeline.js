import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const bubbleSize = 56

export const Timeline = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.spacing.s4}px 0;

    @media (min-width: ${theme.breakpoints[1]}) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      grid-gap: ${theme.sizes.gridGutter}px;
    }
  `
)

const TimelineEntryLabel = styled.div(({ theme, label = '' }) => css``)

const TimelineEntryWrapper = styled.div(
  ({ theme, label = '1.' }) => css`
  box-sizing: border-box;
  position: relative;
  padding: 0 ${bubbleSize + theme.spacing.s1}px
    ${theme.spacing.s2}px 0;

  ${TimelineEntryLabel} {
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: ${bubbleSize}px;
    height: ${bubbleSize}px;
    border-radius: 100%;
    border: 2px solid ${theme.colors.ash};
    font-size: 0.85em;
    color: ${theme.colors.ash};

    /* Ensure visually centered text */
    letter-spacing: -0.05em;
    line-height: 52px;
    text-align: center;
  }

  &:not(:first-child):before,
  &:not(:last-child):after {
    content: '';
    position: absolute;
    z-index: 1;
    right: ${bubbleSize / 2 - 1}px;
    top: calc(50% + ${bubbleSize / 2 + 12}px);
    bottom: calc(50% + ${bubbleSize / 2 + 12}px);
    width: 2px;
    height: auto;
    background: ${theme.colors.ash};
    opacity: 0.3;
  }

  &:not(:first-child):before {
    top: 0;
  }
  &:not(:last-child):after  {
    bottom: 0;
  }


  @media (min-width: ${theme.breakpoints[0]}) and (max-width: calc(${
    theme.breakpoints[1]
  } - 1px)) {
    width: 50%;
    padding: 0 ${theme.spacing.s4}px
      ${theme.spacing.s2}px;
    text-align: right;

    ${TimelineEntryLabel} {
      right: -${bubbleSize / 2}px;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      right: -1px;
    }

    &:nth-of-type(2n) {
      margin-left: 50%;
      text-align: left;

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
    padding: ${bubbleSize + theme.spacing.s2}px ${theme.spacing.s1}px ${
    theme.spacing.s1
  }px;
    width: auto;
    margin: 0;

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
      left: ${(theme.sizes.gridGutter / 2) * -1}px;
    }
    &:not(:last-child):after  {
      right: ${(theme.sizes.gridGutter / 2) * -1}px;
    }
  }

  /* ensure bullet points are next to the text*/
  & ul,
  & ol {
    display: inline-block;
    text-align: left;
  }
`
)

export function TimelineEntry({ label, children }) {
  return (
    <TimelineEntryWrapper>
      <TimelineEntryLabel>{label}</TimelineEntryLabel>
      {children}
    </TimelineEntryWrapper>
  )
}

TimelineEntry.propTypes = {
  label: propTypes.string,
  children: propTypes.node.isRequired,
}

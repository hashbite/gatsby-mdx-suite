import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { css } from '@emotion/core'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'
import Section from './section'

// Shortcuts to ease up editor UX: start, end -> flex-start, flex-end; center -> center
// @todo move to helpers
const extendPositionArgument = (value) =>
  value === 'center' ? value : `flex-${value}`

const ViewportWrapper = styled.div(
  ({ horizontalAlign, verticalAlign, hasBackgroundImage, ...restProps }) => {
    if (hasBackgroundImage && !restProps.colorSet) {
      restProps.colorSet = 'transparent'
    }
    return css`
    ${tw`relative min-h-screen flex flex-col`}
      align-items: ${extendPositionArgument(horizontalAlign)};
      justify-content: ${extendPositionArgument(verticalAlign)};

      ${applyColorSet({ ...restProps })}

      ${hasBackgroundImage &&
        css`
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `}
    `
  }
)

const ViewportContent = styled(Section)`
  ${tw`relative z-10 flex flex-col`}
  align-items: ${({ horizontalAlign }) =>
    extendPositionArgument(horizontalAlign)};
`

const BackgroundImageWrapper = styled.div`
  ${tw`absolute z-0 inset-0`}

  /* Hack gatsby-image to act as background image */
  & .gatsby-image-wrapper {
    position: static !important;
  }

  & img {
    height: 100%;
  }
`
/**
 * A viewport is always as big as the browser window of the user.
 *
 * By default, given content will be centered vertically and horizontally.
 *
 * Supports background images.
 * @example
 * <Viewport>
 *
 * # I'll stand out.
 *
 * </Viewport>
 * <Viewport backgroundImageId="randomPictureId">
 *
 * # Well, then I'll stand out for sure.
 *
 * </Viewport>
 */
export default function Viewport({
  children,
  backgroundImageId,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  ...restProps
}) {
  return (
    <ViewportWrapper
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      hasBackgroundImage={!!backgroundImageId}
      {...restProps}
    >
      {backgroundImageId && (
        <BackgroundImageWrapper>
          <Image contextKey="background" id={backgroundImageId} fit="cover" />
        </BackgroundImageWrapper>
      )}
      {children && (
        <ViewportContent horizontalAlign={horizontalAlign}>
          {children}
        </ViewportContent>
      )}
    </ViewportWrapper>
  )
}

Viewport.propTypes = {
  children: propTypes.node,
  /** image id to display as background image */
  backgroundImageId: propTypes.string,
  /** horizontal content alignment */
  horizontalAlign: propTypes.string,
  /** vertical content alignment */
  verticalAlign: propTypes.string,
  /* Apply color set to this element and all children */
  colorSet: propTypes.string,
  /* Set background color for this element */
  backgroundColor: propTypes.string,
  /* Set primary color for this element and all children */
  primaryColor: propTypes.string,
  /* Set secondary color for this element and all children */
  secondaryColor: propTypes.string,
}

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { css } from '@emotion/core'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import convertToFlexAlignment from '@gatsby-mdx-suite/helpers/styling/convert-to-flex-alignment'

import Section from './section'

const ViewportWrapper = styled.div(
  ({ horizontalAlign, verticalAlign, hasBackgroundImage, theme }) => {
    return css`
    ${tw`relative min-h-screen flex flex-col overflow-hidden`}
      align-items: ${horizontalAlign};
      justify-content: ${verticalAlign};

      background: ${theme.colors.background};
      color: ${theme.colors.text};

      ${
        hasBackgroundImage &&
        css`
          ${tw`text-white`}
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `
      }
    `
  }
)

const ViewportContent = styled(Section)`
  ${tw`relative z-10 flex flex-col`}
  align-items: ${({ horizontalAlign }) => horizontalAlign};
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
 * <Viewport colorSet="indigo">
 *
 * # Me as well :)
 *
 * </Viewport>
 */
export default function Viewport({
  children,
  backgroundImageId,
  horizontalAlign,
  verticalAlign,
  colorSet,
  colors,
}) {
  return (
    <ColorSet name={colorSet} {...colors}>
      <ViewportWrapper
        verticalAlign={convertToFlexAlignment(verticalAlign)}
        horizontalAlign={convertToFlexAlignment(horizontalAlign)}
        hasBackgroundImage={!!backgroundImageId}
      >
        {backgroundImageId && (
          <BackgroundImageWrapper>
            <Image contextKey="background" id={backgroundImageId} fit="cover" />
          </BackgroundImageWrapper>
        )}
        {children && (
          <ViewportContent
            horizontalAlign={convertToFlexAlignment(horizontalAlign)}
          >
            {children}
          </ViewportContent>
        )}
      </ViewportWrapper>
    </ColorSet>
  )
}

Viewport.defaultProps = {
  horizontalAlign: 'center',
  verticalAlign: 'center',
  colorSet: null,
  colors: {},
}

Viewport.propTypes = {
  children: propTypes.node,
  /** image id to display as background image */
  backgroundImageId: propTypes.string,
  /** horizontal content alignment */
  horizontalAlign: propTypes.string,
  /** vertical content alignment */
  verticalAlign: propTypes.string,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
}

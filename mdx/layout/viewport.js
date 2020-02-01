import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Image from '@gatsby-mdx-suite/mdx-basic/image'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'

// Shortcuts to ease up editor UX: start, end -> flex-start, flex-end; center -> center
// @todo move to helpers
const extendPositionArgument = (value) =>
  value === 'center' ? value : `flex-${value}`

const ViewportWrapper = styled.div(
  ({ horizontalAlign, verticalAlign, hasBackgroundImage, ...restProps }) => {
    return css`
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: ${extendPositionArgument(horizontalAlign)};
      justify-content: ${extendPositionArgument(verticalAlign)};

      ${applyColorSet({ ...restProps })}

      ${hasBackgroundImage &&
        css`
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `}

      /* Ensure all images are responsive within the viewport. */
      img,
      svg,
      video {
        max-width: 100%;
        height: auto;
      }
    `
  }
)

const ViewportContent = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontalAlign }) =>
    extendPositionArgument(horizontalAlign)};
`

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & .gatsby-image-wrapper {
    position: absolute !important;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default function Viewport({
  children,
  backgroundImageId,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  ...restProps
}) {
  const backgroundImage = backgroundImageId && (
    <Image id={backgroundImageId} contextKey="background" objectFit="cover" />
  )

  return (
    <ViewportWrapper
      hasImage={!!backgroundImageId}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      hasBackgroundImage={!!backgroundImageId}
      {...restProps}
    >
      {children && (
        <ViewportContent horizontalAlign={horizontalAlign}>
          {children}
        </ViewportContent>
      )}
      {backgroundImage && (
        <BackgroundImageWrapper>{backgroundImage}</BackgroundImageWrapper>
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

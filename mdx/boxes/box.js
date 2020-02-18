import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'

import BaseBox from './base-box'

const StyledBaseBox = styled(BaseBox, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(applyColorSet)

const BoxContent = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  ({ scale, theme: { breakpoints }, minSize }) => css`
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${minSize >= 12 ? '2rem' : '1rem'};

    @media screen and (min-width: ${breakpoints[0]}) {
      ${scale &&
        scale !== 1 &&
        css`
          transform: scale(${scale});
        `}
    }
  `
)

const BackgroundImageWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  ({ scale }) => css`
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    ${scale &&
      scale !== 1 &&
      css`
        transform: scale(${scale});
      `}
  `
)

const Box = ({
  children,
  scale,
  backgroundImageFit,
  backgroundImageId,
  backgroundImagePosition,
  ...boxProps
}) => {
  const minSize = Math.min(
    ...[boxProps.width, boxProps.height].filter((size) => size > 0)
  )
  return (
    <StyledBaseBox {...boxProps}>
      {children && (
        <BoxContent scale={scale} minSize={minSize}>
          {children}
        </BoxContent>
      )}
      {backgroundImageId && (
        <BackgroundImageWrapper
          scale={scale}
          backgroundImageFit={backgroundImageFit}
          backgroundImagePosition={backgroundImagePosition}
        >
          <Image
            id={backgroundImageId}
            fit={backgroundImageFit}
            position={backgroundImagePosition}
          />
        </BackgroundImageWrapper>
      )}
    </StyledBaseBox>
  )
}

Box.defaultProps = {
  ...BaseBox.defaultProps,
  backgroundImageId: null,
  backgroundImageFit: 'cover',
  backgroundImagePosition: 'center center',
  scale: 1,
}

Box.propTypes = {
  ...BaseBox.propTypes,
  // Scale factor of the content & background image of the box. Usually a value between 0.1 and 2.
  scale: propTypes.number,
  // Id of the background image
  backgroundImageId: propTypes.string,
  /**
   * Set how the background image should be fit into the box.
   *
   * Possible options:
   *
   * * fill
   * * contain
   * * cover
   * * none
   * * scale-down
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  backgroundImageFit: propTypes.string,
  /**
   * Set how the background image should be positioned within the box.
   *
   * Takes two values, one for the horizontal and one for the vertical axis.
   *
   * Example values:
   *
   * * center bottom
   * * 2rem center
   * * top right
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   */
  backgroundImagePosition: propTypes.string,
  /* Set a color set for this box */
  colorSet: propTypes.string,
  /* Set background color for this element */
  backgroundColor: propTypes.string,
  /* Set primary color for this element and all children */
  primaryColor: propTypes.string,
  /* Set secondary color for this element and all children */
  secondaryColor: propTypes.string,
}

export default Box

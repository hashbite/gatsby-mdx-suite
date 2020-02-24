import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

import Link from '@gatsby-mdx-suite/mdx-link/link'
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

/**
 * A `<Box />` has a defined size of width and height.
 *
 * It will be displayed within a `<Boxes />` grid, can have background images and can be colored.
 *
 * @example
 * <Boxes>
 *   <Box backgroundColor="tomato">
 *
 *   # This is a heading
 *
 *   with some example text
 *
 *   </Box>
 *   <Box backgroundColor="tomato" />
 * </Boxes>
 */
const Box = ({
  children,
  scale,
  backgroundImageFit,
  backgroundImageId,
  backgroundImagePosition,
  linkId,
  href,
  hash,
  title,
  ...boxProps
}) => {
  const minSize = Math.min(
    ...[boxProps.width, boxProps.height].filter((size) => size > 0)
  )
  const linkProps = { id: linkId, href, hash, title }
  const boxContent = (
    <>
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
    </>
  )
  return (
    <StyledBaseBox {...boxProps}>
      {linkId || href ? <Link {...linkProps}>{boxContent}</Link> : boxContent}
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
  /* Id of an internal page to link to */
  linkId: propTypes.string,
  /* URI of an external page to link to */
  href: propTypes.string,
  /* Option hash to attach to the link href */
  hash: propTypes.string,
  /* Optional title. Should be set for a11y and seo reasons when link has non-text content. */
  title: propTypes.string,
}

export default Box

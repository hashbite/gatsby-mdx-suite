import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import isPropValid from '@emotion/is-prop-valid'

import Link from '@gatsby-mdx-suite/mdx-link/link-renderer'
import Image from 'gatsby-theme-mdx-suite-core/src/components/image'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

import BaseBox from './base-box'

const shouldForwardProp = (prop) =>
  isPropValid(prop) &&
  !['scale', 'colors', 'width', 'height', 'href', 'hash'].includes(prop)

const StyledBaseBox = styled(BaseBox, { shouldForwardProp })(
  ({ theme }) => css`
    background: ${theme.background};
    color: ${theme.color};
  `
)

const BoxContent = styled('div', { shouldForwardProp })(
  ({ scale, theme: { screens }, minSize }) => css`
    position: relative;
    z-index: 2;
    padding: ${minSize >= 12 ? '2rem' : '1rem'};

    @media screen and (min-width: ${screens.sm}) {
      ${scale &&
      scale !== 1 &&
      css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform: scale(${scale});
      `}
    }
  `
)

const BackgroundImageWrapper = styled('div', { shouldForwardProp })(
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
 * <Section>
 * <Boxes>
 * <Box>
 *
 * # No color set
 *
 * </Box>
 * <Box colorSet="red">
 *
 * # Color set red
 *
 * </Box>
 * <Box colors={{background: "#321123", text: "#fff"}}>
 *
 * # Custom Colors
 *
 * </Box>
 * <Box colorSet="blue" colors={{background: "#123456"}}>
 *
 * # Set and custom Colors
 *
 * </Box>
 * <Animate show="fadeIn 3s">
 * <Box colorSet="green">
 *
 * # Fade in animation
 *
 * </Box>
 * </Animate>
 * <Box colorSet="yellow">
 * <Animate show="fadeInRight 3s 0.5s">
 *
 * # Fly in animation
 *
 * </Box>
 * </Animate>
 * </Boxes>
 * </Section>
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
  colorSet,
  colors,
  ...boxProps
}) => {
  const minSize = Math.min(
    ...[boxProps.width, boxProps.height].filter((size) => size > 0)
  )
  const linkProps = { id: linkId, href, hash, title }
  let boxContent = (
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
  if (linkId) {
    boxContent = <Link {...linkProps}>{boxContent}</Link>
  }
  return (
    <ColorSet name={colorSet} {...colors}>
      <StyledBaseBox {...boxProps}>{boxContent}</StyledBaseBox>
    </ColorSet>
  )
}

Box.defaultProps = {
  ...BaseBox.defaultProps,
  backgroundImageId: null,
  backgroundImageFit: 'cover',
  backgroundImagePosition: 'center center',
  scale: 1,
  colorSet: null,
  colors: {},
}

Box.propTypes = {
  ...BaseBox.propTypes,
  // Scale factor of the content & background image of the box. Usually a value between 0.1 and 2.
  scale: propTypes.oneOfType([propTypes.number, propTypes.string]),
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
  /** Id of an internal page to link to */
  linkId: propTypes.string,
  /** URI of an external page to link to */
  href: propTypes.string,
  /** Option hash to attach to the link href */
  hash: propTypes.string,
  /** Optional title. Should be set for a11y and seo reasons when link has non-text content. */
  title: propTypes.string,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
}

export default Box

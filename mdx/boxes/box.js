import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { cx } from 'emotion'
import isPropValid from '@emotion/is-prop-valid'
import Observer from '@researchgate/react-intersection-observer'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'

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
  ({ scale, theme: { breakpoints }, minSize }) => css`
    position: relative;
    z-index: 2;
    padding: ${minSize >= 12 ? '2rem' : '1rem'};

    @media screen and (min-width: ${breakpoints[0]}) {
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
 * <Box colorSet="green" showAnimation="fadeIn 3s">
 *
 * # Fade in animation
 *
 * </Box>
 * <Box colorSet="green" showAnimation="fadeInRight 3s 0.5s">
 *
 * # Fly in animation
 *
 * </Box>
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
  showAnimation,
  ...boxProps
}) => {
  const { animationClass, animationObserverProps } = useAnimation({
    show: showAnimation,
  })

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
  if (showAnimation) {
    boxContent = (
      <Observer {...animationObserverProps}>
        <div>{boxContent}</div>
      </Observer>
    )
    boxProps.className = cx(boxProps.className, animationClass)
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
  /** Apply show animation */
  showAnimation: propTypes.string,
}

export default Box

import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import Image from '@gatsby-mdx-suite/mdx-image/image'

import { Slide } from 'pure-react-carousel'

const StyledSlide = styled(Slide)``

const SlideContent = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  () => css`
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
  `
)

const SlideBackgroundImageWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  () => css`
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `
)
/**
 * Creates a carousel slide for. Must be within a `<BoxCarousel />` component.
 *
 * @example
 * <Boxes>
 * <BoxCarousel>
 * <BoxCarouselSlide backgroundImageId="randomPictureId">
 *
 * # Wow
 *
 * Slides can have any content that fits. Just:
 *
 * Make sure to keep empty lines between MDX and MD.
 *
 * </BoxCarouselSlide>
 * <BoxCarouselSlide backgroundImageId="randomPictureId" />
 * </BoxCarousel>
 * </Boxes>
 */
const BoxCarouselSlide = ({
  children,
  backgroundImageFit,
  backgroundImageId,
  backgroundImagePosition,
  linkId,
  href,
  hash,
  title,
  ...slideProps
}) => {
  const linkProps = { id: linkId, href, hash, title }
  const slideContent = (
    <>
      {children && <SlideContent>{children}</SlideContent>}
      {backgroundImageId && (
        <SlideBackgroundImageWrapper
          backgroundImageFit={backgroundImageFit}
          backgroundImagePosition={backgroundImagePosition}
        >
          <Image
            id={backgroundImageId}
            fit={backgroundImageFit}
            position={backgroundImagePosition}
          />
        </SlideBackgroundImageWrapper>
      )}
    </>
  )
  return (
    <StyledSlide {...slideProps}>
      {linkId || href ? (
        <Link {...linkProps}>{slideContent}</Link>
      ) : (
        slideContent
      )}
    </StyledSlide>
  )
}

BoxCarouselSlide.defaultProps = {
  backgroundImageId: null,
  backgroundImageFit: 'cover',
  backgroundImagePosition: 'center center',
}

BoxCarouselSlide.propTypes = {
  children: propTypes.node,
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
  /* Id of an internal page to link to */
  linkId: propTypes.string,
  /* URI of an external page to link to */
  href: propTypes.string,
  /* Option hash to attach to the link href */
  hash: propTypes.string,
  /* Optional title. Should be set for a11y and seo reasons when link has non-text content. */
  title: propTypes.string,
}

export default BoxCarouselSlide

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useBreakpointIndex } from '@theme-ui/match-media'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import applyContentGap from '@gatsby-mdx-suite/helpers/styling/apply-content-gap'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

const Wrapper = styled.div`
  ${tw`relative`}
  ${applyContentGap}
`

const ContentWrapper = styled.div(
  ({ reverse, ...props }) => css`
    ${centerToContentColumn(props)}

    ${tw`md:relative z-10`}

    ${tw`md:flex gap-grid-gap`}
    ${reverse && tw`flex-row-reverse`}
  `
)

const Content = styled.div(
  ({ theme, reverse }) => css`
    @media (min-width: ${theme.breakpoints[1]}) {
      flex: 0 0 50%;
      padding-right: calc(${theme.spacing['grid-gap']} / 2);
      ${reverse &&
      css`
        padding-left: calc(${theme.spacing['grid-gap']} / 2);
        padding-right: 0;
      `}
    }
  `
)

const ImageWrapper = styled.div(
  ({ theme, reverse }) => css`
    ${tw`overflow-hidden`}

    @media (min-width: ${theme.breakpoints[1]}) {
      ${tw`absolute z-0 flex flex-col justify-center pb-0`}
      top: 0;
      bottom: 0;

      ${
        reverse
          ? css`
              right: calc(50% + (${theme.spacing['grid-gap']} / 2));
              left: 0;
              & img {
                object-position: center right !important;
              }
            `
          : css`
              left: calc(50% + (${theme.spacing['grid-gap']} / 2));
              right: 0;
              & img {
                object-position: center left !important;
              }
            `
      }
    }
  `
)

/**
 * Renders an image next to the given content.
 *
 * The image will span from the edge of the screen to the content center.
 *
 * The content will span from the content center to the edge of the content column.
 *
 * The image might be cut off by default. You can change this with the `fit` attribute.
 *
 * @example
 * <FloatingImage imageId="randomPictureId">
 *
 * # Default with image
 *
 * Anything inside of the component wil be rendered next to the image.
 *
 * * some
 * * example
 * * content
 * * to
 * * fill
 * * space
 *
 * </FloatingImage>
 * @example
 * <FloatingImage imageId="randomPictureId" reverse fit="cover">
 *
 * # Reverse with cover image
 *
 * Anything inside of the component wil be rendered next to the image.
 *
 * * some
 * * example
 * * content
 * * to
 * * fill
 * * space
 *
 * </FloatingImage>
 * @example
 * <FloatingImage imageId="randomGraphicId" >
 *
 * # Graphic Cover example
 *
 * This can look broken. Make sure to set `fit="contain"`. Example below.
 *
 * * some
 * * example
 * * content
 * * to
 * * fill
 * * space
 *
 * </FloatingImage>
 * @example
 * <FloatingImage imageId="randomGraphicId" fit="contain">
 *
 * # Graphic Contain Example
 *
 * Anything inside of the component wil be rendered next to the image.
 *
 * * some
 * * example
 * * content
 * * to
 * * fill
 * * space
 *
 * </FloatingImage>
 */
export default function FloatingImage({ children, imageId, reverse, fit }) {
  const currentBreakpoint = useBreakpointIndex()
  return (
    <Wrapper>
      <ContentWrapper reverse={reverse}>
        <Content reverse={reverse}>{children}</Content>
      </ContentWrapper>
      <ImageWrapper reverse={reverse}>
        <Image
          id={imageId}
          contextKey="floating"
          fit={(currentBreakpoint > 1) & fit}
        />
      </ImageWrapper>
    </Wrapper>
  )
}

FloatingImage.defaultProps = {
  fit: 'cover',
  reverse: false,
}

FloatingImage.propTypes = {
  children: propTypes.node.isRequired,
  /** Id of the image to be floating next to the content */
  imageId: propTypes.string.isRequired,
  /** Reverse the order of image and content */
  reverse: propTypes.bool,
  /**
   * Set how the image should be fit into the container
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
  fit: propTypes.string,
}

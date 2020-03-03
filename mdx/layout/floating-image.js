import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'

import Section from './section'

const Wrapper = tw.div`relative my-8`

const ContentWrapper = styled(Section)(
  ({ reverse }) => css`
    ${tw`md:relative z-10`}

    > div {
      ${tw`md:flex`}
      ${reverse && tw`flex-row-reverse`}
    }

    ${Content} {
      ${tw`md:w-1/2`}

      ${reverse ? tw`md:pl-8` : tw`md:pr-8`}
    }
  `
)

const Content = styled.div``

const ImageWrapper = styled.div(
  ({ theme, reverse }) => css`
    ${tw`pb-8`}

    @media (min-width: ${theme.breakpoints[2]}) {
      ${tw`absolute z-0 flex flex-col justify-center pb-0`}
      top: ${theme.sizes['16']};
      bottom: ${theme.sizes['16']};

      ${
        reverse
          ? css`
              right: calc(50% + ${theme.sizes['2']});
              left: 0;
              & img {
                object-position: center right !important;
              }
            `
          : css`
              left: calc(50% + ${theme.sizes['2']});
              right: 0;
              & img {
                object-position: center left !important;
              }
            `
      }

      & .gatsby-image-wrapper {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      & svg {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      & > div {
        height: 100%;
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
  return (
    <Wrapper>
      <ContentWrapper reverse={reverse}>
        <Content>{children}</Content>
      </ContentWrapper>
      <ImageWrapper reverse={reverse}>
        <Image id={imageId} contextKey="floating" fit={fit} />
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

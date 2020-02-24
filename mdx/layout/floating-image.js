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
    // box-sizing: border-box;

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
      top: 0;
      bottom: ${theme.sizes['2']};

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
 * The Content will span from the content center to the edge of the content column.
 *
 * @example
 * <FloatingImage imageId="randomPictureId">
 *
 * # Some content
 *
 * Anything inside of the component wil be rendered next to the image.
 *
 * </FloatingImage>
 * <FloatingImage imageId="randomImageId" reverse>
 *
 * # Some content
 *
 * Anything inside of the component wil be rendered next to the image.
 *
 * </FloatingImage>
 */
export default function FloatingImage({ children, imageId, reverseOrder }) {
  return (
    <Wrapper>
      <ContentWrapper reverseOrder={reverseOrder}>
        <Content>{children}</Content>
      </ContentWrapper>
      <ImageWrapper reverseOrder={reverseOrder}>
        <Image id={imageId} contextKey="floating" />
      </ImageWrapper>
    </Wrapper>
  )
}

FloatingImage.defaultProps = {
  reverseOrder: false,
}

FloatingImage.propTypes = {
  children: propTypes.node.isRequired,
  imageId: propTypes.string.isRequired,
  reverseOrder: propTypes.bool,
}

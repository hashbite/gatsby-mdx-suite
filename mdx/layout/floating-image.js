import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Image from '@gatsby-mdx-suite/mdx-image/image'

import Section from './section'

const Wrapper = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.s2} 0;
`

const ContentWrapper = styled(Section)(
  ({ theme, reverseOrder }) => css`
    @media (min-width: ${theme.breakpoints[1]}) {
      position: relative;
      z-index: 2;

      > div {
        display: flex;
        ${reverseOrder &&
          css`
            flex-direction: row-reverse;
          `}
      }

      ${Content} {
        box-sizing: border-box;
        width: 50%;

        ${reverseOrder
          ? css`
              padding-left: ${theme.spacing.s2}px;
            `
          : css`
              padding-right: ${theme.spacing.s2}px;
            `}
      }
    }
  `
)

const Content = styled.div``

const ImageWrapper = styled.div(
  ({ theme, reverseOrder }) => css`
    padding-bottom: ${theme.spacing.s2}px;

    @media (min-width: ${theme.breakpoints[1]}) {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: ${theme.spacing.s2}px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding-bottom: 0;

      ${reverseOrder
        ? css`
            right: calc(50% + ${theme.spacing.s2}px);
            left: 0;
            & img {
              object-position: center right !important;
            }
          `
        : css`
            left: calc(50% + ${theme.spacing.s2}px);
            right: 0;
            & img {
              object-position: center left !important;
            }
          `}

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

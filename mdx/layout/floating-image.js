import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Image from './Image'
import GridWrapper from '../GridWrapper'

const Wrapper = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.s2} 0;
`

const ContentWrapper = styled(GridWrapper)(
  ({ position }) => css`
    position: relative;
    z-index: 2;
    display: flex;
    ${position === 'left' && `flex-direction: row-reverse;`}
    padding-top: 0;
    padding-bottom: 0;
  `
)

const Content = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    box-sizing: border-box;
    width: 50%;
    ${({ position, theme }) =>
      position === 'left'
        ? `
            padding-right: ${theme.spacing.s1}px;
          `
        : `
            padding-left: ${theme.spacing.s1}px;
          `}
  }
`
const ImageDesktopWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: ${({ theme }) => theme.spacing.s2}px;
  box-shadow: 20px 20px 40px 0 rgba(0, 0, 0, 0.16);

  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
  }

  ${({ position, theme }) =>
    position === 'right'
      ? `
          left: calc(50% + ${theme.spacing.s4}px);
          right: 0;
        `
      : `
          right: calc(50% + ${theme.spacing.s4}px);
          left: 0;
        `}

  & > div, & > div > div {
    height: 100%;
  }

  & img {
    ${({ position }) =>
      position === 'right'
        ? `
            object-position: center left !important;
          `
        : `
            object-position: center right !important;
          `}
  }
`
const ImageMobileWrapper = styled.div`
  display: block;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: none;
  }
`

export default function FloatingImage({
  children,
  imageDesktop,
  imageMobile,
  position
}) {
  return (
    <Wrapper>
      <ContentWrapper position={position}>
        <Content>{children}</Content>
      </ContentWrapper>
      <ImageDesktopWrapper position={position}>
        <Image contextKey="imagesFloating" id={imageDesktop} />
      </ImageDesktopWrapper>
      {imageMobile && (
        <ImageMobileWrapper>
          <Image contextKey="imagesFloating" id={imageMobile} />
        </ImageMobileWrapper>
      )}
    </Wrapper>
  )
}

FloatingImage.defaultProps = {
  position: 'left'
}

FloatingImage.propTypes = {
  children: propTypes.node.isRequired,
  position: propTypes.string,
  imageDesktop: propTypes.string.isRequired,
  imageMobile: propTypes.string
}

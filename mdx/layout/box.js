import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Image from '@gatsby-mdx-suite/mdx-basic/image'

import { applyColorSet } from '@gatsby-mdx-suite/helpers'

const BoxWrapper = styled.div((props) => {
  const {
    theme: { breakpoints, spacing },
    height,
    width,
    hideOnMobile,
  } = props

  return css`
    position: relative;
    padding: ${spacing.s2}px;

    @media screen and (min-width: ${breakpoints[0]}) {
      grid-area: span ${height} / span ${width};
    }

    ${hideOnMobile &&
      css`
        display: none;
        @media screen and (min-width: ${breakpoints[0]}) {
          display: block;
        }
      `}

    ${applyColorSet({ ...props })}
  `
})

const BackgroundImageWrapper = styled.div(
  ({ scale, backgroundImageFit }) => css`
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    ${scale &&
      css`
        transform: scale(${scale});
      `}

    /* Hack gatsby-image to act as background image */
    & .gatsby-image-wrapper {
      position: static !important;

      img {
        height: 100%;
        object-fit: ${backgroundImageFit} !important;
      }
    }
  `
)

const Box = ({
  children,
  scale,
  hideOnMobile,
  backgroundImageFit,
  backgroundImageId,
  ...restProps
}) => {
  const imageContainer = backgroundImageId && (
    <BackgroundImageWrapper
      scale={scale}
      backgroundImageFit={backgroundImageFit}
    >
      <Image id="backgroundImageId" contextKey="background" />
    </BackgroundImageWrapper>
  )
  return (
    <BoxWrapper {...restProps} hideOnMobile={hideOnMobile}>
      {children}
      {imageContainer}
    </BoxWrapper>
  )
}

Box.defaultProps = {
  children: null,
  backgroundImageId: null,
  backgroundImageFit: 'contain',
  scale: null,
  hideOnMobile: false,
  width: '2',
  height: '2',
}

Box.propTypes = {
  children: propTypes.node,
  scale: propTypes.string,
  backgroundImageId: propTypes.string,
  backgroundImageFit: propTypes.string,
  hideOnMobile: propTypes.bool,
  width: propTypes.string,
  height: propTypes.string,
  /* Apply color set to this element and all children */
  colorSet: propTypes.string,
  /* Set background color for this element */
  backgroundColor: propTypes.string,
  /* Set primary color for this element and all children */
  primaryColor: propTypes.string,
  /* Set secondary color for this element and all children */
  secondaryColor: propTypes.string,
}

export default Box

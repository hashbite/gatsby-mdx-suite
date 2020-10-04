import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import Video from '@gatsby-mdx-suite/mdx-video/video'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

const HeroWrapper = styled.div(
  ({ isNavigationTransparent }) => css`
    ${tw`
    flex-auto
    flex flex-col justify-center`}

    ${!isNavigationTransparent && tw`relative`}
  `
)

const HeroContent = styled.div(
  ({ hasBackgroundMedia, ...props }) => css`
    ${tw`
    relative z-20
    py-16
    flex flex-col
    `}
    ${hasBackgroundMedia &&
    css`
      ${tw`text-white`}
      text-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    `}
  ${centerToContentColumn(props)}
  `
)

const HeroMediaWrapper = styled.div`
  ${tw`absolute inset-0 z-0 overflow-hidden`}

  img, video {
    ${tw`absolute inset-0 z-10 object-cover object-center w-full h-full`}
  }

  video {
    opacity: 0.6;
  }

  &:before {
    ${tw`block absolute z-20 inset-0 bg-black`}
    content: '';
    opacity: 0.32;
  }
`
const Hero = ({
  children,
  backgroundImageId,
  backgroundVideoId,
  isNavigationTransparent,
}) => {
  const hasBackgroundMedia = !!(backgroundImageId || backgroundVideoId)
  return (
    <HeroWrapper isNavigationTransparent={isNavigationTransparent}>
      <HeroContent hasBackgroundMedia={hasBackgroundMedia}>
        {children}
      </HeroContent>
      {hasBackgroundMedia && (
        <HeroMediaWrapper>
          {backgroundImageId && (
            <Image id={backgroundImageId} contextKey="screen" fit="cover" />
          )}
          {backgroundVideoId && (
            <Video
              autoPlay
              loop
              muted
              controls={false}
              id={backgroundVideoId}
            />
          )}
        </HeroMediaWrapper>
      )}
    </HeroWrapper>
  )
}

Hero.defaultProps = {
  children: null,
  isNavigationTransparent: false,
}

Hero.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
  backgroundVideoId: propTypes.string,
  isNavigationTransparent: propTypes.bool,
}

export default Hero

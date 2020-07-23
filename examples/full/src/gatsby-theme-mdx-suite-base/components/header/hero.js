import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import Video from '@gatsby-mdx-suite/mdx-video/video'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

const HeroWrapper = styled.div(
  ({ headerBarHeight }) => css`
    ${tw`
    flex-auto
    flex flex-col justify-center`}
    min-height: calc(80vh - ${headerBarHeight});
  `
)

const HeroContent = styled.div`
  ${tw`
    relative z-20
    py-16
    flex flex-col
    text-center
    `}

  h1 {
    ${tw`text-6xl`}
  }
  ${centerToContentColumn}
`

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
  transparent,
  headerBarHeight,
}) => {
  return (
    <HeroWrapper transparent={transparent} headerBarHeight={headerBarHeight}>
      <HeroContent>{children}</HeroContent>
      {backgroundImageId && (
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
  transparent: false,
  headerBarHeight: '10vh',
}

Hero.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
  backgroundVideoId: propTypes.string,
  transparent: propTypes.bool,
  headerBarHeight: propTypes.string,
}

export default Hero

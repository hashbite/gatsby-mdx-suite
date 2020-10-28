import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import ReactYoutube from 'react-youtube'

import verticalRhythm from '@gatsby-mdx-suite/helpers/styling/vertical-rhythm'

const YoutubeVideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    ${tw`relative w-full`}
    ${verticalRhythm}
    max-width: ${maxWidth};

    &::before {
      content: '';
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: calc(100% / (${aspectRatio}));
    }
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `
)
const StyledReactYoutube = styled(ReactYoutube)`
  ${tw`absolute inset-0 bg-black`}
`

/**
 * Renders a video from YouTube. For internal videos use `<Video />`.
 *
 * Supports all Youtube player parameters:
 * https://developers.google.com/youtube/player_parameters#Parameters
 *
 * @example
 * <YoutubeVideo id="dQw4w9WgXcQ" />
 */
export default function YoutubeVideoRenderer({
  id,
  maxWidth,
  aspectRatio,
  ...props
}) {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: { modestbranding: 1, ...props },
  }

  return (
    <YoutubeVideoWrapper maxWidth={maxWidth} aspectRatio={aspectRatio}>
      <StyledReactYoutube videoId={id} opts={opts} />
    </YoutubeVideoWrapper>
  )
}

YoutubeVideoRenderer.defaultProps = {
  maxWidth: '100%',
  aspectRatio: '16 / 9',
}

YoutubeVideoRenderer.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** Aspect ratio of the video player */
  aspectRatio: propTypes.string,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

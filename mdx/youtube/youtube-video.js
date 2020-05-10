import ReactYoutube from 'react-youtube'

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const YoutubeVideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    position: relative;
    display: inline-block;
    width: 100%;

    min-width: 326px;
    ${maxWidth &&
    css`
      max-width: ${maxWidth};
    `};

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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
export default function YoutubeVideo({ id, maxWidth, aspectRatio, ...props }) {
  if (!id) {
    return null
  }

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

YoutubeVideo.displayName = 'YoutubeVideo'

YoutubeVideo.defaultProps = {
  maxWidth: '100%',
  aspectRatio: '16 / 9',
}

YoutubeVideo.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** Aspect ratio of the video player */
  aspectRatio: propTypes.string,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.number,
}

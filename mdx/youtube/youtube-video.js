import ReactYoutube from 'react-youtube'

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledReactYoutube = styled(ReactYoutube)`
  width: 40vw;
  min-width: 326px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`
/**
 * Renders a video from YouTube. For internal videos use `<Video />`.
 *
 * @example
 * <YoutubeVideo id="dQw4w9WgXcQ" />
 */
export default function YoutubeVideo({ id, maxWidth = '600px', ...props }) {
  if (!id) {
    return null
  }

  return <StyledReactYoutube videoId={id} maxWidth={maxWidth} />
}

YoutubeVideo.displayName = 'YoutubeVideo'

YoutubeVideo.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.number,
}

import React from 'react'
import propTypes from 'prop-types'

import LazyChunk from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-chunk'
// import PrivacyShield from 'gatsby-theme-mdx-suite-base/src/privacy-manager/components/privacy-shield'

const YoutubeVideoRenderer = React.lazy(() =>
  import(
    /* webpackChunkName: "youtube-video-player" */ './youtube-video-renderer'
  )
)

/**
 * Renders a video from YouTube. For internal videos use `<Video />`.
 *
 * Supports all Youtube player parameters:
 * https://developers.google.com/youtube/player_parameters#Parameters
 *
 * @example
 * <YoutubeVideo id="dQw4w9WgXcQ" />
 */
export default function YoutubeVideo(props) {
  return (
    // <PrivacyShield
    //   config={YoutubeVideo.privacy}
    //   fallbackUrl={`https://www.youtube.com/watch?v=${props.id}`}
    // >
    <LazyChunk>
      <YoutubeVideoRenderer {...props} />
    </LazyChunk>
    // </PrivacyShield>
  )
}

YoutubeVideo.privacy = {
  category: 'social',
  id: 'youtube',
  title: 'YouTube',
  icon: 'youtube',
  url: 'https://policies.google.com/privacy?hl=en',
  description: 'privacyDescriptionYoutube',
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
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

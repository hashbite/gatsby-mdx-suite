import React, { Suspense } from 'react'
import propTypes from 'prop-types'
import { lazy } from '@loadable/component'

import LazyComponent from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-component'
import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'
import { PrivacyShield } from '@consent-manager/core'
import { youtubeIntegration } from '@consent-manager/integration-youtube'

const YoutubeVideoRenderer = lazy(() =>
  import(
    /* webpackChunkName: "mdx--youtube-video-player" */ './youtube-video-renderer'
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
    <PrivacyShield
      id={YoutubeVideo.privacy.id}
      fallbackUrl={`https://www.youtube.com/watch?v=${props.id}`}
    >
      <LazyComponent>
        <Suspense fallback={<Loading />}>
          <YoutubeVideoRenderer {...props} />
        </Suspense>
      </LazyComponent>
    </PrivacyShield>
  )
}

YoutubeVideo.privacy = youtubeIntegration()

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

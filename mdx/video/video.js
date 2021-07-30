import React, { Suspense } from 'react'
import propTypes from 'prop-types'
import { lazy } from '@loadable/component'

import LazyComponent from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-component'
import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'

const VideoRenderer = lazy(() =>
  import(/* webpackChunkName: "video-player" */ './video-renderer')
)
export default function MdxVideo(props) {
  return (
    <LazyComponent forceRendering={props.forceRendering}>
      <Suspense fallback={<Loading />}>
        <VideoRenderer {...props} />
      </Suspense>
    </LazyComponent>
  )
}

MdxVideo.defaultProps = {
  screenshotIndex: 0,
  controls: true,
  autoplay: false,
  muted: false,
  pauseOnHover: false,
  preload: 'metadata',
  contextKey: 'screen',
  maxWidth: '100%',
  forceRendering: false,
}

MdxVideo.propTypes = {
  /** Id of the video to embed */
  id: propTypes.string.isRequired,
  /** Maximum width the video player will grow to */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Overwrite the default aspect rati of the video */
  aspectRatio: propTypes.string,
  /** Should the video automatically start playing? **Requires muted**. */
  autoplay: propTypes.bool,
  /** Should the controls be display? */
  controls: propTypes.bool,
  /** Should the audio be muted? */
  muted: propTypes.bool,
  /** Should the video pause when the user hovers the video? */
  pauseOnHover: propTypes.bool,
  /** Select another screenshot */
  screenshotIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Preloading behaviour */
  preload: propTypes.string,
  /** Change rendering size of the video */
  contextKey: propTypes.string,
  /** Force video to be rendered, even when user did not scroll close. Useful for components that will be displayed above the fold. */
  forceRendering: propTypes.bool,
}

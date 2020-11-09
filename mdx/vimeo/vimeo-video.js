import React from 'react'
import propTypes from 'prop-types'

import AsyncChunk from 'gatsby-theme-mdx-suite-base/src/components/async/async-chunk'

const VimeoVideoRenderer = React.lazy(() =>
  import(/* webpackChunkName: "vimeo-video-player" */ './vimeo-video-renderer')
)

/**
 * Renders a video from Yimeo. For internal videos use `<Video />`.
 *
 * Additional parameters:
 * https://github.com/u-wave/react-vimeo#props
 *
 * @example
 * <VimeoVideo id="148751763" />
 */
export default function VimeoVideo(props) {
  return <AsyncChunk loadable={<VimeoVideoRenderer {...props} />} />
}

VimeoVideo.displayName = 'VimeoVideo'

VimeoVideo.defaultProps = {
  maxWidth: '100%',
  aspectRatio: '16 / 9',
  autoplay: false,
}

VimeoVideo.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** Aspect ratio of the video player */
  aspectRatio: propTypes.string,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

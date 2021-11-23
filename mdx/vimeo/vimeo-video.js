import React, { Suspense } from 'react'
import propTypes from 'prop-types'

import LazyComponent from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-component'
import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'
import { PrivacyShield } from '@consent-manager/core'
import { vimeoIntegration } from '@consent-manager/integration-vimeo'
import { lazy } from '@loadable/component'

const VimeoVideoRenderer = lazy(() =>
  import(
    /* webpackChunkName: "mdx--vimeo-video-player" */ './vimeo-video-renderer'
  )
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
  return (
    <PrivacyShield
      id={VimeoVideo.privacy.id}
      fallbackUrl={`https://vimeo.com/${props.id}`}
    >
      <LazyComponent>
        <Suspense fallback={<Loading />}>
          <VimeoVideoRenderer {...props} />
        </Suspense>
      </LazyComponent>
    </PrivacyShield>
  )
}

VimeoVideo.privacy = vimeoIntegration()

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

import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Video from '@gatsby-mdx-suite/mdx-video/video'

import BaseBox from './base-box'

const StyledVideo = styled(Video)(
  ({ videoFit, videoPosition }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: ${videoFit};
    object-position: ${videoPosition};
  `
)

const BoxVideo = ({
  videoId,
  videoFit,
  videoPosition,
  controls,
  autoplay,
  loop,
  ...restProps
}) => {
  return (
    <BaseBox {...restProps}>
      <StyledVideo
        id={videoId}
        videoFit={videoFit}
        videoPosition={videoPosition}
        controls={controls}
        autoplay={autoplay}
        loop={loop}
      />
    </BaseBox>
  )
}

BoxVideo.defaultProps = {
  ...BaseBox.defaultProps,
  videoId: null,
  videoFit: 'cover',
  videoPosition: 'center center',
  controls: true,
  autoplay: true,
  loop: true,
}

BoxVideo.propTypes = {
  ...BaseBox.propTypes,
  // Id of the video
  videoId: propTypes.string,
  /**
   * Set how the video should be fit into the box.
   *
   * Possible options:
   *
   * * fill
   * * contain
   * * cover
   * * none
   * * scale-down
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  videoFit: propTypes.string,
  /**
   * Set how the video should be positioned within the box.
   *
   * Takes two values, one for the horizontal and one for the vertical axis.
   *
   * Example values:
   *
   * * center bottom
   * * 2rem center
   * * top right
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   */
  videoPosition: propTypes.string,
  controls: propTypes.bool,
  autoplay: propTypes.bool,
  loop: propTypes.bool,
}

export default BoxVideo

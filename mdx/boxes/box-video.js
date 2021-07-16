import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Video from '@gatsby-mdx-suite/mdx-video/video-renderer'

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
/**
 * Creates a box with a embedded video play.
 *
 * Can be used as visual element or as fully blown video player.
 *
 * @example
 * <Boxes>
 *   <BoxVideo videoId="randomVideoId" />
 *   <BoxVideo videoId="randomVideoId" controls autoplay={false} />
 *   <BoxVideo videoId="randomVideoId" showAnimation="fadeIn 3s" />
 * </Boxes>
 */
const BoxVideo = ({
  videoId,
  videoFit,
  videoPosition,
  controls,
  autoplay,
  loop,
  muted,
  pauseOnHover,
  ...boxProps
}) => {
  const videoProps = {
    id: videoId,
    videoFit,
    videoPosition,
    controls,
    autoplay,
    muted,
    loop,
    pauseOnHover,
  }

  return (
    <BaseBox {...boxProps}>
      <StyledVideo {...videoProps} />
    </BaseBox>
  )
}

BoxVideo.defaultProps = {
  ...BaseBox.defaultProps,
  videoId: null,
  videoFit: 'cover',
  videoPosition: 'center center',
  controls: false,
  autoplay: true,
  muted: true,
  loop: true,
  pauseOnHover: true,
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
  /**
   * Set if the video start playing as soon it is visible. Mutes audio due to browser limitations.
   */
  autoplay: propTypes.bool,
  /**
   * Set if the video should run as loop.
   */
  loop: propTypes.bool,
  /**
   * Mute audio. Always true when autoplay is enabled.
   */
  muted: propTypes.bool,
}

export default BoxVideo

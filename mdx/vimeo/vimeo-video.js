import Vimeo from '@u-wave/react-vimeo'

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const VimeoVideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    position: relative;
    display: inline-block;
    width: 100%;
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
const StyledVimeo = styled(Vimeo)`
  ${tw`absolute inset-0 bg-black`}
  iframe {
    width: 100%;
    height: 100%;
  }
`
/**
 * Renders a video from Yimeo. For internal videos use `<Video />`.
 *
 * Additional parameters:
 * https://github.com/u-wave/react-vimeo#props
 *
 * @example
 * <VimeoVideo id="148751763" />
 */
export default function VimeoVideo({ id, maxWidth, aspectRatio, ...props }) {
  if (!id) {
    return null
  }

  return (
    <VimeoVideoWrapper maxWidth={maxWidth} aspectRatio={aspectRatio}>
      <StyledVimeo video={id} {...props} />
    </VimeoVideoWrapper>
  )
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
  maxWidth: propTypes.number,
}

import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import Vimeo from '@u-wave/react-vimeo'

import verticalRhythm from '@gatsby-mdx-suite/helpers/styling/vertical-rhythm'

const VimeoVideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    ${tw`relative w-full`}
    ${verticalRhythm}
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

export default function VimeoVideoRenderer({
  id,
  maxWidth,
  aspectRatio,
  ...props
}) {
  if (!id) {
    return null
  }

  return (
    <VimeoVideoWrapper maxWidth={maxWidth} aspectRatio={aspectRatio}>
      <StyledVimeo video={id} {...props} />
    </VimeoVideoWrapper>
  )
}

VimeoVideoRenderer.defaultProps = {
  maxWidth: '100%',
  aspectRatio: '16 / 9',
  autoplay: false,
}

VimeoVideoRenderer.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** Aspect ratio of the video player */
  aspectRatio: propTypes.string,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

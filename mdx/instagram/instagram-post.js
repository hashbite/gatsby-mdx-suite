import React from 'react'
import propTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'
import styled from '@emotion/styled'

const StyledInstagramEmbed = styled(InstagramEmbed)`
  width: 40vw;
  min-width: 326px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`
/**
 * Display an Instagram post.
 * @example
 * <InstagramPost id="B16Tc2fBOMJ" />
 */
export default function InstagramPost({
  id,
  maxWidth = 600,
  hideCaption = true,
  ...props
}) {
  if (!id) {
    return null
  }

  return (
    <StyledInstagramEmbed
      maxWidth={maxWidth}
      hideCaption={hideCaption}
      url={`https://instagr.am/p/${id}/`}
    />
  )
}

InstagramPost.displayName = 'InstagramPost'

InstagramPost.propTypes = {
  /** id of the post to embed */
  id: propTypes.string.isRequired,
  /** hide the caption */
  hideCaption: propTypes.bool,
  /** maximum width the post will be embedded as */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

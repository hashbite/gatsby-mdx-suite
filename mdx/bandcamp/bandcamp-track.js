import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const BandCampWrapper = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;

  &:before {
    content: '';
    display: block;
    padding-top: calc(100% + 96px);
  }

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`
/**
 * Embed a track from bandcamp.com
 *
 * @example
 *
 * <BandcampTrack id="1505826681" />
 */
export default function BandcampTrack({ id }) {
  return (
    <BandCampWrapper>
      <iframe
        src={`https://bandcamp.com/EmbeddedPlayer/track=${id}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`}
        seamless
      />
    </BandCampWrapper>
  )
}

BandcampTrack.displayName = 'BandcampTrack'

BandcampTrack.propTypes = {
  id: propTypes.string.isRequired,
}

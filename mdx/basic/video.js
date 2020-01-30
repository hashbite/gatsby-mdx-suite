import React, { useRef, useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Observer from '@researchgate/react-intersection-observer'

import MdxDataContext from '@gatsby-mdx-suite/contexts/mdx-data'

const VideoTag = styled.video`
  display: block;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: ${({ theme }) => theme.spacing.s2}px auto;
`

// @todo have only a single videoId property and render sources depending on context data
export default function Video({
  h264Id,
  h265Id,
  controls,
  autoplay,
  preload,
  posterImageId,
  ...props
}) {
  const { videos, images } = useContext(MdxDataContext)
  const refVideo = useRef(null)
  const [wasPaused, setWasPaused] = useState(false)

  const posterImage = images.find(
    ({ imageId }) => imageId === posterImageId
  )
  const videoH264 = videos.find(({ videoId }) => videoId === h264Id)
  const videoH265 = videos.find(({ videoId }) => videoId === h265Id)

  if (!videoH264) {
    console.error(`Unable to locate video with id ${videoH264}`)
    return null
  }

  const handleVideoPaused = (event) => setWasPaused(true)

  const content = (
    <VideoTag
      ref={refVideo}
      onPause={handleVideoPaused}
      controls={controls}
      preload={preload}
      poster={posterImage && posterImage.file.url}
      {...props}
    >
      {videoH265 && (
        <source src={videoH265.file.url} type="video/mp4; codecs=hevc" />
      )}
      <source src={videoH264.file.url} type="video/mp4" />
    </VideoTag>
  )

  const handleVideoIntersection = async (event) => {
    try {
      if (!wasPaused && event.isIntersecting && refVideo.current) {
        await refVideo.current.play()
      }
      if (!event.isIntersecting && refVideo.current) {
        await refVideo.current.pause()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (autoplay) {
    return (
      <Observer
        treshold={0.33}
        onChange={handleVideoIntersection}
        threshold={0.3}
      >
        {content}
      </Observer>
    )
  }

  return content
}

Video.defaultProps = {
  maxWidth: '600px',
  controls: true,
  autoplay: true,
  preload: 'metadata'
}

Video.propTypes = {
  h264Id: propTypes.string.isRequired,
  h265Id: propTypes.string,
  posterImageId: propTypes.string,
  maxWidth: propTypes.string,
  preload: propTypes.string,
  autoplay: propTypes.bool,
  controls: propTypes.bool
}

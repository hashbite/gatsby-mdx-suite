import React, { useRef, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Observer from '@researchgate/react-intersection-observer'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const VideoTag = styled.video`
  display: block;
  width: 100%;
`

/**
 * Renders an internal video. For external videos use `<YoutubeVideo />` or similar.
 *
 * Autoplay will enforce audio mute due to browser limitations.
 *
 * @example
 * <Video id="randomVideoId" />
 */
export default function Video({
  id,
  screenshotIndex,
  controls,
  autoplay,
  preload,
  muted,
  pauseOnHover,
  ...props
}) {
  const {
    data: { videos = [] },
  } = useContext(MdxSuiteContext)

  const video = videos.find((video) => video.assetId === id)

  if (!video) {
    console.error(
      new Error(
        `No data located for video:\n\n${JSON.stringify(arguments[0], null, 2)}`
      )
    )
    return null
  }

  const refVideo = useRef(null)

  const handleVideoIntersection = async (event) => {
    try {
      if (autoplay && event.isIntersecting && refVideo.current) {
        await refVideo.current.play()
      }
      if (!event.isIntersecting && refVideo.current) {
        await refVideo.current.pause()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const sources = [
    { name: 'h265', type: 'video/mp4; codecs=hevc' },
    { name: 'vp9', type: 'video/webm; codecs=vp9,opus' },
    { name: 'h264', type: 'video/mp4; codecs=avc1' },
  ]
    .filter(({ name }) => !!video[name])
    .map(({ name, type }) => (
      <source key={name} src={video[name]} type={type} />
    ))

  if (!sources) {
    console.error(
      new Error(`No sources found for video:\n\n${JSON.stringify(video)}`)
    )

    return null
  }

  const handleVideoMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      refVideo.current.pause()
    }
  }
  const handleVideoMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      refVideo.current.play()
    }
  }

  return (
    <Observer
      treshold={0.33}
      onChange={handleVideoIntersection}
      threshold={0.3}
    >
      <VideoTag
        ref={refVideo}
        onMouseEnter={handleVideoMouseEnter}
        onMouseLeave={handleVideoMouseLeave}
        controls={controls}
        preload={preload}
        muted={autoplay || muted}
        poster={video.screenshots && video.screenshots[screenshotIndex]}
        {...props}
      >
        {sources}
      </VideoTag>
    </Observer>
  )
}

Video.defaultProps = {
  screenshotIndex: 0,
  controls: true,
  autoplay: false,
  muted: false,
  pauseOnHover: false,
  preload: 'metadata',
}

Video.propTypes = {
  id: propTypes.string.isRequired,
  screenshotIndex: propTypes.number,
  preload: propTypes.string,
  autoplay: propTypes.bool,
  controls: propTypes.bool,
  muted: propTypes.bool,
  pauseOnHover: propTypes.bool,
}

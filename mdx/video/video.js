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
    pageContext: { locale: activeLocale },
  } = useContext(MdxSuiteContext)

  const video = videos.find(
    ({ assetId, locale }) => assetId === id && locale === activeLocale
  )

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
      // Autoplay as soon video is visible to the user.
      if (autoplay && event.isIntersecting && refVideo.current) {
        await refVideo.current.play()
      }
      // Stop video when user leaves the viewport.
      // Only active when controls are enabled to allow background videos to loop.
      if (controls && !event.isIntersecting && refVideo.current) {
        await refVideo.current.pause()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const sources = [
    { name: 'videoH265', type: 'video/mp4; codecs=hevc' },
    { name: 'videoVP9', type: 'video/webm; codecs=vp9,opus' },
    { name: 'videoH264', type: 'video/mp4; codecs=avc1' },
  ]
    .filter(({ name }) => !!video[name])
    .map(({ name, type }) => (
      <source key={name} src={video[name].path} type={type} />
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
        playsInline={autoplay || !controls}
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

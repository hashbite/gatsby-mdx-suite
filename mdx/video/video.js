import React, { useRef, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Observer from '@researchgate/react-intersection-observer'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const VideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: ${maxWidth};

    ${aspectRatio &&
    css`
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
    `}
  `
)

const VideoTag = styled.video(
  ({ aspectRatio }) => css`
    display: block;
    ${aspectRatio && tw`absolute bg-black inset-0 w-full h-full`}
  `
)

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
  maxWidth,
  aspectRatio,
  contextKey,
  className,
  ...props
}) {
  const {
    data,
    pageContext: { locale: activeLocale },
  } = useContext(MdxSuiteContext)
  const refVideo = useRef(null)

  const videos = data[contextKey]

  if (!videos) {
    console.error(
      new Error(
        `The media context "${contextKey}" does not exist or does not contain any data.`
      )
    )
    return null
  }

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
    { name: 'videoH264', type: 'video/mp4; codecs=avc1.4d4032' },
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
      <VideoWrapper
        maxWidth={maxWidth}
        aspectRatio={aspectRatio}
        className={className}
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
          aspectRatio={aspectRatio}
          {...props}
        >
          {sources}
        </VideoTag>
      </VideoWrapper>
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
  contextKey: 'screen',
  maxWidth: '100%',
}

Video.propTypes = {
  /** Id of the video to embed */
  id: propTypes.string.isRequired,
  /** Maximum width the video player will grow to */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Overwrite the default aspect rati of the video */
  aspectRatio: propTypes.string,
  /** Should the video automatically start playing? **Requires muted**. */
  autoplay: propTypes.bool,
  /** Should the controls be display? */
  controls: propTypes.bool,
  /** Should the audio be muted? */
  muted: propTypes.bool,
  /** Should the video pause when the user hovers the video? */
  pauseOnHover: propTypes.bool,
  /** Select another screenshot */
  screenshotIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Preloading behaviour */
  preload: propTypes.string,
  /** Change rendering size of the video */
  contextKey: propTypes.string,
}

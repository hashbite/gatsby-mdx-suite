import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { useIntersection } from 'react-use'

import { useVideo } from './hooks'

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
  const videoData = useVideo({ contextKey, id })
  const refVideo = useRef(null)

  const handleVideoMouseEnter = useCallback(() => {
    if (autoplay && pauseOnHover) {
      refVideo.current.pause()
    }
  }, [refVideo, autoplay, pauseOnHover])

  const handleVideoMouseLeave = useCallback(() => {
    if (autoplay && pauseOnHover) {
      refVideo.current.play()
    }
  }, [refVideo, autoplay, pauseOnHover])
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `0px 0px 0px 0px`,
    threshold: 0,
  })

  const isVisible = useMemo(
    () => intersection && intersection.intersectionRatio > 0,
    [intersection]
  )

  // Autoplay logic
  useEffect(() => {
    // Autoplay as soon video is visible to the user.
    if (autoplay && isVisible && refVideo.current && refVideo.current.paused) {
      return refVideo.current.play()
    }
    // Stop video when user leaves the viewport.
    // Only active when controls are enabled to allow background videos to loop.
    if (
      controls &&
      !isVisible &&
      refVideo.current &&
      !refVideo.current.paused
    ) {
      return refVideo.current.pause()
    }
  }, [autoplay, controls, isVisible])

  const posterSrc = useMemo(
    () =>
      videoData?.screenshots?.[screenshotIndex]?.childImageSharp
        ?.gatsbyImageData.images.fallback.src,
    [screenshotIndex, videoData?.screenshots]
  )

  if (!videoData) {
    return 'video unavailable'
  }

  return (
    <VideoWrapper
      maxWidth={maxWidth}
      aspectRatio={aspectRatio || videoData.aspectRatio}
      className={className}
      ref={intersectionRef}
    >
      <VideoTag
        ref={refVideo}
        onMouseEnter={handleVideoMouseEnter}
        onMouseLeave={handleVideoMouseLeave}
        controls={controls}
        playsInline={autoplay || !controls}
        preload={preload}
        muted={autoplay || muted}
        poster={posterSrc}
        aspectRatio={aspectRatio}
        {...props}
      >
        {videoData.sources}
      </VideoTag>
    </VideoWrapper>
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

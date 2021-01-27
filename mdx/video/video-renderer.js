import React, { useRef, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LazyComponent from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-component'
import { useKillScrollTriggerOnCleanup } from '@gatsby-mdx-suite/helpers/styling/gsap'

import { useVideo } from './hooks'

gsap.registerPlugin(ScrollTrigger)

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
  forceRendering,
  ...props
}) {
  const videoData = useVideo({ contextKey, id })
  const refVideo = useRef(null)
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null)
  useKillScrollTriggerOnCleanup(scrollTriggerInstance)

  const handleVideoIntersection = useCallback(
    (isActive) => {
      // Autoplay as soon video is visible to the user.
      if (autoplay && isActive && refVideo.current) {
        return refVideo.current.play()
      }
      // Stop video when user leaves the viewport.
      // Only active when controls are enabled to allow background videos to loop.
      if (controls && !isActive && refVideo.current) {
        return refVideo.current.pause()
      }
    },
    [autoplay, controls]
  )

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

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }

      setScrollTriggerInstance(
        ScrollTrigger.create({
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          invalidateOnRefresh: true,
          onToggle: ({ isActive }) => handleVideoIntersection(isActive),
        })
      )
    },
    [handleVideoIntersection]
  )

  return (
    <LazyComponent forceRendering={forceRendering}>
      <VideoWrapper
        maxWidth={maxWidth}
        aspectRatio={aspectRatio || videoData.aspectRatio}
        className={className}
        ref={initScrollTrigger}
      >
        <VideoTag
          ref={refVideo}
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
          controls={controls}
          playsInline={autoplay || !controls}
          preload={preload}
          muted={autoplay || muted}
          poster={videoData?.screenshots?.[screenshotIndex]?.publicURL}
          aspectRatio={aspectRatio}
          {...props}
        >
          {videoData.sources}
        </VideoTag>
      </VideoWrapper>
    </LazyComponent>
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
  forceRendering: false,
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
  /** Force video to be rendered, even when user did not scroll close. Useful for components that will be displayed above the fold. */
  forceRendering: propTypes.bool,
}

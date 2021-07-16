import React, { useState, useCallback, useRef, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowSize } from '@react-hook/window-size'

import { useKillScrollTriggerOnCleanup } from '@gatsby-mdx-suite/helpers/styling/gsap'
import { useVideo } from '@gatsby-mdx-suite/mdx-video/hooks'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import convertToFlexAlignment from '@gatsby-mdx-suite/helpers/styling/convert-to-flex-alignment'
import debugMode from '@gatsby-mdx-suite/helpers/styling/debug-mode'
gsap.registerPlugin(ScrollTrigger)

const SectionWrapper = styled.section(({ theme }) => {
  return css`
    ${tw`relative`}

    background: ${theme.colors.background};
    color: ${theme.colors.text};
    overflow: hidden;

    will-change: background;

    ${debugMode({ color: 'red', title: 'Section Video Zoom', type: 'border' })}
  `
})

const BackgroundVideo = styled.video(
  ({ theme }) => css`
    ${tw`absolute inset-0 z-10 object-cover object-center w-full h-full`}
  `
)

const BackgroundVideoWrapper = styled.div(
  ({ theme }) => css`
    ${tw`relative z-10`}
    ${centerToContentColumn()}
    height: 100vh;
    margin-bottom: 100vh;
  `
)

const BackgroundVideoContainer = styled.div(
  ({ aspectRatio }) => css`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 1.5rem;
    overflow: hidden;
    width: 62.8%;
    margin: 0 auto;
    ${tw`shadow-2xl z-10`}

    will-change: transform, border-radius;

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

const BackgroundVideoOverlay = styled.div(
  ({ backgroundColor }) => css`
    ${tw`absolute inset-0 z-10 bg-black`}

    opacity: 0;
    will-change: opacity;
  `
)

const SectionContentWrapper = styled.div(
  ({ theme, verticalAlign, horizontalAlign }) => {
    return css`
      ${tw`relative z-30`}

      ${(horizontalAlign || verticalAlign) && tw`flex flex-col h-full w-full`}

      ${verticalAlign &&
      css`
        justify-content: ${verticalAlign};
      `}

      ${horizontalAlign &&
      css`
        align-items: ${horizontalAlign};
      `}

      /* zoom logic */
      ${tw`h-screen`}
      color: ${theme.colors.white};
    `
  }
)

const SectionContent = styled.div(
  ({ horizontalAlign, ...props }) => css`
    ${horizontalAlign
      ? tw`px-content-column-padding`
      : centerToContentColumn(props)}

    padding-top: ${calcGapValue(props.gap, props.theme)};
    padding-bottom: ${calcGapValue(props.gap, props.theme)};

    will-change: opacity;

    ${debugMode({
      color: 'tomato',
      title: 'SectionVideoZoom Content',
      labelPosition: 'outside',
    })}
  `
)

function calcGapValue(gap, theme) {
  const customSize = gap && theme.spacing[gap]
  return customSize || theme.spacing['section-gap']
}

const SectionZoom = ({
  children,
  colorSet,
  colors,
  gap,
  verticalAlign,
  horizontalAlign,
  backgroundVideoId,
  ...props
}) => {
  const [scrollTriggerInstanceVideo, setScrollTriggerInstanceVideo] =
    useState(null)
  const videoData = useVideo({ id: backgroundVideoId, contextKey: 'screen' })

  const refVideo = useRef()
  const refVideoContainer = useRef()
  const refVideoOverlay = useRef()
  const refContent = useRef()

  const [viewportWidth, viewportHeight] = useWindowSize()

  const viewportAspectRatio = useMemo(
    () => viewportWidth / viewportHeight,
    [viewportWidth, viewportHeight]
  )

  useKillScrollTriggerOnCleanup(scrollTriggerInstanceVideo)

  const initScrollTriggerVideo = useCallback(
    (node) => {
      if (!node) {
        return
      }

      const scaleFactor =
        viewportAspectRatio < videoData.aspectRatio
          ? viewportHeight / refVideo.current.clientHeight
          : viewportWidth / refVideo.current.clientWidth

      setScrollTriggerInstanceVideo(
        gsap
          .timeline({
            scrollTrigger: {
              trigger: node,
              scrub: true,
              pin: refVideoContainer.current,
              anticipatePin: 1,
              refreshPriority: 10,
              invalidateOnRefresh: true,
              markers: false,
              end: 'bottom center',
            },
          })
          .to(refVideoContainer.current, {
            scale: scaleFactor,
            ease: 'power1.out',
            duration: 1,
          })
          .to(
            refVideoContainer.current,
            {
              borderRadius: '0rem',
              ease: 'expo.out',
              duration: 1,
            },
            0
          )
          .set(refContent.current, { alpha: 0 })
          .to(refVideoOverlay.current, {
            alpha: 1,
            ease: 'power1.slow',
            duration: 1.5,
          })
          .to(
            refContent.current,
            {
              alpha: 1,
              ease: 'power4.out',
              duration: 0.5,
            },
            2
          )
          .to({}, { duration: 0.75 })
      )
    },
    [videoData.aspectRatio, viewportAspectRatio, viewportHeight, viewportWidth]
  )

  const sectionContent = (
    <SectionWrapper {...props} ref={initScrollTriggerVideo}>
      <BackgroundVideoWrapper>
        <BackgroundVideoContainer
          ref={refVideoContainer}
          aspectRatio={videoData.aspectRatio}
        >
          <BackgroundVideo
            ref={refVideo}
            autoPlay
            playsInline
            muted
            loop
            poster={videoData?.screenshots?.[0]?.publicURL}
            {...props}
          >
            {videoData.sources}
          </BackgroundVideo>
          <BackgroundVideoOverlay ref={refVideoOverlay} />
        </BackgroundVideoContainer>
      </BackgroundVideoWrapper>
      {children && (
        <SectionContentWrapper
          verticalAlign={convertToFlexAlignment(verticalAlign)}
          horizontalAlign={convertToFlexAlignment(horizontalAlign)}
        >
          <SectionContent
            gap={gap}
            horizontalAlign={convertToFlexAlignment(horizontalAlign)}
            ref={refContent}
          >
            {children}
          </SectionContent>
        </SectionContentWrapper>
      )}
    </SectionWrapper>
  )

  if (colorSet) {
    return (
      <ColorSet name={colorSet} {...colors}>
        {sectionContent}
      </ColorSet>
    )
  }

  return sectionContent
}

SectionZoom.defaultProps = {
  verticalAlign: 'center',
}

SectionZoom.propTypes = {
  children: propTypes.node,
  /** Id of the background video */
  backgroundVideoId: propTypes.string.isRequired,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
  /** Overwrite default vertical margin. See <Link to="/docs/style-guide/#sizes">theme documentation for available sizes</Link> */
  gap: propTypes.string,
  /** Vertical alignment if the available space exceeds the content height */
  verticalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Horizontal alignment. Will detach the content from the content column. */
  horizontalAlign: propTypes.oneOf(['start', 'center', 'end']),
}

export default SectionZoom

import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Image from 'gatsby-theme-mdx-suite-core/src/components/image'
import enhanceFluid from '@gatsby-mdx-suite/helpers/data/enhance-fluid'

import Youtube from './youtube-video'

const YoutubeFeedWrapper = tw.div`w-full`

const YoutubePlayerWrapper = styled.div`
  ${tw`relative my-8`}

  max-width: 65vw;
  @media (min-width: 1000px) {
    max-width: none;
  }

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  & iframe {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`

const YoutubeFeedThumbnails = styled.div(
  ({ theme }) => css`
    ${tw`flex flex-wrap grid gap-grid-gap grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
  `
)

const ThumbnailLink = tw.a`block relative`
const ThumbnailImageWrapper = tw.div`z-0 relative`
const ThumbnailImage = styled(Image)``
const ThumbnailTitle = styled.div`
  ${tw`
    absolute z-20 bottom-0 left-0 right-0
    px-4 py-2
    text-white text-sm overflow-hidden whitespace-no-wrap text-center
  `}

  background: rgba(0, 0, 0, 0.25);
  text-overflow: ellipsis;
  transition: 0.15s all linear;

  a:hover & {
    ${tw`
      flex flex-col justify-center
      whitespace-normal
    `}
  }
`

/**
 * A gallery of all imported YouTube videos.
 *
 * Needs:
 * https://www.gatsbyjs.org/packages/gatsby-source-youtube/
 *
 * @example
 * <YoutubeFeed />
 */
export default function YoutubeFeed() {
  const {
    data: { youtubeVideos },
  } = useContext(MdxSuiteContext)

  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if (youtubeVideos) {
      setActiveVideo(youtubeVideos[0])
    }
  }, [youtubeVideos])

  if (!youtubeVideos) {
    return null
  }

  const handleThumbnailClick = (e) => {
    e.preventDefault()
    const { videoid } = e.currentTarget.dataset
    const newActiveVideo = youtubeVideos.find(
      (video) => video.videoId === videoid
    )
    setActiveVideo(newActiveVideo)
  }

  return (
    <YoutubeFeedWrapper>
      <YoutubePlayerWrapper>
        {activeVideo && <Youtube id={activeVideo.videoId} />}
      </YoutubePlayerWrapper>
      <YoutubeFeedThumbnails>
        {youtubeVideos.map((video) => (
          <ThumbnailLink
            href="#"
            key={video.videoId}
            data-videoid={video.videoId}
            onClick={handleThumbnailClick}
          >
            <ThumbnailImageWrapper>
              <ThumbnailImage
                fluid={enhanceFluid(video.localThumbnail.childImageSharp)}
              />
            </ThumbnailImageWrapper>
            <ThumbnailTitle>{video.title}</ThumbnailTitle>
          </ThumbnailLink>
        ))}
      </YoutubeFeedThumbnails>
    </YoutubeFeedWrapper>
  )
}

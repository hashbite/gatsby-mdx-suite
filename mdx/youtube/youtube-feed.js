import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import MdxDataContext from '@gatsby-mdx-suite/contexts/mdx-data'
import Image from '@gatsby-mdx-suite/mdx-basic/image'

import Youtube from './youtube-video'

const YoutubeFeedWrapper = styled.div`
  width: 100%;
`

const YoutubePlayerWrapper = styled.div`
  position: relative;
  margin: 0 auto ${({ theme }) => theme.spacing.s4}px;
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

const YoutubeFeedThumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s2}px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  & a {
    position: relative;
    display: block;
    flex: 1 0 50%;
    justify-content: space-between;

    @media (min-width: 600px) {
      flex: 1 0 25%;
    }
  }
`

const ThumbnailLink = styled.a`
  position: relative;
  display: block;
`
const ThumbnailImageWrapper = styled.div`
  z-index: 1;
  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  & .gatsby-image-wrapper {
    position: absolute !important;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
const ThumbnailImage = styled(Image)``
const ThumbnailTitle = styled.div`
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  height: 32px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 0.85em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.s2}px
    ${({ theme }) => theme.spacing.s2}px;

  transition: 0.15s all linear;

  a:hover & {
    height: 100%;
    background: rgba(255, 195, 63, 0.92);
    color: #000;
    white-space: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.1em;
    padding: ${({ theme }) => theme.spacing.s2}px;
    font-weight: bold;
  }
`

export default function YoutubeFeed({ channelId, ...props }) {
  const {youtubeVideos} = useContext(MdxDataContext)

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
                fluid={{
                  ...video.localThumbnail.childImageSharp.fluid,
                  base64: video.localThumbnail.childImageSharp.sqip.dataURI,
                }}
                objectFit="cover"
              />
            </ThumbnailImageWrapper>
            <ThumbnailTitle>{video.title}</ThumbnailTitle>
          </ThumbnailLink>
        ))}
      </YoutubeFeedThumbnails>
    </YoutubeFeedWrapper>
  )
}

YoutubeFeed.propTypes = {
  channelId: propTypes.string,
}

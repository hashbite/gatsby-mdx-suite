import React, { useContext } from 'react'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

export function useVideo({ contextKey, id }) {
  const {
    data,
    pageContext: { locale: activeLocale },
  } = useContext(MdxSuiteContext)

  const videos = data[contextKey]

  if (!videos) {
    throw new Error(
      `The media context "${contextKey}" does not exist or does not contain any data.`
    )
  }

  const video = videos.find(
    ({ assetId, locale }) => assetId === id && locale === activeLocale
  )

  if (!video) {
    throw new Error(
      `No data located for video:\n\n${JSON.stringify(arguments[0], null, 2)}`
    )
  }

  const aspectRatio = video.videoH264.aspectRatio

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

  const screenshots = video.videoScreenshots

  return { aspectRatio, sources, screenshots }
}

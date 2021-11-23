import React, { useContext } from 'react'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

export function useVideo({ contextKey, id }) {
  const {
    data,
    pageContext,
    themeConfig: { defaultLocale },
  } = useContext(MdxSuiteContext)

  const { locale: activeLocale } = pageContext

  const videos = data[contextKey]

  if (!videos) {
    throw new Error(
      `The media context "${contextKey}" does not exist or does not contain any data.`
    )
  }

  // Get all available image data in all locales
  const matches = videos.filter((asset) => asset.assetId === id)

  // Get data from active locale
  let videoData = matches.find(({ locale }) => locale === activeLocale)

  // Fall back to data with default locale
  if (!videoData) {
    videoData = matches.find(({ locale }) => locale === defaultLocale)
  }

  // Fall back to first available data from any locale
  if (!videoData && matches.length) {
    videoData = matches[0]
  }

  // Fall back to data with default locale
  if (!videoData) {
    videoData = matches.find(({ locale }) => locale === defaultLocale)
  }

  if (!videoData) {
    /**
     * @todo throw error here:
     * figure out how to do multi line error messages via Gatsby OR use our own error catch logic
     * */
    console.warn(
      [
        `--- MDX ASSET ERROR ---`,
        `Unable to locate video rendering data for ${id} for context ${contextKey}`,
        `Page Details:\n ${JSON.stringify(
          { ...pageContext, defaultLocale },
          null,
          2
        )}`,
        `Available Media:\n ${JSON.stringify(data, null, 2)}`,
        `--- MDX ASSET ERROR ---`,
      ].join(`\n\n`)
    )
    return null
  }

  const aspectRatio = videoData.videoH264.aspectRatio

  const sources = [
    { name: 'videoH265', type: 'video/mp4; codecs=hevc' },
    { name: 'videoVP9', type: 'video/webm; codecs=vp9,opus' },
    { name: 'videoH264', type: 'video/mp4; codecs=avc1.4d4032' },
  ]
    .filter(({ name }) => !!videoData[name])
    .map(({ name, type }) => (
      <source key={name} src={videoData[name].path} type={type} />
    ))

  if (!sources) {
    console.error(
      new Error(`No sources found for video:\n\n${JSON.stringify(videoData)}`)
    )
    // @todo throw error here
    return null
  }

  const screenshots = videoData.videoScreenshots

  return { aspectRatio, sources, screenshots }
}

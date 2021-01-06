import { useCallback, useContext, useMemo } from 'react'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const isVideo = (mimeType) => mimeType.indexOf('video') === 0

export const useMedia = () => {
  const {
    data: { docs, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const uniqueMedia = useMemo(() => {
    const mediaMap = new Map()
    docs.forEach((asset) => {
      mediaMap.set(asset.assetId, asset)
    })
    return Array.from(mediaMap.values())
  }, [docs])

  const images = useMemo(
    () =>
      uniqueMedia.filter(({ file: { contentType } }) => !isVideo(contentType)),
    [uniqueMedia]
  )

  const pictures = useMemo(
    () =>
      images.filter(
        ({ file: { contentType } }) => contentType.indexOf('jpeg') !== -1
      ),
    [images]
  )
  const graphics = useMemo(
    () =>
      images.filter(
        ({ file: { contentType } }) => contentType.indexOf('svg') !== -1
      ),
    [images]
  )

  const videos = useMemo(
    () =>
      uniqueMedia.filter(({ file: { contentType } }) => isVideo(contentType)),
    [uniqueMedia]
  )

  const replaceTokens = useCallback(
    (mdx) => {
      return mdx
        .replace(
          /"randomImageId"/gi,
          () => `"${images[Math.floor(Math.random() * images.length)].assetId}"`
        )
        .replace(
          /"randomPictureId"/gi,
          () =>
            `"${pictures[Math.floor(Math.random() * pictures.length)].assetId}"`
        )
        .replace(
          /"randomGraphicId"/gi,
          () =>
            `"${graphics[Math.floor(Math.random() * graphics.length)].assetId}"`
        )
        .replace(
          /"randomVideoId"/gi,
          () => `"${videos[Math.floor(Math.random() * videos.length)].assetId}"`
        )
        .replace(
          /"randomInstagramPostId"/gi,
          () =>
            `"${
              instagramPosts[Math.floor(Math.random() * instagramPosts.length)]
                .id
            }"`
        )
        .replace(
          /"randomYoutubeVideoId"/gi,
          () =>
            `"${
              youtubeVideos[Math.floor(Math.random() * youtubeVideos.length)]
                .videoId
            }"`
        )
    },
    [graphics, images, pictures, videos, instagramPosts, youtubeVideos]
  )

  return {
    media: uniqueMedia,
    graphics,
    images,
    pictures,
    videos,
    instagramPosts,
    youtubeVideos,
    replaceTokens,
  }
}

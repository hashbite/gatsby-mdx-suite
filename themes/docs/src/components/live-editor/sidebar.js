import React, { useCallback, useState, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Image from 'gatsby-image'
import prettyBytes from 'pretty-bytes'
import Fuse from 'fuse.js'

import { useMedia } from './hooks'

const LiveEditorSidebarWrapper = styled.div`
  grid-area: sidebar;
  width: 360px;

  ${tw`bg-gray-300 p-content-gap overflow-y-scroll`}
`
const LiveEditorSidebarSearch = styled.input`
  ${tw`rounded w-full px-2 py-2 mb-4`}
`

const LiveEditorSidebarMediaAsset = styled.figure`
  ${tw`cursor-pointer mt-content-gap p-0`}
`
const LiveEditorSidebarMediaAssetThumbnail = styled(Image)`
  max-width: 300px;
  ${tw`block! mx-auto mb-1`}
`
const LiveEditorSidebarMediaAssetCaption = styled.figcaption`
  ${tw`text-center text-xs text-gray-800`}
`

function LiveEditorSidebar({ editorRef }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { media } = useMedia()

  const fuse = useMemo(() => {
    return new Fuse(media, { keys: ['title'] })
  }, [media])

  const filteredMedia = useMemo(() => {
    if (!searchTerm) {
      return media
    }
    return fuse.search(searchTerm).map(({ item }) => item)
  }, [searchTerm, fuse, media])

  const injectMediaId = useCallback(
    (assetId) => {
      editorRef.current.trigger('keyboard', 'type', { text: assetId })
    },
    [editorRef]
  )

  const searchMedia = useCallback((e) => setSearchTerm(e.target.value), [])

  return (
    <LiveEditorSidebarWrapper>
      <LiveEditorSidebarSearch
        type="search"
        onChange={searchMedia}
        defaultValue={searchTerm}
        placeholder="Search for media..."
      />
      {filteredMedia.map((asset) => (
        <LiveEditorSidebarMediaAsset
          key={asset.assetId}
          onClick={() => injectMediaId(asset.assetId)}
        >
          <LiveEditorSidebarMediaAssetThumbnail
            fixed={
              (asset?.videoScreenshots &&
                asset.videoScreenshots[0]?.childImageSharp?.fixed) ||
              asset.fixed
            }
          />
          <LiveEditorSidebarMediaAssetCaption>
            {asset.title} ({prettyBytes(asset.file.details.size)})
          </LiveEditorSidebarMediaAssetCaption>
        </LiveEditorSidebarMediaAsset>
      ))}
    </LiveEditorSidebarWrapper>
  )
}

LiveEditorSidebar.propTypes = {
  editorRef: propTypes.object.isRequired,
}

export default LiveEditorSidebar

import React, { useCallback, useState, useMemo, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Image from 'gatsby-image'
import prettyBytes from 'pretty-bytes'
import Fuse from 'fuse.js'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'
import Search from 'gatsby-theme-mdx-suite-base/src/components/form/fields/search'

import { useMedia } from './hooks'

const LiveEditorSidebarWrapper = styled.div`
  grid-area: sidebar;
  width: 360px;

  ${tw`bg-gray-300 p-content-gap overflow-y-scroll`}
`
const LiveEditorSidebarSearch = styled(Search)`
  ${tw`rounded w-full`}
  & + label {
    ${tw`rounded-r`}
  }
`

const LiveEditorSidebarMediaAsset = styled.figure`
  ${tw`cursor-pointer mt-content-gap bg-gray-100 rounded p-2`}
`
const LiveEditorSidebarMediaAssetThumbnail = styled(Image)`
  max-width: 300px;
  ${tw`block! mx-auto mb-1`}
`
const LiveEditorSidebarMediaAssetCaption = styled.figcaption`
  ${tw`text-center text-xs text-gray-800`}
`

const IconsGrid = tw.div`grid grid-cols-4 gap-2`
const IconsGridItem = tw.div`text-center bg-gray-100 rounded p-2 cursor-pointer`
const IconsGridItemTitle = tw.div`mt-4 text-sm text-gray-800`
const IconsGridItemContent = tw.div``

function LiveEditorSidebar({ editorRef, tab }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { media } = useMedia()
  const icons = useContext(IconsContext)

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
  const injectIcon = useCallback(
    (name) => {
      editorRef.current.trigger('keyboard', 'type', {
        text: `<Icon icon="${name}"/>`,
      })
    },
    [editorRef]
  )

  const searchMedia = useCallback((e) => setSearchTerm(e.target.value), [])

  return (
    <LiveEditorSidebarWrapper>
      {tab === 'media' && (
        <>
          <h1>Media</h1>
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
        </>
      )}
      {tab === 'icons' && (
        <>
          <h1>Icons</h1>
          <IconsGrid>
            {[...icons.keys()].map((name) => {
              return (
                <IconsGridItem key={name} onClick={() => injectIcon(name)}>
                  <IconsGridItemContent>
                    <Icon icon={name} />
                  </IconsGridItemContent>
                  <IconsGridItemTitle>{name}</IconsGridItemTitle>
                </IconsGridItem>
              )
            })}
          </IconsGrid>
        </>
      )}
    </LiveEditorSidebarWrapper>
  )
}

LiveEditorSidebar.propTypes = {
  editorRef: propTypes.object.isRequired,
}

export default LiveEditorSidebar

import React, { useCallback, useState, useMemo, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Image from 'gatsby-image'
import prettyBytes from 'pretty-bytes'
import Fuse from 'fuse.js'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'
import CTA from '@gatsby-mdx-suite/mdx-link/cta'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
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

const Color = tw.div``
const ColorWrapper = tw.div`mb-content-gap`
const ColorSwatches = tw.div`flex gap-2`
const ColorSwatchWrapper = tw.div`
  bg-gray-100 p-2
  text-center`
const ColorSwatch = styled.div(
  ({ color, onClick }) => css`
    ${tw`
    inline-block align-middle
    w-8 h-8 mr-2
    rounded
    `}
    ${!!onClick && tw`cursor-pointer`}
    background: ${color};
  `
)
const ColorSwatchVariantTitle = tw.span`text-xs text-gray-700`

const ColorSets = tw.div`grid gap-grid-gap grid-cols-1`
const ColorSetWrapper = styled.div`
  ${tw`p-4`}
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`
const ColorSetTitle = tw.h2`mb-4`

const FontPreview = styled.div`
  & + & {
    ${tw`mt-12`}
  }
`

const Sizes = tw.div`mb-content-gap`
const Size = tw.div`whitespace-no-wrap`
const Length = styled.div(
  ({ width }) => css`
    ${tw`border border-red-300 text-center inline-block mr-2`}
    width: ${width};
    min-height: 0.8rem;
    border-top: none;
  `
)

function LiveEditorSidebar({ editorInstance, tab }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { media } = useMedia()
  const icons = useContext(IconsContext)
  const theme = useTheme()

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
      editorInstance.trigger('keyboard', 'type', { text: assetId })
    },
    [editorInstance]
  )
  const injectIcon = useCallback(
    (name) => {
      editorInstance.trigger('keyboard', 'type', {
        text: `<Icon icon="${name}"/>`,
      })
    },
    [editorInstance]
  )
  const injectColor = useCallback(
    (color) => {
      editorInstance.trigger('keyboard', 'type', {
        text: color,
      })
    },
    [editorInstance]
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
      {tab === 'colors' && (
        <>
          <h1>Colors:</h1>
          {Object.keys(theme.colors)
            .sort((a, b) => a.localeCompare(b))
            .sort((a, b) => {
              const isObjectA = typeof theme.colors[a] === 'object'
              const isObjectB = typeof theme.colors[b] === 'object'
              if (isObjectA && isObjectB) {
                return 0
              }

              return isObjectB ? -1 : 1
            })
            .filter((name) => name !== 'sets')
            .map((name) => {
              const colorData = theme.colors[name]
              return (
                <ColorWrapper>
                  {typeof colorData === 'object' ? (
                    <>
                      <Color>{name}:</Color>
                      <ColorSwatches>
                        {Object.keys(colorData).map((colorVariant, i) => (
                          <ColorSwatchWrapper key={i}>
                            <ColorSwatch
                              color={colorData[colorVariant]}
                              onClick={() =>
                                injectColor(`${name}-${colorVariant}`)
                              }
                            />
                            <ColorSwatchVariantTitle>
                              {colorVariant}
                            </ColorSwatchVariantTitle>
                          </ColorSwatchWrapper>
                        ))}
                      </ColorSwatches>
                    </>
                  ) : (
                    <Color>
                      {name}:{' '}
                      {colorData === 'inherit' ? (
                        'current color'
                      ) : (
                        <ColorSwatch
                          color={colorData}
                          onClick={() => injectColor(name)}
                        />
                      )}
                    </Color>
                  )}
                </ColorWrapper>
              )
            })}
          <h1>Color Sets:</h1>
          <ColorSets>
            {Object.keys(theme.colors.sets)
              .sort((a, b) => a.localeCompare(b))
              .map((name) => {
                const setData = theme.colors.sets[name]
                return (
                  <ColorSet key={name} name={name}>
                    <ColorSetWrapper>
                      <ColorSetTitle>
                        Color set: <strong>{name}</strong>
                      </ColorSetTitle>
                      <p>This is an example for the {name} color set.</p>
                      <p>
                        <CTA href="#">Example CTA</CTA>
                      </p>
                      <h2>Colors:</h2>
                      {Object.keys(setData)
                        .sort((a, b) => a.localeCompare(b))
                        .map((color) =>
                          Array.isArray(setData[color]) ? (
                            setData[color].map((value, i) => (
                              <ColorSwatch
                                key={i}
                                color={value}
                                title={color}
                              />
                            ))
                          ) : (
                            <ColorSwatch color={setData[color]} title={color} />
                          )
                        )}
                    </ColorSetWrapper>
                  </ColorSet>
                )
              })}
          </ColorSets>
        </>
      )}
      {tab === 'fonts' && (
        <>
          <h1>Fonts:</h1>
          {Object.keys(theme.fontFamily)
            .sort((a, b) => a.localeCompare(b))
            .map((font) => (
              <FontPreview key={font} font={font}>
                <h1
                  css={css`
                    font-family: ${theme.fontFamily[font].join(', ')};
                  `}
                >
                  {font}
                </h1>
                <p
                  css={css`
                    font-family: ${theme.fontFamily[font].join(', ')};
                  `}
                >
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p>
                  Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.
                </p>
                <p>
                  <strong>Font families: </strong>
                  {theme.fontFamily[font].join(', ')}
                </p>
              </FontPreview>
            ))}
        </>
      )}
      {tab === 'sizes' && (
        <>
          <h1>Sizes:</h1>
          <Sizes>
            {Object.keys(theme.spacing).map((size) => (
              <Size>
                <Length width={theme.spacing[size]} />
                {size}
              </Size>
            ))}
          </Sizes>
        </>
      )}
    </LiveEditorSidebarWrapper>
  )
}

LiveEditorSidebar.propTypes = {
  editorRef: propTypes.object.isRequired,
}

export default LiveEditorSidebar

import React, { useCallback, useState, useMemo, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { GatsbyImage } from 'gatsby-plugin-image'
import prettyBytes from 'pretty-bytes'
import Fuse from 'fuse.js'
import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { useMDXComponents } from '@mdx-js/react'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'
import Search from 'gatsby-theme-mdx-suite-base/src/components/form/fields/search'
import * as animations from 'gatsby-theme-mdx-suite-core/src/animations/index'

import { useMedia } from './hooks'
import ColorSet from '../style-guide/components/color-set'

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
const LiveEditorSidebarMediaAssetThumbnail = styled(GatsbyImage)`
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

const FontPreview = styled.div`
  & + & {
    ${tw`mt-12`}
  }
`

const Sizes = tw.div`mb-content-gap`
const Size = tw.div`whitespace-nowrap`
const Length = styled.div(
  ({ width }) => css`
    ${tw`border border-red-300 text-center inline-block mr-2`}
    width: ${width};
    min-height: 0.8rem;
    border-top: none;
  `
)

const Help = styled.div`
  & kbd {
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #b4b4b4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
      0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
    color: #333;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 700;
    line-height: 1;
    padding: 3px 6px;
    white-space: nowrap;
  }
  & code {
    ${tw`bg-gray-100 whitespace-nowrap`}
    padding: 2px 4px;
  }
`

const AnimationsGrid = styled.div``
const AnimationsGridItem = styled.h2(
  ({ name }) => css`
    animation: 2s ${animations[name].keyframes};
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    ${tw`cursor-pointer`}
  `
)

const SnippetsGrid = styled.div``
const Snippet = styled.div(
  ({ name }) => css`
    ${tw`cursor-pointer`}
  `
)

function LiveEditorSidebar({ editorInstance, tab }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { media } = useMedia()
  const icons = useContext(IconsContext)
  const theme = useTheme()
  const mdxComponents = useMDXComponents()
  const snippets = useMemo(() => {
    let list = []

    for (const mdxComponentName in mdxComponents) {
      const mdxComponent = mdxComponents[mdxComponentName]
      if (mdxComponent?.snippets?.length > 0) {
        list = list.concat(mdxComponent.snippets)
      }
    }

    return list
  }, [mdxComponents])

  console.log({ mdxComponents, snippets })

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
  const injectAnimation = useCallback(
    (name) => {
      editorInstance.trigger('keyboard', 'type', {
        text: `<Animate show="2s ${name}">\n\n# Animated\n\n</Animate>`,
      })
    },
    [editorInstance]
  )

  const injectSnippet = useCallback(
    (snippet) => {
      editorInstance.focus()
      const position = editorInstance.getPosition()

      // If not at first position of line, add new empty line below cursor
      if (position.column !== 1) {
        editorInstance.setPosition({
          column: 1,
          lineNumber: position.lineNumber + 1,
        })
        editorInstance.trigger('keyboard', 'type', {
          text: `\n`,
        })
      }

      // Add snippet to editor
      const snippetController =
        editorInstance.getContribution('snippetController2')
      snippetController.insert(snippet)

      // Get into new line after snippet
      editorInstance.trigger('keyboard', 'type', {
        text: `\n`,
      })
    },
    [editorInstance]
  )

  const searchMedia = useCallback((e) => setSearchTerm(e.target.value), [])

  const isMac = window?.navigator?.platform.toUpperCase().indexOf('MAC') >= 0
  const controlKey = isMac ? '⌘ CMD' : 'STRG'
  const shiftKey = '⇧ Shift'
  const altKey = isMac ? '⌥ OPTION' : 'ALT'
  const tabKey = '↹ Tab'
  const spaceKey = 'Space'

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
          {filteredMedia.map((asset) => {
            const metadata = [
              prettyBytes(asset.file.details.size),
              asset?.videoH264 &&
                `${asset.videoH264.width}×${asset.videoH264.height}`,
              asset?.videoH264?.aspectRatio &&
                `1∶${parseFloat(asset.videoH264.aspectRatio.toFixed(3))}`,
            ].filter(Boolean)
            const thumbnailData =
              (asset?.videoScreenshots &&
                asset.videoScreenshots[0]?.childImageSharp?.gatsbyImageData) ||
              asset.gatsbyImageData

            const thumbnail = thumbnailData ? (
              <LiveEditorSidebarMediaAssetThumbnail
                image={thumbnailData}
                alt={asset.title}
              />
            ) : (
              <img src={asset.file.url} alt={asset.title} />
            )
            return (
              <LiveEditorSidebarMediaAsset
                key={asset.assetId}
                onClick={() => injectMediaId(asset.assetId)}
              >
                {thumbnail}
                <LiveEditorSidebarMediaAssetCaption>
                  {asset.title} ({metadata.join(', ')})
                </LiveEditorSidebarMediaAssetCaption>
              </LiveEditorSidebarMediaAsset>
            )
          })}
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
                          <ColorSwatchWrapper key={colorVariant}>
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
              .map((name) => (
                <ColorSet name={name} data={theme.colors.sets[name]} />
              ))}
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
      {tab === 'help' && (
        <Help>
          <h1>Help:</h1>
          <h2>Hotkeys:</h2>
          <ul>
            <li>
              <kbd>{controlKey}</kbd> + <kbd>{spaceKey}</kbd>: Autocompletion
            </li>
            <li>
              <kbd>{controlKey}</kbd> + <kbd>F</kbd>: Search
            </li>
            <li>
              {isMac ? (
                <>
                  <kbd>{controlKey}</kbd> + <kbd>{altKey}</kbd> + <kbd>F</kbd>
                </>
              ) : (
                <>
                  <kbd>{controlKey}</kbd> + <kbd>H</kbd>
                </>
              )}
              : Search &amp; replace
            </li>
            <li>
              <kbd>F1</kbd>: Open command menu
            </li>
          </ul>
          <h3>Indentation:</h3>
          <p>
            Select multiple lines and change the indentation with these hotkeys:
          </p>
          <ul>
            <li>
              <kbd>{tabKey}</kbd>: Indent lines
            </li>
            <li>
              <kbd>{shiftKey}</kbd> + <kbd>{tabKey}</kbd>: Unindent lines
            </li>
          </ul>
          <h2>Tokens:</h2>
          <p>
            The editor supports multiple tokens which are replaced by Contentful
            ids. These tokens are for demonstration purposes and will work in
            the preview mode only.
          </p>
          <ul>
            <li>
              <code>randomImageId</code>: A random image (pixel &amp; vector)
            </li>
            <li>
              <code>randomGraphicId</code>: A random vector graphic
            </li>
            <li>
              <code>randomPictureId</code>: A random pixel image
            </li>
            <li>
              <code>randomVideoId</code>: A random video id
            </li>
          </ul>
          <h3>Example: </h3>
          <p>
            <code>&lt;Image id="randomImageId"/&gt;</code>
            <br />
            will be rendered as
            <br />
            <code>&lt;Image id="a1b2c3d4e5f6g7h8"/&gt;</code>
          </p>
        </Help>
      )}
      {tab === 'animations' && (
        <>
          <h1>Animations:</h1>
          <AnimationsGrid>
            {Object.keys(animations).map((name) => {
              return (
                <AnimationsGridItem
                  key={name}
                  name={name}
                  onClick={() => injectAnimation(name)}
                >
                  {name}
                </AnimationsGridItem>
              )
            })}
          </AnimationsGrid>
        </>
      )}
      {tab === 'snippets' && (
        <>
          <h1>Snippets:</h1>
          <SnippetsGrid>
            {snippets.map(({ title, icon, snippet }) => {
              return (
                <Snippet key={title} onClick={() => injectSnippet(snippet)}>
                  {icon}
                  {title}
                </Snippet>
              )
            })}
          </SnippetsGrid>
        </>
      )}
    </LiveEditorSidebarWrapper>
  )
}

LiveEditorSidebar.propTypes = {
  editorRef: propTypes.object.isRequired,
}

export default LiveEditorSidebar

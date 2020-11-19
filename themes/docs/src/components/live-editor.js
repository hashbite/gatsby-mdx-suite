import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import tw from 'twin.macro'
import Image from 'gatsby-image'
import prettyBytes from 'pretty-bytes'
import Fuse from 'fuse.js'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import Editor from '@monaco-editor/react'

const LiveEditorWrapper = styled.section(
  ({ layout, previewExpanded }) => css`
    ${tw`grid`}

    ${layout === 'horizontal'
      ? css`
          grid-template-columns: 1fr;
          grid-template-rows: min-content 50vh min-content 30vh min-content;
          grid-template-areas:
            'toolbar-preview'
            'preview'
            'toolbar-editor'
            'editor'
            'error';
          max-height: calc(80vh);
        `
      : css`
          ${tw`w-screen`}
          grid-template-columns: ${previewExpanded
            ? '768px'
            : '420px'} 1fr max-content;
          grid-template-rows: min-content 1fr min-content;
          grid-template-areas:
            'toolbar-preview toolbar-editor toolbar-sidebar'
            'preview editor sidebar'
            'preview error sidebar';
          height: 100%;
        `}
  `
)

const LiveEditorSidebar = styled.div`
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

const LiveEditorPreviewWrapper = styled.div`
  ${tw`relative shadow-inner w-full h-full`}
  grid-area: preview;
`
const LiveEditorPreview = styled.iframe`
  ${tw`overflow-scroll w-full h-full`}
`

const toolbarStyles = css`
  ${tw`flex justify-between`}
  ${tw`bg-gray-900 p-1`}
`
const LivePreviewToolbar = styled.div`
  ${toolbarStyles}
  grid-area: toolbar-preview;
`

const LiveEditorToolbar = styled.div`
  ${toolbarStyles}
  grid-area: toolbar-editor;
`
const LiveEditorSidebarToolbar = styled.div`
  ${toolbarStyles}
  grid-area: toolbar-sidebar;
`
const ToolbarSection = styled.div``
const Button = styled.button`
  ${tw`rounded bg-gray-200 text-gray-900 px-2 py-1 m-1`}

  :disabled {
    ${tw`text-gray-600`}
  }
`

const ButtonLabel = styled.span``
const ButtonIcon = styled(Icon)`
  vertical-align: middle;
  & + * {
    ${tw`pl-2`}
  }
`

const LiveEditorErrorBar = styled.div(
  () => css`
    grid-area: error;
    ${tw`
      flex justify-between items-center flex-wrap
      p-4
      border border-red-400
      bg-red-700 text-white`}
  `
)
const LiveEditorErrorTitle = styled.div(() => css``)
const LiveEditorErrorToggle = styled.button(
  () => css`
    ${tw`rounded bg-red-500 px-2 py-1 cursor-pointer`}

    :focus {
      ${tw`outline-none bg-red-400`}
    }
  `
)
const LiveEditorErrorDetails = styled.pre(
  ({ visible }) => css`
    ${tw`
      hidden flex-none w-full
      pt-content-gap
      text-sm
    `}
    ${visible && tw`block`}
  `
)

const LiveEditorEditor = styled.div(
  ({ hasError }) => css`
    grid-area: editor;
    min-height: 4rem;

    ${hasError &&
    css`
      .monaco-editor .view-overlays .current-line {
        background-color: #5c424b;
        border: none;
      }
    `}
  `
)

const isVideo = (mimeType) => mimeType.indexOf('video') === 0

function LiveEditor({ editorId, initialValue, layout }) {
  const localStorageId = `mdx-suite-live-editor-${editorId}`
  const editorRef = useRef(null)
  const [error, setError] = useState()
  const [errorDetailsVisible, setErrorDetailsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: { docs, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const editorValue = useMemo(
    () => localStorage.getItem(localStorageId) || initialValue || '',
    [localStorageId, initialValue]
  )

  const [unverifiedValue, setUnverifiedValue] = useDebounce(editorValue, 1000)

  const handleEditorDidMount = useCallback(
    (_, editor) => {
      editorRef.current = editor
      editorRef.current.onDidChangeModelContent((ev) => {
        setUnverifiedValue(editorRef.current.getValue())
      })
    },
    [setUnverifiedValue]
  )

  const uniqueMedia = useMemo(() => {
    const mediaMap = new Map()
    docs.forEach((asset) => {
      mediaMap.set(asset.assetId, asset)
    })
    return Array.from(mediaMap.values())
  }, [docs])

  const fuse = useMemo(() => {
    return new Fuse(uniqueMedia, { keys: ['title'] })
  }, [uniqueMedia])

  const media = useMemo(() => {
    if (!searchTerm) {
      return uniqueMedia
    }
    return fuse.search(searchTerm).map(({ item }) => item)
  }, [searchTerm, fuse, uniqueMedia])

  const images = useMemo(
    () =>
      uniqueMedia.filter(({ file: { contentType } }) => !isVideo(contentType)),
    [uniqueMedia]
  )

  const pictures = useMemo(
    () =>
      images.filter(
        ({ file: { contentType } }) => contentType.indexOf('svg') === -1
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

  useEffect(() => {
    async function parseMdx() {
      try {
        // Validate mdx by parsing it
        await mdx(unverifiedValue)

        // Replace tokens with asset ids
        const processedValue = replaceTokens(unverifiedValue)

        // Set valid raw value
        setError(null)
        localStorage.setItem(localStorageId, unverifiedValue)

        localStorage.setItem(`${localStorageId}-processed`, processedValue)
      } catch (error) {
        console.error(error)

        const fixedLines = error.message
          .replace(/[> ]+([0-9]+) \|/g, (a, b) => a.replace(b, parseInt(b) - 4))
          .replace(/\(([0-9]+):[0-9]+\)/, (a, b) =>
            a.replace(b, parseInt(b) - 4)
          )
          .replace(/unknown:/g, '')
        const lines = fixedLines
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
        error.message = lines.shift()
        error.details = lines.join('\n')
        setError(error)
      }
    }

    parseMdx()
  }, [unverifiedValue, localStorageId, replaceTokens])

  const previewSrc = `/docs/preview?id=${`${localStorageId}-processed`}`

  const onToggleDebugMode = useCallback((e) => {
    console.log('called onToggleDebugMode', e)
    alert('This feature is currenty still in development')
  }, [])

  const onClickReload = useCallback((e) => {
    console.log('called onClickReload', e)
    alert('This feature is currenty still in development')
  }, [])
  const onToggleAutoReload = useCallback((e) => {
    console.log('called onToggleAutoReload', e)
    alert('This feature is currenty still in development')
  }, [])
  const onOpenToolbar = useCallback((e) => {
    console.log('called onOpenToolbar', e)
    alert('This feature is currenty still in development')
  }, [])
  const [previewExpanded, setPreviewExpanded] = useState(false)
  const onTogglePreviewExpanded = useCallback(
    (e) => setPreviewExpanded((v) => !v),
    []
  )
  const onReset = useCallback(
    (e) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure you want to reset your progress?')) {
        editorRef.current.setValue(initialValue)
      }
    },
    [initialValue]
  )

  const toggleErrorDetailsVisible = useCallback(() => {
    setErrorDetailsVisible((v) => !v)
  }, [])

  const injectMediaId = useCallback(
    (assetId) => {
      editorRef.current.trigger('keyboard', 'type', { text: assetId })
    },
    [editorRef]
  )

  const searchMedia = useCallback((e) => setSearchTerm(e.target.value), [])

  return (
    <LiveEditorWrapper layout={layout} previewExpanded={previewExpanded}>
      {error && (
        <LiveEditorErrorBar>
          <LiveEditorErrorTitle>
            <strong>Oops, something went wrong:</strong> {error.message}
          </LiveEditorErrorTitle>
          <LiveEditorErrorToggle onClick={toggleErrorDetailsVisible}>
            <Icon icon="search" verticalAlign="middle" /> Details
          </LiveEditorErrorToggle>
          <LiveEditorErrorDetails visible={errorDetailsVisible}>
            {error.details}
          </LiveEditorErrorDetails>
        </LiveEditorErrorBar>
      )}
      <LivePreviewToolbar>
        <Button target="_blank" href={previewSrc} as="a">
          <ButtonIcon icon="external-link" /> <ButtonLabel>Preview</ButtonLabel>
        </Button>
        <Button onClick={onToggleDebugMode} disabled>
          <ButtonIcon icon="search" />
          <ButtonLabel>Debug</ButtonLabel>
        </Button>
        <Button onClick={onTogglePreviewExpanded}>
          <ButtonIcon icon="switch" />
          <ButtonLabel>
            {previewExpanded ? 'Mobile View' : 'Tablet View'}
          </ButtonLabel>
        </Button>
      </LivePreviewToolbar>
      <LiveEditorPreviewWrapper>
        <LiveEditorPreview src={previewSrc} />
      </LiveEditorPreviewWrapper>
      <LiveEditorToolbar>
        <ToolbarSection>
          <Button onClick={onClickReload} disabled>
            <ButtonIcon icon="repeat" />
          </Button>
          <Button onClick={onToggleAutoReload} disabled>
            <ButtonIcon icon="repeat" />
            <ButtonIcon icon={true ? 'lock' : 'unlock'} />
            Auto Reload
          </Button>
        </ToolbarSection>
        <Button onClick={() => onOpenToolbar('snippets')} disabled>
          <ButtonIcon icon="snippets" />
          <ButtonLabel>Snippets</ButtonLabel>
        </Button>
        <Button onClick={() => onOpenToolbar('help')} disabled>
          <ButtonIcon icon="question" />
          <ButtonLabel>Help</ButtonLabel>
        </Button>
        <Button onClick={onReset}>
          <ButtonIcon icon="trash" />
          <ButtonLabel>Reset</ButtonLabel>
        </Button>
      </LiveEditorToolbar>
      <LiveEditorEditor hasError={!!error}>
        <Editor
          height="100%"
          editorDidMount={handleEditorDidMount}
          language="markdown"
          theme="dark"
          value={editorValue}
        />
      </LiveEditorEditor>
      {layout !== 'horizontal' && (
        <>
          <LiveEditorSidebarToolbar>
            <ToolbarSection>
              <select>
                <option>Media</option>
                <option>Icons</option>
                <option>Colors</option>
                <option>Fonts</option>
                <option>Sizes</option>
              </select>
            </ToolbarSection>
          </LiveEditorSidebarToolbar>
          <LiveEditorSidebar>
            <LiveEditorSidebarSearch
              type="search"
              onChange={searchMedia}
              defaultValue={searchTerm}
              placeholder="Search for media..."
            />
            {media.map((asset) => (
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
          </LiveEditorSidebar>
        </>
      )}
    </LiveEditorWrapper>
  )
}

LiveEditor.defaultProps = {
  editorId: 'default-editor',
  layout: 'horizontal',
}

LiveEditor.propTypes = {
  editorId: propTypes.string,
  initialValue: propTypes.string,
  layout: propTypes.string,
}

const LiveEditorBrowserOnlyWrapper = (props) =>
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement ? (
    <LiveEditor {...props} />
  ) : null

export default LiveEditorBrowserOnlyWrapper

import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from 'react'
import { useDebounce, useDebounceCallback } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'
import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'

const AceEditor = React.lazy(() =>
  import(/* webpackChunkName: "ace-editor" */ './ace-editor')
)

const LiveEditorWrapper = styled.section(
  ({ layout }) => css`
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
          grid-template-columns: 420px 1fr;
          grid-template-rows: min-content 1fr min-content;
          grid-template-areas:
            'toolbar-preview toolbar-editor'
            'preview editor'
            'error error';
          height: 100%;
        `}
  `
)
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

const LiveEditorError = styled.div`
  ${tw`p-4 border-4 border-dashed border-red-400 bg-red-700 text-white`}
  grid-area: error;
`
const LiveEditorErrorMessage = tw.pre`text-sm`
const LiveEditorEditor = styled.div`
  grid-area: editor;
  min-height: 4rem;

  .ace_heading {
    ${tw`font-bold text-blue-600`}
  }

  .ace_xml,
  .ace_html {
    &.ace_punctuation,
    &.ace_tag-name {
      ${tw`font-bold text-green-600`}
    }

    &.ace_attribute-name {
      ${tw`font-bold text-red-600`}
    }

    &.ace_attribute-value {
      ${tw`font-bold text-orange-600`}
    }
  }

  .ace_emphasis {
    ${tw`italic`}
  }
  .ace_strong {
    ${tw`font-bold`}
  }
`

const isVideo = (mimeType) => mimeType.indexOf('video') === 0

function LiveEditor({ editorId, initialValue, layout }) {
  const localStorageId = `mdx-suite-live-editor-${editorId}`
  const editorRef = useRef(null)
  const [error, setError] = useState()
  const {
    data: { full, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const images = useMemo(
    () => full.filter(({ file: { contentType } }) => !isVideo(contentType)),
    [full]
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
    () => full.filter(({ file: { contentType } }) => isVideo(contentType)),
    [full]
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

  const [editorValue, setEditorValue] = useState(
    localStorage.getItem(localStorageId) || initialValue || ''
  )
  const [unverifiedValue, setUnverifiedValue] = useDebounce(editorValue, 1000)

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
        error.message = error.message
          .replace(/[> ]+([0-9]+) \|/g, (a, b) => a.replace(b, parseInt(b) - 4))
          .replace(/\(([0-9]+):[0-9]+\)/, (a, b) =>
            a.replace(b, parseInt(b) - 4)
          )
        setError(error)
        if (editorRef.current) {
          editorRef.current.editor.resize()
        }
      }
    }

    parseMdx()
  }, [unverifiedValue, localStorageId, replaceTokens])

  useEffect(() => {
    if (unverifiedValue !== editorValue && editorValue) {
      setUnverifiedValue(editorValue)
    }
  }, [editorValue, setUnverifiedValue, unverifiedValue])

  const isSSR = typeof window === 'undefined'

  const handleEditorChange = useDebounceCallback(
    (content) => setEditorValue(content.replace(/^[ \t]+$/gm, '')),
    300
  )

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

  return (
    <LiveEditorWrapper layout={layout}>
      {error && (
        <LiveEditorError>
          <h3>Oops, something went wrong:</h3>
          <LiveEditorErrorMessage>{error.message}</LiveEditorErrorMessage>
        </LiveEditorError>
      )}
      <LivePreviewToolbar>
        <Button target="_blank" href={previewSrc} as="a">
          <ButtonIcon icon="external-link" /> <ButtonLabel>Preview</ButtonLabel>
        </Button>
        <Button onClick={onToggleDebugMode} disabled>
          <ButtonIcon icon="search" />
          <ButtonLabel>Debug</ButtonLabel>
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
      </LiveEditorToolbar>
      <LiveEditorEditor>
        {!isSSR && (
          <React.Suspense fallback={<Loading />}>
            <AceEditor
              mode="markdown"
              theme="dracula"
              ref={editorRef}
              enableEmmet
              enableLiveAutocompletion
              tabSize={2}
              onChange={handleEditorChange}
              name={`docs-ace-editor-${editorId}`}
              editorProps={{
                $blockScrolling: true,
              }}
              value={editorValue}
              width="100%"
              height="100%"
            />
          </React.Suspense>
        )}
      </LiveEditorEditor>
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

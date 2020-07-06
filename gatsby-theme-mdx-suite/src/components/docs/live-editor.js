import React, { useState, useEffect, useContext, useRef } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import { Styled } from 'theme-ui'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import EntypoTabletMobileCombo from 'react-entypo-icons/lib/entypo/TabletMobileCombo'

const AceEditor = loadable(async () => {
  const ace = await import('react-ace')
  await import('ace-builds/src-min-noconflict/ext-searchbox')
  await import('ace-builds/src-min-noconflict/ext-language_tools')
  await import('ace-builds/src-min-noconflict/mode-markdown')
  await import('ace-builds/src-min-noconflict/theme-dracula')
  return ace
})

const LiveEditorWrapper = styled.section(
  ({ layout }) => css`
    ${tw`grid`}

    ${layout === 'horizontal'
      ? css`
          grid-template-columns: 1fr;
          grid-template-rows: 50vh 30vh min-content;
          grid-template-areas:
            'preview'
            'editor'
            'error';
          max-height: calc(100vh - 60px);
        `
      : css`
          ${tw`w-screen`}
          grid-template-columns: 420px 1fr;
          grid-template-rows: 1fr min-content;
          grid-template-areas:
            'preview editor'
            'error error';
          height: calc(100vh - 60px);
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
const PreviewControls = tw.div`absolute z-50 right-0 top-0 m-4`
const PreviewControl = tw.a`rounded bg-gray-200 px-2 py-1`

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

function LiveEditor({ editorId, initialValue, layout }) {
  if (
    !(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  ) {
    return null
  }

  const localStorageId = `mdx-suite-live-editor-${editorId}`
  const editorRef = useRef(null)
  const [editorValue, setEditorValue] = useState(
    localStorage.getItem(localStorageId) || initialValue || ''
  )
  const [unverifiedValue, setUnverifiedValue] = useDebounce(editorValue, 300)
  const [error, setError] = useState()
  const {
    data: { full, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const pictures = full.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') === -1
  )
  const graphics = full.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') !== -1
  )

  const videos = full.filter(
    ({ file: { contentType } }) => contentType.indexOf('video') === 1
  )

  useEffect(() => {
    async function parseMdx() {
      try {
        // Replace tokens with asset ids
        const processedValue = unverifiedValue
          .replace(
            /"randomImageId"/gi,
            () => `"${full[Math.floor(Math.random() * full.length)].assetId}"`
          )
          .replace(
            /"randomPictureId"/gi,
            () =>
              `"${
                pictures[Math.floor(Math.random() * pictures.length)].assetId
              }"`
          )
          .replace(
            /"randomGraphicId"/gi,
            () =>
              `"${
                graphics[Math.floor(Math.random() * graphics.length)].assetId
              }"`
          )
          .replace(
            /"randomVideoId"/gi,
            () =>
              `"${videos[Math.floor(Math.random() * videos.length)].assetId}"`
          )
          .replace(
            /"randomInstagramPostId"/gi,
            () =>
              `"${
                instagramPosts[
                  Math.floor(Math.random() * instagramPosts.length)
                ].id
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

        // Validate mdx by parsing it
        await mdx(processedValue)

        // Set valid raw value
        setError(null)
        localStorage.setItem(localStorageId, unverifiedValue)
        localStorage.setItem(`${localStorageId}-processed`, processedValue)
        if (editorRef.current) {
          editorRef.current.editor.resize()
        }
      } catch (error) {
        console.error(error)
        setError(error)
        if (editorRef.current) {
          editorRef.current.editor.resize()
        }
      }
    }

    parseMdx()
  }, [unverifiedValue])

  useEffect(() => {
    if (unverifiedValue !== editorValue && editorValue) {
      setUnverifiedValue(editorValue)
    }
  }, [editorValue])

  const handleEditorChange = (content) =>
    setEditorValue(content.replace(/^[ \t]+$/gm, ''))

  const previewSrc = `/docs/preview?id=${`${localStorageId}-processed`}`

  return (
    <LiveEditorWrapper layout={layout}>
      {error && (
        <LiveEditorError>
          <Styled.h3>Oops, something went wrong:</Styled.h3>
          <LiveEditorErrorMessage>
            {error.message
              .replace(/[> ]+([0-9]+) \|/g, (a, b) =>
                a.replace(b, parseInt(b) - 2)
              )
              .replace(/\(([0-9]+):[0-9]+\)/, (a, b) =>
                a.replace(b, parseInt(b) - 2)
              )}
          </LiveEditorErrorMessage>
        </LiveEditorError>
      )}
      <LiveEditorPreviewWrapper>
        <PreviewControls>
          <PreviewControl target="_blank" href={previewSrc}>
            <EntypoTabletMobileCombo valign="baseline" /> Full Size
          </PreviewControl>
        </PreviewControls>
        <LiveEditorPreview src={previewSrc} />
      </LiveEditorPreviewWrapper>
      <LiveEditorEditor>
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

export default LiveEditor

import React, { useState, useEffect, useContext } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const MDX = loadable(() => import('@mdx-js/runtime'))

class MDXErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  static propTypes = {
    children: propTypes.node.isRequired,
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong rendering the preview.</h1>
    }

    return this.props.children
  }
}

const AceEditor = loadable(async () => {
  const ace = await import('react-ace')
  await import('ace-builds/src-noconflict/mode-markdown')
  await import('ace-builds/src-noconflict/theme-dracula')
  return ace
})

const LiveEditorWrapper = styled.section(
  ({ layout }) => css`
    ${layout === 'horizontal' ? tw`grid grid-rows-2` : tw`flex flex-row h-full`}

    max-height: calc(100vh - 60px);

    > *:last-child {
      flex: 1 1 16rem;
    }

    > * {
      flex: 1 1 auto;
    }
  `
)
const LiveEditorPreview = tw.div`relative bg-gray-100 overflow-scroll shadow-inner`
const LiveEditorPreviewContainer = tw.div``
const LiveEditorError = styled.div`
  ${tw`p-4 m-4 border-4 border-dashed border-red-400 bg-red-700 text-sm text-white`}
`
const LiveEditorEditor = styled.div`
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
  const [editorValue, setEditorValue] = useDebounce(initialValue || '', 100)
  const [rawValue, setRawValue] = useDebounce('', 1000)
  const [error, setError] = useState()
  const {
    data: { images, videos, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const pictures = images.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') === -1
  )
  const graphics = images.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') !== -1
  )

  useEffect(() => {
    async function parseMdx() {
      try {
        // Replace tokens with asset ids
        const processedValue = editorValue
          .replace(
            /"randomImageId"/gi,
            () =>
              `"${images[Math.floor(Math.random() * images.length)].assetId}"`
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
        setRawValue(processedValue)
      } catch (error) {
        console.error(error)
        setError(error)
      }
    }

    parseMdx()
  }, [editorValue])

  return (
    <LiveEditorWrapper layout={layout}>
      <LiveEditorPreview>
        {error && (
          <LiveEditorError>
            <p>
              <strong>Oops, something went wrong:</strong>
            </p>
            <pre>{JSON.stringify(error.message)}</pre>
          </LiveEditorError>
        )}
        <LiveEditorPreviewContainer>
          <MDXErrorBoundary>
            <MDX>{rawValue}</MDX>
          </MDXErrorBoundary>
        </LiveEditorPreviewContainer>
      </LiveEditorPreview>
      <LiveEditorEditor>
        <AceEditor
          mode="markdown"
          theme="dracula"
          onChange={setEditorValue}
          name={`docs-ace-editor-${editorId}`}
          editorProps={{
            $blockScrolling: true,
            // Do we get these working?
            // enableBasicAutocompletion: true,
            // enableLiveAutocompletion: true,
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

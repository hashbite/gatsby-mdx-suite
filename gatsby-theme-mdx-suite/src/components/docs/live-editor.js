import React, { useState, useEffect, useContext } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
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
  await import('ace-builds/src-noconflict/theme-github')
  return ace
})

const LiveEditorWrapper = tw.section`flex w-full flex-row-reverse`
const LiveEditorPreview = styled.div`
  ${tw`relative bg-gray-100 overflow-scroll`}
  flex: 1 1 50%;

  &:before {
    ${tw`font-serif text-gray-200 text-6xl absolute`}
    content: 'Preview';
    pointer-events: none;
    top: 0;
    left: 1rem;
  }
`
const LiveEditorPreviewContainer = tw.div``
const LiveEditorError = styled.div`
  ${tw`p-4 m-4 border-4 border-dashed border-red-400 bg-red-700 text-sm text-white`}
`
const LiveEditorEditor = styled.div`
  flex: 1 1 50%;

  .ace_heading {
    ${tw`font-bold font-heading text-blue-600`}
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

function LiveEditor({ editorId, initialValue }) {
  const [editorValue, setEditorValue] = useDebounce(initialValue || '', 100)
  const [rawValue, setRawValue] = useDebounce(editorValue, 1000)
  const [error, setError] = useState()
  const {
    data: { images, videos },
  } = useContext(MdxSuiteContext)

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
            /"randomVideoId"/gi,
            () =>
              `"${videos[Math.floor(Math.random() * videos.length)].assetId}"`
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
    <LiveEditorWrapper>
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
          theme="github"
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
          height="220px"
        />
      </LiveEditorEditor>
    </LiveEditorWrapper>
  )
}

LiveEditor.defaultProps = {
  editorId: 'default-editor',
}

LiveEditor.propTypes = {
  editorId: propTypes.string,
  initialValue: propTypes.string,
}

export default LiveEditor

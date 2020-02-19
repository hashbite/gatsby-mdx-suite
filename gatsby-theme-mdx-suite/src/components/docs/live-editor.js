import React, { useState, useEffect } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import loadable from '@loadable/component'

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

const LiveEditorWrapper = styled.section``
const LiveEditorPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  width: 100%;
  max-height: 60vh;
  overflow: scroll;
  margin: 2rem 0;
`
const LiveEditorPreviewContainer = styled.div``
const LiveEditorError = styled.div`
  font-size: 0.85rem;
  padding: 2rem;
  margin: 2rem;
  background: firebrick;
  border: 4px dashed tomato;
  color: white;
`
const LiveEditorEditor = styled.div(
  ({ theme }) => css`
    .ace_heading {
      font-weight: bold;
      font-family: ${theme.fonts.heading};
      color: dodgerblue;
    }

    .ace_xml {
      &.ace_punctuation,
      &.ace_tag-name {
        font-weight: bold;
        color: seagreen;
      }

      &.ace_attribute-name {
        color: tomato;
      }

      &.ace_attribute-value {
        color: crimson;
      }
    }

    .ace_emphasis {
      font-style: italic;
    }
    .ace_strong {
      font-weight: bold;
    }
  `
)

function generateDefaultExample({ displayName, componentProps }) {
  let hasRequiredChildren = false
  const requiredProps = componentProps
    .filter(({ required }) => required)
    .filter(({ name }) => {
      if (name === 'children') {
        hasRequiredChildren = true
        return false
      }
      return true
    })
    .map(({ name }) => `${name}=""`)

  const props = requiredProps.length ? ` ${requiredProps.join(' ')}` : ''

  if (hasRequiredChildren) {
    return `<${displayName}${props}>Some example content</${displayName}>`
  }

  return `<${displayName}${props} />`
}

function LiveEditor({ id, displayName, componentProps, component }) {
  const initialValue =
    component.example || generateDefaultExample({ displayName, componentProps })

  const [editorValue, setEditorValue] = useDebounce(initialValue, 100)
  const [rawValue, setRawValue] = useDebounce(editorValue, 1000)
  const [error, setError] = useState()

  useEffect(() => {
    async function parseMdx() {
      try {
        // Validate mdx by parsing it
        await mdx(editorValue)

        // Set valid raw value
        setError(null)
        setRawValue(editorValue)
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
        <LiveEditorPreviewContainer>
          <MDXErrorBoundary>
            <MDX>{rawValue}</MDX>
          </MDXErrorBoundary>
        </LiveEditorPreviewContainer>
      </LiveEditorPreview>
      {error && (
        <LiveEditorError>
          <p>
            <strong>Oops, something went wrong:</strong>
          </p>
          <pre>{JSON.stringify(error.message)}</pre>
        </LiveEditorError>
      )}
      <LiveEditorEditor>
        <AceEditor
          mode="markdown"
          theme="github"
          onChange={setEditorValue}
          name={`docs-ace-editor-${id}`}
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

LiveEditor.propTypes = {
  component: propTypes.object.isRequired,
  componentProps: propTypes.array.isRequired,
  id: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
}

export default LiveEditor

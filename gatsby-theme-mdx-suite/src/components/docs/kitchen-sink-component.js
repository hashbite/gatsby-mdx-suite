import React, { useState, useEffect } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import MDX from '@mdx-js/runtime'
import mdx from '@mdx-js/mdx'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-markdown'

const KitchenSinkComponentWrapper = styled.section``
const KitchenSinkComponentHeader = styled.header``
const KitchenSinkComponentTitle = styled.h1``
const KitchenSinkComponentPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  width: 100%;
  max-height: 60vh;
  overflow: scroll;
`
const KitchenSinkComponentPreviewContainer = styled.div``
const KitchenSinkComponentError = styled.div`
  font-size: 0.85rem;
  padding: 2rem;
  margin: 2rem;
  background: firebrick;
  border: 4px dashed tomato;
  color: white;
`
const KitchenSinkComponentEditor = styled.div(
  ({ theme }) => css`
    .ace_markup {
      &.ace_heading {
        font-weight: bold;
        font-family: ${theme.fonts.heading};
      }
    }

    .ace_xml {
      &.ace_punctuation,
      &.ace_tag-name {
        font-weight: bold;
      }

      &.ace_attribute-name {
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

function KitchenSinkComponent({ component, id, displayName }) {
  const initialValue = component.example || `<${displayName} />`

  const [editorValue, setEditorValue] = useState(initialValue)
  const [rawValue, setRawValue] = useDebounce(editorValue, 1000)
  const [error, setError] = useState()

  console.log(arguments)

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
    <KitchenSinkComponentWrapper>
      <KitchenSinkComponentHeader>
        <KitchenSinkComponentTitle>{displayName}</KitchenSinkComponentTitle>
      </KitchenSinkComponentHeader>
      <KitchenSinkComponentPreview>
        <KitchenSinkComponentPreviewContainer>
          <MDX>{rawValue}</MDX>
        </KitchenSinkComponentPreviewContainer>
      </KitchenSinkComponentPreview>
      {error && (
        <KitchenSinkComponentError>
          <p>
            <strong>Oops, something went wrong:</strong>
          </p>
          <pre>{JSON.stringify(error.message)}</pre>
        </KitchenSinkComponentError>
      )}
      <KitchenSinkComponentEditor>
        <AceEditor
          mode="markdown"
          theme="github"
          onChange={setEditorValue}
          name={`docs-ace-editor-${id}`}
          debounceChangePeriod={300}
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
      </KitchenSinkComponentEditor>
    </KitchenSinkComponentWrapper>
  )
}

KitchenSinkComponent.propTypes = {
  component: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
}

export default KitchenSinkComponent

import React, { useState, useEffect } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import loadable from '@loadable/component'

const MDX = loadable(() => import('@mdx-js/runtime'))

const AceEditor = loadable(async () => {
  const ace = await import('react-ace')
  await import('ace-builds/src-noconflict/mode-markdown')
  await import('ace-builds/src-noconflict/theme-github')
  return ace
})

const KitchenSinkComponentWrapper = styled.section``
const KitchenSinkComponentHeader = styled.header``
const KitchenSinkComponentTitle = styled.h1`
  margin-top: 4rem;
  padding-top: 4rem;
  margin-bottom: 0;
  border-top: 1px dashed black;
`
const KitchenSinkComponentPreview = styled.div`
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

const KitchenSinkComponentProps = styled.table`
  margin: 2rem 1rem;
  padding: 1rem;
  border: 1px solid black;
  width: 80%;
  max-width: 600px;
`
const KitchenSinkComponentProp = styled.tr`
  &:nth-child(2n) {
    background-color: #f0f0f0;
  }

  td {
    padding: 0.25rem 0.5rem;
  }
`

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
    return `<${displayName}${props}></${displayName}>`
  }

  return `<${displayName}${props} />`
}

function KitchenSinkComponent({ id, displayName, componentProps, component }) {
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
    <KitchenSinkComponentWrapper>
      <KitchenSinkComponentHeader>
        <KitchenSinkComponentTitle>{displayName}</KitchenSinkComponentTitle>
      </KitchenSinkComponentHeader>
      {!!componentProps.length && (
        <KitchenSinkComponentProps>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {componentProps.map((propData) => {
              // return <pre>{JSON.stringify(propData, null, 2)}</pre>
              const {
                name,
                type,
                required,
                defaultValue,
                description,
              } = propData
              return (
                <KitchenSinkComponentProp key={name}>
                  <td>
                    <strong>
                      {name}
                      {required && ' (required)'}
                    </strong>
                  </td>
                  <td>{type && type.name}</td>
                  <td>{defaultValue && defaultValue.value}</td>
                  <td>{description && description.text}</td>
                </KitchenSinkComponentProp>
              )
            })}
          </tbody>
        </KitchenSinkComponentProps>
      )}
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
  componentProps: propTypes.array.isRequired,
  id: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
}

export default KitchenSinkComponent

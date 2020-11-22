import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import Editor from '@monaco-editor/react'

import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'
import Select from 'gatsby-theme-mdx-suite-base/src/components/form/fields/select'
import Switch from 'gatsby-theme-mdx-suite-base/src/components/form/fields/switch'
import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'

import LiveEditorSidebar from './sidebar'
import { useMedia } from './hooks'

import {
  registerMdxComponentAutocomplete,
  registerMdxComponentPropertyAutocomplete,
  useMonaco,
  useComponentDescriptorMap,
} from './autocompletion'
import { useStaticQuery, graphql } from 'gatsby'

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

const LiveEditorPreviewWrapper = styled.div`
  ${tw`relative shadow-inner w-full h-full`}
  grid-area: preview;
`
const LiveEditorPreview = styled.iframe`
  ${tw`overflow-scroll w-full h-full`}
`

const toolbarStyles = css`
  ${tw`flex justify-between items-center p-2`}
  ${tw`bg-gray-900 text-white`}
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
const ToolbarSelect = styled(Select)`
  ${tw`w-full rounded overflow-hidden`}
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

const COMPONENT_DESCRIPTOR_QUERY = graphql`
  query MonacoCompletinoComponentDescriptors {
    allComponentMetadata {
      nodes {
        displayName
        description {
          text
        }
        props {
          name
          type {
            name
          }
          required
          defaultValue {
            value
          }
          description {
            text
          }
        }
      }
    }
  }
`

function LiveEditor({ editorId, initialValue, layout }) {
  const localStorageId = `mdx-suite-live-editor-${editorId}`
  const [editorInstance, setEditorInstance] = useState(null)

  const [autoReload, setAutoReload] = useState(true)
  const [debugMode, setDebugMode] = useState(false)

  const [error, setError] = useState()
  const [errorDetailsVisible, setErrorDetailsVisible] = useState(false)

  const [sidebarTab, setSidebarTab] = useState('media')
  const onChangeSidebarTab = useCallback((e) => {
    setSidebarTab(e.currentTarget.value)
  }, [])

  const editorValue = useMemo(
    () => localStorage.getItem(localStorageId) || initialValue || '',
    [localStorageId, initialValue]
  )

  const [unverifiedValue, setUnverifiedValue] = useDebounce(editorValue, 500)

  const validateCurrentEditorValue = useCallback(() => {
    setUnverifiedValue(editorInstance.getValue())
  }, [setUnverifiedValue, editorInstance])

  // eslint-disable-next-line no-unused-vars
  const [changeEventListener, setChangeEventListener] = useState(null)

  const handleEditorDidMount = (_, editor) => {
    setEditorInstance(editor)
  }

  const monaco = useMonaco()
  const componentDescriptorsResult = useStaticQuery(COMPONENT_DESCRIPTOR_QUERY)
  const componentDescriptorMap = useComponentDescriptorMap(
    componentDescriptorsResult
  )

  useEffect(() => {
    if (!monaco) {
      return
    }
    registerMdxComponentAutocomplete({
      monaco,
      components: componentDescriptorMap,
    })
    registerMdxComponentPropertyAutocomplete({
      monaco,
      components: componentDescriptorMap,
    })
  }, [monaco, componentDescriptorMap])

  useEffect(() => {
    if (!editorInstance) {
      return
    }
    setChangeEventListener((oldListener) => {
      if (oldListener) {
        oldListener.dispose()
      }
      return editorInstance.onDidChangeModelContent((ev) => {
        if (autoReload) {
          validateCurrentEditorValue()
        }
      })
    })
  }, [
    editorInstance,
    autoReload,
    validateCurrentEditorValue,
    setChangeEventListener,
  ])

  const { replaceTokens } = useMedia()

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

  const previewSrc = `/docs/preview?id=${`${localStorageId}-processed${
    debugMode ? `&debug=true` : ``
  }`}`

  const onToggleDebugMode = useCallback((e) => {
    setDebugMode((v) => !v)
  }, [])

  const onClickReload = useCallback(
    (e) => {
      validateCurrentEditorValue()
    },
    [validateCurrentEditorValue]
  )
  const onToggleAutoReload = (e) => {
    if (!autoReload) {
      validateCurrentEditorValue()
    }
    setAutoReload(!autoReload)
  }
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
        editorInstance.setValue(initialValue)
      }
    },
    [initialValue, editorInstance]
  )

  const toggleErrorDetailsVisible = useCallback(() => {
    setErrorDetailsVisible((v) => !v)
  }, [])

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
        <ToolbarSection>
          <Switch
            id="debug-mode"
            onClick={onToggleDebugMode}
            checked={debugMode}
          >
            <Icon icon="search" verticalAlign="middle" /> Debug
          </Switch>
        </ToolbarSection>
        <Button target="_blank" href={previewSrc} as="a">
          <ButtonIcon icon="external-link" /> <ButtonLabel>Preview</ButtonLabel>
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
          <Button onClick={onClickReload}>
            <ButtonIcon icon="repeat" />
          </Button>{' '}
          <Switch
            id="auto-reload"
            onClick={onToggleAutoReload}
            checked={autoReload}
          >
            Auto Reload
          </Switch>
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
            <ToolbarSelect
              onChange={onChangeSidebarTab}
              defaultValue={sidebarTab}
            >
              <option value="media">Media</option>
              <option value="icons">Icons</option>
              <option value="colors">Colors</option>
              <option value="fonts">Fonts</option>
              <option value="sizes">Sizes</option>
            </ToolbarSelect>
          </LiveEditorSidebarToolbar>
          <LiveEditorSidebar editorInstance={editorInstance} tab={sidebarTab} />
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
  ) : (
    <Loading />
  )

export default LiveEditorBrowserOnlyWrapper
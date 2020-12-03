import React, { useState } from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'
import useEventListener from '@use-it/event-listener'
import { useLocation } from '@reach/router'

import DataProvider from '../../components/data-provider'

import MDX from '@mdx-js/runtime'

const PreviewFailedWrapper = tw.div`flex flex-col justify-center text-center w-screen h-screen`

class MDXErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  static propTypes = {
    children: propTypes.node.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      // Cheap dirty workaround till we find out why pinned ScrollTrigger does not properly unmount
      if (
        this.state.error.message.indexOf(
          `Failed to execute 'removeChild' on 'Node'`
        ) !== -1
      ) {
        window.location.reload()
      }

      // You can render any custom fallback UI
      return (
        <PreviewFailedWrapper>
          <h2>Something went wrong rendering the preview:</h2>
          <p>
            <code>{this.state.error.message}</code>
          </p>
          <button onClick={() => window.location.reload()}>
            Reload preview
          </button>
        </PreviewFailedWrapper>
      )
    }

    return this.props.children
  }
}

const DocsPreviewPage = () => {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const localStorageId = searchParams.get('id')
  const debugModeEnabled = !!searchParams.get('debug')

  const [content, setContent] = useState(localStorage.getItem(localStorageId))

  // Listen for content updates from editor
  useEventListener('storage', (e) => {
    if (e.key === localStorageId) {
      setContent(e.newValue)
    }
  })

  if (!localStorageId || !content) {
    return null
  }

  return (
    <DataProvider>
      <MDXErrorBoundary content={content}>
        <div className={debugModeEnabled && 'debug'}>
          <MDX>{content}</MDX>
        </div>
      </MDXErrorBoundary>
    </DataProvider>
  )
}

const DocsPreviewPageBrowserOnlyWrapper = (props) =>
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement ? (
    <DocsPreviewPage {...props} />
  ) : null

export default DocsPreviewPageBrowserOnlyWrapper

import React, { useState } from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'
import useEventListener from '@use-it/event-listener'
import { useLocation } from '@reach/router'

import DataProvider from '../../components/data-provider'

import Loading from 'gatsby-theme-mdx-suite-base/src/components/lazy/loading'

const MDX = React.lazy(() =>
  import(/* webpackChunkName: "mdx-runtime" */ '@mdx-js/runtime')
)

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

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <PreviewFailedWrapper>
          <h2>Something went wrong rendering the preview.</h2>
          <pre>{this.state.error.message}</pre>
        </PreviewFailedWrapper>
      )
    }

    return this.props.children
  }
}

const DocsPreviewPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location)
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

  const isSSR = typeof window === 'undefined'

  return (
    <DataProvider>
      <MDXErrorBoundary>
        {!isSSR && (
          <div className={debugModeEnabled && 'debug'}>
            <React.Suspense fallback={<Loading />}>
              <MDX>{content}</MDX>
            </React.Suspense>
          </div>
        )}
      </MDXErrorBoundary>
    </DataProvider>
  )
}

export default DocsPreviewPage

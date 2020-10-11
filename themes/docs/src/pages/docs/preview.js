import React, { useState } from 'react'
import propTypes from 'prop-types'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import useEventListener from '@use-it/event-listener'

import Layout from 'gatsby-theme-mdx-suite-base/src/components/layout/layout'
import DataProvider from '../../components/data-provider'

const MDX = loadable(() =>
  import(/* webpackChunkName: "mdx-runtime" */ '@mdx-js/runtime')
)

const PreviewFailedWrapper = tw.div`flex flex-col justify-center text-center w-screen h-screen`

const ContentWrapper = tw.div`prose`

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
  const searchParams = new URLSearchParams(window.location.search)
  const localStorageId = searchParams.get('id')

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
      <Layout>
        <ContentWrapper>
          <MDXErrorBoundary>
            <MDX>{content}</MDX>
          </MDXErrorBoundary>
        </ContentWrapper>
      </Layout>
    </DataProvider>
  )
}

const DocsPreviewBrowserOnlyWrapper = (props) =>
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement ? (
    <DocsPreviewPage {...props} />
  ) : null

export default DocsPreviewBrowserOnlyWrapper

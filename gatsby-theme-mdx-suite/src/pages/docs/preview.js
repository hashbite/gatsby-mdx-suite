import React from 'react'
import propTypes from 'prop-types'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import { Styled } from 'theme-ui'

import DataProvider from '../../components/docs/data-provider'

const MDX = loadable(() => import('@mdx-js/runtime'))

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
          <Styled.h2>Something went wrong rendering the preview.</Styled.h2>
          <Styled.pre>{this.state.error.message}</Styled.pre>
        </PreviewFailedWrapper>
      )
    }

    return this.props.children
  }
}

const DocsPreviewPage = () => {
  if (
    !(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  ) {
    return null
  }
  const searchParams = new URLSearchParams(window.location.search)
  const content = searchParams.get('content')

  if (!content) {
    return null
  }

  return (
    <DataProvider>
      <Styled.root>
        <MDXErrorBoundary>
          <MDX>{JSON.parse(content)}</MDX>
        </MDXErrorBoundary>
      </Styled.root>
    </DataProvider>
  )
}

export default DocsPreviewPage

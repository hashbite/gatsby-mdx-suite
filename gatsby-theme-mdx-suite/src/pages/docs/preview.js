import React, { useState } from 'react'
import propTypes from 'prop-types'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import useEventListener from '@use-it/event-listener'

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
  const localStorageId = searchParams.get('id')

  const [content, setContent] = useState(localStorage.getItem(localStorageId))

  if (!localStorageId || !content) {
    return null
  }

  // Listen for content updates from editor
  useEventListener('storage', (e) => {
    if (e.key === localStorageId) {
      setContent(e.newValue)
    }
  })

  return (
    <DataProvider>
      <Styled.root>
        <Global
          styles={(theme) => css`
            body {
              margin: 0;
              overflow-x: hidden;
            }
            a {
              color: inherit;
              text-decoration: none;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            ul,
            ol,
            li {
              &:last-child {
                margin-bottom: 0 !important;
              }
            }
          `}
        />
        <MDXErrorBoundary>
          <MDX>{content}</MDX>
        </MDXErrorBoundary>
      </Styled.root>
    </DataProvider>
  )
}

export default DocsPreviewPage

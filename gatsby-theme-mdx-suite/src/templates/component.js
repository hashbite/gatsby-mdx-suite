import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { Styled } from 'theme-ui'

import DataProvider from '../components/docs/data-provider'
import LiveEditor from '../components/docs/live-editor'
import Props from '../components/docs/props'

const ComponentWrapper = styled.div`
  max-width: 1200px;
  padding: 1vw;
  margin: 2rem auto;
`

function DocsComponentTemplate({ data, pageContext }) {
  const MdxSuiteData = useContext(MdxSuiteContext)

  const {
    displayName,
    description,
    longDescription,
    componentProps,
    examples,
  } = data.componentMetadata

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        pageContext,
      }}
    >
      <DataProvider>
        <ComponentWrapper>
          <small>
            <Link to="/docs/">Back to component list</Link>
          </small>
          <br />
          <br />
          <Styled.h1>{displayName}</Styled.h1>

          <MDXProvider>
            {description && (
              <MDXRenderer>{description.childMdx.body}</MDXRenderer>
            )}
          </MDXProvider>

          <Props componentProps={componentProps} />

          <LiveEditor
            editorId={displayName}
            initialValue={examples && examples[0]}
          />

          <MDXProvider>
            {longDescription && (
              <MDXRenderer>{longDescription.body}</MDXRenderer>
            )}
          </MDXProvider>
          <br />
          <br />
          <small>
            <Link to="/docs/">Back to component list</Link>
          </small>
        </ComponentWrapper>
      </DataProvider>
    </MdxSuiteContext.Provider>
  )
}

DocsComponentTemplate.propTypes = {
  data: propTypes.object.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default DocsComponentTemplate

export const pageQuery = graphql`
  query docsComponentQuery($id: String!) {
    componentMetadata(id: { eq: $id }) {
      displayName
      description {
        childMdx {
          body
        }
      }
      longDescription {
        body
      }
      componentProps: props {
        ...ComponentProps
      }
      examples
    }
  }
`

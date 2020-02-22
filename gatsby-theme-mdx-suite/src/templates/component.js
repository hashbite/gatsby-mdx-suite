import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

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
  } = data.componentMetadata

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        pageContext,
        data: {
          // images: content.childMdx.images,
          // background: content.childMdx.background,
          // floating: content.childMdx.floating,
        },
      }}
    >
      <ComponentWrapper>
        <h1>{displayName}</h1>
        <small>
          <Link to="/docs/">Back to component list</Link>
        </small>

        <Props componentProps={componentProps} />
        <MDXProvider>
          {description && (
            <MDXRenderer>{description.childMdx.body}</MDXRenderer>
          )}
          {longDescription && <MDXRenderer>{longDescription.body}</MDXRenderer>}
        </MDXProvider>
      </ComponentWrapper>
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
    }
  }
`

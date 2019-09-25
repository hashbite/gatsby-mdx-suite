import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
// import useDeepCompareEffect from 'use-deep-compare-effect'

// import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'
import Layout from '../components/layout'

const ContentArea = styled.div`
  margin: 5vh auto;
  max-width: ${({ theme }) => theme.sizes.maxContentWidth}px;
`

function PageTemplate({ data }) {
  const {
    body,
    fields: { title, description },
  } = data.mdx

  return (
    <Layout>
      <Helmet
        /**
         * Meta information based on:
         * https://moz.com/blog/meta-data-templates-123
         * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
         */
        title={title}
        meta={[
          {
            name: 'viewport',
            content:
              'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            name: 'description',
            content: description,
          },
          {
            property: 'og:description',
            content: description,
          },
        ].filter(Boolean)}
      />
      <MDXProvider>
        <ContentArea>
          <MDXRenderer>{body}</MDXRenderer>
        </ContentArea>
      </MDXProvider>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        title
        description
      }
    }
  }
`

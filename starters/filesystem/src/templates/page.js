import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Seo from '@gatsby-mdx-suite/seo'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

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
      <Seo title={title} description={description} />
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

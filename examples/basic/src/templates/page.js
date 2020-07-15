import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'
import omit from 'lodash/omit'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useTranslation } from 'react-i18next'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Layout from 'gatsby-theme-mdx-suite-base/src/components/layout/layout'
import Seo from 'gatsby-theme-mdx-suite-base/src/components/layout/seo'

function PageTemplate({ data, pageContext }) {
  const { i18n } = useTranslation()
  const MdxSuiteData = useContext(MdxSuiteContext)

  const { title, content } = data.contentfulPage

  // Set current i18next translation language based on page locale
  useEffect(() => {
    if (pageContext.locale !== i18n.language) {
      i18n.changeLanguage(pageContext.locale)
    }
  }, [pageContext.locale, i18n])

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        pageContext,
        data: omit(content.childMdx, ['body']),
      }}
    >
      <Layout>
        <Seo title={title} />
        <MDXRenderer>{content.childMdx.body}</MDXRenderer>
      </Layout>
    </MdxSuiteContext.Provider>
  )
}

PageTemplate.propTypes = {
  data: propTypes.object.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      pageId: contentful_id
      slug
      title
      content {
        childMdx {
          body
          ...MdxSuiteMediaCollections
        }
      }
    }
  }
`

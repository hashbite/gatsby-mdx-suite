import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useTranslation } from 'react-i18next'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import mergeContextData from '@gatsby-mdx-suite/helpers/data/merge-context-data'

function PageTemplate({ data, pageContext }) {
  const { i18n } = useTranslation()
  const MdxSuiteData = useContext(MdxSuiteContext)

  const { content } = data.contentfulPage

  // Set current i18next translation language based on page locale
  useEffect(() => {
    if (pageContext.locale !== i18n.language) {
      i18n.changeLanguage(pageContext.locale)
    }
  }, [pageContext.locale, i18n])

  return (
    <MdxSuiteContext.Provider
      value={mergeContextData(MdxSuiteData, {
        pageContext,
        data: [content.childMdx],
      })}
    >
      <MDXRenderer>{content.childMdx.body}</MDXRenderer>
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

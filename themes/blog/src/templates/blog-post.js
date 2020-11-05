import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useTranslation } from 'react-i18next'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import mergeContextData from '@gatsby-mdx-suite/helpers/data/merge-context-data'

import Header from 'gatsby-theme-mdx-suite-base/src/components/header/header'
import Seo from 'gatsby-theme-mdx-suite-base/src/components/layout/seo'

function BlogPostTemplate({ data, pageContext }) {
  const { i18n } = useTranslation()
  const MdxSuiteData = useContext(MdxSuiteContext)
  const { locale } = pageContext
  const { title, image, metaDescription, content } = data.contentfulBlogPost

  // Set current i18next translation language based on page locale
  useEffect(() => {
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return (
    <MdxSuiteContext.Provider
      value={mergeContextData(MdxSuiteData, {
        pageContext,
        data: [content.childMdx, { screen: [image] }],
      })}
    >
      <Seo
        title={title}
        description={metaDescription}
        ogImage={image && `${image.file.url}?w=1200&h=630&fit=fill`}
        twitterImage={image && `${image.file.url}?w=1200&h=628&fit=fill`}
      />
      <Header backgroundImageId={image.assetId}>{title}</Header>
      <MDXRenderer>{content && content.childMdx.body}</MDXRenderer>
    </MdxSuiteContext.Provider>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query blogPostQuery($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      pageId: contentful_id
      slug
      title
      # metaDescription
      image {
        ...MdxSuiteMediaCollectionScreen
      }
      content {
        childMdx {
          body
          ...MdxSuiteMediaCollections
        }
      }
    }
  }
`

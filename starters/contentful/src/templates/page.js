import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useTranslation } from 'react-i18next'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'
import LocationContext from '@gatsby-mdx-suite/contexts/location'
import I18nContext from '@gatsby-mdx-suite/contexts/i18n'

import Seo from '@gatsby-mdx-suite/seo'

import Layout from '../components/layout'

function PageTemplate({ data, pathContext }) {
  const { i18n } = useTranslation()
  const mdxDataDispatch = useMDXDataDispatch()
  const locationData = useContext(LocationContext)
  const i18nData = useContext(I18nContext)

  const {
    title,
    seoDescription,
    seoImage,
    content,
    contentMedia,
  } = data.contentfulPage
  const { locale, pageId } = pathContext

  // Set current i18next translation language based on page locale
  useEffect(() => {
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  // Inject media attached to the content into the MDX context
  if (contentMedia) {
    useDeepCompareEffect(() => {
      mdxDataDispatch({
        type: 'add',
        id: 'contentfulAssets',
        data: contentMedia,
      })
    }, [contentMedia])
  }

  return (
    <I18nContext.Provider
      value={{
        ...i18nData,
        active: locale,
      }}
    >
      <LocationContext.Provider
        value={{ ...locationData, activePageId: pageId }}
      >
        <Layout>
          <Seo
            title={title}
            description={seoDescription}
            ogImage={seoImage && `${seoImage.file.url}?w=1200&h=630&fit=fill`}
            twitterImage={
              seoImage && `${seoImage.file.url}?w=1200&h=628&fit=fill`
            }
          />
          <MDXProvider>
            <MDXRenderer>{content.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </Layout>
      </LocationContext.Provider>
    </I18nContext.Provider>
  )
}

PageTemplate.propTypes = {
  data: propTypes.object.isRequired,
  pathContext: propTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      contentful_id
      slug
      title
      seoDescription
      seoImage {
        file {
          url
        }
      }
      content {
        childMdx {
          body
        }
      }
      contentMedia {
        contentful_id
        file {
          contentType
          details {
            image {
              height
              width
            }
          }
        }
        svgContent
        sqip(mode: 8, numberOfPrimitives: 42, blur: 0) {
          dataURI
        }
        fluid(maxWidth: 1920) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`

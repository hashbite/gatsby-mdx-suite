import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useTranslation } from 'react-i18next'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Seo from '@gatsby-mdx-suite/seo'

import Layout from '../components/layout'

function PageTemplate({ data, pageContext }) {
  const { i18n } = useTranslation()
  const MdxSuiteData = useContext(MdxSuiteContext)

  const { title, metaDescription, metaImage, content } = data.contentfulPage

  // Set current i18next translation language based on page locale
  useEffect(() => {
    if (pageContext.locale !== i18n.language) {
      i18n.changeLanguage(pageContext.locale)
    }
  }, [pageContext.locale])

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        pageContext,
        data: {
          images: content.childMdx.images || [],
          background: content.childMdx.background || [],
          floating: content.childMdx.floating || [],
          videos: content.childMdx.videos || [],
        },
      }}
    >
      <Layout>
        <Seo
          title={title}
          description={metaDescription}
          ogImage={metaImage && `${metaImage.file.url}?w=1200&h=630&fit=fill`}
          twitterImage={
            metaImage && `${metaImage.file.url}?w=1200&h=628&fit=fill`
          }
        />
        <MDXProvider>
          <MDXRenderer>{content.childMdx.body}</MDXRenderer>
        </MDXProvider>
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
      metaDescription
      metaImage {
        file {
          url
        }
      }
      content {
        childMdx {
          body
          images: media(collectionType: "images") {
            ...MdxSuiteContentfulAsset
            svg {
              content
            }
            previewDataURI: sqip(mode: 8, numberOfPrimitives: 12, blur: 0) {
              dataURI
            }
            fluid(maxWidth: 1400) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          background: media(collectionType: "background") {
            ...MdxSuiteContentfulAsset
            svg {
              content
            }
            previewDataURI: sqip(mode: 8, numberOfPrimitives: 42, blur: 0) {
              dataURI
            }
            fluid(maxWidth: 1920) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          floating: media(collectionType: "floating") {
            ...MdxSuiteContentfulAsset
            svg {
              content
            }
            previewDataURI: sqip(mode: 8, numberOfPrimitives: 22, blur: 0) {
              dataURI
            }
            fluid(maxWidth: 1024) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          videos: media(collectionType: "videos") {
            ...MdxSuiteContentfulAsset
            videoH264(screenshots: "0", maxWidth: 1280) {
              path
              screenshots {
                path
              }
            }
          }
        }
      }
    }
  }
`

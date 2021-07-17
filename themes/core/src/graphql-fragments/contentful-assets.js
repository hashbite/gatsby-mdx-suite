/**
 * This file provides basic fragments related to Contentful assets.
 * Include the MdxSuiteContentfulAsset fragment when querying to ensure
 * that Image and Video components can properly render the media.
 *
 * You should define a fragment for each collection in your project, that way
 * full flexibility when rendering media is ensured.
 */

import { graphql } from 'gatsby'

export const MdxSuiteContentfulAsset = graphql`
  fragment MdxSuiteContentfulAsset on ContentfulAsset {
    assetId: contentful_id
    locale: node_locale
    title
    description
    file {
      contentType
      url
      details {
        image {
          height
          width
        }
      }
    }
  }
`

export const MdxSuiteMediaDocs = graphql`
  fragment MdxSuiteMediaDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300, placeholder: DOMINANT_COLOR)
    file {
      details {
        size
      }
    }
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
      aspectRatio
      width
      height
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      childImageSharp {
        gatsbyImageData(width: 300)
      }
    }
  }
`

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

export const MdxSuiteMediaCollectionScreen = graphql`
  fragment MdxSuiteMediaCollectionScreen on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(
      width: 2048
      quality: 35
      placeholder: BLURRED
      layout: CONSTRAINED
    )
    videoH264(maxWidth: 1920) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1920) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionFull = graphql`
  fragment MdxSuiteMediaCollectionFull on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(
      width: 1200
      quality: 40
      placeholder: BLURRED
      layout: CONSTRAINED
    )
    videoH264(maxWidth: 1200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1200) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionHalf = graphql`
  fragment MdxSuiteMediaCollectionHalf on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 600, placeholder: BLURRED, layout: CONSTRAINED)
    videoH264(maxWidth: 600) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 600) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionThird = graphql`
  fragment MdxSuiteMediaCollectionThird on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
    videoH264(maxWidth: 400) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 400) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionQuarter = graphql`
  fragment MdxSuiteMediaCollectionQuarter on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300, placeholder: BLURRED, layout: CONSTRAINED)
    videoH264(maxWidth: 300) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionSixth = graphql`
  fragment MdxSuiteMediaCollectionSixth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 200, placeholder: BLURRED, layout: CONSTRAINED)
    videoH264(maxWidth: 200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 200) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionEigth = graphql`
  fragment MdxSuiteMediaCollectionEigth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 150, placeholder: BLURRED, layout: CONSTRAINED)
    videoH264(maxWidth: 150) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 150) {
      publicURL
    }
  }
`

export const MdxSuiteMediaDocs = graphql`
  fragment MdxSuiteMediaDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 800, layout: CONSTRAINED, quality: 35)
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
  }
`

export const MdxSuiteMediaCollections = graphql`
  fragment MdxSuiteMediaCollections on Mdx {
    screen: media(collectionType: "screen") {
      ...MdxSuiteMediaCollectionScreen
    }
    full: media(collectionType: "full") {
      ...MdxSuiteMediaCollectionFull
    }
    half: media(collectionType: "half") {
      ...MdxSuiteMediaCollectionHalf
    }
    third: media(collectionType: "third") {
      ...MdxSuiteMediaCollectionThird
    }
    quarter: media(collectionType: "quarter") {
      ...MdxSuiteMediaCollectionQuarter
    }
    sixth: media(collectionType: "sixth") {
      ...MdxSuiteMediaCollectionSixth
    }
    eight: media(collectionType: "eight") {
      ...MdxSuiteMediaCollectionEigth
    }
  }
`

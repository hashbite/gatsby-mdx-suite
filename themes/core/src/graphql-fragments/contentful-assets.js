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
    }
    svg {
      content
    }
  }
`

export const MdxSuiteMediaCollectionScreen = graphql`
  fragment MdxSuiteMediaCollectionScreen on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 2048) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 1920) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 1920) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionScreenDocs = graphql`
  fragment MdxSuiteMediaCollectionScreenDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionFull = graphql`
  fragment MdxSuiteMediaCollectionFull on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 1200) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 1200) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 1200) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionFullDocs = graphql`
  fragment MdxSuiteMediaCollectionFullDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionHalf = graphql`
  fragment MdxSuiteMediaCollectionHalf on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 600) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 600) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 600) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionHalfDocs = graphql`
  fragment MdxSuiteMediaCollectionHalfDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionThird = graphql`
  fragment MdxSuiteMediaCollectionThird on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 400) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 400) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 400) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionThirdDocs = graphql`
  fragment MdxSuiteMediaCollectionThirdDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionQuarter = graphql`
  fragment MdxSuiteMediaCollectionQuarter on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 300) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 300) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionQuarterDocs = graphql`
  fragment MdxSuiteMediaCollectionQuarterDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionSixth = graphql`
  fragment MdxSuiteMediaCollectionSixth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 200) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 200) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 200) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionSixthDocs = graphql`
  fragment MdxSuiteMediaCollectionSixthDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaCollectionEigth = graphql`
  fragment MdxSuiteMediaCollectionEigth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fluid(maxWidth: 150) {
      ...GatsbyContentfulFluid_withWebp
    }
    videoH264(maxWidth: 150) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 150) {
      publicURL
    }
  }
`

export const MdxSuiteMediaCollectionEigthDocs = graphql`
  fragment MdxSuiteMediaCollectionEigthDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
  }
`

export const MdxSuiteMediaDocs = graphql`
  fragment MdxSuiteMediaDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    fixed(width: 300) {
      ...GatsbyContentfulFixed_noBase64
    }
    file {
      details {
        size
      }
    }
    videoH264(fps: 12, duration: 2, preset: "ultrafast", maxWidth: 300) {
      path
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
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

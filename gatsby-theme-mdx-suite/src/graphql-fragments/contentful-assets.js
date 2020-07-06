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
    videoH264(screenshots: "0", maxWidth: 1920) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionScreenDocs = graphql`
  fragment MdxSuiteMediaCollectionScreenDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 1200) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionFullDocs = graphql`
  fragment MdxSuiteMediaCollectionFullDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 600) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionHalfDocs = graphql`
  fragment MdxSuiteMediaCollectionHalfDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 400) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionThirdDocs = graphql`
  fragment MdxSuiteMediaCollectionThirdDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 300) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionQuarterDocs = graphql`
  fragment MdxSuiteMediaCollectionQuarterDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 200) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionSixthDocs = graphql`
  fragment MdxSuiteMediaCollectionSixthDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
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
    videoH264(screenshots: "0", maxWidth: 150) {
      path
      screenshots {
        path
      }
    }
  }
`

export const MdxSuiteMediaCollectionEigthDocs = graphql`
  fragment MdxSuiteMediaCollectionEigthDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
      path
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

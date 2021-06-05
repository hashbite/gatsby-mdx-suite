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
    gatsbyImageData(width: 2048, placeholder: BLURRED, layout: FULL_WIDTH)
    videoH264(maxWidth: 1920) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1920) {
      childImageSharp {
        gatsbyImageData(width: 1920, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 120, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionFull = graphql`
  fragment MdxSuiteMediaCollectionFull on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 1200, placeholder: BLURRED)
    videoH264(maxWidth: 1200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1200) {
      childImageSharp {
        gatsbyImageData(width: 1200, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 80, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionHalf = graphql`
  fragment MdxSuiteMediaCollectionHalf on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 600, placeholder: BLURRED)
    videoH264(maxWidth: 600) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 600) {
      childImageSharp {
        gatsbyImageData(width: 600, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 40, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionThird = graphql`
  fragment MdxSuiteMediaCollectionThird on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 400, placeholder: BLURRED)
    videoH264(maxWidth: 400) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 400) {
      childImageSharp {
        gatsbyImageData(width: 400, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 16, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionQuarter = graphql`
  fragment MdxSuiteMediaCollectionQuarter on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300, placeholder: BLURRED)
    videoH264(maxWidth: 300) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      childImageSharp {
        gatsbyImageData(width: 300, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 16, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionSixth = graphql`
  fragment MdxSuiteMediaCollectionSixth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 200, placeholder: BLURRED)
    videoH264(maxWidth: 200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 200) {
      childImageSharp {
        gatsbyImageData(width: 200, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 16, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaCollectionEigth = graphql`
  fragment MdxSuiteMediaCollectionEigth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 150, placeholder: BLURRED)
    videoH264(maxWidth: 150) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 150) {
      childImageSharp {
        gatsbyImageData(width: 150, layout: FIXED)
      }
    }
    sqip(numberOfPrimitives: 16, blur: 0) {
      dataURI
    }
  }
`

export const MdxSuiteMediaDocs = graphql`
  fragment MdxSuiteMediaDocs on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300)
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

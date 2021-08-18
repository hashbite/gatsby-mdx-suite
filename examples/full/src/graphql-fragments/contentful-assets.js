/**
 * This file defines fragments for all available media collections. These are
 * automatically selected by the components, except the user overrides them
 * for a specific component instance.
 *
 * This file is especially helpful if you change the default breakpoints or want
 * to use different placeholders.
 *
 * If you need more or other collection types as the defaults, remember to also
 * pass your new list to the core theme config.
 */

import { graphql } from 'gatsby'

// This helper fragment includes all possible collection types
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

// Media collection for fullscreen media
export const MdxSuiteMediaCollectionScreen = graphql`
  fragment MdxSuiteMediaCollectionScreen on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 2048, placeholder: BLURRED, layout: FULL_WIDTH)
    videoH264(maxWidth: 1920) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 1920) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 1920) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1920) {
      childImageSharp {
        gatsbyImageData(width: 1920, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans the full content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionFull = graphql`
  fragment MdxSuiteMediaCollectionFull on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 1200, placeholder: BLURRED)
    videoH264(maxWidth: 1200) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 1200) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 1200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 1200) {
      childImageSharp {
        gatsbyImageData(width: 1200, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans half of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionHalf = graphql`
  fragment MdxSuiteMediaCollectionHalf on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 600, placeholder: BLURRED)
    videoH264(maxWidth: 600) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 600) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 600) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 600) {
      childImageSharp {
        gatsbyImageData(width: 600, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans a third of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionThird = graphql`
  fragment MdxSuiteMediaCollectionThird on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 400, placeholder: BLURRED)
    videoH264(maxWidth: 400) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 400) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 400) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 400) {
      childImageSharp {
        gatsbyImageData(width: 400, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans a quarter of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionQuarter = graphql`
  fragment MdxSuiteMediaCollectionQuarter on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300, placeholder: BLURRED)
    videoH264(maxWidth: 300) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 300) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 300) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 300) {
      childImageSharp {
        gatsbyImageData(width: 300, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans a sixth of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionSixth = graphql`
  fragment MdxSuiteMediaCollectionSixth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 200, placeholder: BLURRED)
    videoH264(maxWidth: 200) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 200) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 200) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 200) {
      childImageSharp {
        gatsbyImageData(width: 200, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

// Media collection for media that spans a eigth of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionEigth = graphql`
  fragment MdxSuiteMediaCollectionEigth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 150, placeholder: BLURRED)
    videoH264(maxWidth: 150) {
      path
      aspectRatio
    }
    videoH265(preset: "faster", maxWidth: 150) {
      path
      aspectRatio
    }
    videoVP9(maxWidth: 150) {
      path
      aspectRatio
    }
    videoScreenshots(timestamps: ["0"], width: 150) {
      childImageSharp {
        gatsbyImageData(width: 150, layout: FIXED, placeholder: NONE)
      }
    }
  }
`

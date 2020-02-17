import { graphql } from 'gatsby'

export const MdxSuiteContentfulAsset = graphql`
  fragment MdxSuiteContentfulAsset on ContentfulAsset {
    assetId: contentful_id
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

import { graphql } from 'gatsby'

export const MdxSuiteContentfulAsset = graphql`
  fragment MdxSuiteContentfulAsset on ContentfulAsset {
    imageId: contentful_id
    title
    description
    file {
      contentType
      details {
        image {
          height
          width
        }
      }
    }
  }
`

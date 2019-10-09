import { graphql } from 'gatsby'

export const gatsbyMdxSuiteInstagram = graphql`
  fragment GatsbyMdxSuiteInstagram on InstaNode {
    id
    localFile {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export const gatsbyMdxSuiteInstagramWithSqip = graphql`
  fragment GatsbyMdxSuiteInstaNode_withSqip on InstaNode {
    id
    localFile {
      childImageSharp {
        sqip(mode: 4, numberOfPrimitives: 12) {
          dataURI
        }
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`

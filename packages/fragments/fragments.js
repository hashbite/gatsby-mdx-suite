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

// Extending not existing node typed does not work yet :(
// @todo try https://www.apollographql.com/docs/apollo-server/features/directives/ -> @skip(if: $nodeType) and  @include(if: $nodeType)
// export const fooBarBuzzz = graphql`
//   fragment FooBarBuzzz on iDontExist {
//     tracedSVG
//     width
//     height
//     src
//     srcSet
//   }
// `

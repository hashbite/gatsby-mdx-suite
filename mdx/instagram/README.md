Example fragment:

```graphql
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
```
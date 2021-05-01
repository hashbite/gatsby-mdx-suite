Example fragment:

```graphql
  fragment GatsbyMdxSuiteYoutubeFeed on YoutubeVideo {
    channelId
    videoId
    title
    publishedAt
    localThumbnail {
      childImageSharp {
        sqip(mode: 4, numberOfPrimitives: 12) {
          dataURI
        }
        fluid(maxWidth: 500) {
          # @todo
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
```

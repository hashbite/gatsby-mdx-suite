---
name: Media Gallery
route: /docs/media/media-gallery
menu: Media
---
import { Playground, Props } from 'docz'

import MediaGallery from '@gatsby-mdx-suite/mdx-media-gallery'
import InstagramPost from '@gatsby-mdx-suite/mdx-instagram/instagram-post'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'
import ContentfulImage from '@gatsby-mdx-suite/mdx-image/image'

# MediaGallery

Display (m)any different content types within a Gallery

<Props of={MediaGallery} />

## Supported components:

* InstagramPost
* YoutubeVideo
* ContentfulImage

## Instagram

<Playground>
  <MediaGallery>
    <InstagramPost id="B16Tc2fBOMJ" />
    <InstagramPost id="B0-s4uzBW6v" />
    <InstagramPost id="BzimNxLByQk" />
  </MediaGallery>
</Playground>

## Mixed

@todo youtube videos and contentful images are not yet passed into the MDX context. Thats why only one thumbnail is visible here (yet).

<Playground>
  <MediaGallery>
    <InstagramPost id="B16Tc2fBOMJ" />
    <YoutubeVideo id="iXGtx-hroKE" />
    <ContentfulImage id="3d1rPWRi5ejNtGAe3knacP" />
  </MediaGallery>
</Playground>

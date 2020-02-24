# MediaGallery

Display (m)any different content types within a Gallery

## Supported components:

* InstagramPost
* YoutubeVideo
* ContentfulImage

## Instagram

```mdx
<MediaGallery>
<InstagramPost id="B16Tc2fBOMJ" />
<InstagramPost id="B0-s4uzBW6v" />
<InstagramPost id="BzimNxLByQk" />
</MediaGallery>
```

## Mixed

@todo youtube videos and contentful images are not yet passed into the MDX context. Thats why only one thumbnail is visible here (yet).

```mdx
<MediaGallery>
<InstagramPost id="randomInstagramPost" />
<YoutubeVideo id="randomYoutubeVideo" />
<Image id="randomImageId" />
</MediaGallery>
```

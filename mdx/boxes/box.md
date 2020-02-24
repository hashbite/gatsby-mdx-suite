## Box

A box resides within a `<Boxes/>` component.

You may use it to provide:

* Empty spaces to push content to the side (or down in some rare cases)
* Display content in a specific area
* Use it as design element with a background color or image

You can skip the height if you want a square box, it will be automatically set given width.

### Example

```mdx
<Boxes>
  <Box backgroundColor="tomato" />
  <Box>

# Some example content

For this box

</Box>
<Box backgroundImageId="randomPictureId" />
</Boxes>
```

# Viewport

A viewport is always as big as the browser window of the user.

By default, given content will be centered vertically and horizontally.

## Images

```mdx
<Viewport>
<Section>

This content will be centered within an area, which has the exact height of your screen.
The `<Section />` wrapper will ensure the content is aligned to the main content column.

</Section>
</Viewport>
<Viewport colorSet="green">
<Section>

## Nec totas solitis

Some more content

</Section>
</Viewport>
<Viewport horizontalAlign="end" verticalAlign="end">

This content is horizontally and vertically aligned to the end.

<Image src="https://source.unsplash.com/random?2" width="200" />

</Viewport>
```

---
name: Viewport
route: /docs/layout/viewport
menu: Layout
---
import { Playground, Props } from 'docz'

import Viewport from '@gatsby-mdx-suite/mdx-layout/viewport'
import Content from '@gatsby-mdx-suite/mdx-layout/content'
import Image from '@gatsby-mdx-suite/mdx-basic/gatsby-image'

# Viewport

A viewport is always as big as the browser window of the user.

<Props of={Viewport} />

## Images

<Playground>
  <Viewport>
  <Content>
    This content will be centered within an area, which has the exact height of your screen.
    The `<Content />` wrapper will ensure the content is aligned to the main content column.
  </Content>
  </Viewport>
  <Viewport colorSet="tomato">
  <Content>
  ## Nec totas solitis

  Some more content
  </Content>
  </Viewport>
  <Viewport horizontalAlign="end" verticalAlign="end">

  This content is horizontally and vertically aligned to the end.

  <Image src="https://source.unsplash.com/random?2" width="200" />

  </Viewport>
</Playground>

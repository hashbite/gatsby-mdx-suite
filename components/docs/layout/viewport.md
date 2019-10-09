---
name: Viewport
route: /docs/layout/viewport
menu: Layout
---
import { Playground, Props } from 'docz'

import Viewport from '@gatsby-mdx-suite/layout/viewport'

# Viewport

A viewport is always as big as the browser window of the user.

<Props of={Viewport} />

## Images

<Playground>
  <Viewport>

  # Very important headline

  </Viewport>
  <Viewport>

## Nec totas solitis

@todo seems like MDX rendering within viewports broken in the demo

  </Viewport>
  <Viewport horizontalAlign="end" verticalAlign="end">

  @todo: make sure images resize itself

  ![Foo](https://source.unsplash.com/random?2)

  </Viewport>
</Playground>

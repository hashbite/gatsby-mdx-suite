---
name: Grid
route: /docs/layout/grid
menu: Layout
---
import { Playground, Props } from 'docz'

import Grid from '@gatsby-mdx-suite/components/layout/grid'

# Grid

Create an equal sized grid of elements.

<Props of={Grid} />

## Images

<Playground>
  <Grid>

  ![Foo](https://loremflickr.com/320/240/dog)

  ![Foo](https://loremflickr.com/320/240/dog)

  ![Foo](https://loremflickr.com/320/240/dog)

  </Grid>
</Playground>

## Complex content

<Playground>
  <Grid>
  <div>

# First column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Iam contemni non poteris. Apparet statim, quae sint officia, quae actiones.

  </div>
  <div>

# Second column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Fortasse id optimum, sed ubi illud: Plus semper voluptatis?

  </div>
  </Grid>
</Playground>


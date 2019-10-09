---
name: Grid
route: /docs/layout/grid
menu: Layout
---

import { Playground, Props } from 'docz'

import Grid from '@gatsby-mdx-suite/layout/grid'

# Grid

A Grid is a very powerful tool to layout your content.

It's main purpose is to show content next to each other, while maintaining a reasonable size depending on the screen size.

You can use it to center a single item as well. See below

<Props of={Grid} />

## Images

<Playground>
  <Grid minWidth="100px" maxWidth="180px" center>

![picture of a dog](https://source.unsplash.com/400x300/weekly?dog)

![picture of a cat](https://source.unsplash.com/400x300/weekly?cat)

![picture of a ape](https://source.unsplash.com/400x300/weekly?ape)

![picture of a penguin](https://source.unsplash.com/400x300/weekly?penguin)

![picture of a bird](https://source.unsplash.com/400x300/weekly?bird)

![picture of a elephant](https://source.unsplash.com/400x300/weekly?elephant)

![picture of a human](https://source.unsplash.com/400x300/weekly?human)

  </Grid>
</Playground>

## Complex content

<Playground>
  <Grid>
  <div>

![architecture](https://source.unsplash.com/800x600/weekly?architecture)

# Architecture

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Iam contemni non poteris. Apparet statim, quae sint officia, quae actiones.

  </div>
  <div>

![technology](https://source.unsplash.com/800x600/weekly?technology)

# Technology

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Fortasse id optimum, sed ubi illud: Plus semper voluptatis?

  </div>
  </Grid>
</Playground>

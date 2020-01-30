---
name: Columns
route: /docs/layout/columns
menu: Layout
---

import { Playground, Props } from 'docz'

import Columns from '@gatsby-mdx-suite/mdx-layout/columns'

# Columns

A Columns is a very powerful tool to layout your content.

It's main purpose is to show content next to each other, while maintaining a reasonable size depending on the screen size.

You can use it to center a single item as well. See below

<Props of={Columns} />

## Images

<Playground>
  <Columns>

![picture of a dog](https://source.unsplash.com/400x300/weekly?dog)

![picture of a cat](https://source.unsplash.com/400x300/weekly?cat)

![picture of a ape](https://source.unsplash.com/400x300/weekly?ape)

![picture of a penguin](https://source.unsplash.com/400x300/weekly?penguin)

![picture of a bird](https://source.unsplash.com/400x300/weekly?bird)

![picture of a elephant](https://source.unsplash.com/400x300/weekly?elephant)

![picture of a human](https://source.unsplash.com/400x300/weekly?human)

  </Columns>
</Playground>

## Complex content

<Playground>
  <Columns>
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
  </Columns>
</Playground>

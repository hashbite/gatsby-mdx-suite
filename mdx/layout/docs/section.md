---
name: Section
route: /docs/layout/section
menu: Layout
---

import { Playground, Props } from 'docz'

import Section from '@gatsby-mdx-suite/mdx-layout/section'
import Columns from '@gatsby-mdx-suite/mdx-layout/columns'

# Section

A Section is used to split up your content into multiple parts.

<Props of={Section} />

## Example

<Playground>
<Section>

# Doggy

On a plain section, without any styling

![picture of a dog](https://source.unsplash.com/400x300/weekly?dog)

</Section>
<Section colorSet="ash">

# Cats

On a section with the color set `ash` applied.

<Columns>

![picture of a cat](https://source.unsplash.com/400x300/weekly?cat)

![picture of a cat](https://source.unsplash.com/400x300/weekly?cat)



</Columns>
</Section>

<Section backgroundColor="tomato" primaryColor="#48C9B0" secondaryColor="skyblue">

# Parrots

On a section with custom background, primary and secondary color

<Columns>

![picture of a cat](https://source.unsplash.com/400x300/weekly?parrot)

![picture of a cat](https://source.unsplash.com/400x300/weekly?parrot)



</Columns>
</Section>
<Section backgroundImageId="ASsm0jtrRG6bmJyIfr6AL">

# Ghosts

On a section with a background image

<Columns>

![picture of a cat](https://source.unsplash.com/400x300/weekly?ghost)

![picture of a cat](https://source.unsplash.com/400x300/weekly?ghost)

</Columns>
</Section>
</Playground>

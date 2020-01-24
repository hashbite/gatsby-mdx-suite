---
name: Images
route: /docs/contentful/images
menu: Contentful
---

import { Playground, Props } from 'docz'

import Image from '../contentful-image'

# Images

Display an image. For external images, you can use the `src` attribute. Make sure to set the `alt` attribute to a descriptive text about the image.

If the image should be loaded from Contentful, just use the `id` attribute.

<Props of={Image} />

## Image from Contentful

<Playground>
<Image id="6dpwDda4RBJgYqbDPGR9dj" maxWidth="600"/>
</Playground>

## Image from another website

<Playground>
<Image src="https://source.unsplash.com/400x300/weekly?cat" alt="An amazing cat" maxWidth="300"/>
</Playground>

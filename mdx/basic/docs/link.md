---
name: Links
route: /docs/basics/links
menu: Basics
---

import { Playground, Props } from 'docz'

import Link from '../link'

# Link

Link either an internal or external page.

External pages use the `href` attribute.

Internal pages use the `id` attribute.

<Props of={Link} />

<Playground>
<Link href="https://google.com">External link to Google</Link>
</Playground>

<Playground>
<Link id="contentfulId">Internal link to some sub page of the website</Link>
</Playground>



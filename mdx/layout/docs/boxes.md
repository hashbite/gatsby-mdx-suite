---
name: Box
route: /docs/blocks/box
menu: Boxes
---

import { Playground, Props } from 'docz'

import Boxes from '../boxes'
import Box from '../box'
import BoxContent from '../box-content'


## Boxes Grid

Wrap all boxes in a `<Boxes/>` tag to enable a 8 column grid. A single box can have dimensions, background colors and more.

### Example

<Playground>
  <Boxes>
    <Box width="2" height="2" colorSet="corn" />
    <Box width="1" height="1" />
    <Box width="4" height="4" colorSet="ash" />
  </Boxes>
</Playground>

<br />
<br />
<br />

---

<br />
<br />
<br />

## Box with Content


### Example
<Playground>
  <Boxes>
    <Box width="3" height="3" colorSet="almond">
      <BoxContent>
        Custom Colored Box Content
      </BoxContent>
    </Box>
  </Boxes>
</Playground>

## All Properties

### Boxes
<Props of={Boxes} />

### Box
<Props of={Box} />

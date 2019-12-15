---
name: test
route: /docs/test
menu: Test
---

import { Playground, Props } from 'docz'

import EmotionComponent from '../emotion-component'

# EmotionComponent

This page should remain till the following props are rendered properly:

<Props of={EmotionComponent} />

## Images

<Playground>
  <EmotionComponent>I should be red</EmotionComponent>
  <EmotionComponent color="blue">I should be blue</EmotionComponent>
  <EmotionComponent color="tomato">I should be tomato</EmotionComponent>
</Playground>

import typography from './typography'

import defaultTheme from 'gatsby-theme-mdx-suite/src/gatsby-plugin-theme-ui'

const maxContentWidth = 960

export default {
  ...defaultTheme,
  sizes: {
    ...defaultTheme.sizes,
    maxContentWidth,
  },
  ...typography,
}

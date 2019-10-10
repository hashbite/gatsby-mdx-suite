import typography from './typography'

import defaultTheme from 'gatsby-theme-mdx-suite/src/gatsby-plugin-theme-ui'

const maxContentWidth = 960
const sidebarWidth = 200

export default {
  ...defaultTheme,
  sizes: {
    maxContentWidth,
    sidebarWidth,
  },
  colors: {
    // text: '#0a0a0a',
    // background: '#ffc33f',
    // primary: '#ffc33f',
    // contrast: '#bb6414',
    // modes: {
    //   dark: {
    //     text: '#fff',
    //     background: '#000',
    //     primary: '#ffc33f',
    //     contrast: '#bb6414',
    //   },
    // },
  },
  ...typography,
}

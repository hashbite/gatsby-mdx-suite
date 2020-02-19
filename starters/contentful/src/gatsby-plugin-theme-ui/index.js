const typography = require('./typography')

const defaultTheme = require('gatsby-theme-mdx-suite/src/gatsby-plugin-theme-ui')

const maxContentWidth = 960

module.exports = {
  ...defaultTheme,
  sizes: {
    ...defaultTheme.sizes,
    maxContentWidth,
  },
  ...typography,
}

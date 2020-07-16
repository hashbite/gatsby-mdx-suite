/**
 * Use this file to add project specific theme configuration.
 *
 * Important: The es-modules syntax can not be used here till gatsby-config.js supports it.
 */

const merge = require('lodash/merge')
const baseThemeUiConfig = require('gatsby-theme-mdx-suite-base/src/gatsby-plugin-theme-ui')

// Overwrite core theme
module.exports = merge({}, baseThemeUiConfig, {
  colors: {
    primary: 'tomato',
    sets: {
      primary: {
        background: 'tomato',
        secondary: 'tomato',
      },
    },
  },
})

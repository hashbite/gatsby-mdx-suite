/**
 * Use this file to add project specific theme configuration.
 *
 * Important: The es-modules syntax can not be used here till gatsby-config.js supports it.
 */

const merge = require('deepmerge')

const coreThemeUiConfig = require('gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui')

// Overwrite core theme
module.exports = merge(coreThemeUiConfig, {
  colors: {
    primary: 'tomato',
  },
})

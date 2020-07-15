/**
 * This base theme extends our core theme with a few custom values and
 * adds the defaul typography design to it.
 *
 * It will automatically be merged with @theme-ui/preset-tailwind
 *
 * Important: The es-modules syntax can not be used here till gatsby-config.js supports it.
 */

const merge = require('lodash/merge')
const coreTheme = require('gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui')
const tailwindPreset = require('@theme-ui/preset-tailwind')

const typographyTheme = require('./typography')

// Optional: We use styles based on typography.js to achieve a proper vertical rhythm
delete coreTheme.styles

module.exports = merge({}, coreTheme, typographyTheme, {
  // Options see gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui/index.js
  colors: {
    sets: {
      red: {
        background: tailwindPreset.colors.red[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.red[2],
        primary: tailwindPreset.colors.red[1],
        secondary: tailwindPreset.colors.white,
      },
      orange: {
        background: tailwindPreset.colors.orange[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.orange[2],
        primary: tailwindPreset.colors.orange[1],
        secondary: tailwindPreset.colors.white,
      },
      yellow: {
        background: tailwindPreset.colors.yellow[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.yellow[2],
        primary: tailwindPreset.colors.yellow[1],
        secondary: tailwindPreset.colors.white,
      },
      green: {
        background: tailwindPreset.colors.green[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.green[2],
        primary: tailwindPreset.colors.green[1],
        secondary: tailwindPreset.colors.white,
      },
      teal: {
        background: tailwindPreset.colors.teal[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.teal[1],
        primary: tailwindPreset.colors.teal[1],
        secondary: tailwindPreset.colors.white,
      },
      blue: {
        background: tailwindPreset.colors.blue[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.blue[2],
        primary: tailwindPreset.colors.blue[1],
        secondary: tailwindPreset.colors.white,
      },
      indigo: {
        background: tailwindPreset.colors.indigo[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.indigo[2],
        primary: tailwindPreset.colors.indigo[1],
        secondary: tailwindPreset.colors.white,
      },
      purple: {
        background: tailwindPreset.colors.purple[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.purple[2],
        primary: tailwindPreset.colors.purple[1],
        secondary: tailwindPreset.colors.white,
      },
      pink: {
        background: tailwindPreset.colors.pink[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.pink[2],
        primary: tailwindPreset.colors.pink[1],
        secondary: tailwindPreset.colors.white,
      },
    },
  },
})

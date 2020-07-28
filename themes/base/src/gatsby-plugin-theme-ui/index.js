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

const typographyTheme = require('./typography')

// Optional: We use styles based on typography.js to achieve a proper vertical rhythm
delete coreTheme.styles

module.exports = merge({}, coreTheme, typographyTheme, {
  // Options see gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui/index.js
  colors: {
    sets: {
      primary: {
        background: coreTheme.colors.primary,
        text: coreTheme.colors.background,
        primary: coreTheme.colors.background,
        secondary: coreTheme.colors.primary,
        headline: coreTheme.colors.background,
      },
      red: {
        background: coreTheme.colors.red[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.red[2],
        primary: coreTheme.colors.red[1],
        secondary: coreTheme.colors.white,
      },
      orange: {
        background: coreTheme.colors.orange[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.orange[2],
        primary: coreTheme.colors.orange[1],
        secondary: coreTheme.colors.white,
      },
      yellow: {
        background: coreTheme.colors.yellow[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.yellow[2],
        primary: coreTheme.colors.yellow[1],
        secondary: coreTheme.colors.white,
      },
      green: {
        background: coreTheme.colors.green[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.green[2],
        primary: coreTheme.colors.green[1],
        secondary: coreTheme.colors.white,
      },
      teal: {
        background: coreTheme.colors.teal[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.teal[1],
        primary: coreTheme.colors.teal[1],
        secondary: coreTheme.colors.white,
      },
      blue: {
        background: coreTheme.colors.blue[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.blue[2],
        primary: coreTheme.colors.blue[1],
        secondary: coreTheme.colors.white,
      },
      indigo: {
        background: coreTheme.colors.indigo[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.indigo[2],
        primary: coreTheme.colors.indigo[1],
        secondary: coreTheme.colors.white,
      },
      purple: {
        background: coreTheme.colors.purple[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.purple[2],
        primary: coreTheme.colors.purple[1],
        secondary: coreTheme.colors.white,
      },
      pink: {
        background: coreTheme.colors.pink[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.pink[2],
        primary: coreTheme.colors.pink[1],
        secondary: coreTheme.colors.white,
      },
    },
  },
})

const toTailwind = require('@theme-ui/tailwind').default
const theme = require('./src/gatsby-plugin-theme-ui/index')
const tailwindTheme = toTailwind(theme)

console.log('tailwind.config.js')
console.log({ tailwindTheme })

module.exports = tailwindTheme

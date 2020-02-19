const toTailwind = require('@theme-ui/tailwind')
const theme = require('./src/gatsby-plugin-theme-ui')

console.log({ theme })

console.log('tailwindified')

console.log(toTailwind(theme))

console.log('---')

// module.exports = toTailwind(theme)

module.exports = {}

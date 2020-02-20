const toTailwind = require('@theme-ui/tailwind')
const theme = require('./src/gatsby-plugin-theme-ui')

console.log({ theme })

console.log('tailwindified')

console.log(toTailwind(theme))

console.log('---')

// module.exports = toTailwind(theme)

module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover'],
  },
}

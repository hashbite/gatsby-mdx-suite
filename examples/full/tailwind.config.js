const merge = require('deepmerge')
const defaultTheme = require('gatsby-theme-mdx-suite-base/tailwind.config.js')

// If you need to access the tailwind default theme values:
// const defaultTailwindTheme = require('tailwindcss/defaultTheme')

module.exports = merge(defaultTheme, {
  theme: {
    extend: {
      // Add your tailwind theme overwrites here
      colors: {
        primary: 'tomato',
        sets: {
          primary: {
            background: 'tomato',
            secondary: 'tomato',
          },
        },
      },
    },
  },
})

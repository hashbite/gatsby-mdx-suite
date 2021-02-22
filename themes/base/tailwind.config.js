const merge = require('deepmerge')
const defaultTheme = require('gatsby-theme-mdx-suite-core/tailwind.config.js')

const tailwindColors = require('tailwindcss/colors')

module.exports = merge(defaultTheme, {
  theme: {
    extend: {
      screens: {
        sm: '420px', // Just above iphone vertical width
        md: '668px', // Just above iphone horizontal width
      },
      colors: {
        primary: tailwindColors.blue['500'],
        secondary: tailwindColors.orange['300'],
        text: tailwindColors.gray['900'],
        sets: {
          red: {
            background: tailwindColors.red['700'],
            text: tailwindColors.white,
            headline: tailwindColors.red['200'],
            primary: tailwindColors.red['100'],
            secondary: tailwindColors.white,
          },
          orange: {
            background: tailwindColors.orange['700'],
            text: tailwindColors.white,
            headline: tailwindColors.orange['200'],
            primary: tailwindColors.orange['100'],
            secondary: tailwindColors.white,
          },
          yellow: {
            background: tailwindColors.yellow['700'],
            text: tailwindColors.white,
            headline: tailwindColors.yellow['200'],
            primary: tailwindColors.yellow['100'],
            secondary: tailwindColors.white,
          },
          green: {
            background: tailwindColors.green['700'],
            text: tailwindColors.white,
            headline: tailwindColors.green['200'],
            primary: tailwindColors.green['100'],
            secondary: tailwindColors.white,
          },
          teal: {
            background: tailwindColors.teal['700'],
            text: tailwindColors.white,
            headline: tailwindColors.teal['100'],
            primary: tailwindColors.teal['100'],
            secondary: tailwindColors.white,
          },
          blue: {
            background: tailwindColors.blue['700'],
            text: tailwindColors.white,
            headline: tailwindColors.blue['200'],
            primary: tailwindColors.blue['100'],
            secondary: tailwindColors.white,
          },
          indigo: {
            background: tailwindColors.indigo['700'],
            text: tailwindColors.white,
            headline: tailwindColors.indigo['200'],
            primary: tailwindColors.indigo['100'],
            secondary: tailwindColors.white,
          },
          purple: {
            background: tailwindColors.purple['700'],
            text: tailwindColors.white,
            headline: tailwindColors.purple['200'],
            primary: tailwindColors.purple['100'],
            secondary: tailwindColors.white,
          },
          pink: {
            background: tailwindColors.pink['700'],
            text: tailwindColors.white,
            headline: tailwindColors.pink['200'],
            primary: tailwindColors.pink['100'],
            secondary: tailwindColors.white,
          },
        },
      },
    },
  },
})

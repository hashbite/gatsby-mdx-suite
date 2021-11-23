const merge = require('deepmerge')
const defaultTheme = require('gatsby-theme-mdx-suite-core/tailwind.config.js')
const defaultTailwindTheme = require('tailwindcss/defaultTheme')

module.exports = merge(defaultTheme, {
  theme: {
    extend: {
      screens: {
        sm: '420px', // Just above iphone vertical width
        md: '668px', // Just above iphone horizontal width
      },
      colors: {
        primary: defaultTailwindTheme.colors.blue['500'],
        secondary: defaultTailwindTheme.colors.purple['300'],
        text: defaultTailwindTheme.colors.gray['900'],
        sets: {
          red: {
            background: defaultTailwindTheme.colors.red['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.red['200'],
            primary: defaultTailwindTheme.colors.red['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          purple: {
            background: defaultTailwindTheme.colors.purple['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.purple['200'],
            primary: defaultTailwindTheme.colors.purple['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          yellow: {
            background: defaultTailwindTheme.colors.yellow['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.yellow['200'],
            primary: defaultTailwindTheme.colors.yellow['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          green: {
            background: defaultTailwindTheme.colors.green['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.green['200'],
            primary: defaultTailwindTheme.colors.green['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          indigo: {
            background: defaultTailwindTheme.colors.indigo['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.indigo['100'],
            primary: defaultTailwindTheme.colors.indigo['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          blue: {
            background: defaultTailwindTheme.colors.blue['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.blue['200'],
            primary: defaultTailwindTheme.colors.blue['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
          pink: {
            background: defaultTailwindTheme.colors.pink['700'],
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.pink['200'],
            primary: defaultTailwindTheme.colors.pink['100'],
            secondary: defaultTailwindTheme.colors.white,
          },
        },
      },
    },
  },
})

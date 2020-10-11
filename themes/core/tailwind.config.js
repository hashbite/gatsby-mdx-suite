const plugin = require('tailwindcss/plugin')
const defaultTailwindTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      spacing: {
        'content-column-padding': '2vw',
        'grid-gap': '1rem',
        'content-gap': '1rem',
        'content-column': '1200px',
      },
      colors: {
        // MDX-Suite specific colors
        background: 'transparent', // background color to transparent to simplify working with color sets
        'root-background': 'white', // background of body and overlapping global elements
        primary: defaultTailwindTheme.colors.blue['500'],
        secondary: defaultTailwindTheme.colors.orange['300'],
        text: defaultTailwindTheme.colors.gray['900'],
        headline: 'inherit',
        sets: {
          'background-image': {
            background: 'transparent',
            text: defaultTailwindTheme.colors.white,
            headline: defaultTailwindTheme.colors.white,
          },
          primary: {
            background: defaultTailwindTheme.colors.blue['500'],
            text: defaultTailwindTheme.colors.white,
            primary: defaultTailwindTheme.colors.white,
          },
          white: {
            background: defaultTailwindTheme.colors.white,
            text: defaultTailwindTheme.colors.gray['800'],
          },
          gray100: {
            background: defaultTailwindTheme.colors.gray['100'],
          },
          gray200: {
            background: defaultTailwindTheme.colors.gray['200'],
          },
          gray300: {
            background: defaultTailwindTheme.colors.gray['300'],
          },
          gray400: {
            background: defaultTailwindTheme.colors.gray['400'],
          },
          gray500: {
            background: defaultTailwindTheme.colors.gray['500'],
            text: defaultTailwindTheme.colors.white,
          },
          gray600: {
            background: defaultTailwindTheme.colors.gray['600'],
            text: defaultTailwindTheme.colors.white,
          },
          gray700: {
            background: defaultTailwindTheme.colors.gray['700'],
            text: defaultTailwindTheme.colors.white,
          },
          gray800: {
            background: defaultTailwindTheme.colors.gray['800'],
            text: defaultTailwindTheme.colors.white,
          },
          gray900: {
            background: defaultTailwindTheme.colors.gray['900'],
            text: defaultTailwindTheme.colors.white,
          },
          black: {
            background: defaultTailwindTheme.colors.black,
            text: defaultTailwindTheme.colors.gray['200'],
          },
        },
      },
      fontFamily: {
        headline: defaultTailwindTheme.fontFamily.serif,
        body: defaultTailwindTheme.fontFamily.sans,
      },
      minWidth: {
        'content-column-padding': '2vw',
        'grid-gap': '1rem',
        'content-gap': '1rem',
        'content-column': '1200px',
      },
      maxWidth: {
        'content-column-padding': '2vw',
        'grid-gap': '1rem',
        'content-gap': '1rem',
        'content-column': '1200px',
      },
      minHeight: {
        'content-column-padding': '2vw',
        'grid-gap': '1rem',
        'content-gap': '1rem',
        'content-column': '1200px',
      },
      maxHeight: {
        'content-column-padding': '2vw',
        'grid-gap': '1rem',
        'content-gap': '1rem',
        'content-column': '1200px',
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.text'),
          maxWidth: null,
          img: { marginTop: null, marginBottom: null },
          a: {
            color: theme('colors.primary'),
          },
          // We have our own bullet points for unordered lists
          'ul > li::before': false,
        },
      },
    }),
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, config }) {
      addBase({
        html: {
          color: config('theme.colors.text'),
        },
        h1: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
        h2: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
        h3: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
        h4: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
        h5: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
        h6: {
          color: config('theme.colors.text'),
          fontFamily: config('theme.fontFamily.headline').join(', '),
        },
      })
    }),
  ],
  purge: false,
}

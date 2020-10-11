const merge = require('deepmerge')
const plugin = require('tailwindcss/plugin')
const defaultTailwindTheme = require('./src/tailwind.default.config')

module.exports = merge(
  { theme: { extend: { defaultTailwindTheme } } },
  {
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
    },
    plugins: [
      // Font families, size and colors
      plugin(function ({ addBase, config }) {
        addBase({
          html: {
            color: config('theme.colors.text'),
          },
          h1: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
            fontSize: config('theme.fontSize.4xl'),
            lineHeight: config('theme.lineHeight.none'),
          },
          h2: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
            fontSize: config('theme.fontSize.3xl'),
            lineHeight: config('theme.lineHeight.tight'),
          },
          h3: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
            fontSize: config('theme.fontSize.2xl'),
            lineHeight: config('theme.lineHeight.tight'),
          },
          h4: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
            fontSize: config('theme.fontSize.xl'),
            lineHeight: config('theme.lineHeight.snug'),
          },
          h5: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
            fontSize: config('theme.fontSize.lg'),
            lineHeight: config('theme.lineHeight.snug'),
          },
          h6: {
            color: config('theme.colors.headline'),
            fontFamily: config('theme.fontFamily.headline').join(', '),
          },
        })
      }),
      // Apply content gap to MDX block elements
      plugin(function ({ addBase, config }) {
        const contentBlockElements = [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'ul',
          'ol',
          'blockquote',
          'dl',
          'dd',
          'hr',
          'figure',
          'pre',
        ]
        const contentBlockStyles = {}
        contentBlockElements.forEach((element) => {
          contentBlockStyles[element] = {
            marginTop: config('theme.spacing.content-gap'),
            marginBottom: config('theme.spacing.content-gap'),
          }
        })
        addBase(contentBlockStyles)
      }),
    ],
    purge: false,
  }
)

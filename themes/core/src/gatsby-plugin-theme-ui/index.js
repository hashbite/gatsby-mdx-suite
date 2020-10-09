/**
 * This core theme sets all required values for rendering the page.
 * It will automatically be merged with @theme-ui/preset-tailwind
 *
 * Important: The es-modules syntax can not be used here till gatsby-config.js supports it.
 */
const merge = require('deepmerge')
const tailwindPreset = require('@theme-ui/preset-tailwind')

module.exports = merge(tailwindPreset, {
  sizes: {
    contentColumnPadding: '2vw',
    gridGap: `${tailwindPreset.space[3]}`,
    contentGap: `${tailwindPreset.space[3]}`,
    contentColumn: `1200px`,
  },
  colors: {
    // Default Theme-UI colors
    // text: tailwindPreset.colors.text, // text color
    // primary: tailwindPreset.colors.primary, // primary button and link color
    // secondary: tailwindPreset.colors.secondary, // secondary color - can be used for hover states
    // accent: tailwindPreset.colors.accent, //	a contrast color for emphasizing UI
    // highlight: tailwindPreset.colors.highlight, // a background color for highlighting text
    // muted: tailwindPreset.colors.muted, // a gray or subdued color for decorative purposes
    // MDX-Suite specific colors
    background: 'transparent', // background color to transparent to simplify working with color sets
    rootBackground: 'white', // background of body and overlapping global elements
    headline: 'inherit', // headline color
    sets: {
      backgroundImage: {
        background: 'transparent',
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.white,
      },
      brightBackgroundImage: {
        text: tailwindPreset.colors.text,
        headline: tailwindPreset.colors.headline,
      },
      white: {
        background: tailwindPreset.colors.white,
        text: tailwindPreset.colors.gray[8],
      },
      gray100: {
        background: tailwindPreset.colors.gray[1],
      },
      gray200: {
        background: tailwindPreset.colors.gray[2],
      },
      gray300: {
        background: tailwindPreset.colors.gray[3],
      },
      gray400: {
        background: tailwindPreset.colors.gray[4],
      },
      gray500: {
        background: tailwindPreset.colors.gray[5],
        text: tailwindPreset.colors.white,
      },
      gray600: {
        background: tailwindPreset.colors.gray[6],
        text: tailwindPreset.colors.white,
      },
      gray700: {
        background: tailwindPreset.colors.gray[7],
        text: tailwindPreset.colors.white,
      },
      gray800: {
        background: tailwindPreset.colors.gray[8],
        text: tailwindPreset.colors.white,
      },
      gray900: {
        background: tailwindPreset.colors.gray[9],
        text: tailwindPreset.colors.white,
      },
      black: {
        background: tailwindPreset.colors.black,
        text: tailwindPreset.colors.gray[2],
      },
    },
  },
  // Custom styles to inject our custom colors into all (MDX) components
  styles: {
    h1: {
      color: 'headline',
    },
    h2: {
      color: 'headline',
    },
    h3: {
      color: 'headline',
    },
    h4: {
      color: 'headline',
    },
    h5: {
      color: 'headline',
    },
    h6: {
      color: 'headline',
    },
    th: {
      color: 'headline',
    },
  },
})

import merge from 'lodash/merge'
import tailwindPreset from '@theme-ui/preset-tailwind'

export default merge(tailwindPreset, {
  spacing: {
    'content-column-padding': '2vw',
    'grid-gap': tailwindPreset.sizes['8'],
  },
  maxWidth: {
    'content-column': `${parseInt(tailwindPreset.sizes['6xl']) * 16}px`,
  },
  colors: {
    // Default Theme-UI colors
    text: tailwindPreset.colors.text, // text color
    background: tailwindPreset.colors.background, // background color
    primary: tailwindPreset.colors.primary, // primary button and link color
    secondary: tailwindPreset.colors.secondary, // secondary color - can be used for hover states
    accent: tailwindPreset.colors.accent, //	a contrast color for emphasizing UI
    highlight: tailwindPreset.colors.highlight, // a background color for highlighting text
    muted: tailwindPreset.colors.muted, // a gray or subdued color for decorative purposes
    // MDX-Suite specific colors
    headline: 'toamto', //tailwindPreset.colors.text, // headline color
    heading: 'tomato',
    sets: {
      muted: {
        background: tailwindPreset.colors.gray[7],
        primary: tailwindPreset.colors.gray[1],
        headline: tailwindPreset.colors.gray[2],
        secondary: tailwindPreset.colors.white,
      },
      red: {
        background: tailwindPreset.colors.red[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.red[2],
        primary: tailwindPreset.colors.red[1],
        secondary: tailwindPreset.colors.white,
      },
      orange: {
        background: tailwindPreset.colors.orange[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.orange[2],
        primary: tailwindPreset.colors.orange[1],
        secondary: tailwindPreset.colors.white,
      },
      yellow: {
        background: tailwindPreset.colors.yellow[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.yellow[2],
        primary: tailwindPreset.colors.yellow[1],
        secondary: tailwindPreset.colors.white,
      },
      green: {
        background: tailwindPreset.colors.green[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.green[2],
        primary: tailwindPreset.colors.green[1],
        secondary: tailwindPreset.colors.white,
      },
      teal: {
        background: tailwindPreset.colors.teal[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.teal[1],
        primary: tailwindPreset.colors.teal[1],
        secondary: tailwindPreset.colors.white,
      },
      blue: {
        background: tailwindPreset.colors.blue[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.blue[2],
        primary: tailwindPreset.colors.blue[1],
        secondary: tailwindPreset.colors.white,
      },
      indigo: {
        background: tailwindPreset.colors.indigo[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.indigo[2],
        primary: tailwindPreset.colors.indigo[1],
        secondary: tailwindPreset.colors.white,
      },
      purple: {
        background: tailwindPreset.colors.purple[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.purple[2],
        primary: tailwindPreset.colors.purple[1],
        secondary: tailwindPreset.colors.white,
      },
      pink: {
        background: tailwindPreset.colors.pink[7],
        text: tailwindPreset.colors.white,
        headline: tailwindPreset.colors.pink[2],
        primary: tailwindPreset.colors.pink[1],
        secondary: tailwindPreset.colors.white,
      },
    },
  },
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

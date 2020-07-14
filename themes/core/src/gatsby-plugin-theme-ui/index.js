import merge from 'lodash/merge'
import tailwindPreset from '@theme-ui/preset-tailwind'

export default merge(tailwindPreset, {
  spacing: {
    'content-column-padding': '2vw',
    'grid-gap': `${tailwindPreset.space[3]}px`,
    'content-gap': `${tailwindPreset.space[3]}px`,
  },
  maxWidth: {
    'content-column': `1200px`,
  },
  colors: {
    // Default Theme-UI colors
    text: tailwindPreset.colors.text, // text color
    rootBackground: tailwindPreset.colors.background, // document background color
    background: 'transparent', // background color
    primary: tailwindPreset.colors.primary, // primary button and link color
    secondary: tailwindPreset.colors.secondary, // secondary color - can be used for hover states
    accent: tailwindPreset.colors.accent, //	a contrast color for emphasizing UI
    highlight: tailwindPreset.colors.highlight, // a background color for highlighting text
    muted: tailwindPreset.colors.muted, // a gray or subdued color for decorative purposes
    // MDX-Suite specific colors
    headline: tailwindPreset.colors.text, // headline color
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
    },
  },
  styles: {
    root: {
      backgroundColor: 'rootBackground',
    },
  },
})

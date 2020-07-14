import merge from 'lodash/merge'
import coreTheme from 'gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui'

import typographyTheme from './typography'

// Optional: We use styles based on typography.js to achieve a proper vertical rhythm
delete coreTheme.styles

export default merge(coreTheme, typographyTheme, {
  spacing: {
    'content-column-padding': '2vw',
    'grid-gap': `${typographyTheme.space[3]}px`,
    'content-gap': `${typographyTheme.space[3]}px`,
  },
  maxWidth: {
    'content-column': `1200px`,
  },
  colors: {
    // See gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui/index.js
    sets: {
      red: {
        background: coreTheme.colors.red[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.red[2],
        primary: coreTheme.colors.red[1],
        secondary: coreTheme.colors.white,
      },
      orange: {
        background: coreTheme.colors.orange[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.orange[2],
        primary: coreTheme.colors.orange[1],
        secondary: coreTheme.colors.white,
      },
      yellow: {
        background: coreTheme.colors.yellow[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.yellow[2],
        primary: coreTheme.colors.yellow[1],
        secondary: coreTheme.colors.white,
      },
      green: {
        background: coreTheme.colors.green[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.green[2],
        primary: coreTheme.colors.green[1],
        secondary: coreTheme.colors.white,
      },
      teal: {
        background: coreTheme.colors.teal[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.teal[1],
        primary: coreTheme.colors.teal[1],
        secondary: coreTheme.colors.white,
      },
      blue: {
        background: coreTheme.colors.blue[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.blue[2],
        primary: coreTheme.colors.blue[1],
        secondary: coreTheme.colors.white,
      },
      indigo: {
        background: coreTheme.colors.indigo[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.indigo[2],
        primary: coreTheme.colors.indigo[1],
        secondary: coreTheme.colors.white,
      },
      purple: {
        background: coreTheme.colors.purple[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.purple[2],
        primary: coreTheme.colors.purple[1],
        secondary: coreTheme.colors.white,
      },
      pink: {
        background: coreTheme.colors.pink[7],
        text: coreTheme.colors.white,
        headline: coreTheme.colors.pink[2],
        primary: coreTheme.colors.pink[1],
        secondary: coreTheme.colors.white,
      },
    },
  },
  styles: {
    root: {
      backgroundColor: 'rootBackground',
    },
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

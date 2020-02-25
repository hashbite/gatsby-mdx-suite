import merge from 'lodash/merge'
import tailwindPreset from '@theme-ui/preset-tailwind'

export default merge(tailwindPreset, {
  config: {
    // @todo check if we can replace all of these by extending other theme config like sizes/sizing
    contentColumnMaxWidth: tailwindPreset.sizes['6xl'],
    gridDefaultGap: '2rem',
  },
  colors: {
    sets: {
      default: {
        background: null,
        primary: null,
        secondary: null,
      },
      transparent: {
        background: null,
        primary: tailwindPreset.colors.white,
        secondary: tailwindPreset.colors.white,
      },
      gray: {
        background: tailwindPreset.colors.gray[7],
        primary: tailwindPreset.colors.gray[1],
        secondary: tailwindPreset.colors.white,
      },
      red: {
        background: tailwindPreset.colors.red[7],
        primary: tailwindPreset.colors.red[1],
        secondary: tailwindPreset.colors.white,
      },
      orange: {
        background: tailwindPreset.colors.orange[7],
        primary: tailwindPreset.colors.orange[1],
        secondary: tailwindPreset.colors.white,
      },
      yellow: {
        background: tailwindPreset.colors.yellow[7],
        primary: tailwindPreset.colors.yellow[1],
        secondary: tailwindPreset.colors.white,
      },
      green: {
        background: tailwindPreset.colors.green[7],
        primary: tailwindPreset.colors.green[1],
        secondary: tailwindPreset.colors.white,
      },
      teal: {
        background: tailwindPreset.colors.teal[7],
        primary: tailwindPreset.colors.teal[1],
        secondary: tailwindPreset.colors.white,
      },
      blue: {
        background: tailwindPreset.colors.blue[7],
        primary: tailwindPreset.colors.blue[1],
        secondary: tailwindPreset.colors.white,
      },
      indigo: {
        background: tailwindPreset.colors.indigo[7],
        primary: tailwindPreset.colors.indigo[1],
        secondary: tailwindPreset.colors.white,
      },
      purple: {
        background: tailwindPreset.colors.purple[7],
        primary: tailwindPreset.colors.purple[1],
        secondary: tailwindPreset.colors.white,
      },
      pink: {
        background: tailwindPreset.colors.pink[7],
        primary: tailwindPreset.colors.pink[1],
        secondary: tailwindPreset.colors.white,
      },
    },
  },
})

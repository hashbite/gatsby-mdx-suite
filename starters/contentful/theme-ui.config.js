const preset = require('@theme-ui/preset-tailwind')

module.exports = {
  config: {
    contentColumnMaxWidth: preset.sizes['6xl'],
    gridDefaultGap: '2rem',
  },
  ...preset,
  colors: {
    ...preset.colors,
    foo: 'tomato',
    sets: {
      default: {
        background: null,
        primary: null,
        secondary: null,
      },
      transparent: {
        background: null,
        primary: preset.colors.white,
        secondary: preset.colors.white,
      },
      gray: {
        background: preset.colors.gray[7],
        primary: preset.colors.gray[1],
        secondary: preset.colors.white,
      },
      red: {
        background: preset.colors.red[7],
        primary: preset.colors.red[1],
        secondary: preset.colors.white,
      },
      orange: {
        background: preset.colors.orange[7],
        primary: preset.colors.orange[1],
        secondary: preset.colors.white,
      },
      yellow: {
        background: preset.colors.yellow[7],
        primary: preset.colors.yellow[1],
        secondary: preset.colors.white,
      },
      green: {
        background: preset.colors.green[7],
        primary: preset.colors.green[1],
        secondary: preset.colors.white,
      },
      teal: {
        background: preset.colors.teal[7],
        primary: preset.colors.teal[1],
        secondary: preset.colors.white,
      },
      blue: {
        background: preset.colors.blue[7],
        primary: preset.colors.blue[1],
        secondary: preset.colors.white,
      },
      indigo: {
        background: preset.colors.indigo[7],
        primary: preset.colors.indigo[1],
        secondary: preset.colors.white,
      },
      purple: {
        background: preset.colors.purple[7],
        primary: preset.colors.purple[1],
        secondary: preset.colors.white,
      },
      pink: {
        background: preset.colors.pink[7],
        primary: preset.colors.pink[1],
        secondary: preset.colors.white,
      },
    },
  },
}

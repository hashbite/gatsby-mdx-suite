const preset = require('@theme-ui/preset-tailwind')

console.log(JSON.stringify())

module.exports = {
  config: {
    contentColumnMaxWidth: preset.sizes['6xl'],
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
        background: preset.colors.gray,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      red: {
        background: preset.colors.red,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      orange: {
        background: preset.colors.orange,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      yellow: {
        background: preset.colors.yellow,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      green: {
        background: preset.colors.green,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      teal: {
        background: preset.colors.teal,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      blue: {
        background: preset.colors.blue,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      indigo: {
        background: preset.colors.indigo,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      purple: {
        background: preset.colors.purple,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
      pink: {
        background: preset.colors.pink,
        primary: preset.colors.text,
        secondary: preset.colors.textMuted,
      },
    },
  },
}

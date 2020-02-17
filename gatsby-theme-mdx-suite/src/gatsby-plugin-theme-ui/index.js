// Generates kinda-logarithmic spacing map inspired by Refactor-UI recommendations.
// Usage: spacing.s1 = 14, spacing[s0.25] = 3 ...
export function generateSpacingUnits({ spacingUnit, multipliers } = {}) {
  spacingUnit = spacingUnit || 14
  multipliers = multipliers || [
    0.25,
    0.5,
    0.75,
    1,
    1.5,
    2,
    3,
    4,
    6,
    8,
    12,
    16,
    24,
    32,
    40,
    48,
  ]
  return multipliers.reduce(
    (list, scale) => ({
      ...list,
      ['s' + scale]: Math.floor(scale * spacingUnit),
    }),
    {}
  )
}

// Spacing config
const spacingUnit = 16
const maxContentWidth = 1400
const gridGutter = '16px'
const spacing = generateSpacingUnits({ spacingUnit })
const space = [
  0,
  spacing['s0.25'],
  spacing['s0.5'],
  spacing.s1,
  spacing.s2,
  spacing.s3,
  spacing.s4,
  spacing.s6,
  spacing.s8,
]

// Theme-ui colors (https://theme-ui.com/theme-spec/#color)
const text = '#000'
const background = '#fff'
const primary = '#07c'
const secondary = '#05a'
const muted = '#f6f6f6f'

// Example for project specific colors
const transparent = 'transparent'
const white = '#fff'
const lightGrey = '#ccc'
const black = '#000'
const ash = '#333'
const tomato = '#F00'
const orange = '#FFA500'
const lemon = '#FF0'
const lime = '#0F0'
const water = '#00F'
const blue = '#4299E1'

export default {
  initialColorMode: 'light',
  sizes: {
    maxContentWidth,
    gridGutter,
  },
  breakpoints: ['576px', '768px', '992px'],
  spacing,
  space,
  colors: {
    text,
    background,
    primary,
    secondary,
    muted,
    white,
    black,
    lightGrey,
    ash,
    tomato,
    orange,
    lemon,
    lime,
    water,
    blue,
    modes: {
      dark: {
        // Dont just invert colors for dark mode. This is just a demo.
        text: background,
        background: ash,
        primary: secondary,
        secondary: primary,
        sets: {
          ash: {
            background: white,
            primary: ash,
            secondary: ash,
          },
        },
      },
    },
    sets: {
      default: {
        background: transparent,
        primary: black,
        secondary: black,
      },
      transparent: {
        background: transparent,
        primary: white,
        secondary: white,
      },
      transparentInverted: {
        background: transparent,
        primary: ash,
        secondary: ash,
      },
      white: {
        background: white,
        primary: ash,
        secondary: ash,
      },
      ash: {
        background: ash,
        primary: white,
        secondary: white,
      },
      tomato: {
        background: tomato,
        primary: white,
        secondary: white,
      },
      orange: {
        background: orange,
        primary: ash,
        secondary: ash,
      },
      lemon: {
        background: lemon,
        primary: ash,
        secondary: ash,
      },
      lime: {
        background: lime,
        primary: ash,
        secondary: ash,
      },
      water: {
        background: water,
        primary: white,
        secondary: white,
      },
      blue: {
        background: blue,
        primary: orange,
        secondary: white,
      },
    },
  },
}

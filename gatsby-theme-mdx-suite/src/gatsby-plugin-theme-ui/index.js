// Generates kinda-logarithmic spacing map inspired by Refactor-UI recommendations.
// Usage: spacing.s1 = 14, spacing[s0.25] = 3 ...
export function generateSpacingUnits({ spacingUnit, multipliers }) {
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

export default {
  initialColorMode: 'light',
  colors: {
    text: '#000',
    background: '#fff',
    black: '#000',
    white: '#fff',
    primary: '#f1be25',
    contrast: '#add1c7',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#6ad6e7',
        contrast: '#51e57a',
      },
    },
  },
  spacing: generateSpacingUnits(),
}

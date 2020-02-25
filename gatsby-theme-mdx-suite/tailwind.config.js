import toTailwind from '@theme-ui/tailwind'
import defaultTheme from './src/gatsby-plugin-theme-ui' // Path to Theme UI config

/**
 * Either use default theme config or user config and convert to tailwind structure
 */
export default function enhanceTheme({ theme = defaultTheme }) {
  const convertedTheme = toTailwind(theme)

  /**
   * @theme-ui/tailwind is outdated. The following aligns the config to match Tailwind 1.2
   * Issue: https://github.com/system-ui/theme-ui/issues/698
   */
  convertedTheme.theme.colors = Object.keys(convertedTheme.theme.colors).reduce(
    (colors, color) => {
      const palette = convertedTheme.theme.colors[color]
      const convertedPalette = Array.isArray(palette)
        ? palette
            .filter(Boolean)
            .reduce((map, shade, i) => ({ ...map, [(i + 1) * 100]: shade }), {})
        : palette

      return { ...colors, [color]: convertedPalette }
    },
    {}
  )

  convertedTheme.theme.spacing = {
    px: '1px',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  }

  convertedTheme.theme.fontSize = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  }

  return convertedTheme
}

/**
 * Convert Theme-UI config to TailwindCSS config.
 *
 *
 * This is a workaround as theme-ui config is supplied as es modules and
 * twin.macro expects its config file in ES5 standard.
 *
 * In a perfect world (e.G. node fully supports es modules out of the box)
 * we can remove this file and use toTailwind(ourTheme) in tailwind.config.js
 */
import { writeFileSync } from 'fs-extra'
import { resolve } from 'path'

import toTailwind from '@theme-ui/tailwind'
import themeUITheme from '../src/gatsby-plugin-theme-ui'

console.log('Converting Theme UI config to TailwindCSS config')

const tailwindTheme = toTailwind(themeUITheme)

/**
 * @theme-ui/tailwind is outdated. The following aligns the config to match Tailwind 1.2
 * Issue: https://github.com/system-ui/theme-ui/issues/698
 */
tailwindTheme.theme.colors = Object.keys(tailwindTheme.theme.colors).reduce(
  (colors, color) => {
    const palette = tailwindTheme.theme.colors[color]
    const convertedPalette = Array.isArray(palette)
      ? palette
          .filter(Boolean)
          .reduce((map, shade, i) => ({ ...map, [(i + 1) * 100]: shade }), {})
      : palette

    return { ...colors, [color]: convertedPalette }
  },
  {}
)

tailwindTheme.theme.spacing = {
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

tailwindTheme.theme.fontSize = {
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

tailwindTheme.theme.fontWeight = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

// console.dir(tailwindTheme.theme.fontWeight)

const configFileContent = `module.exports = ${JSON.stringify(
  tailwindTheme,
  null,
  2
)}`

const configFilePath = resolve(process.cwd(), 'tailwind.config.js')

writeFileSync(configFilePath, configFileContent)

console.log('./tailwind.config.js updated')

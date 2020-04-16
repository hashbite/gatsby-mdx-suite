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
import themeUITheme from '../src/gatsby-theme-mdx-suite/gatsby-plugin-theme-ui'

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

const configFileContent = `module.exports = ${JSON.stringify(
  { theme: { extend: { ...tailwindTheme.theme } } },
  null,
  2
)}`

const configFilePath = resolve(process.cwd(), 'tailwind.config.js')

writeFileSync(configFilePath, configFileContent)

console.log('./tailwind.config.js updated')

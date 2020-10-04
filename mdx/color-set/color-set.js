import React from 'react'
import propTypes from 'prop-types'
import merge from 'deepmerge'
import { ThemeProvider, useThemeUI } from 'theme-ui'

import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

/**
 * Apply a color set or single colors to a subset of elements.
 *
 * @example
 * # Setting a color set
 *
 * ## Default color
 *
 * This is some example text
 *
 * <CTA href="#">Example</CTA>
 *
 * <ColorSet colorSet="primary">
 *
 * ## Custom color set
 *
 * This is some example text
 *
 * <CTA href="#">Example</CTA>
 *
 * </ColorSet>
 * @example
 * # Setting single colors
 *
 * ## Default color
 *
 * This is some example text
 *
 * <CTA href="#">Example</CTA>
 *
 * <ColorSet background="black" text="gray-200">
 *
 * ## Custom color set
 *
 * This is some example text
 *
 * <CTA href="#">Example</CTA>
 *
 * </ColorSet>
 */

const ColorSet = ({ name, children, ...colors }) => {
  const { theme } = useThemeUI()

  const colorSetData = theme.colors.sets[name]
  if (name && !colorSetData) {
    throw new Error(`Color set "${name}" does not exist.`)
  }
  const colorizedTheme = merge({}, theme)
  if (colorSetData) {
    colorizedTheme.colors = merge(colorizedTheme.colors, colorSetData)
  }
  if (colors.constructor === Object && Object.entries(colors).length !== 0) {
    // Support color palettes
    Object.entries(colors).forEach(
      ([key, val]) => (colors[key] = selectColor(theme.colors, val))
    )

    colorizedTheme.colors = merge(colorizedTheme.colors, colors)
  }

  return <ThemeProvider theme={colorizedTheme}>{children}</ThemeProvider>
}

ColorSet.propTypes = {
  name: propTypes.string,
  children: propTypes.node,
}

export default ColorSet

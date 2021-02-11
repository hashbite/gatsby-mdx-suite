import React from 'react'
import propTypes from 'prop-types'
import merge from 'deepmerge'
import { ThemeProvider, useTheme } from 'emotion-theming'

import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

/**
 * Apply a color set or single colors to all child elements.
 *
 * You can overwrite all colors found in the style-guide.
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
  const theme = useTheme()

  const colorizedTheme = merge({}, theme)

  // Read color set values
  if (name) {
    const colorSetData = theme.colors.sets[name]

    if (!colorSetData) {
      throw new Error(`Color set "${name}" does not exist or is empty.`)
    }

    colorizedTheme.colors = merge(colorizedTheme.colors, colorSetData)
  }

  // Overwrite with custom colors
  if (colors.constructor === Object && Object.entries(colors).length !== 0) {
    // Support custom colors and color palettes
    Object.entries(colors).forEach(
      ([key, val]) => (colors[key] = selectColor(theme.colors, val))
    )

    colorizedTheme.colors = merge(colorizedTheme.colors, colors)
  }

  return <ThemeProvider theme={colorizedTheme}>{children}</ThemeProvider>
}

ColorSet.propTypes = {
  children: propTypes.node.isRequired,
  /** Name of color set to apply */
  name: propTypes.string,
  /** Background color for child elements */
  background: propTypes.string,
  /** Text color for child elements */
  text: propTypes.string,
  /** Primary color for child elements */
  primary: propTypes.string,
  /** Secondary color for child elements */
  secondary: propTypes.string,
}

export default ColorSet

import React from 'react'
import propTypes from 'prop-types'
import merge from 'lodash/merge'
import { ThemeProvider, useThemeUI } from 'theme-ui'

/**
 * Apply a color set to a subset of elements.
 *
 * @example
 * <CTA href="#">Foo</CTA>
 * <ColorSet name="blue"><CTA href="#">Bar</CTA></ColorSet>
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
    colorizedTheme.colors = merge(colorizedTheme.colors, colors)
  }

  return <ThemeProvider theme={colorizedTheme}>{children}</ThemeProvider>
}

ColorSet.propTypes = {
  name: propTypes.string,
  children: propTypes.node,
}

export default ColorSet

export default function selectColor(colors, color) {
  if (!color) {
    return null
  }

  // Matched color palette, return specific color
  const result = color.match(/(.*)-([0-9]+)$/)
  if (result && colors[result[1]]) {
    return colors[result[1]][result[2]]
  }

  const themeColor = colors[color]

  // Matched color palette, return default color
  if (typeof themeColor === 'object') {
    return themeColor['500']
  }

  // Return non-palette color or fall back to input value
  return themeColor || color
}

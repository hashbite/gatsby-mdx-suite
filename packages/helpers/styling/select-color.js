export default function selectColor(colors, color) {
  // color = `red-500`
  const result = color.match(/(.*)-([0-9])[0]*$/)
  if (result && colors[result[1]]) {
    return colors[result[1]][parseInt(result[2])]
  }

  const themeColor = colors[color]

  // color = `red`
  if (Array.isArray(themeColor)) {
    return themeColor[5]
  }

  // color = `nonArrayColor` || `#123456`
  return themeColor || color
}

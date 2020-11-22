export function improveMdxError(error) {
  const fixedLines = error.message
    .replace(/[> ]+([0-9]+) \|/g, (a, b) => a.replace(b, parseInt(b) - 4))
    .replace(/\(([0-9]+):[0-9]+\)/, (a, b) => a.replace(b, parseInt(b) - 4))
    .replace(/unknown:/g, '')
  const lines = fixedLines
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  error.message = lines.shift()
  error.details = lines.join('\n')
}

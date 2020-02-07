const path = require('path')

module.exports = {
  tailwind: {
    styled: '@emotion/styled',
    config: path.resolve(process.cwd(), 'tailwind.config.js'),
    format: 'auto',
  },
}

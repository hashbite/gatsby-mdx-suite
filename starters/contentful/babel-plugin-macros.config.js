const path = require('path')

console.log('babel-plugin-macros.config.js')

module.exports = {
  tailwind: {
    styled: '@emotion/styled',
    config: './tailwind.config.js',
    format: 'auto',
  },
}

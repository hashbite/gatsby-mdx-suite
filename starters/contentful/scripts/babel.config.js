const gatsbyPreset = require('babel-preset-gatsby')

const data = gatsbyPreset()

data.presets = data.presets.map((presetData) => {
  if (presetData[1].corejs && presetData[1].corejs === 2) {
    presetData[1].corejs = 3
  }
  return presetData
})

module.exports = {
  presets: [data],
}

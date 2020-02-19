require('typeface-inter')
const toTheme = require('@theme-ui/typography').toTheme
const grandView = require('typography-theme-grand-view')

grandView.headerFontFamily = ['inter', 'sans-serif']
grandView.bodyFontFamily = ['inter', 'sans-serif']

module.exports = toTheme(grandView)

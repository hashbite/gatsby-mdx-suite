import merge from 'lodash/merge'
import defaultThemeUiConfig from 'gatsby-theme-mdx-suite-base/src/gatsby-plugin-theme-ui'

// Overwrite default theme
export default merge(defaultThemeUiConfig, {
  colors: {
    primary: 'tomato',
  },
})

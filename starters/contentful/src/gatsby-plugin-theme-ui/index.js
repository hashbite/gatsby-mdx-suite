import merge from 'lodash/merge'
import defaultTheme from 'gatsby-theme-mdx-suite/src/gatsby-plugin-theme-ui'
import typographyTheme from './typography'

export default merge(defaultTheme, typographyTheme)

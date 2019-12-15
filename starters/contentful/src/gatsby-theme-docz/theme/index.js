import { merge } from 'lodash/fp'

import baseTheme from 'gatsby-theme-mdx-suite/src/gatsby-theme-docz/theme/index'
import mdxTheme from '../../gatsby-plugin-theme-ui/index'

// Ensure our projects themes variables are available when components are rendered via docz
export default merge(baseTheme, mdxTheme)

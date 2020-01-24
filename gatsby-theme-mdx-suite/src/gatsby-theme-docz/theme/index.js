import { merge } from 'lodash/fp'

import baseTheme from 'gatsby-theme-docz/src/theme/index'
import mdxTheme from '../../gatsby-plugin-theme-ui/index'

export default merge(merge(baseTheme, mdxTheme), baseTheme.prism.light)

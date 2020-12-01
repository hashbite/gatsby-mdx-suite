import defaultIcons from 'gatsby-theme-mdx-suite-base/src/default-icons'

import { SiGithub } from 'react-icons/si'

export default new Map([
  ...defaultIcons,
  // Project specific icons
  ...Object.entries({
    github: { icon: SiGithub },
  }),
])

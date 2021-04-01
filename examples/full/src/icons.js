import defaultIcons from 'gatsby-theme-mdx-suite-base/src/default-icons'

import SiGithub from '@react-icons/all-files/si/SiGithub'

export default new Map([
  ...defaultIcons,
  // Project specific icons
  ...Object.entries({
    github: { icon: SiGithub },
  }),
])

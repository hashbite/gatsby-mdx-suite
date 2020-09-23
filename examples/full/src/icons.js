import defaultIcons from 'gatsby-theme-mdx-suite-base/src/default-icons'

import Users from 'heroicons/solid/users.svg'

export default new Map([
  ...defaultIcons,
  // Project specific icons
  ...Object.entries({
    users: { icon: Users },
  }),
])

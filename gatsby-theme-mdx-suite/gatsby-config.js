const path = require('path')
const defaultDoczSrc = path.resolve(
  process.cwd(),
  'node_modules/@gatsby-mdx-suite'
)

module.exports = ({ mdx, doczSrc }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: (modules) => modules,
        src: doczSrc || defaultDoczSrc,
        files: `**/docs/*.{md,markdown,mdx}`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
  ].filter(Boolean),
})
